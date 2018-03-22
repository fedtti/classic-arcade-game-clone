// hide the canvas
const canvas = document.getElementsByTagName("canvas")[0];
canvas.classList.add("hidden");

// move the title, hide the button, and show the setting
const header = document.getElementsByTagName("header")[0];
const play = document.getElementById("play");
const main = document.getElementsByTagName("main")[0];
const showSetting = () => {
    header.classList.remove("middle");
    header.classList.add("top");
    play.classList.add("none");
    main.classList.remove("hidden");
    canvas.classList.remove("hidden");
};
play.addEventListener("click", showSetting, false);