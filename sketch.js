


const setBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
  color.innerHTML = "#" + randomColor;
}

genNew.addEventListener("click", setBg);
setBg();





//meditation 
window.onload = function () {

  var pCircle = document.getElementsByClassName('pulser-wrap');
  console.log("pCircle is " + pCircle[0]);
  var pSelect = document.getElementById('s1');
  console.log("pSelect is " + pSelect);

  $('#s1').on('input', function () {
    var pDuration = $(this).val() + "s";
    $("#pWrap").css("animation-duration", pDuration);
  });

};

//draw
let clr
let socket
function setup() {
	createCanvas (800,800)
	socket = io.connect('http://localhost:3000')
  socket.on('mouse', newDrawing);
  background(0);
  clr = random(360)
  noStroke()
}


function displayDot(x, y, color, color2 = 100){
	colorMode(HSB)
	fill(color, 100, color2)
	ellipse(x, y, 50)
	colorMode(RGB)
}

function draw() {
}
function mousePressed(){
	mouseDragged()
}
function mouseDragged() {
	clr += 1
	clr = upgradeColor(clr)
	let data = {
		x: mouseX,
		y: mouseY,
		color: clr
	}
	socket.emit('mouse', data);
	console.log('sending:', mouseX +',', mouseY +',', clr)
	noStroke()
	displayDot(mouseX, mouseY, clr)
}

function newDrawing(data){
	data.color = upgradeColor(data.color)
	displayDot(data.x, data.y, data.color, 30)
}

function upgradeColor(c){
	if (c < 0){
		c = 360 - c
	} else if(c > 360){
		c = c % 360
	}
	return c
}




