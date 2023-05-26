from sanic.request import Request
from sanic import Blueprint
from sanic.response import HTTPResponse,json
from sanic.response import json
from textwrap import dedent
from middleware.body_check import validate_body
from analyze.utils import Schema
from analyze.controller import register

analyze = Blueprint('analyze', __name__)

@analyze.post("/create")
@validate_body(Schema.REGISTER.value)
async def handler_register(request: Request) -> HTTPResponse:
      data = request.json
      response, code = register(routeId=data['routeId'], name=data['name'], startDate=data['startDate'], endDate=data['endDate'], supervisor=data['supervisor'], operator=data['operator'])
      return json(response, code)
