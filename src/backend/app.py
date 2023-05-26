# Basic imports
from sanic import Sanic
from textwrap import dedent

# Routes imports
from user.routes import user
from robot.routes import robot
from analyze.routes import analyze

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
app.blueprint(analyze, url_prefix='/analyze')

if __name__ == "__main__":
    app.run(debug=True, port=3001)