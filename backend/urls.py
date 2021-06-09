from django.urls import path

from . import views

urlpatterns = [
    path("service_status", views.service_status),
    path("ping", views.ping),
]
