from typing import Union

import requests


def get_api_key(cookies=None):
    json: dict = {}
    error: Union[None, str] = None

    if not cookies:
        cookies = {"django-prod":"8whgnbimu2c0csbmcy8v18iyi2bvjnah"}

    try:

        res = requests.get("https://api.ecmwf.int/v1/key/?format=json", cookies=cookies)

        if res.status_code == 200:
            json = res.json()

    except requests.exceptions.RequestException as e:
        error = "Bad request"

    except ValueError as e:
        error = "Invalid JSON"

    return json, error

