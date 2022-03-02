console.log("Welcome to Tic Tac Toe");
let turn = new Audio("sounds/click.wav");
let gameOver = new Audio("sounds/victory.wav");
let currentTurn = "X";
let isGameOver = false;
let reset = document.getElementById("reset");
let countTurns = 0; //track the number of turns played for draw condition

//function to change turn
const changeTurn = () => {
  return currentTurn=="X" ? "O": "X";
}

//function to check win
const checkWin = () => {
  let boxtexts = document.getElementsByClassName('boxtext');
  let wins = [
    [0,1,2,5,5,0],
    [3,4,5,5,15,0],
    [6,7,8,5,25,0],
    [0,3,6,-5,15,90],
    [1,4,7,5,15,90],
    [2,5,8,15,15,90],
    [0,4,8,5,15,45],
    [2,4,6,5,15,135]
  ];
  wins.forEach(e => {
    if((boxtexts[e[0]].innerText===boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText===boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText!=="")){
      document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won";
      isGameOver = true;
      document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '100px';
      document.querySelector('.line').style.width = '20vw';
      document.querySelector('.line').style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
      gameOver.play();

    }
  });
}

//Game logic
let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach(element => {
  let boxtext = element.querySelector('.boxtext');
  element.addEventListener('click', () => {
    if(boxtext.innerText === ""){
      countTurns+=1;
      boxtext.innerText = currentTurn;
      currentTurn = changeTurn();
      turn.play();
      checkWin();
      if(!isGameOver && countTurns==9){ //draw
        document.getElementsByClassName("info")[0].innerText = "It is a draw";
      }
      else if(isGameOver==false){//turns
        document.getElementsByClassName("info")[0].innerText = "Turn for "+currentTurn;
      }
    }
  });
});

reset.addEventListener('click', () => {
  let boxtexts = document.querySelectorAll('.boxtext');
  Array.from(boxtexts).forEach(boxtext => {
    boxtext.innerText = "";
  });
  currentTurn = "X";
  isGameOver = false;
  countTurns = 0;
  document.getElementsByClassName("info")[0].innerText = "Turn for "+currentTurn;
  document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0px';
  document.querySelector('.line').style.width = '0vw';
});
