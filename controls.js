class Controls {
    _controlState = {
        w: false,
        s: false,
        a: false,
        d: false,
        space: false
    };

    constructor() {
        this._keyDownEventListener = document.onkeydown = this.keyDownEventListener;
        this._keyUpEventListener = document.onkeyup = this.keyUpEventListener;
    }

    get w() {
        return this._controlState.w;
    }

    get s() {
        return this._controlState.s;
    }

    get a() {
        return this._controlState.a;
    }

    get d() {
        return this._controlState.d;
    }

    get space() {
        return this._controlState.space;
    }

    keyDownEventListener = (event) => {
        switch(event.code) {
            case 'KeyW':
                this._controlState.w = true;
                break;
            case 'KeyS':
                this._controlState.s = true;
                break;
            case 'KeyA':
                this._controlState.a = true;
                break;
            case 'KeyD':
                this._controlState.d = true;
                break;
            case 'Space':
                this._controlState.space = true;
                break;
            default:
                console.log(event.code);
        }
    }

    keyUpEventListener = (event) => {
        switch(event.code) {
            case 'KeyW':
                this._controlState.w = false;
                break;
            case 'KeyS':
                this._controlState.s = false;
                break;
            case 'KeyA':
                this._controlState.a = false;
                break;
            case 'KeyD':
                this._controlState.d = false;
                break;
            case 'Space':
                this._controlState.space = false;
                break;
            default:
                console.log(event.code);
        }
    }

    deInit() {
        document.removeEventListener('keydown', this.keyDownEventListener);
        document.removeEventListener('keyup', this.keyUpEventListener);
    }
}
