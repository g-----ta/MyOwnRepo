var canvas;
var ctx;
var mouseX = 232; mouseY = 232;

var balls = [];

function mouse(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
}

function init(){
	document.getElementById("canvas").addEventListener("mousemove", mouse);
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	draw();
}

function draw(){
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle;
	ctx.fillRect(0,0,500,500);
	
	ctx.globalCompositeOperation = "lighter";
	
	for(var i=0; i<10; i++){
		var ball = [];
		
		ball.x = mouseX;
		ball.y = mouseY;
		ball.vx = Math.floor(Math.random() * 10) - 5;
		ball.vy = Math.floor(Math.random() * 10) - 5;
		ball.size = Math.floor(Math.random() *10 ) + 25;

		balls.push(ball);
	}
	
	i = balls.length;
	while(i--){
		ball = balls[i];
		ball.x += ball.vx;
		ball.y += ball.vy;
		ball.vy -= 0.6;
		ball.size -= 1.7;
		
		if(ball.size < 1){
			balls.splice(i,1);
			continue;
		}
		
		ctx.beginPath();
		var edgecolor1 = "hsla(" + (Math.random()*120 + 120) + ",75%,50%,1.0)";
		var edgecolor2 = "hsla(" + (Math.random()*120 + 120) + ",75%,50%,0.0)";
		var gradblur = ctx.createRadialGradient(ball.x,ball.y,0,ball.x,ball.y,ball.size);
		gradblur.addColorStop(0,edgecolor1);
		gradblur.addColorStop(1,edgecolor2);
		ctx.fillStyle = gradblur;
		ctx.arc(ball.x,ball.y,ball.size,0,Math.PI*2,false);
		ctx.fill();
	}
	
	setTimeout(draw, 30);
}


init();