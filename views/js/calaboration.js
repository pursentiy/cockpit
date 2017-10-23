/***********************************************************************************************/
//Серверная часть

var obj = {};
var data, dataCOM, select = document.getElementById("example-select"), checkingCOM = false, data = {}, speedInput = document.getElementById("speed-input");
var roll, cockpitNum = [];
var scanTest = {}, click = 1;
var socket = io(); 
var scan = document.getElementById("scan"), timer;

scanTest.test = 'check'
scanTest.number = 1;

$(function(){
  scan.onclick = function(){
    alert('test');
    if(click<=6){
      $.ajax({
        type: 'POST',
        data: JSON.stringify(scanTest),
        contentType: 'application/json', 
        url: "http://localhost:3000",
        success: function(data) {
          console.log('sucsess');
        //console.log(data);
      }
    });




     
      click++;
       scanTest.number = click;
      timer = setTimeout(function() {
        if( click==7){
          clearInterval(timer);
          let li = document.getElementsByClassName('item1');
          li[0].style.color = '#f5962e';
          alert("Калибровка завершена")
        } 
        else alert("положите датчик в положение " + click + " и нажмите на кнопку 'Click me'");
      }, 6000);
    }
  }




});

$(function(){

  $('#clickCalaboration').click(function(){
    $('.wrapper').toggleClass('open_settings');
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json', 
      url: "http://localhost:3000",
      success: function(data) {
        console.log('sucsess');
        //console.log(data);
      }
    });






    socket.on('input', function(angles){ 
      console.log(angles)
    });

    alert("положите датчик в положение " + click + " и нажмите на кнопку 'Click me'");


  });

  $('.circleButton').on('click',function(){ 


    $('.wrapper').toggleClass('open_settings');

  });

  $('.proMode').on('click',function(){ 
    if($(this).is(":checked")) { $('.additionalSett').toggleClass('onDisplay') }
      else {$('.additionalSett').toggleClass('onDisplay')}
    });


});

var xhrReq = new XMLHttpRequest();
xhrReq.open('GET', 'COM.json', true);
xhrReq.send(null);
xhrReq.onreadystatechange = function() {
  if(this.status == 200) {
    console.log(xhrReq.responseText);
    dataCOM = JSON.parse(xhrReq.responseText);
    if(!checkingCOM){
      for (let i = 0; i<dataCOM.portsNum.length; i++){
        select.options[select.options.length] = new Option(dataCOM.portsNum[i], dataCOM.portsNum[i]);
        data.COM = dataCOM.portsNum[0];
        checkingCOM = true;
      }
    };
  }

};

select.onchange = function() {
  data.COM = select.value;
};

speedInput.onchange = function() {
  data.Input = speedInput.value;
};

Turn1.onchange = function(){
  cockpitNum[0] = Turn1.value + 1;
};

Turn2.onchange = function(){
  cockpitNum[1] = Turn2.value + 1;
};

Head1.onchange = function(){
  cockpitNum[2] = Head1.value + 1; 
};

Art1.onchange = function(){
  cockpitNum[3] = Art1.value - 1; 
};

Art2.onchange = function(){
  cockpitNum[4] = Art2.value - 1;
};


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
};



function listCheck(){}
