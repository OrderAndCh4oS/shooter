class Score {
    _score = 0;

    get score() {
        return this._score;
    }

    add(value) {
        this._score += value;
    }

    reset() {
        this._score = 0;
    }
}
