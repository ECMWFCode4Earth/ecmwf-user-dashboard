from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotFound

from backend.library.helpers.get_service_status import get_service_status
from backend.library.helpers.get_opencharts_products import get_opencharts_products


# Create your views here.

def service_status(request):
    json, error = get_service_status()

    if error is not None:
        return HttpResponseNotFound()

    return JsonResponse(json)


def opencharts_products(request):
    json, error = get_opencharts_products()

    if error is not None:
        return HttpResponseNotFound()

    return JsonResponse(json)


def ping(request):
    return HttpResponse("success")
