// hide the canvas
const canvas = document.getElementsByTagName("canvas")[0];
canvas.classList.add("hidden");

// move the title, hide the button, and show the setting
const header = document.getElementsByTagName("header")[0];
const play = document.getElementById("play");
const setting = document.getElementById("setting");
const showSetting = () => {
    header.classList.remove("middle");
    header.classList.add("top");
    play.classList.add("none");
    setting.classList.remove("hidden");
};
play.addEventListener("click", showSetting, false);

// hide the setting, show the canvas and update the player
const main = document.getElementsByTagName("main")[0];
const chooseCharacter = function() {
    playerCharacter = this.getAttribute("data-type");
    setting.classList.add("hidden");
    main.classList.remove("hidden");
    canvas.classList.remove("hidden");
    player.setup();
};
const availableCharacters = document.getElementsByClassName("character");
for (let i = 0; i < availableCharacters.length; i++) {
    availableCharacters[i].addEventListener("click", chooseCharacter, false);
}