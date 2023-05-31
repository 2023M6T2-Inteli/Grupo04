from sanic import Blueprint
from sanic.request import Request
from sanic.response import HTTPResponse
from sanic.response import json

from middleware.auth import auth
from middleware.body_check import validate_body
from user.controller import login, register, get_user
from user.utils import Schema

user = Blueprint('user', __name__)


@user.post("/register")
@validate_body(Schema.REGISTER.value)
async def handler_register(request: Request) -> HTTPResponse:
    data = request.json
    response, code = register(email=data['email'], password=data['password'], name=data['name'])
    return json(response, code)


@user.post("/login")
@validate_body(Schema.LOGIN.value)
async def handler_login(request: Request) -> HTTPResponse:
    data = request.json
    response, code = login(email=data['email'], password=data['password'])
    return json(response, code)


@user.get("/")
@auth
async def handler_get(request: Request) -> HTTPResponse:
    id = request.ctx.id
    response, code = get_user(id=id)
    return json(response, code)
