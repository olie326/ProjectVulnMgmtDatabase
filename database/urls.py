from django.contrib import admin
from django.urls import path, include
from .views import avg_vulnerability_age, database_upload, delete_rows, file_test, fixed_vuln, init_send_database, filterData, last_month_vuln, open_vulnerability_risk_percentage, send_data, update_remediation



urlpatterns = [
    path("file", database_upload.as_view()),
    path("getDatabase", init_send_database.as_view()),
    path("getData", send_data.as_view()),
    path("filter", filterData),
    path("filetest", file_test),
    path("remediation_update", update_remediation),
    path("delete_rows", delete_rows),
    path("avg_vulnerability_age", avg_vulnerability_age),
    path("risk", open_vulnerability_risk_percentage),
    path("month_ago", last_month_vuln),
    path("fixed_vuln", fixed_vuln),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
]
