function setup(){
  $('#make-function').on('click', setAndMake);
  $('#priv').on('change', setAndMake);
  $('#paths').on('change', setAndMake);
  $('#tested').on('change', setAndMake);
  $('#inputTypes').on('keyup', setAndMake);
  $('#implicit').on('keyup', setAndMake);
  $('#curried').on('change', setAndMake);
  $('#fname').on('keyup', setAndMake);
  $('#lines').on('change', setAndMake);
  $('#lines').on('keyup', setAndMake);
  $('#nonLocal').on('keyup', setAndMake);
  $('#returnValue').on('keyup', setAndMake);
  $('#sideEffectDescription').on('keyup', setAndMake);
  $('#viewAsImage').on('click', viewPicture);
  //globals
  x = 300;
  y = 300;
  privateDonut = 40;
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d'); //intentionally global
  context.lineWidth = 10;
  setAndMake();
};
function viewPicture(){
  //var image = canvas.toDataURL("image/png");
  var image = canvas.toDataURL("image/png");
  window.location.href = image;
}

function setAndMake(){
  context.clearRect(0, 0, 800, 800);
  let priv = parseInt($('#priv').val());
  const paths = parseInt($('#paths').val());
  const tested = parseInt($('#tested').val());
  const implicit = $('#implicit').val();
  const curried = parseInt($('#curried').val());
  const fname = $('#fname').val();
  const lines = parseInt($('#lines').val());
  const returnValue = $('#returnValue').val();
  const nonLocal = $('#nonLocal').val();
  const inputTypes = $('#inputTypes').val();
  const sideEffectDescription = $('#sideEffectDescription').val();
  makeFunction(priv, paths, tested, implicit, curried, fname, lines, returnValue, inputTypes, sideEffectDescription, nonLocal);
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

function makeCross(x, y, size){
  context.beginPath();
  context.moveTo(x, y-size);
  context.lineTo(x, y+size);
  context.moveTo(x-size, y);
  context.lineTo(x+size, y);
  context.stroke();
}
function drawFourCodePaths(x, y, size, tested){
  startCleared(x, y, size);
  if(tested > 0){
    drawFilledArc(x, y, size, Math.PI, Math.PI*3/2);
  }
  if(tested > 1){
    drawFilledArc(x, y, size, Math.PI*3/2, 0);
  }
  if(tested > 2){
    drawFilledArc(x, y, size, Math.PI/2, Math.PI);
  }
  if(tested > 3){
    drawFilledArc(x, y, size, 0, Math.PI/2);
  }
  makeCross(x, y, size);
}

function makePeaceSign(x, y, size){
  context.beginPath();
  context.moveTo(x, y-size);
  context.lineTo(x, y);
  context.lineTo(x+0.86602*size, y+0.5*size);
  context.lineTo(x, y);
  context.lineTo(x-0.86602*size, y+0.5*size);
  context.lineTo(x, y);
  context.stroke();
}
function drawThreeCodePaths(x, y, size, tested){
  startCleared(x, y, size);
  if(tested > 0){
    drawFilledArc(x, y, size, Math.PI*5/6, Math.PI*3/2);
  }
  if(tested > 1){
    drawFilledArc(x, y, size, Math.PI*5/6, Math.PI/6);
  }
  if(tested > 2){
    drawFilledArc(x, y, size, Math.PI/6, Math.PI*5/6);
  }
  makePeaceSign(x, y, size);
}
function drawFilledArc(x, y, size, begin, end, arcThroughCenter=true){
  context.beginPath();
  if(arcThroughCenter){
    context.lineTo(x, y);
  }
  context.arc(x, y, size, begin, end);
  context.fillStyle = 'grey';
  context.strokeStyle = 'black'
  context.fill();
  context.stroke();
}

function startCleared(x, y, size){
  context.beginPath();
  context.arc(x,y, size, 0, Math.PI*2);
  context.fillStyle = 'white';
  context.strokeStyle = 'black'
  context.fill();
  context.stroke();
}

function makeVerticalLine(x, y, size){
  context.beginPath();
  context.moveTo(x, y-size);
  context.lineTo(x, y+size);
  context.stroke();
}
function drawTwoCodePaths(x, y, size, tested){
  startCleared(x, y, size);
  if(tested > 0){
    drawFilledArc(x, y, size, Math.PI/2, - Math.PI/2);
  }
  if(tested > 1){
    drawFilledArc(x,y, size, -Math.PI/2, Math.PI/2);
  }
  makeVerticalLine(x, y, size);
}

function drawOneCodePath(x, y, size, tested){
  startCleared(x, y, size);
  if(tested > 0){
    drawFilledArc(x, y, size, 0, Math.PI*2, false);
  }
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
function drawInputs(x, y, size, inputs){
  if(inputs > 0){
    context.lineWidth = 3;
    for(let index=0; index < inputs; index++){
      context.beginPath();
      context.moveTo(x, y-size);
      context.lineTo(x-size/2+index*(size/(inputs-0.99999)), y-size*2);
      context.stroke();
    }
    context.lineWidth = 10;
  }
}
function drawCurried(x, y, size){
  context.beginPath();
  context.arc(x,y-size-40, size/4, 0, Math.PI*2);
  context.fillStyle = 'white';
  context.strokeStyle = 'black'
  context.stroke();
  context.fill();
}

//function drawImplicitInput(x, y, size){
  //context.lineWidth = 3;
  //context.beginPath();
  //const height = 20
  //const width = 85

  //const startingX = x-size-width-80;
  //const startingY = y+height/2;
  //const endingX = x-size - 80;
  //const endingY = y-height/2;
  //const cp1y = y-height*3
  //const cp2y = y+height*3
  //const cp1x = startingX+width*2/3
  //const cp2x = startingX+width/3
  //context.moveTo(startingX, y);
  //context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endingX, endingY);
  //context.moveTo(x - size-50, y-7)
  //context.lineTo(x - size-80, y-27)
  //context.moveTo(x - size-50, y-7)
  //context.lineTo(x - size-80, y+13)
  //context.stroke();
  //context.lineWidth = 10;
//}
function drawImplicitInput(x, y, size, thisType){
  context.clearRect(x-size-200, y, 20, 40);
  if(thisType.length > 0){
    context.fillStyle = 'black';
    context.font = "24px serif";
    context.fillText(thisType+ ' ~>', x-size-200, y);
  }
}
function drawLabel(x, y, size, fname='anon', lines=0){
  context.beginPath();
  var cornerX = x-size-200
  var cornerY = y-210;
  context.rect(cornerX, cornerY, 200, 100);
  context.stroke();
  context.fillStyle = 'black';
  context.font = "24px serif";
  if(lines===0){
    if(fname){
      context.fillText(fname, cornerX+12, y-180);
    }
    context.fillText(lines + " lines", cornerX+12, y-140);
  } else if(lines===1){
    if(fname){
      context.fillText(fname, cornerX+12, y-180);
    }
    context.fillText(lines + " line", cornerX+12, y-140);
  }else if(lines>1){
    if(fname){
      context.fillText(fname, cornerX+12, y-180);
    }
    context.fillText(lines + " lines", cornerX+12, y-140);
  }else{
    context.fillText(fname, cornerX+12, y-180);
  }
}

function drawReturnValue(x, y, size, returnValue){
  context.beginPath();
  context.ellipse(x, y+size*1.8, size*2, size, 0, 0, 2 * Math.PI);
  context.stroke();
  context.fillStyle = 'black';
  context.font = "24px serif";
  context.fillText(returnValue, x-size+30, y+size+95);
};

function drawInputTypes(x, y, size, inputTypes, asTypeSignature = false){
  context.clearRect(x-size-150, y-size-150, 300, 10);
  context.beginPath();
  context.fillStyle = 'black';
  context.font = "24px serif";
  //const fname = $('#fname').val();
  //if(asTypeSignature && fname.length && $('#returnValue').val().length){
    //const returnVal =  ' ->  ' + $('#returnValue').val();
    //const implicit = $('#implicit').val() + '#';
    //prepend = implicit + fname + ' :: ';
    //const typeSignature = prepend + inputTypes.split(' ').join(' -> ') + returnVal;
    //context.fillText(typeSignature, x-size-200, y-size-150);
  //}else{
    context.fillText(inputTypes, x-size-100, y-size-150);
  //}
    //
    //
  if(inputTypes.length){
    var inputs = inputTypes.split(',').length
  }else{
    var inputs = 0;
  }
  drawInputs(x, y-45, size, inputs);
}
function drawSideEffects(x, y, size, sideEffectDescription, returnValue){
  context.beginPath();
  context.strokeStyle = "black";
  context.moveTo(x, y+size+ 130);
  context.lineTo(x+60, y+size+190);
  context.lineTo(x, y+size+250);
  context.lineTo(x-60, y+size+190);
  context.moveTo(x, y+size+ 130);
  context.fillText(sideEffectDescription,x-200, y+size+280);
  context.fill();
  if(returnValue.length){
    drawReturnValue(x, y, size, returnValue);
  }else{
    drawReturnValue(x, y, size, '  undefined');
  }
}
function drawNonLocal(x, y, size, nonLocal){
  context.beginPath();
  context.fillStyle = "black";
  context.rect(x+115, y-size-60, 180, 216);

  context.lineWidth = 4;
  context.setLineDash([4, 4]);
  context.lineDashOffset = 2;
  //context.lineTo(x-size-100, y-size-70);
  context.stroke();
  context.lineDashOffset = 0;
  context.setLineDash([]);
  context.lineWidth = 10;
  nonLocal.split(',').forEach((input, index) => {
    context.fillText(input,x+140, y-size-33+index*25);
  });
}
function makeFunction(priv, paths, tested, implicit, curried, fname, lines, returnValue, inputTypes, sideEffectDescription, nonLocal){
  const size = 90;
  drawImplicitInput(x, y, size, implicit);
  if(fname.length || lines){
    drawLabel(x, y, size, fname, lines);
  }
  if(returnValue.length){
    drawReturnValue(x, y, size, returnValue);
  }
  if(nonLocal.length){
    drawNonLocal(x, y, size, nonLocal);
  }
  if(sideEffectDescription.length){
    drawSideEffects(x, y, size, sideEffectDescription, returnValue);
  }
  drawFunction(x, y, size, priv, paths, tested);
  if(curried){
    drawInputTypes(x, y, size, inputTypes, true);
    drawCurried(x, y, size, curried);
  }else{
    drawInputTypes(x, y, size, inputTypes);
  }
}
