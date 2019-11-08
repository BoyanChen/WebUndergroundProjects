function Particle(){
    this.pos = createVector(random(innerWidth),random(innerHeight))
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.maxspeed = 0.4;

    this.prevPos = this.pos.copy()

    this.update = function () {
        this.vel.add(this.acc)
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel)
        this.acc.mult(0)
    }

    this.follow = function (vectors) {
        var x = floor(this.pos.x / scl)
        var y = floor(this.pos.y / scl)
        var index = x+y *cols
        var force = vectors[index]
        this.applyForce(force)
    }

    this.applyForce = function(force){
        this.acc.add(force)
    }

    this.show = function () {
        stroke(0,9);
        strokeWeight(2)
        // fill(0)
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
        this.updatePrevs()
    }

    this.updatePrevs = function () {
        this.prevPos.x = this.pos.x
        this.prevPos.y = this.pos.y
    }



    this.edges = function () {
        if(this.pos.x > innerWidth) {
            this.pos.x = 0
            this.updatePrevs()
        }
        if(this.pos.x < 0) {
            this.pos.x = innerWidth
            this.updatePrevs()
        }
        if(this.pos.y > innerHeight) {
            this.pos.y = 0
            this.updatePrevs()
        }
        if(this.pos.y < 0) {
            this.pos.y = innerHeight
            this.updatePrevs()
        }
    }
}
