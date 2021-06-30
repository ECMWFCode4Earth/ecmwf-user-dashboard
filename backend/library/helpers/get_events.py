from typing import Union

import requests


def get_events():
    json: dict = {}
    error: Union[None, str] = None

    try:
        res = requests.get("https://events.ecmwf.int/export/categ/2.json?_=1623050927029&ak=c430e6b8-16d4-41f3-9c57-908a0f60bd0b")

        if res.status_code == 200:
            json = res.json()

    except requests.exceptions.RequestException as e:
        error = "Bad request"

    except ValueError as e:
        error = "Invalid JSON"

    return json, error

