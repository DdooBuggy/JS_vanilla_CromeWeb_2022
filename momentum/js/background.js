const images = [
    "0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg","6.jpg","7.jpg","8.jpg","9.jpg",
];
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const imageNumber = getRandomInt(0, images.length);
const chosenImage = images[imageNumber];

const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;
bgImage.classList.add("background-img");
const imgDiv = document.querySelector(".img-box");
imgDiv.appendChild(bgImage);