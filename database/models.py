from django.db import models
from django.contrib.auth.models import User
# from django.contrib.auth.models import AbstractUser


# Create your models here.

#Auth Profile
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

class Definition(models.Model):
    # unique
    definition_id = models.IntegerField(unique=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="definition")

    cve = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    exploitability_ease = models.CharField(max_length=13, null=True)
    exploited_by_malware = models.BooleanField(null=True)
    exploited_by_nessus = models.BooleanField(null=True)
    family = models.CharField(max_length=100, null=True)
    in_the_news = models.BooleanField(null=True)
    name = models.CharField(max_length=100, null=True)
    patch_published = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    plugin_version = models.FloatField(null=True)
    see_also = models.URLField(null=True)
    solution = models.CharField(max_length=100, null=True)
    unsupported_by_vendor = models.BooleanField(null=True)
    vulnerability_published = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)

    #cvss2
    cvss2_base_score = models.DecimalField(max_digits=10, decimal_places=1, null=True)
    cvss2_base_vector = models.CharField(max_length=255, null=True)
    cvss2_temporal_score = models.DecimalField(max_digits=10, decimal_places=1, null=True)
    cvss2_temporal_vector = models.CharField(max_length=255, null=True)

    #cvss3
    cvss3_base_score = models.DecimalField(max_digits=10, decimal_places=1, null=True)
    cvss3_base_vector = models.CharField(max_length=255, null=True)
    cvss3_temporal_score = models.DecimalField(max_digits=10, decimal_places=1, null=True)
    cvss3_temporal_vector = models.CharField(max_length=255, null=True)

    #vpr
    vpr_drivers_cvss3_impact_score = models.DecimalField(max_digits=10, decimal_places=1, null=True)
    vpr_drivers_exploit_code_maturity = models.CharField(max_length=20, null=True)
    vpr_drivers_threat_intensity = models.CharField(max_length=9, null=True)
    vpr_drivers_threat_recency_high = models.SmallIntegerField(null=True)
    vpr_drivers_threat_recency_low = models.SmallIntegerField(null=True)
    vpr_drivers_threat_sources = models.CharField(max_length=30, null=True)
    vpr_score = models.DecimalField(max_digits=10, decimal_places=1, null=True)


class Asset(models.Model):
    # from vul list
    name = models.CharField(max_length=50, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="asset")

    display_ipv4_address = models.CharField(max_length=30, null=True)
    asset_id = models.CharField(max_length=100, unique=True, null=True)
    # operating_system_vul_list = models.CharField(max_length=100)
    tags = models.CharField(max_length=500, null=True)

    # asset list
    acr_override_processing = models.BooleanField(null=True)
    acr_score = models.IntegerField(null=True)
    aes_score = models.IntegerField(null=True)
    # fqdn = models.CharField(max_length=200, null=True)
    # display_ipv6_address = models.CharField(max_length=70)
    display_mac_address = models.CharField(max_length=17, null=True)
    operating_system_asset_list = models.CharField(max_length=100, null=True)
    first_observed = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    is_licensed = models.BooleanField(null=True)
    is_public = models.BooleanField(null=True)
    last_authenticated_scan_time = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    last_licensed_scan_time = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    last_observed = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    last_scan_time = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    mac_addresses = models.TextField(null=True)
    mitigations = models.TextField(null=True)
    table_id = models.CharField(max_length=200, null=True)
    types = models.CharField(max_length=4, null=True)

    #ITOps list
    subscription = models.CharField(max_length=500, null=True)
    OS_Name = models.CharField(max_length=200, null=True)
    owner_group = models.CharField(max_length=100, null=True)
    # application = models.CharField(max_length=200)
    system_model = models.CharField(max_length=100, null=True)
    environment = models.CharField(max_length=50, null=True)
    date_record_added = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    device_owner = models.CharField(max_length=50, null=True)


class Vulnerability(models.Model):
    # unique
    vulnerability_id = models.CharField(max_length=50, unique=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="vulnerability")
    #connections
    definition = models.ForeignKey(Definition, on_delete=models.RESTRICT, null=True)
    asset = models.ForeignKey(Asset, on_delete=models.RESTRICT, null=True)

    first_observed = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    last_seen = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    output = models.TextField(null=True)
    risk_modified = models.CharField(max_length=4, null=True)
    severity = models.CharField(max_length=8, null=True)
    state = models.CharField(max_length=10, null=True)

