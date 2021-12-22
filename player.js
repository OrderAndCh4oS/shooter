class Player {
    id = 0;
    kills = 0;
    position = null;
    velocity = null;
    thrust = null;
    thrusting = false;
    thrustPower = 0;
    speed = 0.1;
    turningSpeed = 1;
    angle = 0;
    direction = 'left';
    colour = '#1d1d23';
    darkColour = '#1d1d23';
    friction = 1;

    constructor(x, y, speed, turningSpeed, angle) {
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.velocity.length = 0;
        this.velocity.angle = 1;
        this.speed = speed;
        this.turningSpeed = turningSpeed;
    }

    update() {
        this.velocity.multiplyBy(this.friction);
        this.position.addTo(this.velocity);
        this.updateThrust();
        this.accelerate(this.thrust);
        console.log(this.angle)
        console.log(this.position)
    }

    updateThrust() {
        this.thrust = new Vector(0, 0);
        if(this.isThrusting()) {
            this.thrust.length = this.speed * this.thrustPower;
        } else {
            this.thrust.length = 0;
        }
        this.thrust.angle = this.angle;
    }

    accelerate(acceleration) {
        this.velocity.addTo(acceleration);
    }

    draw(context, isDarkMode) {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        if(this.thrusting) {
            context.moveTo(-10, 0);
            context.lineTo(-15, 0);
        }
        context.strokeStyle = isDarkMode ? this.darkColour : this.colour;
        context.stroke();
        context.fillStyle = isDarkMode ? this.darkColour : this.colour;
        context.fill();
        context.font = '11px Verdana';
        context.fillText(this.kills, -12, -12);
        context.fillStyle = '#000';
        context.fillText(this.id, -7, 5);
        context.setTransform(1, 0, 0, 1, 0, 0);
    }

    angleTo(p2) {
        return Math.atan2(
            p2.position.y - this.position.y,
            p2.position.x - this.position.x
        );
    }

    distanceTo(p2) {
        const dx = p2.position.x - this.position.x,
            dy = p2.position.y - this.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    incrementAngle(increment) {
        this.angle += increment;
    }

    startThrusting(thrustPower) {
        console.log('Thrust');
        this.thrustPower = thrustPower;
        this.thrusting = true;
    }

    stopThrusting() {
        this.thrustPower = 0;
        this.thrusting = false;
    }

    isThrusting() {
        return this.thrusting;
    }

    turnLeft() {
        console.log('Turn Left');
        const turn = this.turningSpeed;
        this.incrementAngle(-turn);
    }

    turnRight() {
        console.log('Turn Right');
        const turn = this.turningSpeed;
        this.incrementAngle(turn);
    }
}
