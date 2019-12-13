//Based on
//http://petewerner.blogspot.co.uk/2015/02/intro-to-curl-noise.html

var ctx = canvas_1.getContext("2d");
var TWO_PI = 2 * Math.PI;

//Flag for x direction flow
var flow = false;
//Number of elements
var discCount;

//setup particles
discCount = 4000;

//Colours from:
//https://krazydad.com/tutorials/makecolors.php
var red = [];
var grn = [];
var blu = [];

var hue;
var saturation;
var lightness;

center = 128;
width = 127;
frequency1 = 0.3;
frequency2 = 0.3;
frequency3 = 0.3;

phase1 = 0;
phase2 = 2;
phase3 = 4;

for (s = 0; s < discCount; s++) {
    red[s] = Math.round(Math.sin(frequency1*s + phase1) * width + center);
    grn[s] = Math.round(Math.sin(frequency2*s + phase2) * width + center);
    blu[s] = Math.round(Math.sin(frequency3*s + phase3) * width + center);
}

//Populate array with stationary discs at random locations
var discs = [];

for(i = 0; i < discCount; i++){
    var style = 'rgba('+red[i]+','+grn[i]+','+blu[i]+', 1)';
    var disc = {
        x: Math.random()*canvas_1.width,
        y: Math.random()*canvas_1.height,
        x_vel: 0,
        y_vel: 0,
        radius: 1,
        colour: style
    };
    discs.push(disc);
}

//Move discs based on velocity and place them back in the domain if they go beyond the boundaries
//For flow, reintroduce discs at the left boundary, otherwise place in a random point
function move() {
    for(i = 0; i < discCount; i++){
        if(discs[i].x < discs[i].radius){
            if(flow){
                discs[i].x = discs[i].radius;
                discs[i].y = Math.random()*canvas_1.height;
            }else{
                discs[i].x = Math.random()*canvas_1.width;
                discs[i].y = Math.random()*canvas_1.height;
            }
        }
        if(discs[i].y < discs[i].radius){
            if(flow){
                discs[i].x = discs[i].radius;
                discs[i].y = Math.random()*canvas_1.height;
            }else{
                discs[i].x = Math.random()*canvas_1.width;
                discs[i].y = Math.random()*canvas_1.height;
            }
        }
        if(discs[i].x > canvas_1.width-discs[i].radius){
            if(flow){
                discs[i].x = discs[i].radius;
                discs[i].y = Math.random()*canvas_1.height;
            }else{
                discs[i].x = Math.random()*canvas_1.width;
                discs[i].y = Math.random()*canvas_1.height;
            }
        }
        if(discs[i].y > canvas_1.height-discs[i].radius){
            if(flow){
                discs[i].x = discs[i].radius;
                discs[i].y = Math.random()*canvas_1.height;
            }else{
                discs[i].x = Math.random()*canvas_1.width;
                discs[i].y = Math.random()*canvas_1.height;
            }
        }
        discs[i].x += discs[i].x_vel;
        discs[i].y += discs[i].y_vel;
    }
}

var noise_ = [];

//Use noise.js library to generate a grid of 2D simplex noise values
try {
    noise.seed(Math.random());
}
catch(err) {
    console.log(err.message);
}

//Find the curl of the noise field based on on the noise value at the location of a disc
function computeCurl(x, y){
    var eps = 0.0001;

    //Find rate of change in X direction
    var n1 = noise.simplex2(x + eps, y);
    var n2 = noise.simplex2(x - eps, y);
    //Average to find approximate derivative
    var a = (n1 - n2)/(2 * eps);

    //Find rate of change in Y direction
    var n1 = noise.simplex2(x, y + eps);
    var n2 = noise.simplex2(x, y - eps);
    //Average to find approximate derivative
    var b = (n1 - n2)/(2 * eps);

    //Curl
    return [b, -a];
}

//The step to start with. See below.
var initial_step;

initial_step = 2500;


//Different values for velocity, colour etc.
var variables = {
    speed: 0.24,
    fade: 0,
    //The step controls the zoom of the noise field. A large value creates bigger vortices, a smaller value leads to more features
    step: initial_step,
    particle_size: 1.5,
    rainbow: false,
    colour: '#548cbc'
}
var reset_button = { reset:function(){
        variables.speed = 0.5;
        variables.step = initial_step;
        variables.particle_size = 1.5;
        variables.rainbow = true;
        variables.fade = 0.0;
        ctx.fillStyle = "rgb(17,27,68)";
        ctx.fillRect(0,0,canvas_1.width, canvas_1.height);
    }};

