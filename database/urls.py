from django.contrib import admin
from django.urls import path, include
from .views import database_upload, init_send_database, filterData

urlpatterns = [
    path("file", database_upload.as_view()),
    path("getDatabase", init_send_database.as_view()),
    path("filter", filterData)
]
