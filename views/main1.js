
var data, dataCOM, select = document.getElementById("example-select"), checkingCOM = false, data = {}, speedInput = document.getElementById("speed-input");

function SerialPortStart(){
	console.log("start");
	var xhr = new XMLHttpRequest();
	var div = document.createElement('div');
	document.body.appendChild(div);
	setInterval(function() {
		xhr.open('GET', 'cockpit.json', true);
		xhr.send();
				/*if (this.readyState != 4) return;
				if( this.status != 200){
					alert ('ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
					return;
				} */
				xhr.onreadystatechange = function() {
					if(this.status == 200) {
						var data = JSON.parse(xhr.responseText);
						
						div.innerHTML = data.thermodata;
						

					}
				}
			}, 200);
};

$(function(){

	$('#click').click(function(){
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json', 
			url: "http://localhost:9380",
			success: function(data) {
				console.log('sucsess');
				console.log(data);
			}

		});
		SerialPortStart();
	});

	$('#COM').click(function(){
		var xhrReq1 = new XMLHttpRequest();
		xhrReq1.open('GET', 'test.json', true);
		xhrReq1.send(null);
		xhrReq1.onreadystatechange = function() {
			if(this.status == 200) {
				console.log(xhrReq1.responseText);
				dataCOM = xhrReq1.responseText;
			}
			
		};
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
