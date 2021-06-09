from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotFound

from backend.lib.helpers.get_service_status import get_service_status


# Create your views here.

def service_status(request):
    json, error = get_service_status()

    if error is not None:
        return HttpResponseNotFound()

    return JsonResponse(json)


def ping(request):
    return HttpResponse("success")
