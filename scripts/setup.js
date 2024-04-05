var controller;

async function setup() {
    controller = new Controller();

    let load = controller.initialSetup();

    window.onbeforeunload = function(){
        this.save();
    }.bind(controller);

    await load;
}

setup();