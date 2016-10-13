function setup(){
  $('#make-function').on('click', function(){
    let priv = !!parseInt($('#priv').val());
    const paths = parseInt($('#paths').val());
    const tested = parseInt($('#tested').val());;
    makeFunction(priv, paths, tested);
  });
  //globals
  x = 200;
  y = 200;
  privateDonut = 40;
  const canvas = document.getElementById('canvas');
  context = canvas.getContext('2d'); //intentionally gloabal
  context.lineWidth = 10;
  //draw();
}
function drawPrivateWrapper(x, y, size){
  context.beginPath();
  context.arc(x, y, size + privateDonut, 0, Math.PI * 2, true);
  context.fillStyle = 'grey';
  context.fill();
  context.strokeStyle = 'black';
  context.stroke();
}

function drawCircle(x, y, size){
  context.beginPath();
  context.arc(x, y, size, 0, Math.PI * 2);
  context.fillStyle = 'white';
  context.strokeStyle = 'black'
  context.stroke();
  context.fill();
}

function drawFourCodePaths(x, y, size, tested){
  context.beginPath();
  context.arc(x,y, size, 0, Math.PI*2);
  context.fillStyle = 'white';
  context.strokeStyle = 'black'
  context.fill();
  context.stroke();

  context.beginPath();
  context.lineTo(x,y-size);
  context.lineTo(x,y+size);
  context.stroke();
  context.beginPath();
  context.lineTo(x-size,y);
  context.lineTo(x+size,y);
  context.strokeStyle = 'black'
  context.stroke();

  if(tested > 0){
    context.beginPath();
    context.lineTo(x,y);
    context.arc(x,y,size, -Math.PI, -Math.PI/2,  false);
    context.lineTo(x,y);
    context.StrokeStyle = 'black';
    context.fillStyle = 'gray';
    context.fill();
    context.stroke();
  }
  if(tested > 1){
    context.beginPath();
    context.lineTo(x,y);
    context.arc(x,y,size, -Math.PI, 0,  false);
    context.lineTo(x,y);
    context.StrokeStyle = 'black';
    context.fillStyle = 'gray';
    context.lineTo(x,y-size);
    context.lineTo(x,y+size);
    context.fill();
    context.stroke();
  }
  if(tested > 2){

    context.beginPath();
    context.lineTo(x,y);
    context.arc(x,y,size, Math.PI/2, 0,  false);
    context.lineTo(x,y);
    context.StrokeStyle = 'black';
    context.fillStyle = 'gray';
    context.fill();
    context.stroke();
    context.beginPath();
    context.lineTo(x,y-size);
    context.lineTo(x,y+size);
    context.lineTo(x,y);
    context.lineTo(x-size,y);
    context.lineTo(x+size,y);
    context.stroke();
  }

  if(tested > 3){
    context.beginPath();
    context.arc(x,y, size, 0, Math.PI*2);
    context.fillStyle = 'gray';
    context.strokeStyle = 'black'
    context.fill();
    context.moveTo(x,y);
    context.lineTo(x,y-size);
    context.lineTo(x,y+size);
    context.moveTo(x,y);
    context.lineTo(x-size,y);
    context.lineTo(x+size,y);
    context.stroke();

  }
}
function drawThreeCodePaths(x, y, size, tested){
  context.beginPath();
  context.arc(x,y, size, 0, Math.PI*2);
  context.fillStyle = 'white';
  context.strokeStyle = 'black'
  context.fill();
  context.stroke();

  if(tested > 0){
    context.beginPath();
    context.lineTo(x,y-size);
    context.lineTo(x,y);
    context.arc(x,y,size,  Math.PI/6, Math.PI - Math.PI/6,  false);
    context.lineTo(x,y);
    context.StrokeStyle = 'black';
    context.fillStyle = 'gray';
    context.fill();
    context.stroke();
  }
  if(tested > 1){
    context.beginPath();
    context.arc(x,y, size, 0, Math.PI*2);
    context.fillStyle = 'gray';
    context.strokeStyle = 'black'
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineTo(x,y-size);
    context.lineTo(x,y);
    context.arc(x,y,size,  Math.PI/6, Math.PI - Math.PI/6,  false);
    context.lineTo(x,y);
    context.StrokeStyle = 'black';
    context.fillStyle = 'white';
    context.fill();
    context.stroke();

  }
  if(tested > 2){
    context.beginPath();
    context.arc(x,y, size, 0, Math.PI*2);
    context.fillStyle = 'gray';
    context.strokeStyle = 'black'
    context.fill();
    context.stroke();

    context.beginPath();
    context.lineTo(x,y-size);
    context.lineTo(x,y);
    context.arc(x,y,size,  Math.PI/6, Math.PI - Math.PI/6,  false);
    context.lineTo(x+size,y);
    context.lineTo(x-size,y);
    context.StrokeStyle = 'black';
    context.fillStyle = 'grey';
    context.fill();
    context.stroke();
  }
}

function drawTwoCodePaths(x, y, size, tested){
  context.beginPath();
  context.arc(x,y, size, 0, Math.PI*2);
  context.fillStyle = 'white';
  context.strokeStyle = 'black'
  context.fill();
  context.stroke();

  if(tested > 0){
    context.beginPath();
    context.arc(x,y, size, Math.PI/2, - Math.PI/2);
    context.fillStyle = 'grey';
    context.strokeStyle = 'black'
    context.fill();
    context.stroke();
  }
  if(tested > 1){
    context.beginPath();
    context.arc(x,y, size, -Math.PI/2, Math.PI/2);
    context.fillStyle = 'grey';
    context.strokeStyle = 'black'
    context.fill();
    context.stroke();
  }
  context.beginPath();
  context.moveTo(x, y-size);
  context.lineTo(x, y+size);
  context.stroke();
}

function drawOneCodePath(x, y, size, tested){
  context.beginPath();
  context.arc(x,y, size, 0, Math.PI*2);
  context.strokeStyle = 'black'
  if(tested === 1){
    context.fillStyle = 'grey';
  }else{
    context.fillStyle = 'white';
  }
  context.fill();
  context.stroke();
}

function drawPaths(x, y, size, codePaths, tested){
  drawCircle(x, y, size);
  if(codePaths === 1){
    drawOneCodePath(x, y, size, tested);
  } else if(codePaths === 2){
    drawTwoCodePaths(x, y, size, tested);
  } else if(codePaths === 3){
    drawThreeCodePaths(x, y, size, tested);
  } else if(codePaths === 4){
    drawFourCodePaths(x, y, size, tested);
  }
}
function drawFunction(x, y, size, priv = false, codePaths = 1, tested = 0){
  if(priv){
    drawPrivateWrapper(x, y, size);
    drawPaths(x, y, size, codePaths, tested);
  }else{
    drawPaths(x, y, size + privateDonut, codePaths, tested);
  }
};
function makeFunction(priv, paths, tested){
  drawFunction(x, y, 90, priv, paths, tested);
}

function draw(){
  makeFunction(false, 3, 2);
};

