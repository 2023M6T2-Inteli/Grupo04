from sanic import Sanic
from textwrap import dedent
from prisma import Prisma, register, Client
import os
import asyncio

from robot.routes import robot as robot_routes

try: 
   # Credenciais definidas nas variáveis de ambiente no docker-compose
   host = os.environ['MYSQL_HOST'] 
   user = os.environ['MYSQL_USER'] 
   password = os.environ['MYSQL_PASSWORD'] 
   database = os.environ['MYSQL_DATABASE']
   port = os.environ['MYSQL_MIGRATIONS_PORT']
   host_migrations = os.environ['MYSQL_MIGRATIONS_HOST']
except:
    # Credenciais definidas no arquivo .env
    from dotenv import load_dotenv
    load_dotenv()
    url_db = os.getenv('DATABASE_URL') 


async def main() -> None:
    app = Sanic(__name__)
    db = Prisma()
    await db.connect()

    # write your queries here
    user = await db.robo.create(
        data={
            'name': 'Robert',
            'ip': 'robert@craigie.dev'
        },
    )

    await db.disconnect()
    return app, db



app, db = asyncio.run(main())

app.ext.openapi.describe(
    "Turtle Controller API",
    version="1.0",
    description=dedent(
        """
        # Info
        This is a description. It is a good place to add some _extra_ doccumentation.

        **MARKDOWN** is supported.
        """
    ),
)


app.blueprint(robot_routes, url_prefix='/robot')

if __name__ == "__main__":
    app.run(debug=True, port=3001)
    
