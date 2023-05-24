from sanic import Blueprint
from sanic.response import json
from textwrap import dedent

analyze = Blueprint('analyze', __name__)

@analyze.get("/create")
async def create(request):
    
    return json({"Hello": "World"})