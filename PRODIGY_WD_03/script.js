let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let modeSelect = document.getElementById('mode-select');
let isSinglePlayer = false;


let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];


let xTurn = true;
let count = 0;


const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};

const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
};

const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

const resetGame = () => {
  count = 0;
  xTurn = true;
  enableButtons();
  modeSelect.style.display = "block";
};

newgameBtn.addEventListener("click", resetGame);

restartBtn.addEventListener("click", resetGame);

const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
        return;
      }
    }
  }
  if (count === 9) {
    drawFunction();
  }
};

const computerMove = () => {
  const getBestMove = () => {
    for (let i of winningPattern) {
      let [a, b, c] = i;
      if (btnRef[a].innerText === btnRef[b].innerText &&
          btnRef[a].innerText === "O" && 
          btnRef[c].innerText === "") {
        return c;
      }
      if (btnRef[b].innerText === btnRef[c].innerText &&
          btnRef[b].innerText === "O" && 
          btnRef[a].innerText === "") {
        return a;
      }
      if (btnRef[a].innerText === btnRef[c].innerText &&
          btnRef[a].innerText === "O" && 
          btnRef[b].innerText === "") {
        return b;
      }
    }

    for (let i of winningPattern) {
      let [a, b, c] = i;
      if (btnRef[a].innerText === btnRef[b].innerText &&
          btnRef[a].innerText === "X" && 
          btnRef[c].innerText === "") {
        return c;
      }
      if (btnRef[b].innerText === btnRef[c].innerText &&
          btnRef[b].innerText === "X" && 
          btnRef[a].innerText === "") {
        return a;
      }
      if (btnRef[a].innerText === btnRef[c].innerText &&
          btnRef[a].innerText === "X" && 
          btnRef[b].innerText === "") {
        return b;
      }
    }

    if (btnRef[4].innerText === "") {
      return 4;
    }

    let corners = [0, 2, 6, 8];
    for (let corner of corners) {
      if (btnRef[corner].innerText === "") {
        return corner;
      }
    }

    let availableCells = [];
    btnRef.forEach((btn, index) => {
      if (btn.innerText === "") {
        availableCells.push(index);
      }
    });
    return availableCells[Math.floor(Math.random() * availableCells.length)];
  };

  let move = getBestMove();
  btnRef[move].innerText = "O";
  btnRef[move].disabled = true;
  count += 1;
  winChecker();
  xTurn = true;
};

btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (!element.innerText && (xTurn || !isSinglePlayer)) {
      element.innerText = xTurn ? "X" : "O";
      element.disabled = true;
      count += 1;
      winChecker();
      xTurn = !xTurn;
      if (isSinglePlayer && count < 9 && !xTurn) {
        setTimeout(computerMove, 500);
      }
    }
  });
});

modeSelect.addEventListener("change", (event) => {
  const mode = event.target.value;
  if (mode === "player-vs-player") {
    isSinglePlayer = false;
  } else if (mode === "player-vs-computer") {
    isSinglePlayer = true;
  }
  resetGame();
});

window.onload = () => {
  enableButtons();
  modeSelect.style.display = "block";
};
