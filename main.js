const TAU = Math.PI * 2;

let canvas = document.getElementById('canvas'),
    fpsInterval,
    now,
    elapsed,
    then,
    startTime,
    fps = 24,
    play = true,
    iteration = 0,
    throttled = false,
    timeout = null,
    centre,
    width,
    height,
    diagonalLength,
    valueMod,
    margin,
    length,
    context = canvas.getContext('2d'),
    events = [],
    player
;

width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
const colourIndex = ~~map(fxrand(), 0, 1, 0, colours.length, 1, Ease.EASE_OUT);
const colourSet = colours[colourIndex];
let selectedColours = shuffle(colourSet.colours);
const isDarkMode = fxrand() > 0.5;
const isBlackAndWhite = fxrand() > 0.99;
const isColourBackground = isBlackAndWhite && fxrand() > 0.85;
let background = isColourBackground
    ? selectedColours[0]
    : isDarkMode
        ? colourSet.black
        : colourSet.white;

player = new Player(width / 2, height - 100, 1, 0.1, 0);
controls = new Controls();

if(isBlackAndWhite) {
    selectedColours = [colourSet.white, colourSet.black];
}

window.$fxhashFeatures = {
    'Colour': colourSet.name,
    'Black & White': isBlackAndWhite,
    'Mode': isColourBackground ? 'Colour' : isDarkMode ? 'Dark' : 'Light',
};

window.onclick = function(event) {
    initialise();
    update();
};

window.onkeyup = function(e) {
    if(e.code === 'Space') {
        play = !play;
    }
};

window.onresize = function() {
    clearTimeout(timeout);
    timeout = setTimeout(resizeHandler, 100);
    if(throttled) return;
    resizeHandler();
    throttled = true;
    setTimeout(function() {
        throttled = false;
    }, 250);
};

window.onload = function() {
    initialise();
    startAnimating();
};

function resizeHandler() {
    initialise();
    update();
}

function initialise() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    diagonalLength = Math.sqrt(width * width + height * height);
}

function startAnimating() {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    render();
}

function update() {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
    if(controls.w) {
        player.startThrusting(1);
    } else {
        if(player.isThrusting()) player.stopThrusting();
    }
    if(controls.a) {
        player.turnLeft();
    }
    if(controls.d) {
        player.turnRight();
    }
    if(controls.space) {
        // fire
    }
    player.update();
    player.draw(context, isDarkMode)
}

function render() {
    requestAnimationFrame(render);
    now = Date.now();
    elapsed = now - then;
    if(elapsed <= fpsInterval) return;
    then = now - (elapsed % fpsInterval);
    if(!play) return;
    update();
    iteration++;
}

function shuffle(arr) {
    let randomizedArray = [];
    let array = arr;
    while(array.length !== 0) {
        let rIndex = Math.floor(array.length * fxrand());
        randomizedArray.push(array[rIndex]);
        array.splice(rIndex, 1);
    }
    return randomizedArray;
}
