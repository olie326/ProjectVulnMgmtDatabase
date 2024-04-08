from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import numpy as np
import pandas as pd
from .models import Asset, Definition, Vulnerability, UserProfile
from django.core import serializers
from rest_framework.decorators import api_view
import json
from datetime import datetime
from dateutil.relativedelta import relativedelta
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user
from rest_framework.permissions import IsAuthenticated



class database_upload(APIView):
    def post(self, request):

        print('Loading...')

        user = get_user(request)
        print(user)
        print(request.auth)

        # Loading Files

        vulnListFile = request.FILES.get('vulnListFile')
        vulnAssetListFile = request.FILES.get('vulnAssetListFile')
        assetBusinessAttributesFile = request.FILES.get('assetBusinessAttributesFile')

        vulnList_df = pd.read_excel(vulnListFile)
        vulnAsset_df = pd.read_excel(vulnAssetListFile)
        buisAttr_df = pd.read_excel(assetBusinessAttributesFile)


    # ---- Asset List Preprocessing ---
        vulnAsset_df = vulnAsset_df.drop_duplicates(subset=['name']).set_index('name')
        buisAttr_df = buisAttr_df.drop_duplicates(subset=['Hostname']).set_index('Hostname')

        asset_combined_df = buisAttr_df.reindex(vulnAsset_df.index)

        asset_combined_df = pd.concat([asset_combined_df, vulnAsset_df], join='outer', axis=1)

        asset_combined_df['new_name'] = asset_combined_df.index
        asset_combined_df.replace(np.nan, None, inplace=True)

        # Date time objects
        date_columns = ['first_observed', 'last_authenticated_scan_time', 'last_licensed_scan_time', 'last_observed', 'last_scan_time', 'DateRecordAdded']
        asset_combined_df[date_columns] = asset_combined_df[date_columns].apply(pd.to_datetime, format='mixed')
        asset_combined_df[date_columns] = asset_combined_df[date_columns].astype(object).where(asset_combined_df[date_columns].notnull(), None)

        # format='%Y-%m-%dT%H:%M:%S.%fZ'
        #some dates were this??? 
        #2023-08-36T23:25:55.137Z  ||  2023-04-36T07:35:42.113Z
        asset_combined_df = asset_combined_df.to_dict('records')

        print('itops list processed!')

    # --- vulnerability list preprocessing ---

        definition_subset_df = vulnList_df.drop_duplicates(subset=['definition.id']).set_index('definition.id')
        definition_subset_df['new_definition_id'] = definition_subset_df.index
        definition_date_columns = ['definition.patch_published', 'definition.vulnerability_published']
        definition_subset_df[definition_date_columns] = definition_subset_df[definition_date_columns].apply(pd.to_datetime, format='mixed')
        definition_subset_df[definition_date_columns] = definition_subset_df[definition_date_columns].astype(object).where(definition_subset_df[definition_date_columns].notnull(), None)

        definition_subset_df.replace(np.nan, None, inplace=True)
        definition_subset_df = definition_subset_df.to_dict('records')

        print('vulnerability assets processed!')
    # --- vulnerability list preprocessing ---

        vuln_date_columns = ['first_observed', 'last_seen']
        vulnList_df[vuln_date_columns] = vulnList_df[vuln_date_columns].apply(pd.to_datetime, format='mixed')
        vulnList_df[vuln_date_columns] = vulnList_df[vuln_date_columns].astype(object).where(vulnList_df[vuln_date_columns].notnull(), None)

        vulnList_df.replace(np.nan, None, inplace=True)
        vulnList_df = vulnList_df.to_dict('records')

        print('vulnerability list processed!')
    # --- creating definition (cvss2, cvss3, vpr) objects ---

        set_definition(definition_subset_df, user)

        print('definitions created!')
    # --- entering assets into database ---
        set_asset(asset_combined_df, user)

        print('assets created!')

        set_vulnerability(vulnList_df, user)
        
        print('vulnerabilities created!')
        print('done!')

        return Response('response successful!')


def set_asset(dataframe, user):

    print('setting assets...')

    objList = [Asset(
            user=user,
            display_ipv4_address=row['display_ipv4_address'],
            asset_id=row['id'],
            name=row['new_name'],
            operating_system_asset_list=row['display_operating_system'],
            tags=row['tags'],
            acr_override_processing=row['acr.acr_override_processing'],
            acr_score=row['acr.score'],
            aes_score=row['aes.score'],
            display_mac_address=row['display_mac_address'],
            first_observed=row['first_observed'],
            is_licensed=row['is_licensed'],
            is_public=row['is_public'],
            last_authenticated_scan_time=row['last_authenticated_scan_time'],
            last_licensed_scan_time=row['last_licensed_scan_time'],
            last_observed=row['last_observed'],
            last_scan_time=row['last_scan_time'],
            mac_addresses=row['mac_addresses'],
            mitigations=row['mitigations'],
            table_id=row['Table_id'],
            types=row['types'],
            subscription=row['pusbription'],
            OS_Name=row['OS_Name'],
            owner_group=row['Owner_Group'],
            system_model=row['System_Model'],
            environment=row['Environment'],
            date_record_added=row['DateRecordAdded'],
            device_owner=row['DeviceOwner']
        ) for row in dataframe]

    update_fields = [field.name for field in Asset._meta.get_fields() if field.name != 'asset_id'][2:]
    print(update_fields)

    Asset.objects.bulk_create(objList, update_conflicts=True, update_fields=update_fields ,unique_fields=['asset_id'])



