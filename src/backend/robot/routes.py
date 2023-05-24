from sanic.request import Request
from sanic import Blueprint
from sanic.response import json
from sanic.response import HTTPResponse
from ..middleware.auth import auth

robot = Blueprint('robot', __name__)

@robot.post("/create")
@auth
async def handler_create(request: Request) -> HTTPResponse:
    # data = request
    # response, code = await db.user.create(data)
    pass
