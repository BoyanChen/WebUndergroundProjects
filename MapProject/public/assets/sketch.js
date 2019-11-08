var inc = 0.01;
var scl = 20;
var cols,rows;
//Time Axis
var zOff = 0
//Frame Rate
var fr = 60;

//import particle array
var particles = []
var amount = 100;

var flowField = []
function setup() {
    createCanvas(1080, 1920);
    frameRate(fr)

    cols = floor(innerWidth / scl)
    rows = floor(innerHeight / scl)
    pixelDensity(1);
    // city_limit = getBoundingBox(boundary);
    for(var i = 0; i<amount ; i++){
        particles[i] = new Particle()
    }

    flowField = new Array(cols*rows)
    background(255)
}

function draw() {

    // background(255)
    var yOff = 0;
    for (var y = 0; y < rows; y++){
        var xOff=0;
        for (x = 0; x < cols ; x++){
            var index = x + y * cols
            var r = noise(xOff, yOff,zOff)
            var angle = r * TWO_PI * 2
            var color = r *4
            var v = p5.Vector.fromAngle(angle)
            v.setMag(0.08)
            flowField[index] = v
            xOff += inc


            // stroke(0)
            // strokeWeight(2)
            // push()
            // translate(x * scl, y * scl)
            // rotate(v.heading())
            // line(0,0,scl,0)
            // pop()

            // push()
            // translate(x*scl, y*scl)
            // fill(color*50,color*130,color*60)
            // noStroke()
            // rect(x,y,21,21)
            // pop()

        }
        yOff += inc;
        zOff += 0.001
        for (var i = 0; i<particles.length; i++){
            particles[i].follow(flowField)
            particles[i].update()
            particles[i].edges()
            particles[i].show()

        }

    }
}