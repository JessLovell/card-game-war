'use strict';

var completeDeck = []; //array to hold all cards in completeDeck
var computerPlayerDeck = [];
var userPlayerDeck = [];
var computerHoldPile = [];
var userHoldPile = [];
var gamePlayField = [];

var playerName = localStorage.getItem('player');
var setSelection = localStorage.getItem('sets');


var userEl = document.getElementById('in-play-user');
var cpuEl = document.getElementById('in-play-cpu');

var clickCounter = 0;
var maxClicks = 0;

var sets = 0;
var userSetWins = 0;
var cpuSetWins = 0;

function displayPlayerName () {
  document.getElementById('user').innerHTML = playerName;
}
displayPlayerName();

function displayStats () {
  document.getElementById('header-set').innerHTML = 'Best of ' + JSON.parse(setSelection);
  document.getElementById('cpu-score-value').innerHTML = computerHoldPile.length + ' / Sets ' + JSON.parse(setSelection);
  document.getElementById('user-score-value').innerHTML = userHoldPile.length + ' / Sets ' + JSON.parse(setSelection);
}




function DeckCreator (name, value){
  this.name = name;
  this.path = `img/${name}.png`;
  this.value = value;
  completeDeck.push(this);
}

function makeEachCard (){
  var CARD_COUNT = 15;
  for (var i = 2; i < CARD_COUNT; i++){

    var suits = ['C', 'D', 'H', 'S'];
    for( var j = 0; j < suits.length; j++){
      if (i < 11){
        new DeckCreator(`${i}${suits[j]}`, i);
      } else if (i === 11){
        new DeckCreator(`J${suits[j]}`, i);
      } else if (i === 12){
        new DeckCreator(`Q${suits[j]}`, i);
      } else if (i === 13){
        new DeckCreator(`K${suits[j]}`, i);
      } else {
        new DeckCreator(`A${suits[j]}`, i);
      }
    }
  }
}

// Using this function, you can pass any array to be shuffled. Change in the parameter passed into "completeDeck".
function shuffleDeck (){
  var unshuffled = completeDeck.length, placeholder, randomIndex;
  while (unshuffled){
    randomIndex = Math.floor(Math.random() * unshuffled--);
    placeholder = completeDeck[unshuffled];
    completeDeck[unshuffled] = completeDeck[randomIndex];
    completeDeck[randomIndex] = placeholder;
  }
}

function dealTheDeck (){
  computerPlayerDeck = completeDeck.splice(25, 26);
  userPlayerDeck = completeDeck;
}

//WE NEED THIS FUNCTION TO MA
function chooseYourCard (){
  var computerCard = computerPlayerDeck[0].name;
  var userCard = userPlayerDeck[0].name;

  gamePlayField = [computerPlayerDeck[0], userPlayerDeck[0]];
}

function displayCard (){
  //display stuff
}

function compareCards (){
  console.log(computerPlayerDeck[0].value, userPlayerDeck[0].value);
  if (computerPlayerDeck[0].value > userPlayerDeck[0].value){
    computerHoldPile.push(computerPlayerDeck[0]);
    computerHoldPile.push(userPlayerDeck[0]);

    computerPlayerDeck.splice(0, 1);
    userPlayerDeck.splice(0, 1);
  }
  else if (userPlayerDeck[0].value > computerPlayerDeck[0].value){
    userHoldPile.push(computerPlayerDeck[0]);
    userHoldPile.push(userPlayerDeck[0]);

    computerPlayerDeck.splice(0, 1);
    userPlayerDeck.splice(0, 1);
  } else {
    triggerImage('img/prepare-for-war.png', 'start-war-img');
    document.getElementById('overlay').addEventListener('click', startWarEventHandler);
    console.log('war is triggered');
  }
  displayStats();

}

function triggerImage (path, description) {
  var mainEl = document.getElementById('overlay');
  var imgEl = document.createElement('img');

  imgEl.src = path;
  imgEl.alt = description;
  imgEl.title = 'start-war-image';
  imgEl.id = 'start-war';

  mainEl.appendChild(imgEl);
  document.getElementById('user-deck').removeEventListener('click', userDeckClick);
}

function startWarEventHandler (event) {
  var imgEl = document.getElementById('overlay');
  if (event.target.title === 'start-war-image'){
    imgEl.parentNode.removeChild(imgEl);
  }
  callWarCard();
  setTimeout(resetPlayingField, 3000);
}

function warCardFlip (path, divId) {
  var divEl = document.getElementById(divId);
  var imgEl = document.createElement('img');

  imgEl.src = path;
  imgEl.alt = 'sacrifice';
  imgEl.title = 'sacrifice';
  imgEl.id = 'sacrifice';

  divEl.appendChild(imgEl);
}


