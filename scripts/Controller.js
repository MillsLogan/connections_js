class Controller{
    #gameObject;
    #statsObject;
    #gameBoard;
    #statsBoard;
    
    constructor(){
        this.#gameObject = null;
        this.#statsObject = null;
        this.#gameBoard = null;
        this.#statsBoard = null;
    }

    async initialSetup(){
        this.#statsObject = this.#setupStats();
        await this.#setupGame();
    }

    connect(){
        this.#statsBoard = new StatsBoard(this.#statsObject);
        this.#gameBoard = new GameBoard(this.#gameObject);
        this.#connectControlButtons();
        if(this.#gameObject.isGameOver){
            this.disable();
        }
    }

    clear(){
        this.#disconnectControlButtons();
    }

    #disconnectControlButtons(){
        let newGameButton = document.getElementById("new-game");
        let newGameButtonClone = newGameButton.cloneNode(true);
        newGameButton.parentNode.replaceChild(newGameButtonClone, newGameButton);

        let clearButton = document.getElementById("clear-selection");
        let clearButtonClone = clearButton.cloneNode(true);
        clearButton.parentNode.replaceChild(clearButtonClone, clearButton);

        let shuffleButton = document.getElementById("shuffle-board");
        let shuffleButtonClone = shuffleButton.cloneNode(true);
        shuffleButton.parentNode.replaceChild(shuffleButtonClone, shuffleButton);

        let submitButton = document.getElementById("submit-guess");
        let submitButtonClone = submitButton.cloneNode(true);
        submitButton.parentNode.replaceChild(submitButtonClone, submitButton);
    }

    #connectControlButtons(){
        let newGameButton = document.getElementById("new-game");
        newGameButton.addEventListener("click", this.#newGameButton.bind(this));

        let clearButton = document.getElementById("clear-selection");
        clearButton.addEventListener("click", this.#gameBoard.clearSelection.bind(this.#gameBoard));
        clearButton.disabled = false;

        let shuffleButton = document.getElementById("shuffle-board");
        shuffleButton.addEventListener("click", this.#gameBoard.shuffle.bind(this.#gameBoard));
        shuffleButton.disabled = false;

        let submitButton = document.getElementById("submit-guess");
        submitButton.addEventListener("click", this.#makeGuess.bind(this));
        submitButton.disabled = false;
    }

    showErrorMessage(message){
        let alertArea = document.getElementById("alert-area");
        let alertAreaClone = alertArea.cloneNode(false);
        alertArea.parentNode.replaceChild(alertAreaClone, alertArea);

        alertArea = document.getElementById("alert-area");

        let alertDiv = document.createElement("div");
        alertDiv.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show");
        alertDiv.setAttribute("role", "alert");

        let alertText = document.createElement("p");
        alertText.textContent = message;
        alertText.style.display = "inline";
        alertDiv.appendChild(alertText);

        let closeButton = document.createElement("button");
        closeButton.classList.add("btn-close");
        closeButton.setAttribute("data-bs-dismiss", "alert");
        closeButton.setAttribute("aria-label", "Close");
        alertDiv.appendChild(closeButton);

        alertArea.appendChild(alertDiv);
    }

    #makeGuess(){
        let guess = this.#gameBoard.selectedWords;

        if(guess.length !== 4){
            this.showErrorMessage("You must select exactly 4 words to make a guess");
            return;
        }

        try{
            let correct = this.#gameObject.guess(guess);
            this.#statsObject.guess();
            
            if (correct === 4){
                if(this.#gameObject.isGameOver){
                    this.disable();
                    this.#statsObject.winGame();
                }
                this.#gameBoard.shuffle();
            }

            this.#statsBoard.update();
            this.#gameBoard.clearSelection();
            this.#gameBoard.update();
        }catch(e){
            this.showErrorMessage(e.message);
            return;
        }
    }

    disable(){
        let clearButton = document.getElementById("clear-selection");
        clearButton.disabled = true;

        let shuffleButton = document.getElementById("shuffle-board");
        shuffleButton.disabled = true;

        let submitButton = document.getElementById("submit-guess");
        submitButton.disabled = true;
    }

    enable(){
        let clearButton = document.getElementById("clear-selection");
        clearButton.disabled = false;

        let shuffleButton = document.getElementById("shuffle-board");
        shuffleButton.disabled = false;

        let submitButton = document.getElementById("submit-guess");
        submitButton.disabled = false;
    }

    loadAll(){
        this.#reset();
    }

    async #reset(){
        await this.initialSetup();
        this.connect();
    }

    #setupStats(){
        if(localStorage.getItem("stats")){
            return Stats.fromJSON(JSON.parse(localStorage.getItem("stats")));
        }else{
            return new Stats();
        }
    }

    async #setupGame(){
        console.log(localStorage.getItem("game"));
        if(localStorage.getItem("game") !== null && localStorage.getItem("game") !== "null"){
            this.#gameObject = Game.fromJSON(JSON.parse(localStorage.getItem("game")));
        }else{
            await this.#newGame();
        }
    }

    #saveGame(){
        localStorage.setItem("game", JSON.stringify(this.#gameObject));
    }

    #saveStats(){
        localStorage.setItem("stats", JSON.stringify(this.#statsObject));
    }

    save(){
        this.#saveGame();
        this.#saveStats();
    }

    async #newGame(lastGameWon = false){
        this.#statsObject.newGame(lastGameWon);
        await getRandomCategories(this.#startGame.bind(this));
    }

    async #newGameButton(){
        await this.#newGame(this.#gameObject.isGameOver);
        this.#gameBoard.reset(this.#gameObject);
        this.#statsBoard.update();
        this.enable();
    }

    #startGame(categories){
        this.#gameObject = Game.fromCategoriesObject(categories);
    }
}