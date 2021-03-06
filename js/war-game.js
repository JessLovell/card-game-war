'use strict';

var completeDeck = [];
var computerPlayerDeck = [];
var userPlayerDeck = [];
var computerHoldPile = [];
var userHoldPile = [];

var playerName = localStorage.getItem('player');
var setSelection = localStorage.getItem('sets');

var userEl = document.getElementById('in-play-user');
var cpuEl = document.getElementById('in-play-cpu');

var sets = 0;
var userSetWins = 0;
var cpuSetWins = 0;

function displayPlayerName() {
  document.getElementById('user').innerHTML = playerName;
}

function displayStats() {
  document.getElementById('header-set').innerHTML = 'Best of ' + JSON.parse(setSelection);
  document.getElementById('cpu-score-value').innerHTML = computerHoldPile.length + ' / Sets Won: ' + userSetWins;
  document.getElementById('user-score-value').innerHTML = userHoldPile.length + ' / Sets Won: ' + cpuSetWins;
}

function DeckCreator(name, value) {
  this.name = name;
  this.path = `img/${name}.png`;
  this.value = value;
  completeDeck.push(this);
}

function makeEachCard() {
  var CARD_COUNT = 15;
  for (var i = 2; i < CARD_COUNT; i++) {

    var suits = ['C', 'D', 'H', 'S'];
    for (var j = 0; j < suits.length; j++) {
      if (i < 11) {
        new DeckCreator(`${i}${suits[j]}`, i);
      } else if (i === 11) {
        new DeckCreator(`J${suits[j]}`, i);
      } else if (i === 12) {
        new DeckCreator(`Q${suits[j]}`, i);
      } else if (i === 13) {
        new DeckCreator(`K${suits[j]}`, i);
      } else {
        new DeckCreator(`A${suits[j]}`, i);
      }
    }
  }
}

// Using this function, you can pass any array to be shuffled. Change in the parameter passed into "completeDeck".
function shuffleDeck() {
  var unshuffled = completeDeck.length, placeholder, randomIndex;
  while (unshuffled) {
    randomIndex = Math.floor(Math.random() * unshuffled--);
    placeholder = completeDeck[unshuffled];
    completeDeck[unshuffled] = completeDeck[randomIndex];
    completeDeck[randomIndex] = placeholder;
  }
}

function dealTheDeck() {
  computerPlayerDeck = completeDeck.splice(20, 26);
  userPlayerDeck = completeDeck;
}

function compareCards() {
  console.log(computerPlayerDeck[0].value, userPlayerDeck[0].value);
  if (computerPlayerDeck[0].value > userPlayerDeck[0].value) {
    computerHoldPile.push(computerPlayerDeck[0]);
    computerHoldPile.push(userPlayerDeck[0]);

    computerPlayerDeck.splice(0, 1);
    userPlayerDeck.splice(0, 1);
  }
  else if (userPlayerDeck[0].value > computerPlayerDeck[0].value) {
    userHoldPile.push(computerPlayerDeck[0]);
    userHoldPile.push(userPlayerDeck[0]);

    computerPlayerDeck.splice(0, 1);
    userPlayerDeck.splice(0, 1);
  }
  else {
    triggerImage('img/prepare-for-war.png', 'start-war-img');
    document.getElementById('overlay').addEventListener('click', startWarEventHandler);
    console.log('war is triggered');
  }
}

function triggerImage(path, description) {
  var mainEl = document.getElementById('overlay');
  var imgEl = document.createElement('img');

  imgEl.src = path;
  imgEl.alt = description;
  imgEl.title = 'start-war-image';
  imgEl.id = 'start-war';

  mainEl.appendChild(imgEl);
  document.getElementById('user-deck').removeEventListener('click', userDeckClick);
}

function startWarEventHandler(event) {
  var imgEl = document.getElementById('start-war');
  if (event.target.title === 'start-war-image') {
    imgEl.parentNode.removeChild(imgEl);
  }
  callWarCard();
  setTimeout(resetPlayingField, 3000);
}