function callWarCard () {
  document.getElementById('user-deck').addEventListener('click', userDeckClick);
  var sacrificeCards = ['img/purple_back.png','img/purple-two.png','img/purple-three.png'];
  var userDivId = 'user-war-three';
  var cpuDivId = 'cpu-war-three';
  var lastIndex = 0;
  if (userPlayerDeck.length > 5 && computerPlayerDeck.length > 5){
    warCardFlip(sacrificeCards[2], userDivId);
    warCardFlip(sacrificeCards[2], cpuDivId);
    lastIndex = 4;
  } else if (userPlayerDeck.length === 4 && computerPlayerDeck.length === 4){
    warCardFlip(sacrificeCards[1], userDivId);
    warCardFlip(sacrificeCards[1], cpuDivId);
    lastIndex = 3;
  } else if (userPlayerDeck.length === 3 && computerPlayerDeck.length === 3){
    warCardFlip(sacrificeCards[0], userDivId);
    warCardFlip(sacrificeCards[0], cpuDivId);
    lastIndex = 2;
  } else {
    lastIndex = 1;
  } 
  userEl.src = userPlayerDeck[lastIndex].path;
  cpuEl.src = computerPlayerDeck[lastIndex].path;
  war();
}

function war (){
  if (computerPlayerDeck.length > 5 && userPlayerDeck.length > 5){
    if (computerPlayerDeck[4].value > userPlayerDeck[4].value){
      computerHoldPile.push(computerPlayerDeck[0,1,2,3,4]);
      computerHoldPile.push(userPlayerDeck[0,1,2,3,4]);
      computerPlayerDeck.splice(0,5);
      userPlayerDeck.splice(0,5);
    }
  } else {
    if (computerPlayerDeck[4].value < userPlayerDeck[4].value){
      userHoldPile.push(userPlayerDeck[0,1,2,3,4]);
      userHoldPile.push(computerPlayerDeck[0,1,2,3,4]);
      computerPlayerDeck.splice(0,5);
      userPlayerDeck.splice(0,5);
    }
  }
  if (computerPlayerDeck.length > 4 && userPlayerDeck.length > 4){
    if (computerPlayerDeck[3].value > userPlayerDeck[3].value){
      computerHoldPile.push(computerPlayerDeck[0,1,2,3]);
      computerHoldPile.push(userPlayerDeck[0,1,2,3]);
      computerPlayerDeck.splice(0,4);
      userPlayerDeck.splice(0,4);
    } else {
      if (computerPlayerDeck[3].value < userPlayerDeck[3].value){
        userHoldPile.push(userPlayerDeck[0,1,2,3]);
        userHoldPile.push(computerPlayerDeck[0,1,2,3]);
        computerPlayerDeck.splice(0,4);
        userPlayerDeck.splice(0,4);
      }
    }
  }if (computerPlayerDeck.length > 3 && userPlayerDeck.length > 3){
    if (computerPlayerDeck[2].value > userPlayerDeck[2].value){
      computerHoldPile.push(computerPlayerDeck[0,1,2]);
      computerHoldPile.push(userPlayerDeck[0,1,2]);
      computerPlayerDeck.splice(0,3);
      userPlayerDeck.splice(0,3);
    } else {
      if (computerPlayerDeck[2].value < userPlayerDeck[2].value){
        userHoldPile.push(userPlayerDeck[0,1,2]);
        userHoldPile.push(computerPlayerDeck[0,1,2]);
        computerPlayerDeck.splice(0,3);
        userPlayerDeck.splice(0,3);
      }
    }
  }if (computerPlayerDeck.length > 2 && userPlayerDeck.length > 2){
    if (computerPlayerDeck[1].value > userPlayerDeck[1].value){
      computerHoldPile.push(computerPlayerDeck[0,1]);
      computerHoldPile.push(userPlayerDeck[0,1]);
      computerPlayerDeck.splice(0,2);
      userPlayerDeck.splice(0,2);
    } else {
      if (computerPlayerDeck[1].value < userPlayerDeck[1].value){
        userHoldPile.push(userPlayerDeck[0,1]);
        userHoldPile.push(computerPlayerDeck[0,1]);
        computerPlayerDeck.splice(0,2);
        userPlayerDeck.splice(0,2);
      }
    }
  }if (computerPlayerDeck.length > 1 && userPlayerDeck.length > 1){
    computerHoldPile.push(computerPlayerDeck[0]);
    userHoldPile.push(userPlayerDeck[0]);
    computerPlayerDeck.splice(0,1);
    userPlayerDeck.splice(0,1);
    return;
  }
  //place remove war cards function here
}

function removeWarCards() {

}

makeEachCard();
shuffleDeck();
dealTheDeck();
chooseYourCard();

function userDeckClick(){
  if (computerPlayerDeck.length === 0 && userPlayerDeck.length === 0) {
    console.log('End of Game');
    declareWinner();
    document.getElementById('start-war').addEventListener('click', startWarEventHandler);
  }
  userEl.src = userPlayerDeck[0].path;
  cpuEl.src = computerPlayerDeck[0].path;
  setTimeout(compareCards(), 2000);
  setTimeout(resetPlayingField, 2000);
  clickCounter++;
}


function resetPlayingField(){
  userEl.src = 'img/yellow_back.png';
  cpuEl.src = 'img/purple_back.png';
}

document.getElementById('user-deck').addEventListener('click', userDeckClick);

function declareWinner() {
  console.log('Declare Winner');
  if (userPlayerDeck.length === 0 && computerPlayerDeck.length === 0) {
    if(userHoldPile < computerHoldPile){
      sets++;
      userSetWins++;
    } else if (userHoldPile > computerHoldPile) {
      sets++;
      cpuSetWins++;
    } else {
      //add something
    }
  }
  triggerImage('img/honor_diamond.png', 'set-winner');
}

