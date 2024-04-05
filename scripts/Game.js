class Game{
    #categories;
    #isGameOver;
    #guessHistory;

    constructor(categories, isGameOver = false, guessHistory = []){
        this.#categories = categories;
        this.#isGameOver = isGameOver;
        this.#guessHistory = guessHistory;
    }

    get categories(){
        return this.#categories;
    }

    get isGameOver(){
        return this.#isGameOver;
    }

    get guessHistory(){
        return this.#guessHistory;
    }

    get activeWords(){
        let activeWords = [];
        for(let category of this.#categories){
            if(!category.isCompleted){
                activeWords.push(...category.words);
            }
        }
        return activeWords;
    }

    static fromCategoriesObject(categoriesObject){
        let categories = [];
        for(let category of categoriesObject.categories){
            categories.push(Category.fromCategoriesObject(category));
        }

        return new Game(categories);
    }

    #validateGuess(guessList){
        if(this.#isGameOver){
            throw new Error("The game is over.");
        }

        if(guessList.length === 0){
            throw new Error("You must provide at least one guess.");
        }

        for(let prevGuess of this.#guessHistory){
            this.#checkForDuplicateGuess(prevGuess.guess, guessList);
        }

        return;
    }

    #checkForDuplicateGuess(prevGuess, guessList){
        for(let guess of guessList){
            if(!prevGuess.includes(guess)){
                return;
            }
        }

        throw new Error("You have already guessed that combination of words.");
    }

    guess(guessList){
        let completedCategory = "";
        this.#validateGuess(guessList);

        let best = 0;
        for(let category of this.#categories){
            let correct = category.guess(guessList);
            if(correct > best){
                best = correct;
            }

            if(correct === 4){
                completedCategory = category.name;
            }
        }

        return this.#getGuessFeedback(guessList, best, completedCategory);
    }

    #getGuessFeedback(guessList, correct, completedCategory){
        switch(correct){
            case 1:
                this.#guessHistory.push({guess: guessList, feedback: "No Connections Found :("});
                break;
            case 2:
                this.#guessHistory.push({guess: guessList, feedback: "Two Selected Words do not belong to this category!"});
                break;
            case 3:
                this.#guessHistory.push({guess: guessList, feedback: "One Selected Word does not belong to this category!"});
                break;
            case 4:
                this.#guessHistory.push({guess: guessList, feedback: "Correct Connection Found! " + completedCategory + " is completed!"});
                break;                
        }

        this.#isGameOver = this.#isGameWon();
        return correct;
    }

    #isGameWon(){
        for(let category of this.#categories){
            if(!category.isCompleted){
                return false;
            }
        }

        return true;
    }

    toJSON(){
        let categoriesJson = [];
        for(let category of this.#categories){
            categoriesJson.push(category.toJSON());
        }

        return {
            categories: categoriesJson,
            isGameOver: this.#isGameOver,
            guessHistory: this.#guessHistory
        }
    }

    static fromJSON(json){
        let categories = [];
        for(let category of json.categories){
            categories.push(Category.fromJSON(category));
        }

        return new Game(categories, json.isGameOver, json.guessHistory);
    }
}