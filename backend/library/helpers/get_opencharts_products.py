"""

"""

from typing import Union

import requests


def get_opencharts_products():
    json: dict = {}
    error: Union[None, str] = None

    try:
        res = requests.get("https://apps.ecmwf.int/webapps/opencharts-api/v1/packages/opencharts/products/")

        if res.status_code == 200:
            json = res.json()

    except requests.exceptions.RequestException as e:
        error = "Bad request"

    except ValueError as e:
        error = "Invalid JSON"

    return json, error
