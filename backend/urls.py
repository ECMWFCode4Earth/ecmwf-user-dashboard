from django.urls import path, include

from . import views

urlpatterns = [
    path("service_status", views.service_status),
    path("opencharts/products", views.opencharts_products),
    path("events", views.events),
    path("api_key", views.api_key),
    path("ping", views.ping),
    path("satellite-alerts", views.satellite_alerts),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
]
