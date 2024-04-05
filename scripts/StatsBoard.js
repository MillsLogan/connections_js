class StatsBoard{
    #statsObject;

    constructor(statsObject){
        this.#statsObject = statsObject;
        this.#render();
    }

    #render(){
        let statsContainer = document.getElementById("stats-container");
        statsContainer.innerHTML = "";

        let statsTable = document.createElement("table");
        statsTable.id = "stats-table";
        statsTable.classList.add("table", "table-striped", "table-bordered");

        statsContainer.appendChild(statsTable);

        let statsTableBody = document.createElement("tbody");
        statsTable.appendChild(statsTableBody);

        let totalGamesRow = document.createElement("tr");
        let totalGamesLabel = document.createElement("td");
        totalGamesLabel.textContent = "Total Games";
        let totalGamesValue = document.createElement("td");
        totalGamesValue.textContent = this.#statsObject.totalGames;
        totalGamesRow.appendChild(totalGamesLabel);
        totalGamesRow.appendChild(totalGamesValue);
        statsTableBody.appendChild(totalGamesRow);

        let totalWinsRow = document.createElement("tr");
        let totalWinsLabel = document.createElement("td");
        totalWinsLabel.textContent = "Total Wins";
        let totalWinsValue = document.createElement("td");
        totalWinsValue.textContent = this.#statsObject.totalWins;
        totalWinsRow.appendChild(totalWinsLabel);
        totalWinsRow.appendChild(totalWinsValue);
        statsTableBody.appendChild(totalWinsRow);

        let winStreakRow = document.createElement("tr");
        let winStreakLabel = document.createElement("td");
        winStreakLabel.textContent = "Win Streak";
        let winStreakValue = document.createElement("td");
        winStreakValue.textContent = this.#statsObject.winStreak;
        winStreakRow.appendChild(winStreakLabel);
        winStreakRow.appendChild(winStreakValue);
        statsTableBody.appendChild(winStreakRow);

        let totalGuessesRow = document.createElement("tr");
        let totalGuessesLabel = document.createElement("td");
        totalGuessesLabel.textContent = "Total Guesses";
        let totalGuessesValue = document.createElement("td");
        totalGuessesValue.textContent = this.#statsObject.totalGuesses;
        totalGuessesRow.appendChild(totalGuessesLabel);
        totalGuessesRow.appendChild(totalGuessesValue);
        statsTableBody.appendChild(totalGuessesRow);

        let winPercentageRow = document.createElement("tr");
        let winPercentageLabel = document.createElement("td");
        winPercentageLabel.textContent = "Win Percentage";
        let winPercentageValue = document.createElement("td");
        winPercentageValue.textContent = `${(this.#statsObject.winPercentage * 100).toFixed(2)}%`;
        winPercentageRow.appendChild(winPercentageLabel);
        winPercentageRow.appendChild(winPercentageValue);
        statsTableBody.appendChild(winPercentageRow);

        let averageGuessesRow = document.createElement("tr");
        let averageGuessesLabel = document.createElement("td");
        averageGuessesLabel.textContent = "Average Guesses per Game";
        let averageGuessesValue = document.createElement("td");
        averageGuessesValue.textContent = this.#statsObject.averageGuesses;
        averageGuessesRow.appendChild(averageGuessesLabel);
        averageGuessesRow.appendChild(averageGuessesValue);
        statsTableBody.appendChild(averageGuessesRow);
    }

    update(){
        let statsTable = document.getElementById("stats-table");
        statsTable.querySelector("tr:nth-child(1) td:nth-child(2)").textContent = this.#statsObject.totalGames;
        statsTable.querySelector("tr:nth-child(2) td:nth-child(2)").textContent = this.#statsObject.totalWins;
        statsTable.querySelector("tr:nth-child(3) td:nth-child(2)").textContent = this.#statsObject.winStreak;
        statsTable.querySelector("tr:nth-child(4) td:nth-child(2)").textContent = this.#statsObject.totalGuesses;
        statsTable.querySelector("tr:nth-child(5) td:nth-child(2)").textContent = `${(this.#statsObject.winPercentage * 100).toFixed(2)}%`;
    }
}