//Finds the canvas element
var canvas = document.getElementById("waves");

//Adjusts the canvas to fit the whole screen
canvas.width = 1000;
canvas.height = 500;

//Retrieves the 2d library
var context = canvas.getContext('2d');

//Prints out width and height to console
console.log(context);

//Creates a Wave object
function Wave(amplitude, period){
  this.startAngle = 0;
  this.amplitude = amplitude;
  this.period = period;
  this.angleVel = (2*Math.PI / this.period) * 6;//the calculated angle

  //Draws the wave object
  this.draw = function(){
    var angle = this.startAngle;//stores the starting angle
    context.fillStyle = 'white';//Has a white fill
    context.strokeStyle ="white";//Has a white stroke

    // for (var x = 0; x <= canvas.width-canvas.width/4; x += 20) {
    //   var y = this.amplitude * Math.sin(angle);
    //   c.beginPath();
    //   c.fillStyle="white";
    //   c.arc(x+canvas.width/10, y+canvas.height/2, 3, 20, 40*Math.PI);
    //   c.fill();
    //   angle += this.angleVel;
    // }

    // for (var x = 0; x <= canvas.width; x += 20) {
    //   var y = this.amplitude * Math.sin(angle);
    //   c.beginPath();
    //   //c.arc(x+canvas.width/10, y+canvas.height/2, 3, 20, 40*Math.PI);
    //   //c.fillRect(x,y+canvas.height/2,10, 10)
    //   c.bezierCurveTo(x, y+canvas.height/2, canvas.width, 0, 0, 0);
    //   c.stroke();
    //   angle += this.angleVel;
    // }
    //

    //For every x position...
    for (var x = 0; x <= canvas.width-canvas.width/4; x += 20) {
      //Calculate the y position according to the formula
      var y = this.amplitude * Math.cos(angle);

      //Starts to draw a belzier curve
      context.beginPath();
      context.bezierCurveTo(x+canvas.width/10, y+canvas.height/2, canvas.width, 0, 0, 0);
      context.stroke();

      //Change the current angle by adding the velocity
      angle += this.angleVel;
    }
  };

  //Updates the Wave
  this.update = function(){
    //Updates the start angle
    this.startAngle += 2*Math.PI / this.period;

    //Prints out every update
    console.log("----------------");
    console.log("amp:"+this.amplitude);
    console.log("period:"+this.period);
    console.log("angleVel:"+this.angleVel);
    console.log("startAngle:"+this.startAngle);
     this.draw();
  };
};

//Animates the wave
function animate(){
  window.requestAnimationFrame(animate);
  context.clearRect(0,0,canvas.width, canvas.height); //Clears the previous canvas
  wave.update();//Updates the wave

}

var wave = new Wave(200, 300);// new wave
animate();//animates the wave
