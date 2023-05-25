
from sanic.request import Request
from sanic import Blueprint
from sanic.response import HTTPResponse,json
from middleware.body_check import validate_body
from robot.utils import Schema
from robot.controller import register

robot = Blueprint('robot', __name__)

@robot.post("/register")
@validate_body(Schema.REGISTER.value)
async def handler_register(request: Request) -> HTTPResponse:
      data = request.json
      response, code = register(name=data['name'], ip=data['ip'])
      return json(response, code)

