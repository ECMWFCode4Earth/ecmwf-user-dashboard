"""

"""
from typing import Union

import requests


def get_satellite_alerts():
    json: dict = {}
    error: Union[None, str] = None

    try:
        res = requests.get("https://apps-dev.ecmwf.int/webapps/opencharts-api/v1/soc/satellite-alerts/overview/")

        if res.status_code == 200:
            json = res.json()

    except requests.exceptions.RequestException as e:
        error = "Bad request"

    except ValueError as e:
        error = "Invalid JSON"

    return json, error