function warCardFlip(path, divId) {
  var divEl = document.getElementById(divId);
  var imgEl = document.createElement('img');

  imgEl.src = path;
  imgEl.alt = 'sacrifice';
  imgEl.title = 'sacrifice';
  imgEl.className = 'sacrifice';

  divEl.appendChild(imgEl);
}


function callWarCard() {
  document.getElementById('user-deck').addEventListener('click', userDeckClick);

  var sacrificeUserCards = ['img/purple_back.png','img/purple-two.png','img/purple-three.png'];
  var sacrificeCpuCards = ['img/yellow_back.png','img/yellow-two.png','img/yellow-three.png'];

  var userDivId = 'cpu-war-three';
  var cpuDivId = 'user-war-three';

  var lastIndex = 0;

  if (userPlayerDeck.length > 5 || computerPlayerDeck.length > 5) {
    warCardFlip(sacrificeUserCards[2], userDivId);
    warCardFlip(sacrificeCpuCards[2], cpuDivId);
    lastIndex = 4;
  }
  else if (userPlayerDeck.length === 4 || computerPlayerDeck.length === 4){
    warCardFlip(sacrificeUserCards[1], userDivId);
    warCardFlip(sacrificeCpuCards[1], cpuDivId);
    lastIndex = 3;
  }
  else if (userPlayerDeck.length === 3 || computerPlayerDeck.length === 3){
    warCardFlip(sacrificeUserCards[0], userDivId);
    warCardFlip(sacrificeCpuCards[0], cpuDivId);
    lastIndex = 2;
  }
  else {
    lastIndex = 1;
  }
  userEl.src = userPlayerDeck[lastIndex].path;
  cpuEl.src = computerPlayerDeck[lastIndex].path;

  war();
  setTimeout(removeWarCards, 1000);
}

function war (){
  if (computerPlayerDeck.length > 5 && userPlayerDeck.length > 5){
    if (computerPlayerDeck[4].value > userPlayerDeck[4].value){
      computerHoldPile.push(...computerPlayerDeck.splice(0,5));
      computerHoldPile.push(...userPlayerDeck.splice(0,5));
      console.log('cpuWin5');
    } else {
      if (computerPlayerDeck[4].value < userPlayerDeck[4].value){
        userHoldPile.push(...computerPlayerDeck.splice(0,5));
        userHoldPile.push(...userPlayerDeck.splice(0,5));
        console.log('userWin5');
      }
    }
  }
  else if (computerPlayerDeck.length > 4 && userPlayerDeck.length > 4){
    if (computerPlayerDeck[3].value > userPlayerDeck[3].value){
      computerHoldPile.push(...computerPlayerDeck.splice(0,4));
      computerHoldPile.push(...userPlayerDeck.splice(0,4));
      console.log('cpuWin4');
    } else {
      if (computerPlayerDeck[3].value < userPlayerDeck[3].value){
        userHoldPile.push(...computerPlayerDeck.splice(0,4));
        userHoldPile.push(...userPlayerDeck.splice(0,4));
        console.log('userWin4');
      }
    }
  }
  else if (computerPlayerDeck.length > 3 && userPlayerDeck.length > 3){
    if (computerPlayerDeck[2].value > userPlayerDeck[2].value){
      computerHoldPile.push(...computerPlayerDeck.splice(0,3));
      computerHoldPile.push(...userPlayerDeck.splice(0,3));
      console.log('cpuWin3');
    } else {
      if (computerPlayerDeck[2].value < userPlayerDeck[2].value){
        userHoldPile.push(...userPlayerDeck.splice(0,3));
        userHoldPile.push(...computerPlayerDeck.splice(0,3));
        console.log('userWin3');
      }
    }
  }
  else if (computerPlayerDeck.length > 2 && userPlayerDeck.length > 2){
    if (computerPlayerDeck[1].value > userPlayerDeck[1].value){
      computerHoldPile.push(...computerPlayerDeck.splice(0,2));
      computerHoldPile.push(...userPlayerDeck.splice(0,2));
      console.log('cpuWin2');
    } else {
      if (computerPlayerDeck[1].value < userPlayerDeck[1].value){
        userHoldPile.push(...userPlayerDeck.splice(0,2));
        userHoldPile.push(...computerPlayerDeck.splice(0,2));
        console.log('userWin2');
      }
    }
  }
  else if (computerPlayerDeck.length > 1 && userPlayerDeck.length > 1) {
    computerHoldPile.push(...computerPlayerDeck.splice(0,1));
    userHoldPile.push(...userPlayerDeck.splice(0,1));
    console.log('warTie');
    return;
  }
}

