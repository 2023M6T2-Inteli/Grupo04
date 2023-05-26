
from sanic.request import Request
from sanic import Blueprint
from sanic.response import HTTPResponse,json
from middleware.body_check import validate_body
from point.utils import Schema
from point.controller import register, get_points, delete_points

point = Blueprint('point', __name__)

@point.post("/register")
@validate_body(Schema.REGISTER.value)
async def handler_register(request: Request) -> HTTPResponse:
      data = request.json
      response, code = register(pointX=data['pointX'], pointY=data['pointY'], routeId=data['routeId'])
      return json(response, code)

@point.get("/get_points")
@validate_body(Schema.GET_POINTS.value)
async def handler_get_points(request: Request) -> HTTPResponse:
        data = request.json
        response, code = get_points(routeId=data['routeId'])
        return json(response, code)

@point.delete("/delete_points")
@validate_body(Schema.DELETE_POINTS.value)
async def handler_delete_points(request: Request) -> HTTPResponse:
        data = request.json
        response, code = delete_points(routeId=data['routeId'])
        return json(response, code)
