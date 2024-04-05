class Stats{
    #totalGames;
    #totalWins;
    #winStreak;
    #totalGuesses;

    constructor(totalGames = 0, totalWins = 0, winStreak = 0, totalGuesses = 0){
        this.#totalGames = totalGames;
        this.#totalWins = totalWins;
        this.#winStreak = winStreak;
        this.#totalGuesses = totalGuesses;
    }

    get totalGames(){
        return this.#totalGames;
    }

    get totalWins(){
        return this.#totalWins;
    }

    get winStreak(){
        return this.#winStreak;
    }

    get totalGuesses(){
        return this.#totalGuesses;
    }

    get winPercentage(){
        return this.#totalGames - 1 === 0 ? 0 : this.#totalWins / (this.#totalGames - 1);
    }

    get averageGuesses(){
        return this.#totalGames === 0 ? 0 : this.#totalGuesses / this.#totalGames;
    }

    newGame(lastGameWon){
        if(!lastGameWon){
            this.#winStreak = 0;
        }

        this.#totalGames++;
    }

    winGame(){
        this.#totalWins++;
        this.#winStreak++;
    }

    guess(){
        this.#totalGuesses++;
    }

    toJSON(){
        return {
            totalGames: this.#totalGames,
            totalWins: this.#totalWins,
            winStreak: this.#winStreak,
            totalGuesses: this.#totalGuesses
        };
    }

    static fromJSON(json){
        return new Stats(json.totalGames, json.totalWins, json.winStreak, json.totalGuesses);
    }
}