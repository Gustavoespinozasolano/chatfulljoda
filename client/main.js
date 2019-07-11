//var socket= io.connect('http://172.16.3.156:6677',{'forceNew':true});
var socket= io();
socket.on('messages',function(data){
	console.log(data);
	render(data);
});
socket.on('message2',function(data){
	if(data){
		console.log(data);
		$("#message2").append('<p> ' + data.text + '</p>');
		var div_msgs=document.getElementById('message2');
		div_msgs.innerHTML = html;
		div_msgs.scrollTop = div_msgs.scrollHeight;
	}
	
	
});

function render(data){
	var html= data.map(function(message, index){
		return (`
			<div class="message">
				<strong>${message.nickname}</strong> dice:
				<p>${message.text}</p>
				<span>${message.fecha}</span>
			</div>
			`);
	}).join(' ');
	var div_msgs=document.getElementById('message');
	div_msgs.innerHTML = html;
	div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
	var now=new Date();
	var hour=now.getHours(-5);
	var minutes=now.getMinutes();
	var segundos=now.getSeconds();
	var message= {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value,
		fecha: hour+":" + minutes+":" +segundos
			};
	document.getElementById('nickname').style.display = 'none';
	socket.emit('add-message', message);
	document.getElementById('text').value='';
	//alert("New Messagge");
	return false;
}