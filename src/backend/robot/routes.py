
from sanic.request import Request
from sanic import Blueprint
from sanic.response import HTTPResponse,json

# from middleware.auth import auth
# import robot.controller as RobotController

robot = Blueprint('robot', __name__)

@robot.post("/create")
#@auth
async def create(request: Request) -> HTTPResponse:
    # data = request
    # response, code = RobotController.create_robot(data.json['name'], data.json['ip'])
    # return json(response), code
    pass
