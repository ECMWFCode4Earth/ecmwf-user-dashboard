"""

"""
from typing import Union

import requests


def get_service_status():
    json: dict = {}
    error: Union[None, str] = None

    try:
        res = requests.get("https://www.ecmwf.int/ecmwf_status/status")

        if res.status_code == 200:
            json = res.json()

    except requests.exceptions.RequestException as e:
        error = "Bad request"

    except ValueError as e:
        error = "Invalid JSON"

    return json, error
