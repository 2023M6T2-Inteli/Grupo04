from flask import Flask, render_template, Response
import cv2 as cv
from ultralytics import YOLO

#Initialize the Flask app
app = Flask(__name__)

def videocapture():
    model = YOLO('./model.pt')

    # Capturando o video com o OpenCV
    cap = cv.VideoCapture(1)

    # Loop para ficar analisando o video ao vivo
    while True:
        success, frame = cap.read()
        if not success:
            cap.release()
            break
        else:
            # Fazendo a predição com uma confiança mínima de 60%
            result = model.predict(frame, conf=0.6)
            # Mostrando o resultado na tela
            ret, buffer = cv.imencode('.jpg', cv.flip(result[0].plot(), 1))
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(videocapture(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port="5000")