var clear_button = { clear:function(){
        ctx.fillStyle = "rgb(17,27,68)";
        ctx.fillRect(0,0,canvas_1.width, canvas_1.height);
    }};

var random_button = { random:function(){
        noise_ = [];
        //Use noise.js library to generate a grid of 2D simplex noise values
        try {
            noise.seed(Math.random());
        }
        catch(err) {
            console.log(err.message);
        }
        ctx.fillStyle = "rgb(17,27,68)";
        ctx.fillRect(0,0,canvas_1.width, canvas_1.height);
        variables.speed = 0.1 + Math.random() * 0.9;

        variables.step = Math.round(10 + Math.random() * 590);

        variables.particle_size = 0.1 + Math.random() * 4.9;
        variables.rainbow = false;
        var c = Math.round(Math.random() * discCount);
        variables.colour = 'rgb('+red[c]+','+grn[c]+','+blu[c]+')';

        if(variables.particle_size >= 2){
            variables.fade = Math.random() * 0.1;
        }else{
            variables.fade = Math.random() * 0.01;
        }
    }};

// dat.gui library controls
// var gui = new dat.GUI({ autoPlace: false });
//
// var customContainer = document.getElementById('gui_container');
// customContainer.appendChild(gui.domElement);
//
// gui.add(variables, 'step').min(10).max(2000).step(5).listen().onChange(function(value) { clear_button.clear();});
// gui.add(variables, 'speed').min(0.0).max(1.0).step(0.01).listen();
// gui.add(variables, 'particle_size').min(0.1).max(5).step(0.1).listen();
// gui.add(variables, 'fade').min(0.0).max(1.0).step(0.01).listen();
// gui.addColor(variables, 'colour').listen().onChange(function(value) { variables.rainbow = false;} );
// gui.add(this, 'flow');
// gui.add(random_button,'random');
// gui.add(reset_button,'reset');
// gui.add(clear_button,'clear');
// gui.close();

//
variables.speed = 0.5;
variables.step = 1200;
variables.fade = 0.03       ;
variables.particle_size = 2;
variables.rainbow = false;
variables.colour = '#548CBC';

ctx.fillStyle = "rgba(255,255,255," + variables.fade + ")";
ctx.fillRect(0,0,canvas_1.width, canvas_1.height);

//********************** DRAW **********************
function draw() {
    var d = new Date();
    var mm = d.getMinutes();
    var ss = d.getSeconds();
    var hh = d.getHours();

    lightness = THREE.Math.mapLinear(hh,23,7,70,100);
    saturation = THREE.Math.mapLinear(mm,0,60,40,100);
    hue = THREE.Math.mapLinear(ss,0,60,0,360);

    console.log("time: " + hh + " : " + " : " + mm + " : " + ss);
    console.log("hsl: " + hue + " : " + " : " + saturation + " : " + lightness);

    //Draw over previous frame with a rectangle of variable transparency
    ctx.fillStyle = "rgba(0,0,0, "+variables.fade+")";
    ctx.fillRect(0,0,canvas_1.width, canvas_1.height);

    move();

    //For all discs
    for(i = 0; i < discs.length; i++){
        //Set colour of discs
        if(variables.rainbow){
            ctx.fillStyle = discs[i].colour;
        }else{
                // ctx.fillStyle = variables.colour;
            // ctx.fillStyle = "hsl("+ hue +"," + saturation + "," + lightness +")"
            // ctx.fillStyle = 'hsl('+ 360*Math.random() +',100%,50%)';
            // console.log('worked: hsl('+ 360*Math.random() +',100%,50%)');
            // console.log('mine: hsl('+ hue +','+ saturation + ',' + lightness +')');
            ctx.fillStyle = 'hsl(' + hue +', '+saturation+'%,'+ lightness +'%)';
        }

        //Find the curl of the noise field at the location of the disc (wrt the step)
        var curl = computeCurl(discs[i].x/variables.step, discs[i].y/variables.step);
        //Set the velocity of the discs to the curl
        discs[i].x_vel = variables.speed*curl[0];
        discs[i].y_vel = variables.speed*curl[1];

        if(flow){
            //Add overall velocity in the positive x direction
            discs[i].x_vel += variables.speed*3;
        }

        ctx.beginPath();
        ctx.arc(discs[i].x, discs[i].y, variables.particle_size, 0, TWO_PI);
        ctx.fill();
    }

    window.requestAnimationFrame(draw);
}
draw();