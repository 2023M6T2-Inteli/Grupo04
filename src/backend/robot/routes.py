
from sanic.request import Request
from sanic import Blueprint
from sanic.response import HTTPResponse,json
from middleware.body_check import validate_body
from robot.utils import Schema
from robot.controller import register, get_robots, get_robot, delete_robot

robot = Blueprint('robot', __name__)

@robot.post("/register")
@validate_body(Schema.REGISTER.value)
async def handler_register(request: Request) -> HTTPResponse:
      data = request.json
      response, code = register(name=data['name'], ip=data['ip'])
      return json(response, code)

@robot.get("/get_robots")
async def handler_get_robots(request: Request) -> HTTPResponse:
      response, code = get_robots()
      return json(response, code)

@robot.get("/get_robot/<id:int>")
@validate_body(Schema.GET_ROBOT.value)
async def handler_get_robot(request: Request) -> HTTPResponse:
      data = request.json
      response, code = get_robot(data['id'])
      return json(response, code)

@robot.delete("/delete_robot/<id:int>")
@validate_body(Schema.DELETE_ROBOT.value)
async def handler_delete_robot(request: Request) -> HTTPResponse:
      data = request.json
      response, code = delete_robot(data['id'])
      return json(response, code)