function removeWarCards() {
  var elements = document.getElementsByClassName('sacrifice');
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function userDeckClick() {
  if (userPlayerDeck.length === 0 && computerPlayerDeck.length === 0) {
    declareWinner();
  } else {
    //set images to compare
    userEl.src = userPlayerDeck[0].path;
    cpuEl.src = computerPlayerDeck[0].path;

    //compare and reset cards
    setTimeout(compareCards(), 2000);
    setTimeout(resetPlayingField, 2000);
  }
  //display Stats
  displayStats();
}

function resetPlayingField() {
  userEl.src = 'img/yellow_back.png';
  cpuEl.src = 'img/purple_back.png';
}

document.getElementById('user-deck').addEventListener('click', userDeckClick);

function declareWinner() {
  console.log('Declare Winner');
  if (userPlayerDeck.length === 0 && computerPlayerDeck.length === 0) {
    if (userHoldPile < computerHoldPile) {
      triggerImage('img/set-loss.png', 'user-loses-set');
      sets++;
      userSetWins++;
    } else if (userHoldPile > computerHoldPile) {
      triggerImage('img/set-win.png', 'user-wins-set');
      sets++;
      cpuSetWins++;
    } else {
      triggerImage('img/rematch.png', 'tie');
    }
  }
  document.getElementById('overlay').addEventListener('click', resetSet);
}

function runTheCode() {
  completeDeck = [];
  computerPlayerDeck = [];
  userPlayerDeck = [];
  computerHoldPile = [];
  userHoldPile = [];
  
  userEl = document.getElementById('in-play-user');
  cpuEl = document.getElementById('in-play-cpu');

  makeEachCard();
  shuffleDeck();
  displayPlayerName();
  displayStats();
  dealTheDeck();

  document.getElementById('user-deck').addEventListener('click', userDeckClick);
}

runTheCode();


function resetSet (event){
  if (sets <= JSON.parse(setSelection) || event.target.title === 'start-war-image'){
    document.getElementById('overlay').removeEventListener('click', resetSet);
    document.getElementById('user-deck').addEventListener('click', userDeckClick);

    runTheCode();
    console.log('reset the Sets');
  }
  if (sets === JSON.parse(setSelection)){
    document.getElementById('overlay').addEventListener('click', userDeckClick);
    if (userSetWins > cpuSetWins) {
      endGame('img/total-victory.png', 'you-win');
    } else if (userSetWins < cpuSetWins) {
      endGame('img/total-loss.png', 'you-lose');
    }
  } 
}

function endGame(path, description) {
  console.log('end the Game');
  var mainEl = document.getElementById('overlay');
  var aEl = document.createElement('a');

  aEl.href = '../index.html';
  aEl.id = 're-direct';
  aEl.textContent = triggerImage(path, description);

  mainEl.appendChild(aEl);
  document.getElementById('user-deck').removeEventListener('click', userDeckClick);
}


// function setWinnerEventHandler (event){
//   var imgEl = document.getElementById('start-war');
//   if (event.target.title === 'start-war-image'){
//     imgEl.parentNode.removeChild(imgEl);

//   }
// }