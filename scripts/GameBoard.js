class GameBoard{
    #words;
    #boardObject;
    #gameObject;
    #guessHistoryTable;
    
    constructor(gameObject){
        this.#words = [];
        this.reset(gameObject);
    }

    reset(gameObject){
        while(this.#words.length > 0){
            delete this.#words.pop();
        }

        this.#guessHistoryTable = document.getElementById("history-table-body");

        while(this.#guessHistoryTable && this.#guessHistoryTable.firstChild){
            this.#guessHistoryTable.removeChild(this.#guessHistoryTable.firstChild);
        }

        this.#gameObject = gameObject;
        this.#words = this.#initializeWords();
        this.#setupBoardObject();
        this.shuffle();
        this.#populateGuessHistory();
    }

    #populateGuessHistory(){
        for(let guess of this.#gameObject.guessHistory.reverse()){
            this.#guessHistoryTable.appendChild(this.#createGuessHistoryRow(guess.guess, guess.feedback));
        }
    }

    #createGuessHistoryRow(wordList, feedback){
        let row = document.createElement("tr");

        for(let word of wordList){
            let cell = document.createElement("td");
            cell.textContent = word;
            row.appendChild(cell);
        }

        let feedbackCell = document.createElement("td");
        feedbackCell.textContent = feedback;
        row.appendChild(feedbackCell);

        return row;
    }

    #updateGuessHistory(){
        let lastGuess = this.#gameObject.guessHistory[this.#gameObject.guessHistory.length - 1];
        this.#guessHistoryTable.prepend(this.#createGuessHistoryRow(lastGuess.guess, lastGuess.feedback));
    }

    update(){
        this.#updateGuessHistory();
    }

    #initializeWords(){
        let words = [];
        for(let word of this.#gameObject.activeWords){
            words.push(new Word(word));
        }
        return words;
    }

    get activeWords(){
        let activeWords = [];
        for(let word of this.#words){
            if(this.#gameObject.activeWords.includes(word.word)){
                activeWords.push(word);
            }
        }
        return activeWords;
    }

    #setupBoardObject(){
        this.#boardObject = document.getElementById("game-board");
        this.shuffle();
    }

    shuffle(){
        while(this.#boardObject.firstChild){
            this.#boardObject.removeChild(this.#boardObject.firstChild);
        }

        let wordList = this.activeWords.slice();

        for(let i = 0; i < this.activeWords.length / 4; i++){
            let row = document.createElement("div");
            row.classList.add("row");
            for(let j = 0; j < 4; j++){
                row.appendChild(wordList.splice(Math.floor(Math.random() * wordList.length), 1)[0].container);
            }
            this.#boardObject.appendChild(row);
        }
    }

    get selectedWords(){
        let selectedWords = [];
        for(let word of this.#words){
            if(word.isClicked){
                selectedWords.push(word.word);
            }
        }
        return selectedWords;
    }

    clearSelection(){
        for(let word of this.#words){
            if(word.isClicked){
                word.deselect();
            }
        }
    }
}

