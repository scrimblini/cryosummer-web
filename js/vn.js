let scenes = [
            { bg: "../img/vnsprites/bgb.png", sprite: "../img/vnsprites/empty.png", text: "My memories are blurry..." },
            { bg: "../img/vnsprites/cg1.png", text: "...I remember a time, when I was human." },
            { text: "It was really difficult. No one wanted to be around me." },
            { text: "...Except for her." },
            { bg:"../img/vnsprites/cg2.png", text: "..." },
            { bg:"../img/vnsprites/cg3.png", text: "...But then she left me too." },
            { text: "And something terrible happened to her..." },
            { text: "...And it was my fault." },
            { bg: "../img/vnsprites/cg4.png", text: "I couldnt keep living after that... But then, he took me in..." },
            { bg: "../img/vnsprites/bgb.png", text: "...Then I fell into a deep slumber." },
            { bg: "../img/vnsprites/bglab.png", sprite: "../img/vnsprites/boznormal-wireup.png", text: "...But now I'm awake." },
            { sprite: "../img/vnsprites/bozfocused-wireup.png", text: "This is the last place i remember being in. The lab where he brought me back, yet I fell into a deep slumber again." },
            { sprite: "../img/vnsprites/bozconfused-wireup.png", text: "...How much time has it been? I wonder where everyone is now..." },
            { sprite: "../img/vnsprites/bozserious-wireup.png", text: "...So I should probably get out of here." },
            { sprite: "../img/vnsprites/bozfocused-wireup.png", text: "..." },
            { sprite: "../img/vnsprites/bozfocused-wireup.png", text: "...!" },
            { sprite: "../img/vnsprites/bozserious-wireup.png", text: "...huh?" },
            { sprite: "../img/vnsprites/bozskeptical-wireup.png", text: "It's... Stuck..." },
            { sprite: "../img/vnsprites/bozskeptical-wireup.png", text: "Hghhh..." },
            { bg:"../img/vnsprites/bgb.png", sprite: "../img/vnsprites/empty.png", text: "..." },
            { sprite: "../img/vnsprites/bozshock.png", text: "What... Just happened to me?" },
            { sprite: "../img/vnsprites/bozconfused-wiredown.png", text: "I don't..." },
            {bg:"../img/vnsprites/bgb.png", sprite: "../img/vnsprites/empty.png", text: "...Remember a thing." },
            {bg:"../img/vnsprites/bglab.png", sprite: "../img/vnsprites/empty.png", text: "..." },
            {sprite: "../img/vnsprites/bozconfused-wiredown.png", text: "...What is this place?" },
            {sprite: "../img/vnsprites/bozshock.png", text: "...Why am I here?" },
            {sprite: "../img/vnsprites/bozconfused-wiredown.png", text: "Ugh... It hurts..." },
            {sprite: "../img/vnsprites/boznormal-wiredown.png", text: "I wonder whats beyond these stairs... Do they leave outside?" },
            {bg:"../img/vnsprites/bgb.png", sprite: "../img/vnsprites/empty.png", text:"..."},
            {bg:"../img/vnsprites/bgoutside.png", sprite: "../img/vnsprites/empty.png", text:"..."},
            {sprite: "../img/vnsprites/bozshock.png", text:"Where... Is everyone...?"},
            {bg:"../img/vnsprites/bgb.png", sprite: "../img/vnsprites/empty.png", text:"End"},

        ];

        let currentScene = 0;
        let bg = document.getElementById("background");
        let sprite = document.getElementById("sprite");

        //stores current bg and sprites for proper save/load
        let currentBg = "";
        let currentSprite = "";


function startGame() {
    // Only reset currentScene to 0 if it hasn't been set by loadGame
    if (currentScene === undefined) {
        currentScene = 0; // Reset scene index if not already set
    }

    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
    document.getElementById("text-box").classList.remove("hidden");
    document.getElementById("finish-buttons").classList.add("hidden");

    //enables interactivity by clicking anywhere in the box
    document.getElementById("game-container").onclick = nextScene;

    showScene(); // Show the scene based on the current state of currentScene
}

