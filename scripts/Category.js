class Category{
    #name;
    #words;
    #isCompleted;

    constructor(name, words, isCompleted = false){
        this.#name = name.toUpperCase();
        
        words = words.map(word => word.toUpperCase());

        this.#words = words;

        this.#isCompleted = isCompleted;
    }

    static fromCategoriesObject(categoriesObject){
        return new Category(categoriesObject.category, categoriesObject.words);
    }

    get name(){
        return this.#name;
    }

    get words(){
        return this.#words;
    }

    get isCompleted(){
        return this.#isCompleted;
    }

    set isCompleted(value){
        this.#isCompleted = value;
    }

    guess(guessList){
        let correct = 0;
        for(let guess of guessList){
            if(this.#words.includes(guess)){
                correct++;
            }
        }

        if(correct === this.#words.length){
            this.#isCompleted = true;
        }

        return correct;
    }

    toJSON(){
        return {
            category: this.#name,
            words: this.#words,
            isCompleted: this.#isCompleted
        };
    }

    static fromJSON(json){
        return new Category(json.category, json.words, json.isCompleted);
    }
}