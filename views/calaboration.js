var statusBarCheck = false;
function move() {
  var elem = document.getElementById("myBar");   
  var width = 20;
  var id = setInterval(frame, 100);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      statusBarCheck = true;
      listCheck();

    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1  + '%';
    }
  }
}
var socket = io(); 
socket.on('input', function(angles){ 
  console.log(angles)
}); 

function listCheck(){
  let li = document.getElementsByClassName('item1');
  li[0].style.color = '#f5962e';
}