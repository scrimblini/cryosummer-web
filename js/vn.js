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

        let currentBg = ""; // Store the current background
        let currentSprite = ""; // Store the current sprite


function startGame() {
    // Only reset currentScene to 0 if it hasn't been set by loadGame
    if (currentScene === undefined) {
        currentScene = 0; // Reset scene index if not already set
    }

    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
    document.getElementById("text-box").classList.remove("hidden");
    document.getElementById("finish-buttons").classList.add("hidden");

    // Remove end screen if it exists
    let endScreen = document.getElementById("end-screen");
    if (endScreen) endScreen.remove();
    

    // Ensure game-container is still interactive
    document.getElementById("game-container").onclick = nextScene;

    showScene(); // Show the scene based on the current state of currentScene
}

function restartGame() {
    currentScene = 0;
    startGame();
}



        function showScene() {
            let scene = scenes[currentScene];
            console.log("Current Scene:", currentScene);
    console.log("Background:", scene.bg, "Sprite:", scene.sprite);

            if (scene.bg) {
        currentBg = scene.bg; // Update current background
        bg.src = currentBg;
        bg.classList.remove("hidden");
    } else if (currentBg) {
        // If no background defined, use the previous one
        bg.src = currentBg;
        bg.classList.remove("hidden");
    }

    if (scene.sprite) {
        currentSprite = scene.sprite; // Update current sprite
        sprite.src = currentSprite;
        sprite.classList.remove("hidden");
    } else if (currentSprite) {
        // If no sprite defined, use the previous one
        sprite.src = currentSprite;
        sprite.classList.remove("hidden");
    }

            typeText(scene.text);

            
        }
        


        let typingTimeout;
        let isTyping = false;
        


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

    document.getElementById("game-container").onclick = function () {
        if (isTyping) {
            clearTimeout(typingTimeout);
            box.innerHTML = text; // Show full text instantly
            isTyping = false;
            if (callback) callback();
        } else {
            nextScene(); // Proceed to next scene when fully typed
        }
    };
}



function nextScene() {
    if (currentScene < scenes.length - 1) {
        currentScene++;
        showScene();
    } else {
        // Unhide the finish buttons and prevent adding them again
        document.getElementById("finish-buttons").classList.remove("hidden");
        
        document.getElementById("text-box").classList.add("hidden");
        document.getElementById("menu").classList.add("hidden");
        bg.classList.add("hidden");
        sprite.classList.add("hidden");
    }
}


function saveGame(slot) {
    const gameData = {
        scene: currentScene,  // Store the current scene
        currentBg: currentBg, // Save the current background
        currentSprite: currentSprite // Save the current sprite
    };

    localStorage.setItem(`savedGameSlot${slot}`, JSON.stringify(gameData));
    const saveMessage = document.getElementById("save-message");
    saveMessage.classList.remove("hidden");
    saveMessage.textContent = `Game saved to Slot ${slot}`;
}

function loadGame() {
    let saved = localStorage.getItem("savedGameSlot1"); // Example: Load from Slot 1
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

// Function to open the load overlay
function openLoadOverlay() {
    document.getElementById("load-overlay").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
}

// Function to close the save overlay
function closeSaveOverlay() {
    document.getElementById("save-overlay").classList.add("hidden");
    document.getElementById("save-message").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
}

// Function to close the load overlay
function closeLoadOverlay() {
    document.getElementById("load-overlay").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
}


function promptSaveGame() {
    openSaveOverlay();
}

// Call this function when you want to display the load prompt
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
    // Hide the game content (including sprite, text box, etc.)
    document.getElementById("text-box").classList.add("hidden");
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("finish-buttons").classList.add("hidden"); // Hide finish buttons
    
    // Show the start screen again
    document.getElementById("start-screen").classList.remove("hidden");

    
    bg.classList.add("hidden");
    sprite.classList.add("hidden");
    

    // Reset event listeners and game state
    document.getElementById("game-container").onclick = null; // Remove the click listener to prevent issues
    currentScene = 0; // Reset the scene index to the start
    closeExitOverlay()

}