/***********************************************************************************************/
//Серверная часть

var obj = {};
var data, dataCOM, select = document.getElementById("example-select"), checkingCOM = false, data = {}, speedInput = document.getElementById("speed-input");
var roll, cockpitNum = [];
var socket = io(); 



function SerialPortStart(){
	//var xhr = new XMLHttpRequest();
	//setInterval(function() {
	//	xhr.open('GET', 'cockpit.json', true);
	//	xhr.send();
				/*if (this.readyState != 4) return;
				if( this.status != 200){
					alert ('ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
					return;
				} */
		//		xhr.onreadystatechange = function() {
				//	if(this.status == 200) {

							//	}
				//			}
		//				}, 50);
	};

	socket.on('input', function(angles){ 
		if(angles != 0){
			var data = angles;
			console.log(angles);
			obj = data.split(';');
			if(cockpitNum[3] != null){
				$('header .mainBlock1 .cockpit .elements .blockHaw .cirle').css({
					transform: 'rotate('+(obj[cockpitNum[3]]) +'deg)'
				});	}	
				else{
					$('header .mainBlock1 .cockpit .elements .blockHaw .cirle').css({
						transform: 'rotate('+(obj[0]) +'deg)'
					});
					if(obj[0]>= -28 && obj[0]<=28){
						$('header .mainBlock1 .cockpit .elements .blockPitch .arrow').css({
							transform: 'rotate('+(obj[0]) +'deg)'
						});
					}

				}	
				if(cockpitNum[4] != null){	
					$('header .mainBlock1 .cockpit .elements .blockHaw .background').css({
						top: ((-1)*(+obj[cockpitNum[4]])) + 'px'
					});	}
					else{
						$('header .mainBlock1 .cockpit .elements .blockHaw .background').css({
							top: ((-1)*(+obj[1])) + 'px'
						});
					}
					if(cockpitNum[2] != null){	
						$('header .mainBlock1 .cockpit .elements .blockRoll .background').css({
							transform: 'rotate('+(+(obj[cockpitNum[2]])) +'deg)'
						});}
						else{
							$('header .mainBlock1 .cockpit .elements .blockRoll .background').css({
								transform: 'rotate('+(+obj[2]) +'deg)'
							});

						}
					}

				});

	$(function(){

		$('#click').click(function(){
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

			//SerialPortStart();
		//	valueCounting();

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

var arrayPos1 = [];
var meanResuts = {};
	var xhrReq = new XMLHttpRequest();
	xhrReq.open('GET', 'cal1.json', true);
	xhrReq.send(null);
	xhrReq.onreadystatechange = function() {
		if(this.status == 200) {
			console.log(xhrReq.responseText);
			var test = JSON.parse(xhrReq.responseText);

    //arrayObj.pos1 =  test.split('\r');
    //console.log(test.length);
    for(let i = 0; i < test.length; i++){
    	let buf =  test[i].split(';');
    	let value = buf[0].substring(0,5);
    	meanResuts.X = value;
    }
   // console.log(arrayPos1);
}

};

function positionDedect(){
  console.log('test');
  if(meanResuts.X <= 1.03 && meanResuts.X >= 1){
    console.log('Есть попадание!')
  }
  else console.log(meanResuts.X)
}

positionDedect();


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



/***********************************************************************************************/
//front-end
$(function() {

	var tru = 0;minP=-45, maxP=45, minPC=58, maxPC=99, minH = -95, maxH = 95, click = 0, minV=-15, maxV=34, minHow=0, maxHow=361, val = 0;
	var timerId, timerIdRoll, timerIdHow, timerIdPitch;

	function valueCounting(a){
		if(a==undefined){
			a=1000
		}
		valueA = a;
		console.log(tru);
		
				//clearInterval(timerIdRoll);
		//clearInterval(timerIdHow);
		//clearInterval(timerIdPitch);

		timerIdRoll = setInterval(function() {
			$('header .mainBlock1 .cockpit .elements .blockHaw .cirle').css({
				transform: 'rotate('+(obj[1]) +'deg)'
			});
			$('header .mainBlock1 .cockpit .elements .blockHaw .background').css({
				top: (minV + Math.random() * (maxV - minV)) +'px'
			});
		},200);

		timerIdHow = setInterval(function() {
			$('header .mainBlock1 .cockpit .elements .blockRoll .background').css({
				transform: 'rotate('+(minHow + Math.random() * (maxHow - minHow)) +'deg)'
			});

		},valueA);

		timerIdPitch = setInterval(function() {
			$('header .mainBlock1 .cockpit .elements .blockPitch .arrow').css({
				transform: 'rotate('+(minP + Math.random() * (maxP - minP)) +'deg)'
			});
			$('header .mainBlock1 .cockpit .elements .blockPitch .circle').css({
				left: (minPC + Math.random() * (maxPC - minPC)) +'px'
			});
		},valueA);

	}

//Меню
$('.button_toggle').on('click',function(){
	$('.wrapper').toggleClass('open');
	$('.button_toggle').toggleClass('open');
});

//Вкладка1
$('#first').on('click',function(){
	console.log("Pressed")
	$('header .mainBlock1').css({
		display: "block"
	});
	$('header .mainBlock2').css({
		display: "none"
	});
	$('header .mainBlock3').css({
		display: "none"
	});
	$('header .mainBlock4').css({
		display: "none"
	});
});


//Вкладка 2
$('#second').on('click',function(){
	console.log("Pressed")
	$('header .mainBlock1').css({
		display: "none"
	});
	$('header .mainBlock2').css({
		display: "block"
	});
	$('header .mainBlock3').css({
		display: "none"
	});
	$('header .mainBlock4').css({
		display: "none"
	});
});

//Вкладка 3
$('#third').on('click',function(){
	console.log("Pressed")
	$('header .mainBlock1').css({
		display: "none"
	});
	$('header .mainBlock2').css({
		display: "none"
	});
	$('header .mainBlock3').css({
		display: "block"
	});
	$('header .mainBlock4').css({
		display: "none"
	});
});


//Вкладка 4
$('#fourth').on('click',function(){
	console.log("Pressed")
	$('header .mainBlock1').css({
		display: "none"
	});
	$('header .mainBlock2').css({
		display: "none"
	});
	$('header .mainBlock3').css({
		display: "none"
	});
	$('header .mainBlock4').css({
		display: "block"
	});
});

/*Прерывание по нажатию*/
$('.circleButton').on('click',function(){ 


	$('.wrapper').toggleClass('open_settings');
	
});

$('.proMode').on('click',function(){ 
	if($(this).is(":checked")) { $('.additionalSett').toggleClass('onDisplay') }
		else {$('.additionalSett').toggleClass('onDisplay')}
	});


});

