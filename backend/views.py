from django.http import HttpResponse, JsonResponse, HttpResponseNotFound

from backend.library.helpers.get_events import get_events
from backend.library.helpers.get_opencharts_products import get_opencharts_products
from backend.library.helpers.get_satellite_alerts import get_satellite_alerts
from backend.library.helpers.get_service_status import get_service_status
from backend.library.helpers.get_api_key import get_api_key


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


def events(request):
    json, error = get_events()

    if error is not None:
        return HttpResponseNotFound()

    return JsonResponse(json)


def api_key(request):
    json, error = get_api_key()

    print(request.COOKIES)

    if error is not None:
        return HttpResponseNotFound()

    return JsonResponse(json)


def satellite_alerts(request):
    json, error = get_satellite_alerts()

    if error is not None:
        return HttpResponseNotFound()

    return JsonResponse(json)


def ping(request):
    return HttpResponse("Success")
