from sanic import Sanic
from textwrap import dedent
from prisma import Prisma
from robot.model import robot

def create_app():
    app = Sanic(__name__)
    db = Prisma()
    # db.connect("mysql:/database/database.db")
    # register(db)

    return app, db

app, db = create_app()

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


app.blueprint(robot, url_prefix='/robot')

if __name__ == "__main__":
    app.run(debug=True, port=3001)
