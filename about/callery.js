import "../src/css/style.css"

import "../src/js/components/component-header.js"
import "../src/js/components/component-footer.js"
if (!customElements.get('widget-header')) {
    customElements.define('widget-header', class extends HTMLElement {});
}

if (!customElements.get('widget-footer')) {
    customElements.define('widget-footer', class extends HTMLElement {});
}


const images = [
    "../src/img/bestshots-img1.png",
    "../src/img/bestshots-img2.png",
    "../src/img/bestshots-img3.png",
    "../src/img/bestshots-img4.png",
    "../src/img/bestshots-img5.png"
];
const sounds = Array.from({ length: 10 }, (_, i) => new Audio(`../src/img/lay.mp3`));
const mainImage = document.getElementById("mainImage");
const playerStatus = document.getElementById("playerStatus");
const volumeControl = document.getElementById("volumeControl");


window.addEventListener('DOMContentLoaded', () => {
    mainImage.src = images[0];
})

let currentAudio = null;

function getRandomIndex() {
    return Math.floor(Math.random() * images.length);
}

function changeMedia() {
    const index = getRandomIndex();

    mainImage.classList.add("gallery__image--fade-out");
    setTimeout(() => {
        mainImage.src = images[index];
        mainImage.classList.remove("gallery__image--fade-out");
    }, 300);


    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = sounds[index];
    currentAudio.volume = volumeControl.value;
    currentAudio.play();

    playerStatus.textContent = "▶ Играет";

    currentAudio.onended = () => {
        playerStatus.textContent = "⏸ Пауза";
    };
}

document.getElementById("btn1").addEventListener("click", changeMedia);
document.getElementById("btn2").addEventListener("click", changeMedia);

volumeControl.addEventListener("input", () => {
    if (currentAudio) {
        currentAudio.volume = volumeControl.value;
    }
});