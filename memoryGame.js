const cardArary = [
  {
    name: "fire",
    img: "img/fire.png",
  },
  {
    name: "burger",
    img: "img/burger.png",
  },
  {
    name: "flash",
    img: "img/flash.png",
  },
  {
    name: "gift",
    img: "img/gift.png",
  },
  {
    name: "plant",
    img: "img/plant.png",
  },
  {
    name: "tron",
    img: "img/tron.png",
  },
  {
    name: "ufo",
    img: "img/ufo.png",
  },
  {
    name: "youtube",
    img: "img/youtube.png",
  },
];

let count = 0;
let previousCard;

let firstGues = "";
let secondGuess = "";

const delay = 1000;

const grid = document.querySelector(".grid");

function genarate() {
  // reset innerHTML
  grid.innerHTML = "";
  const concatArr = cardArary.concat(cardArary).sort(() => 0.5 - Math.random()); //cong thuc random array
  concatArr.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = item.name;
    card.style.backgroundImage = `url(${item.img})`;

    // front card
    const front = document.createElement("div");
    front.classList.add("front");

    // back card
    const back = document.createElement("div");
    back.classList.add("back");

    // appendChild
    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);
  });
}

genarate();

grid.addEventListener("click", function (e) {
  const clicked = e.target;
  if (
    clicked.nodeName === "SECTION" ||
    previousCard === clicked ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("matched")
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGues = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }

    // kiem tra giong nhau hôac khac nhau
    if (firstGues && secondGuess) {
      if (firstGues === secondGuess) {
        // handle matching
        setTimeout(matchingCard, delay);
        setTimeout(resetGuess, delay);
      }
      setTimeout(resetGuess, delay);
    }
    previousCard = clicked;
  }

  function matchingCard() {
    const selects = document.querySelectorAll(".selected");
    [...selects].forEach((item) => item.classList.add("matched"));
  }

  function resetGuess() {
    count = 0;
    previousCard = null;
    firstGues = "";
    secondGuess = "";
    const selects = document.querySelectorAll(".selected");
    // khi tro choi xong se tu dong reset lai game
    const matchedAll = document.querySelectorAll(".matched");
    const cardLength = document.querySelectorAll(".card").length;
    [...selects].forEach((item) => item.classList.remove("selected"));
    if ([...matchedAll].length === cardLength) {
      // done game => reset game
      [...matchedAll].forEach((item) => item.classList.remove("matched"));
      setTimeout(genarate, delay);
    }
  }
});
