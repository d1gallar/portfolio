var canvas = document.getElementById("cube");
canvas.width = 1000;
canvas.height = 500;

var context = canvas.getContext("2d");

//console.log(canvas);

//The eight coordinates of the cuboid in matrices
var nodes = [[-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1],
[1, -1, -1], [1, -1, 1], [1, 1, -1], [1, 1, 1]];

//The twelve edges that connect to each node
var edges = [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6],
[6, 4], [0, 4], [1, 5], [2, 6], [3, 7]];

//Scales the cuboid
function scale(scaleX, scaleY, scaleZ) {
  nodes.forEach(function (node) {
    node[0] *= scaleX;
    node[1] *= scaleY;
    node[2] *= scaleZ;
  });
}

function rotateCuboid(degreeX, degreeY) {

  nodes.forEach(function (node) {
    var x = node[0];
    var y = node[1];
    var z = node[2];

    node[0] = x * Math.cos(degreeX) - z * Math.sin(degreeX);
    node[2] = z * Math.cos(degreeX) + x * Math.sin(degreeX);

    z = node[2];

    node[1] = y * Math.cos(degreeY) - z * Math.sin(degreeY);
    node[2] = z * Math.cos(degreeY) + y * Math.sin(degreeY);
  });
}

function drawCuboid() {
  context.save();

  //Clears the existing canvas if any
  context.clearRect(0, 0, canvas.width, canvas.height);

  //Shifts the cuboid to the middle of the canvas
  context.translate(canvas.width / 2, canvas.height / 2);

  //Starts the drawing with a white stroke
  context.strokeStyle = "white";
  context.beginPath();

  //Goes through each edge and finds the coordinate and the edge
  edges.forEach(function (edge) {
    //Finds the two coordinates
    var pointOne = nodes[edge[0]];
    var pointTwo = nodes[edge[1]];

    //Draws the edge between both points
    context.moveTo(pointOne[0], pointOne[1]);
    context.lineTo(pointTwo[0], pointTwo[1]);
  });

  //Stops the drawing
  context.closePath();
  context.stroke();
  context.restore();
}

//Scales the cuboid by 100
scale(100, 100, 100);

//Rotates the cuboid 90 degrees
rotateCuboid(Math.PI / 4, 1);

//Sets a specific interval to update the cuboid's rotation
setInterval(function() {
  rotateCuboid(Math.PI / 180, 0);
  drawCuboid();
}, 17);
