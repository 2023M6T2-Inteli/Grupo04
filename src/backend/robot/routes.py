from sanic.request import Request
from sanic import Blueprint
from sanic.response import json

robot = Blueprint('robot', __name__)

@robot.post("/create")
async def handler_create(request):
    # data = request
    # response, code = await db.user.create(data)
    pass
