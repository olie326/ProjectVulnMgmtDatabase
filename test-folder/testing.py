import pandas as pd
import numpy as np
import sys

vulnListFile = 'test-folder/Vuln List (1).xlsx'
vulnAssetListFile = 'test-folder/Vuln Assets-20240128 (3).xlsx'
assetBusinessAttributesFile = 'test-folder/ITOpsAssets (3).xlsx'


vulnList_df = pd.read_excel(vulnListFile)
df = pd.read_excel(vulnAssetListFile)
df1 = pd.read_excel(assetBusinessAttributesFile)

df = df.drop_duplicates(subset=['name']).set_index('name')
df1 = df1.drop_duplicates(subset=['Hostname']).set_index('Hostname')

df1_reindexed = df1.reindex(df.index)


df_final = pd.concat([df1_reindexed, df], join='outer', axis=1)
df_final['new_name'] = df_final.index

df_final.replace()
date_columns = ['first_observed', 'last_authenticated_scan_time', 'last_licensed_scan_time', 'last_observed', 'last_scan_time', 'DateRecordAdded']
df_final[date_columns] = df_final[date_columns].apply(pd.to_datetime, format='mixed')
df_final.replace(np.nan, None, inplace=True)

# print(sys.getsizeof(df_final))
# print(df_final)

yas = df_final.to_dict('records')
print(sys.getsizeof(yas))

definition_subset_df = vulnList_df.drop_duplicates(subset=['definition.id']).set_index('definition.id')
definition_subset_df['new_definition_id'] = definition_subset_df.index
definition_date_columns = ['definition.patch_published', 'definition.vulnerability_published']
definition_subset_df[definition_date_columns] = definition_subset_df[definition_date_columns].apply(pd.to_datetime, format='mixed')
definition_subset_df[definition_date_columns] = definition_subset_df[definition_date_columns].astype(object).where(definition_subset_df[definition_date_columns].notnull(), None)

definition_subset_df.replace(np.nan, None, inplace=True)
# definition_subset_df = definition_subset_df.to_dict('records')

print(len(definition_subset_df['new_definition_id'].to_numpy()))

definition_subset_df.to_csv('out.csv')







