
from flask import Flask, render_template_string

app = Flask(__name__)

@app.route('/')
def index():
    html = """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Video Feed</title>
        </head>
        <body>
            <img id="videoFeed" src="" alt="Video Feed" />
            <script>
                const videoFeed = document.getElementById('videoFeed');
                const socket = new WebSocket('ws://10.128.65.181:3001/analyze/video_feed');

                socket.onmessage = function (event) {
                    const url = URL.createObjectURL(new Blob([event.data]), { type: 'image/jpeg' });
                    videoFeed.src = url;
                };

                socket.onerror = function (error) {
                    console.log(`WebSocket Error: ${error}`);
                };
            </script>
        </body>
    </html>
    """
    return render_template_string(html)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3005)
