async function clearHistory(){
    controller.clear();
    localStorage.clear();
    await setup();
    controller.connect();
}

clearHistoryButton = document.getElementById("clear-history");
clearHistoryButton.addEventListener("click", clearHistory);

controller.connect();



