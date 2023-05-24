from functools import wraps
import jwt
from sanic import response
from sanic.request import Request
from sanic.response import HTTPResponse

def auth(f):
    @wraps(f)
    async def auth_function(request: Request, *args, **kwargs) -> HTTPResponse:
        try:
            # Token must be passed as 'Bearer <token>' in the header
            token = request.token
            # Decoding the token with the secret key
            decoded = jwt.decode(token, key='secret', algorithms=['HS256', ])
            # Adding the user id to the request context
            request.ctx.id = decoded['id']
            return await f(request, *args, **kwargs)
        # If the token is invalid, return an error message as JSON
        except Exception as err:
            return response.json({'type': 'error', 'message': str(err)}, status=401)
    return auth_function