//for restart button
function restartGame() {
    currentScene = 0;
    startGame();
}



        function showScene() {
            let scene = scenes[currentScene];

            if (scene.bg) {
        currentBg = scene.bg; // Update current background
        bg.src = currentBg;
        bg.classList.remove("hidden");
    } else if (currentBg) {
        // If no background defined, use the previous one (for proper load in case bg/sprite is not defined in currentScene)
        bg.src = currentBg;
        bg.classList.remove("hidden");
    }

    //does the same for sprite
    if (scene.sprite) {
        currentSprite = scene.sprite;
        sprite.src = currentSprite;
        sprite.classList.remove("hidden");
    } else if (currentSprite) {
        sprite.src = currentSprite;
        sprite.classList.remove("hidden");
    }

    //textbox typing effect
            typeText(scene.text);

        }

        let typingTimeout;
        let isTyping = false;
        

//callbacks: are important because they ensure any additional logic can be executed when the text typing effect finishes
//they are important to distinguish:
//clicking while its still typing (text appears instantly) vs clicking after its finished (changes to the next scene)
//timeouts are for the text typing speed
function typeText(text, callback) {
    let box = document.getElementById("text-box");
    box.innerHTML = "";
    let i = 0;
    isTyping = true; // Mark as typing

    if (typingTimeout) clearTimeout(typingTimeout);

    function typing() {
        if (i < text.length) {
            box.innerHTML += text[i];
            i++;
            typingTimeout = setTimeout(typing, 25); // Faster speed
        } else {
            isTyping = false; // Mark as done
            if (callback) callback();
        }
    }

    typing();

    //skips typing animation when clicked
    document.getElementById("game-container").onclick = function () {
        if (isTyping) {
            clearTimeout(typingTimeout);
            box.innerHTML = text;
            isTyping = false;
            if (callback) callback();
        } else {
            nextScene();
        }
    };
}


//continues showing scenes until it reaches the end, then hides all scene elements and unhides the restart/exit buttons
function nextScene() {
    if (currentScene < scenes.length - 1) {
        currentScene++;
        showScene();
    } else {
        document.getElementById("finish-buttons").classList.remove("hidden");
        
        document.getElementById("text-box").classList.add("hidden");
        document.getElementById("menu").classList.add("hidden");
        bg.classList.add("hidden");
        sprite.classList.add("hidden");
    }
}

//save/load in slots
function saveGame(slot) {
    const gameData = {
        scene: currentScene,
        currentBg: currentBg,
        currentSprite: currentSprite
    };

    localStorage.setItem(`savedGameSlot${slot}`, JSON.stringify(gameData));
    const saveMessage = document.getElementById("save-message");
    saveMessage.classList.remove("hidden");
    saveMessage.textContent = `Game saved to Slot ${slot}`;
}

function loadGame() {
    let saved = localStorage.getItem("savedGameSlot1");
    if (saved !== null) {
        const gameData = JSON.parse(saved);
        currentScene = gameData.scene;
        currentBg = gameData.currentBg;
        currentSprite = gameData.currentSprite;

        startGame();
        closeLoadOverlay();
    } else {
        alert(`No saved game in Slot ${slot}`);
    }
}


function openSaveOverlay() {
    document.getElementById("save-overlay").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
}

function openLoadOverlay() {
    document.getElementById("load-overlay").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
}

function closeSaveOverlay() {
    document.getElementById("save-overlay").classList.add("hidden");
    document.getElementById("save-message").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
}

function closeLoadOverlay() {
    document.getElementById("load-overlay").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
}


function promptSaveGame() {
    openSaveOverlay();
}

function promptLoadGame() {
    openLoadOverlay();
}


    function exitGame() {
    document.getElementById("exit-overlay").classList.remove("hidden");
}


function closeExitOverlay() {
    document.getElementById("exit-overlay").classList.add("hidden");
}


function exitToStartScreen() {
    //hides the game elements and unhides the start screen
    document.getElementById("text-box").classList.add("hidden");
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("finish-buttons").classList.add("hidden");
    bg.classList.add("hidden");
    sprite.classList.add("hidden");
    
    document.getElementById("start-screen").classList.remove("hidden");


    document.getElementById("game-container").onclick = null; //removes click listener (so you can only press the buttons)
    currentScene = 0;
    closeExitOverlay()

}