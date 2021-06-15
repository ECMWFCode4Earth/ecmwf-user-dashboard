from django.urls import path

from . import views

urlpatterns = [
    path("service_status", views.service_status),
    path("opencharts/products", views.opencharts_products),
    path("ping", views.ping),
]
