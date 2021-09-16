'use strict';
let btnRoll = document.querySelector('.roll');
let btnHold = document.querySelector('.hold');
let btnNewGame = document.querySelectorAll('.new-game');
let btnOk = document.querySelector('.ok');
let diceContainer = document.querySelector('.dice-container');
let diceImg = document.querySelector('.dice-container img');
let currentScoreP1 = document.querySelector('.current-score-p1');
let currentScoreP2 = document.querySelector('.current-score-p2');
let scoreP1 = document.querySelector('.score-p1');
let scoreP2 = document.querySelector('.score-p2');
let left = document.querySelector('.left');
let right = document.querySelector('.right');
let infoHeader = document.querySelector('.info-header');
let info = document.querySelector('.info');
let showInfo = document.querySelector('.show-info');
let overlay = document.querySelector('.overlay');

let activePlayer = 'player1';
let currentScore = 0;

// Reset Game
const onNewGame = () => {
  activePlayer = 'player1';
  right.style.backgroundColor = 'rgba(255, 229, 59, 0.5)';
  left.style.backgroundColor = 'rgba(87, 204, 153, 0.6)';
  currentScore = 0;
  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;
  diceImg.classList.add('hidden');
  showInfo.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Show the winner window
const showInfoWindow = () => {
  showInfo.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Dice roll
const onRoll = () => {
  // Roll the dice
  let dice = Math.floor(Math.random() * 5 + 1);

  // Remove hidden class from dice image container
  diceImg.classList.contains('hidden') && diceImg.classList.remove('hidden');

  // Show dice depending on roll
  switch (dice) {
    case 1:
      diceImg.src = './images/dice-1.png';
      // If roll gives 1 then you lose the current score and it does not get added to total score & changes active player
      currentScore = 0;

      // Switches active player
      if (activePlayer === 'player1') {
        activePlayer = 'player2';
        left.style.backgroundColor = 'rgba(255, 229, 59, 0.5)';
        right.style.backgroundColor = 'rgba(87, 204, 153, 0.6)';

        currentScoreP1.textContent = 0;
        diceImg.classList.add('hidden');
      } else {
        activePlayer = 'player1';
        right.style.backgroundColor = 'rgba(255, 229, 59, 0.5)';
        left.style.backgroundColor = 'rgba(87, 204, 153, 0.6)';

        currentScoreP2.textContent = 0;
        diceImg.classList.add('hidden');
      }

      // Shows info window
      showInfoWindow();

      infoHeader.textContent = 'You rolled a 1!';
      info.textContent = 'Next player turn!';
      btnNewGame[1].classList.add('hidden');
      btnOk.classList.remove('hidden');
      break;
    case 2:
      diceImg.src = './images/dice-2.png';
      currentScore += 2;
      break;
    case 3:
      diceImg.src = './images/dice-3.png';
      currentScore += 3;
      break;
    case 4:
      diceImg.src = './images/dice-4.png';
      currentScore += 4;
      break;
    case 5:
      diceImg.src = './images/dice-5.png';
      currentScore += 5;
      break;
    case 6:
      diceImg.src = './images/dice-6.png';
      currentScore += 6;
      break;
    default:
      alert('Oops! Something went wrong!');
      break;
  }

  // Checks which player is active to add score
  activePlayer === 'player1'
    ? (currentScoreP1.textContent = currentScore)
    : (currentScoreP2.textContent = currentScore);

  // Check for winner
  let cScoreP1 = Number(currentScoreP1.textContent);
  let cScoreP2 = Number(currentScoreP2.textContent);
  let totalScoreP1 = Number(scoreP1.textContent);
  let totalScoreP2 = Number(scoreP2.textContent);

  if (cScoreP1 >= 50 || totalScoreP1 >= 50 || cScoreP1 + totalScoreP1 >= 50) {
    // Bring up winner window
    showInfoWindow();

    // Shows the winner
    infoHeader.textContent = 'Player 1 has won!';
    info.textContent = `Score was ${totalScoreP1 + cScoreP1} to ${
      totalScoreP2 + cScoreP2
    }`;
  } else if (
    cScoreP2 >= 50 ||
    totalScoreP2 >= 50 ||
    cScoreP2 + totalScoreP2 >= 50
  ) {
    // Brings up winner window
    showInfoWindow();

    // Shows the winner
    infoHeader.textContent = 'Player 2 has won!';
    info.textContent = `Score was ${totalScoreP2 + cScoreP2} to ${
      totalScoreP1 + cScoreP1
    }`;
  }
};

// Hold
const onHold = () => {
  switch (activePlayer) {
    case 'player1':
      // Switches active player
      activePlayer = 'player2';
      left.style.backgroundColor = 'rgba(255, 229, 59, 0.5)';
      right.style.backgroundColor = 'rgba(87, 204, 153, 0.6)';
      // Gets P1 total score and recalculates it
      let totalScoreP1 = Number(scoreP1.textContent);
      totalScoreP1 += currentScore;
      scoreP1.textContent = totalScoreP1;
      // Resets current score to 0
      currentScoreP1.textContent = 0;
      diceImg.classList.add('hidden');
      break;
    case 'player2':
      // Switches active player
      activePlayer = 'player1';
      right.style.backgroundColor = 'rgba(255, 229, 59, 0.5)';
      left.style.backgroundColor = 'rgba(87, 204, 153, 0.6)';
      // Gets P2 total score and recalculates it
      let totalScoreP2 = Number(scoreP2.textContent);
      totalScoreP2 += currentScore;
      scoreP2.textContent = totalScoreP2;
      // Resets current score to 0
      currentScoreP2.textContent = 0;
      diceImg.classList.add('hidden');
      break;
    default:
      alert('Oops! Something went wrong!');
      break;
  }
  currentScore = 0;
};

const onOk = () => {
  btnNewGame[1].classList.remove('hidden');
  btnOk.classList.add('hidden');
  showInfo.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnRoll.addEventListener('click', onRoll);
btnHold.addEventListener('click', onHold);
btnOk.addEventListener('click', onOk);

for (let i = 0; i < btnNewGame.length; i++) {
  btnNewGame[i].addEventListener('click', onNewGame);
}
