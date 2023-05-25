# Basic imports
from sanic import Sanic
from textwrap import dedent
from prisma import Prisma, register
import os

# Routes imports
from user.routes import user
from robot.routes import robot

# try: 
#    # Credentials defined in the docker-compose
#    host = os.environ['MYSQL_HOST'] 
#    user = os.environ['MYSQL_USER'] 
#    password = os.environ['MYSQL_PASSWORD'] 
#    database = os.environ['MYSQL_DATABASE']
#    port = os.environ['MYSQL_MIGRATIONS_PORT']
#    host_migrations = os.environ['MYSQL_MIGRATIONS_HOST']
# except:
#     # Credenciais definidas no arquivo .env
#     from dotenv import load_dotenv
#     load_dotenv()
#     url_db = os.getenv('DATABASE_URL') 


def create_server() -> Sanic:
    app = Sanic(__name__)
    return app

app = create_server()

app.ext.openapi.describe(
    "Turtle Controller API",
    version="2.0",
    description=dedent(
        """
        # Info
        This is a description. It is a good place to add some _extra_ doccumentation.

        **MARKDOWN** is supported.
        """
    ),
)

app.blueprint(user, url_prefix='/user')
app.blueprint(robot, url_prefix='/robot')

if __name__ == "__main__":
    app.run(debug=True, port=3001)
    
