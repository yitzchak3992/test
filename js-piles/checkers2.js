const boardElement = document.querySelector("#board");
const main = document.querySelector("main");
let redTurn = true;
let boardArr = [];
for (let i = 0; i < 8; i++) {
  const arr = [];
  for (let j = 0; j < 8; j++) {
    const square = document.createElement("div");
    square.setAttribute("i", `${i}`);
    square.setAttribute("j", `${j}`);

    if (i % 2 == 0) {
      if (j % 2 == 0) {
        square.className = "square white";
      } else {
        square.className = "square black";
      }
    } else {
      if (j % 2 == 1) {
        square.className = "square white";
      } else {
        square.className = "square black";
      }
    }
    arr.push(square);
    boardElement.append(square);
  }
  boardArr.push(arr);
}

const dataGame = [
  [-1, 1, -1, 1, -1, 1, -1, 1],
  [1, -1, 1, -1, 1, -1, 1, -1],
  [-1, 1, -1, 1, -1, 1, -1, 1],
  [0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0],
  [2, -1, 2, -1, 2, -1, 2, -1],
  [-1, 2, -1, 2, -1, 2, -1, 2],
  [2, -1, 2, -1, 2, -1, 2, -1],
];

const arrangeScreen = () => {
  dataGame.forEach((arrBlock, i) => {
    arrBlock.forEach((block, j) => {
      if (boardArr[i][j].classList.contains("pieceBlack")) {
        boardArr[i][j].classList.remove("pieceBlack");
      }
      if (boardArr[i][j].classList.contains("pieceRed")) {
        boardArr[i][j].classList.remove("pieceRed");
      }
      if (block === 1) {
        boardArr[i][j].classList.add("pieceBlack");
      }
      if (block === 2) {
        boardArr[i][j].classList.add("pieceRed");
      }
    });
  });
};

main.addEventListener("click", whoCanMove);
arrangeScreen();

// whoCanMove();

function lightOptions() {
  possibleGetThere.forEach((IJ) => {
    boardArr[IJ[0]][IJ[1]].classList.toggle("options");
  });
}
let ClickOnIt = false;
let possibleGetThere = [];

function whoCanMove(e) {
  const i = Number(e.target.getAttribute("i"));
  const j = Number(e.target.getAttribute("j"));

  if (!ClickOnIt) {
    if (dataGame[i][j] === 0 || dataGame[i][j] === -1) return;
    ClickOnIt = e.target;
  } else {
    const getThere = possibleGetThere.find(
      (arr) => arr[0] === i && arr[1] === j
    );
    if (getThere) {
      iSource = ClickOnIt.getAttribute("i");
      jSource = ClickOnIt.getAttribute("j");
      dataGame[i][j] = dataGame[iSource][jSource];
      dataGame[iSource][jSource] = 0;
      for (let k = 0; k < getThere[2].length; k += 2) {
        dataGame[getThere[2][k]][getThere[2][k + 1]] = 0;
      }
      redTurn = !redTurn;
      arrangeScreen();
    }
    if (dataGame[i][j] === 0 || dataGame[i][j] === -1) return;
    ClickOnIt = e.target;
  }
  lightOptions();
  possibleGetThere = [];

  let row = 1;
  if (redTurn) {
    if (ClickOnIt.classList.contains("pieceBlack")) {
      return;
    }
    row = -1;
  } else {
    if (ClickOnIt.classList.contains("pieceRed")) return;
  }
  let CanMove = false;
  if (dataGame[i + row][j - 1] === 0) {
    CanMove = true;
    possibleGetThere.push([i + row, j - 1, []]);
  }
  if (dataGame[i + row][j + 1] == 0) {
    CanMove = true;
    possibleGetThere.push([i + row, j + 1, []]);
  }
  eatEnemy(i, j, row);
  function eatEnemy(i, j, row) {
    let enemy;
    if (redTurn) {
      enemy = 1;
    } else {
      enemy = 2;
    }
    // Checks if there is an enemy on the left side
    if (
      dataGame[i + row][j - 1] == enemy ||
      dataGame[i + row][j - 1] == enemy * 10
    ) {
      //hecks if there is a free space after the enemy
      if (dataGame[i + row + row][j - 2] == 0) {
        // Checking if this is the first enemy he eats or if it is the second or more
        if (
          possibleGetThere[possibleGetThere.length - 1][0] === i &&
          possibleGetThere[possibleGetThere.length - 1][1] === j
        ) {
          possibleGetThere.push([
            i + row + row,
            j - 2,
            [...possibleGetThere[possibleGetThere.length - 1][2]].push(
              i + row,
              j - 1
            ),
          ]);
        }
        // this is the first enemy he eats
        else {
          possibleGetThere.push([i + row + row, j - 2, [i + row, j - 1]]);
        }
        // Recursive call to check if it is possible to eat another enemy
        eatEnemy(i + row + row, j - 2, row);
      }
    }
    // Checks if there is an enemy on the right side
    if (
      dataGame[i + row][j + 1] == enemy ||
      dataGame[i + row][j + 1] == enemy * 10
    ) {
      //hecks if there is a free space after the enemy
      if (dataGame[i + row + row][j + 2] == 0) {
        // Checking if this is the first enemy he eats or if it is the second or more
        if (
          possibleGetThere[possibleGetThere.length - 1][0] === i &&
          possibleGetThere[possibleGetThere.length - 1][1] === j
        ) {
          possibleGetThere.push([
            i + row + row,
            j + 2,
            [...possibleGetThere[possibleGetThere.length - 1][2]].push(
              i + row,
              j + 1
            ),
          ]);
        }
        // this is the first enemy he eats
        else {
          possibleGetThere.push([i + row + row, j + 2, [i + row, j + 1]]);
        }
        // Recursive call to check if it is possible to eat another enemy
        eatEnemy(i + row + row, j + 2, row);
      }
    }
  }

  lightOptions();
}
