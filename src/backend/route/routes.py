from sanic.request import Request
from sanic import Blueprint
from sanic.response import HTTPResponse,json
from sanic.response import json
from textwrap import dedent
from middleware.body_check import validate_body
from route.utils import Schema
from route.controller import register, get_all, get_route, update_route, delete_route

route = Blueprint('route', __name__)

@route.post("/create")
@validate_body(Schema.REGISTER.value)
async def handler_register(request: Request) -> HTTPResponse:
      data = request.json
      response, code = register(routeId=data['routeId'], startDate=data['startDate'], endDate=data['endDate'], supervisor=data['supervisor'], operator=data['operator'])
      return json(response, code)

@route.get("/get_all")
async def handler_get_all(request: Request) -> HTTPResponse:
      response, code = get_all()
      return json(response, code)

@route.get("/get_route/<routeId:int>")
@validate_body(Schema.GET.value)
async def handler_get(request: Request, id: int) -> HTTPResponse:
      response, code = get_route(id)
      return json(response, code)

@route.put("/update_route/<routeId:int>")
@validate_body(Schema.UPDATE.value)
async def handler_update(request: Request, id: int) -> HTTPResponse:
      data = request.json
      response, code = update_route(id, data['name'])
      return json(response, code)

@route.delete("/delete_route/<routeId:int>")
@validate_body(Schema.DELETE.value)
async def handler_delete(request: Request, id: int) -> HTTPResponse:
      response, code = delete_route(id)
      return json(response, code)
