// Initial Setup
let $body = document.querySelector("body");
let $head = document.querySelector("head");

let mainPanel = `<div id='main-panel'></div>`;
let stylesheet = `<link rel="stylesheet" href="style.css"></link>`;
let header = `<header> <h1> Final assignment</h1> </header>`;

// insert location: afterbegin
$head.insertAdjacentHTML("afterbegin", stylesheet);
$body.insertAdjacentHTML("afterbegin", mainPanel);

// Root elemement
let $mainPanel = document.getElementById("main-panel");

// array of image titles
let imageTitle = [
  "image1.png",
  "image2.png",
  "image3.png",
  "image4.png",
  "image5.png",
  "image6.png",
];

let imageArray = [];
let totalImage = 0;
let clickedImage = [];
let pointToWin = 0;
let currentPoints = 0;

let firstCard = "";

function flipCard() {
  for (let image of imageArray) {
    if (image === event.target.id) {
      if (clickedImage == image) {
        this.classList.toggle("flip");
        this.classList.toggle("guessed");
        firstCard.classList.add("guessed");
        firstCard.removeEventListener("click", flipCard);
        this.removeEventListener("click", flipCard);
        currentPoints++;
        clickedImage = [];
      } else {
        if (clickedImage.length == 0) {
          firstCard = this;
          this.classList.toggle("flip");
          clickedImage = image;
        } else {
          this.classList.toggle("flip");
          setTimeout(() => {
            this.classList.remove("flip");
            firstCard.classList.remove("flip");
          }, 1000);
          clickedImage = [];
        }
      }
      break;
    }
  }
  hasWon();
}

/**
 * insertImage()
 *
 * Shows the image
 */
function insertImage() {
  let imageContent = [];

  imageContent.push(`<div id= "imageRowId" class="imageRow">`);

  // sort the array
  imageArray.sort(() => Math.random() - 0.5);

  for (link of imageArray) {
    imageContent.push(`<div class="imageColumn">
    
      <img src=${link} alt="An Image" id=${link}></img>
  </div>`);
  }
  imageContent.push(`</ div>`);

  // insert to document
  $mainPanel.innerHTML = imageContent.join("");
  const cards = document.querySelectorAll(".imageColumn img");
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

/**
 * showDifficulty()
 *
 * Choose the difficulty
 */
function showDifficulty() {
  let buttons = ` <div class="buttons">
  <button id="easy">Easy</button>
  <button id="medium">Medium</button>
  <button id="hard">Hard</button>
</div>`;
  // insert to document
  $mainPanel.innerHTML += buttons;
  clickedImage = [];
  pointToWin = 0;
  currentPoints = 0;

  let $buttonSelector = document.querySelector(".buttons");
  $buttonSelector.addEventListener("click", mouseEvent);
}

showDifficulty();

/**
 * hasWon()
 *
 * Check winner
 */
function hasWon() {
  if (pointsToWin == currentPoints) {
    document.getElementById("imageRowId").classList.add("end");
    setTimeout(() => {
      alert("You have won");
      $mainPanel.innerHTML = "";
      showDifficulty();
    }, 1000);
  }
}

/**
 * mouseEvent()
 *
 * Function to handle mouse
 * @param {*} event
 */
function mouseEvent(event) {
  if (event.target.id === "easy") {
    imageArray = [imageTitle[0], imageTitle[0], imageTitle[1], imageTitle[1]];
    pointsToWin = 2;
    insertImage();
  } else if (event.target.id === "medium") {
    imageArray = [
      imageTitle[0],
      imageTitle[0],
      imageTitle[1],
      imageTitle[1],
      imageTitle[2],
      imageTitle[2],
      imageTitle[3],
      imageTitle[3],
    ];
    pointsToWin = 4;
    insertImage();
  } else if (event.target.id === "hard") {
    imageArray = [
      imageTitle[0],
      imageTitle[0],
      imageTitle[1],
      imageTitle[1],
      imageTitle[2],
      imageTitle[2],
      imageTitle[3],
      imageTitle[3],
      imageTitle[4],
      imageTitle[4],
      imageTitle[5],
      imageTitle[5],
    ];
    pointsToWin = 6;

    insertImage();
  }
}