def set_definition(dataframe, user):

    print('setting definitions...')

    definitionObjectList = [Definition(
            user=user,
            cve = row['definition.cve'],
            description = row['definition.description'],
            exploitability_ease = row['definition.exploitability_ease'],
            exploited_by_malware = row['definition.exploited_by_malware'],
            exploited_by_nessus = row['definition.exploited_by_nessus'],
            family = row['definition.family'],
            definition_id = row['new_definition_id'],
            in_the_news = row['definition.in_the_news'],
            name = row['definition.name'],
            patch_published = row['definition.patch_published'],
            plugin_version = row['definition.plugin_version'],
            see_also = row['definition.see_also'],
            solution = row['definition.solution'],
            unsupported_by_vendor = row['definition.unsupported_by_vendor'],
            vulnerability_published = row['definition.vulnerability_published'],

            #cvss2
            cvss2_base_score = row['definition.cvss2.base_score'],
            cvss2_base_vector = row['definition.cvss2.base_vector'],
            cvss2_temporal_score = row['definition.cvss2.temporal_score'],
            cvss2_temporal_vector = row['definition.cvss2.temporal_vector'],

            #cvss3
            cvss3_base_score = row['definition.cvss3.base_score'],
            cvss3_base_vector = row['definition.cvss3.base_vector'],
            cvss3_temporal_score = row['definition.cvss3.temporal_score'],
            cvss3_temporal_vector = row['definition.cvss3.temporal_vector'],

            #vpr
            vpr_drivers_cvss3_impact_score = row['definition.vpr.drivers_cvss3_impact_score'],
            vpr_drivers_exploit_code_maturity = row['definition.vpr.drivers_exploit_code_maturity'],
            vpr_drivers_threat_intensity = row['definition.vpr.drivers_threat_intensity'],
            vpr_drivers_threat_recency_high = row['definition.vpr.drivers_threat_recency_high'],
            vpr_drivers_threat_recency_low = row['definition.vpr.drivers_threat_recency_low'],
            vpr_drivers_threat_sources = row['definition.vpr.drivers_threat_sources'],
            vpr_score = row['definition.vpr.score']

    ) for row in dataframe]

    update_fields = [field.name for field in Definition._meta.get_fields() if field.name != 'definition_id'][2:]
    print(update_fields)


    Definition.objects.bulk_create(definitionObjectList, update_conflicts=True, update_fields=update_fields ,unique_fields=['definition_id'])



def set_vulnerability(dataframe, user):

    print('setting vulnerabilities...')

    vulnObjectList = [Vulnerability(
        user=user,
        definition=Definition.objects.get(definition_id=row['definition.id']),
        asset= Asset.objects.get(name=row['asset.name']) if Asset.objects.filter(name=row['asset.name']).exists() else None,
        first_observed=row['first_observed'],
        vulnerability_id=row['id'],
        last_seen=row['last_seen'],
        output=row['output'],
        risk_modified=row['risk_modified'],
        severity=row['severity'],
        state=row['state']
    ) for row in dataframe]

    update_fields = [field.name for field in Vulnerability._meta.get_fields() if field.name != 'vulnerability_id'][2:]

    Vulnerability.objects.bulk_create(vulnObjectList, update_conflicts=True, update_fields=update_fields ,unique_fields=['vulnerability_id'])


class init_send_database(APIView):
    def post(self, request):
        variant = request.data.get("variant")
        print(request.data)
        print(variant)

        user = get_user(request)
        
        if variant == "Vulnerability":
            data = serializers.serialize('json', Vulnerability.objects.select_related('asset', 'definition').filter(user=user).all())


        elif variant == "Asset":
                        data = serializers.serialize('json', Asset.objects.filter(user=user).all())
        elif variant == "Definition":
                        data = serializers.serialize('json', Definition.objects.filter(user=user))
                      
        else:
             return Response("Table type error!")
        
        print("data serialized!")

        return Response(data)

@api_view(['POST'])
def filterData(request):
    # 2024-01-22T03:53:11.075Z	
    time_dict = {
        "1 week ago": datetime.now() - relativedelta(weeks=1),
        "2 weeks ago": datetime.now() - relativedelta(weeks=2),
        "1 month ago": datetime.now() - relativedelta(months=1),
        "3 months ago": datetime.now() - relativedelta(months=3),
        "6 months ago": datetime.now() - relativedelta(months=6),
        "1 year ago": datetime.now() - relativedelta(years=1),
        "all time": None,
    }

    filters = json.loads(request.body.decode("UTF-8"))
    print(filters)

    vulnFilters = {}
    
    for key, value in filters['vulnerability_options'].items():
        if value != "":
            if key == 'last_seen' or key == 'last_scan_time':
                if time_dict[value] == None:
                    continue
                else:
                    vulnFilters[key + '__gte'] = time_dict[value]
            elif key == 'state':
                vulnFilters[key] = value.upper()

            else:
                vulnFilters[key] = value

    assetFilters = {}
    
    for key, value in filters['asset_options'].items():
        if value != "":
            if key == 'last_scan_time':
                if time_dict[value] == None:
                    continue
                else:
                    assetFilters['asset__' + key + '__gte'] = time_dict[value]
            else:
                vulnFilters['asset__'+ key] = value


    filteredData = Vulnerability.objects.filter(**vulnFilters, **assetFilters)
    filteredData = serializers.serialize('json', filteredData)

    print(vulnFilters)
    print("recieved filter post request!")
    return Response(filteredData)


@api_view(['POST'])
def file_test(request):
    print(request.FILES)
    return Response("success!")

@api_view(['POST'])
def sign_up(request):

    print("creating user...")
    userData = json.loads(request.body.decode('UTF-8'))
    

    user = User.objects.create_user(**userData)
    UserProfile.objects.create(user=user)

    return Response("New account created!")

