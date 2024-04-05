class Word{
    #container;
    #word;
    #button;
    #isClicked;
    
    constructor(word){
        this.#word = word;
        this.#isClicked = false;
        this.#container = document.createElement("div");
        this.#container.classList.add("col-3");
        this.#button = document.createElement("button");
        this.#button.classList.add("btn", "btn-outline-dark", "word-cell");
        this.#button.textContent = this.#word;
        this.#button.addEventListener("click", this.#handleClick.bind(this));
        this.#container.appendChild(this.#button);
    }

    get container(){
        return this.#container;
    }

    get word(){
        return this.#word;
    }

    get isClicked(){
        return this.#isClicked;
    }

    deselect(){
        this.#isClicked = false;
        this.#button.classList.remove("active");
    }

    #handleClick(){
        if(this.#isClicked){
            this.deselect();
            return;
        }

        if(document.getElementsByClassName("word-cell active").length === 4){
            return;
        }


        this.#isClicked = true;
        this.#button.classList.add("active");
    }
}