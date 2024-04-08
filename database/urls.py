from django.contrib import admin
from django.urls import path, include
from .views import sign_up, database_upload, file_test, init_send_database, filterData



urlpatterns = [
    path("file", database_upload.as_view()),
    path("getDatabase", init_send_database.as_view()),
    path("filter", filterData),
    path("filetest", file_test),
    path("create_account", sign_up),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
]
