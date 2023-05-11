window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const saveButton = document.getElementById('save-button');
    const resetButton = document.getElementById('reset-button');
    let image;

    let points = [];
    let connections = [];
    let startPoint = null;

    // Load image
    document.getElementById('image-input').addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            image = new Image();
            image.src = event.target.result;

            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
            };
        };

        reader.readAsDataURL(file);
    });

    // Canvas click event handler
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const clickedPoint = findClickedPoint(x, y);
        if (!clickedPoint) {
            points.push({ x, y });
            drawPointsAndConnections();
        } else {
            if (!startPoint) {
                startPoint = clickedPoint;
            } else {
                const endPoint = clickedPoint;
                connections.push({ from: startPoint, to: endPoint });
                startPoint = null;
                drawPointsAndConnections();
            }
        }
    });

    // Canvas mousemove event handler
    canvas.addEventListener('mousemove', (e) => {
        if (startPoint) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            console.log(x, y);
            drawPointsAndConnections();
            drawTempLine(startPoint.x, startPoint.y, x, y, 'black');
        }
    });

    // Reset button click event handler
    resetButton.addEventListener('click', () => {
        points = [];
        connections = [];
        startPoint = null;
        drawPointsAndConnections();
    });

    // Hide image button click event handler
    const hideImageButton = document.getElementById('hide-image-button');

    hideImageButton.addEventListener('click', () => {
        image = null;
        context.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('image-input').value = '';

        // Reset points, connections and start point
        points = [];
        connections = [];
        startPoint = null;
        drawPointsAndConnections();
    });

    // Draw points and connections on the canvas
    function drawPointsAndConnections() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);

        // Draw connections
        for (const connection of connections) {
            drawLine(connection.from.x, connection.from.y, connection.to.x, connection.to.y, 'red');
        }

        // Draw points
        for (const point of points) {
            drawPoint(point.x, point.y, points.indexOf(point) + 1);
        }
    }

    // Draw a point on the canvas
    function drawPoint(x, y, number) {
        context.beginPath();
        context.arc(x, y, 15, 0, Math.PI * 2);
        context.fillStyle = "#6B3E9B"; // Dark purple color
        context.fill();

        context.fillStyle = "#FFFFFF"; // White color for the number
        context.font = "25px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(number, x, y);

    }

    // Draw a line on the canvas
    function drawLine(x1, y1, x2, y2, color) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = color;
        context.lineWidth = 5;
        context.stroke();
    }

    // Draw temporary dashed line while moving the mouse
    function drawTempLine(x1, y1, x2, y2, color) {
        const dashLength = 1; // Length of each dash
        const dashGap = 3; // Length of the gap between dashes

        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        const numDashes = Math.floor(Math.sqrt(deltaX ** 2 + deltaY ** 2) / (dashLength + dashGap));

        context.beginPath();
        for (let i = 0; i < numDashes; i++) {
            const startX = x1 + (deltaX / numDashes) * i;
            const startY = y1 + (deltaY / numDashes) * i;
            const endX = x1 + (deltaX / numDashes) * (i + 1) - dashGap / 2;
            const endY = y1 + (deltaY / numDashes) * (i + 1) - dashGap / 2;

            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
        }

        context.strokeStyle = color;
        context.lineWidth = 5;
        context.stroke();
    }


    // Find the clicked point at the given coordinates
    function findClickedPoint(x, y) {
        for (const point of points) {
            const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
            if (distance <= 15) {
                return point;
            }
        }
        return null;
    }

    // Generate the file content with points and connections
    function generateFileContent() {
        const data = points.map((point, index) => ({
            id: `P${index + 1}`,
            x: point.x.toFixed(2),
            y: point.y.toFixed(2),
            connections: getConnectedPoints(index)
        }));

        return JSON.stringify(data, null, 2); // Convert to JSON string with 2 spaces indentation
    }

    // Get all the points connected to the given point
    function getConnectedPoints(index) {
        const connectedPoints = [];

        for (const connection of connections) {
            if (points.indexOf(connection.from) === index) {
                connectedPoints.push(points.indexOf(connection.to) + 1);
            } else if (points.indexOf(connection.to) === index) {
                connectedPoints.push(points.indexOf(connection.from) + 1);
            }
        }

        return connectedPoints.join(", ");
    }

    // Save button click event handler
    saveButton.addEventListener('click', () => {
        const content = generateFileContent();
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'points.json';
        link.click();

        URL.revokeObjectURL(url);
    });

});
