from sanic import Sanic
from sanic.response import file

app = Sanic(__name__)
app.config.LOG_LEVEL = "DEBUG"

# 
app.static('/static', './static')

@app.route("/")
async def index(request):
    return await file("templates/interface_rota.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
