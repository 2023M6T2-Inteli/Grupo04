from sanic.request import Request
from sanic import Blueprint
from sanic.response import HTTPResponse,json
from sanic.response import json
from textwrap import dedent
from middleware.body_check import validate_body
from route.utils import Schema
from route.controller import register

route = Blueprint('route', __name__)

@route.post("/create")
@validate_body(Schema.REGISTER.value)
async def handler_register(request: Request) -> HTTPResponse:
      data = request.json
      response, code = register(routeId=data['routeId'], startDate=data['startDate'], endDate=data['endDate'], supervisor=data['supervisor'], operator=data['operator'])
      return json(response, code)
