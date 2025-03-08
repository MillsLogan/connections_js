function getSingleRandomCategory(categories) {
    let randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return randomCategory;
}

function queryCategories() {
    return fetch("./data.json").then(response => {
        return response.json();
    });
}

async function getRandomCategories(callback) {
    var newCategories = await queryCategories();
    var fourCats = [];
    for (let i = 0; i < 4; i++) {
        fourCats.push(getSingleRandomCategory(newCategories.categories));
    }
    newCategories = {"categories": fourCats};
    callback(newCategories);
}