function draw(){
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.fillStyle = "rgb(200,0,0)";
  context.fillRect (10, 10, 50, 50);
  context.lineWidth = 4;

  context.fillStyle = "rgba(0, 0, 200, 0.5)";
  context.fillRect (30, 30, 50, 50);

  context.fillRect(125,25,100,100);
  context.clearRect(145,45,60,60);
  context.strokeRect(150,50,50,50);


  context.beginPath();
  context.moveTo(75,150);
  context.lineTo(100,175);
  context.lineTo(100,125);
  context.fill();


  context.beginPath();
  context.arc(75,75,50,0,Math.PI*2,true); // Outer circle
  context.moveTo(110,75);
  context.arc(75,75,35,0,Math.PI,false);  // Mouth (clockwise)
  context.moveTo(65,65);
  context.arc(60,65,5,0,Math.PI*2,true);  // Left eye
  context.moveTo(95,65);
  context.arc(90,65,5,0,Math.PI*2,true);  // Right eye
  context.stroke();

  const rectangle = new Path2D();
  rectangle.rect(10, 10, 50, 50);
  context.stroke(rectangle);

  context.beginPath();
  context.arc(350, 50, 30, 0, Math.PI * 2, true);
  context.arc(350, 50, 15, 0, Math.PI * 2, true);
  context.fill("evenodd");

 context.save();
 context.moveTo(75,450);
  // blue rect
  context.fillStyle = "#0095DD";
  context.fillRect(30,30, 100, 100);
  context.rotate((Math.PI/180)*25);
  // grey rect
  context.fillStyle = "#4D4E53";
  context.fillRect(30,30, 100, 100);
  context.restore();

  // right rectangles, rotate from rectangle center
  // draw blue rect
  context.fillStyle = "#0095DD";
  context.fillRect(150, 30, 100, 100);
  context.translate(200, 80); // translate to rectangle center
                          // x = x + 0.5 * width
                          // y = y + 0.5 * height
  context.rotate((Math.PI/180)*25); // rotate
  context.translate(-200, -80); // translate back

  // draw grey rect
  context.fillStyle = "#4D4E53";
  context.fillRect(150, 30, 100, 100);


}
