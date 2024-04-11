async function clearHistory(){
    controller.clear();
    localStorage.clear();
    await setup();
    controller.connect();
}

let clearHistoryButton = document.getElementById("clear-history");
clearHistoryButton.addEventListener("click", clearHistory);

document.onreadystatechange = async function(){
    if(document.readyState === "complete"){
        await setupPromise;
        controller.connect();
    }
}



