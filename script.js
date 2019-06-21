'use strict';
(function() {

var buttonPaper = document.getElementById('paper-button');
var buttonRock = document.getElementById('rock-button');
var buttonScissors = document.getElementById('scissors-button');
var outputRandom = document.getElementById('random');
var outputScore = document.getElementById('score');
var buttonRounds = document.getElementById('rounds-button');
var overlay = document.querySelector('#modal-overlay');
var resultsTableModal = document.querySelector('.result');

const PAPER = 1; 
const ROCK  = 2; 
const SCISSORS = 3;

var params = {
  rounds: 1,
  howManyRounds: 0, 
  playerWin: 0, 
  computerWin: 0,
  progress: []
}

buttonRounds.addEventListener('click', function(){
	params.rounds = 0;
  outputScore.innerHTML = "";
  
  params.howManyRounds = window.prompt('Ile rund ma trwać gra?');
  params.roundsCounted = params.howManyRounds;
  document.querySelector('.table').innerHTML = ""; 
  document.querySelector('.table2').innerHTML = ""; 
  params.progress = [];
}); 
 
var buttons = [...document.querySelectorAll(".player-move")];
console.log(buttons);
for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(event) { 
      if(params.howManyRounds > params.rounds) {
        const userMove = Number(event.target.getAttribute('data-move'));
        playerMove(userMove);
        for (var i = 0; i > params.progress.length; i+1) {
          console.log("param: " + params.progress[i]);
        }
        if(params.howManyRounds == params.rounds) {
          console.log("params: " + params.progress.length);
          setTimeout(function() {
            var table = document.querySelector('.table'); 
            var table2 = document.querySelector('.table2'); 
            // resultsTableModal.querySelector('p').innerHTML = "Coś tutaj będzie!";
            console.log(table); 
            console.log(params.itemList);
            var counterFirst = 0; 
            var counterSecond = 1; 
            var winOrLoss = ""; 
            var counterFirstSum = 0;
            var counterSecondSum = 0; 
            var andTheWinnerIs = ""; 
              for(var i = 0; i < params.progress.length/2; i++) { 
              if(!params.progress[counterFirst] && params.progress[counterSecond]) {
                winOrLoss = "Wygrana komputera"; 
              } else if(params.progress[counterFirst] && !params.progress[counterSecond]) {
                winOrLoss = "Wygrana Gracza";
              } else {
                winOrLoss = "Remis";
              }
              counterFirstSum += params.progress[counterFirst];
              counterSecondSum += params.progress[counterSecond];
              console.log(counterFirstSum);
              console.log(counterSecondSum);
              table.innerHTML += '<tr><td>' +  (i+1)  + '</td><td>'  + params.progress[counterFirst] +  '</td><td>' + params.progress[counterSecond] + '</td><td>' + winOrLoss + '</td></tr>';
              console.log(params.progress);
              counterFirst += 2;
              counterSecond += 2;
            }
            if(counterFirstSum > counterSecondSum) {
              andTheWinnerIs = "Zwycięża gracz :) "; 
            } else if (counterSecondSum > counterFirstSum) {
              andTheWinnerIs = "Zwycięża komputer :("
            } else {
              andTheWinnerIs = "Remis!"; 
            }
            table2.innerHTML += '<th>' + 'Zwycięzcą jest: ' + '</th>' + '<tr><td><p class="theWinner">' + andTheWinnerIs + '</p></td></tr>';
            overlay.classList.add('show');
            resultsTableModal.classList.add('show');
          }, 2000)
        }
      } else {
         alert('Nie masz już więcej rund. Kliknij Nowa Gra!');
      }  
    }); 
}

var clearParams = function () {
  params.rounds = 0; 
  params.howManyRounds = 0; 
  params.playerWin = 0; 
  params.computerWin = 0;
}
/*-----------------------------------------------------*/
const modals = document.querySelectorAll('.modal');

var showModal = function(queriedItem){
  console.log(queriedItem);
  for(let i = 0; i < modals.length; i++){
    modals[i].classList.remove('show');
  }
  overlay.classList.add('show');
  document.querySelector(queriedItem).classList.add('show');
};

var hideModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
}
/*------------------------------------------------------*/
function playerMove(userNumber) {
  var ileJeszcze = params.howManyRounds;
  var randomNumber = randomNo();
 
  if (userNumber === randomNumber) {
    // alert('Remis!');
    params.progress.push(0);
    params.progress.push(0); 
    showModal('#modal-two');
  } else if (userNumber === PAPER) {
      if (randomNumber === ROCK) {
          //  alert('Papier obwija kamień. Wygrywasz!');
          params.progress.push(1);
          params.progress.push(0); 
          showModal('#modal-three');
          params.playerWin++; 
        } else if (randomNumber === SCISSORS) {
          // alert('Nożyce tną papier. Niestety przegrywasz :(');
          params.progress.push(0);
          params.progress.push(1); 
          showModal('#modal-four');
          params.computerWin++;
       } 
  } else if (userNumber === ROCK) {
      if (randomNumber === PAPER) {
          //  alert('Papier obwija kamień. Niestety przegrywasz :(');
          params.progress.push(0);
          params.progress.push(1);
          showModal('#modal-five');
           params.computerWin++;
        } else if (randomNumber === SCISSORS) {
            // alert('Nożyce strzępią sie o kamień. Wygrywasz!');
            params.progress.push(1);
            params.progress.push(0);
            showModal('#modal-six');
            params.playerWin++;
        } 
  } else if (userNumber === SCISSORS) {
      if (randomNumber === PAPER) {
          //  alert('Nożyce tną papier. Wygrywasz!');
           params.progress.push(1);
           params.progress.push(0);
           showModal('#modal-seven');
           params.playerWin++;
        } else if (randomNumber === ROCK) {
            // alert('Nożyce strzępią sie o kamień. Przegrywasz :()');
            params.progress.push(0);
            params.progress.push(1);
           showModal('#modal-eight');
           params.computerWin++; 
       } 
    }
    console.log(userNumber);
    console.log(randomNumber);
    params.rounds += 1;
    console.log(params.progress);
  // outputScore.innerHTML = 'Komputer: ' + params.computerWin + ' User: ' + params.playerWin + '<br><br>' + outputScore.innerHTML;
}
function randomNo() {
  var randomNumber = Math.floor(Math.random() * 3) + 1;
  return randomNumber; 
}
})();
