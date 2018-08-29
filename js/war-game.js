'use strict';

var completeDeck = []; //array to hold all cards in completeDeck
var computerPlayerDeck = [];
var userPlayerDeck = [];
var computerHoldPile = [];
var userHoldPile = [];
var gamePlayField = [];

var playerName = localStorage.getItem('player');
var setSelection = localStorage.getItem('sets');

var userCardTracker = 0;
var computerCardTracker = 0;

var userEl = document.getElementById('in-play-user');
var cpuEl = document.getElementById('in-play-cpu');

var clickCounter = 0;
var maxClicks = 0;


function displayPlayerName () {
  document.getElementById('user').innerHTML = playerName;
}
displayPlayerName();

function displayInfo () {
  document.getElementById('header-set').innerHTML = 'Best of ' + JSON.parse(setSelection);
  document.getElementById('cpu-score-value').innerHTML = computerCardTracker + ' / Sets ' + JSON.parse(setSelection);
  document.getElementById('user-score-value').innerHTML = userCardTracker + ' / Sets ' + JSON.parse(setSelection);
}
displayInfo();

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
    computerCardTracker += 2;
  }
  else if (userPlayerDeck[0].value > computerPlayerDeck[0].value){
    userHoldPile.push(computerPlayerDeck[0]);
    userHoldPile.push(userPlayerDeck[0]);

    computerPlayerDeck.splice(0, 1);
    userPlayerDeck.splice(0, 1);
    userCardTracker += 2;
  } else {
    triggerWarImage();
    document.getElementById('start-war').addEventListener('click', startWarEventHandler);
    console.log('war is triggered');
  }
}

function triggerWarImage () {
  var mainEl = document.getElementById('war-field');
  var imgEl = document.createElement('img');

  imgEl.src = 'img/honors_spade-14.png';
  imgEl.alt = 'start-war-image';
  imgEl.title = 'start-war-image';
  imgEl.id = 'start-war';

  mainEl.appendChild(imgEl);
}

function startWarEventHandler (event) {
  var imgEl = document.getElementById('start-war');
  if (event.target.title === 'start-war-image'){
    imgEl.parentNode.removeChild(imgEl);
  }
  callWarCard();
}

function warCardFlip (index, path) {
  var mainEl = document.getElementById('war-field');
  var imgEl = document.createElement('img');

  imgEl.src = path;
  imgEl.alt = `sacrifice-${index}`;
  imgEl.title = `sacrifice-${index}`;
  imgEl.id = `sacrifice-${index}`;

  mainEl.appendChild(imgEl);
}

function callWarCard () {
  //add event listener to flip card face-down
  document.getElementById('user-deck').addEventListener('click', userDeckClick);
  var clickCounter = 0;
  var maxClicks = 0;
  var lastIndex = 0;

  //check the length of the user array to see how many are face-down
  if (userPlayerDeck.length > 5){
    maxClicks = 4;
    lastIndex = 4;
  } else{
    for (var i = 0; i < (userPlayerDeck.length + 1); i++){
      if(userPlayerDeck.length === i){
        maxClicks = i - 1; 
        lastIndex = i - 1; 
      }
    }
  }

  while (clickCounter < maxClicks) {
    if (clickCounter < maxClicks - 1){
      warCardFlip(clickCounter, 'img/green_back.png');
      clickCounter++;
    } else {
      warCardFlip(clickCounter, userPlayerDeck[lastIndex].path);
      clickCounter = maxClicks + 1;
    }
  }
  war();
}

function war (){
  if (computerPlayerDeck.length > 5 && userPlayerDeck.length > 5){
    if (computerPlayerDeck[4].value > userPlayerDeck[4].value){
      computerHoldPile.push(computerPlayerDeck[0,1,2,3,4]);
      computerHoldPile.push(userPlayerDeck[0,1,2,3,4]);
      computerPlayerDeck.splice(0,5);
      userPlayerDeck.splice(0,5);
      computerCardTracker += 10;
    }
  } else {
    if (computerPlayerDeck[4].value < userPlayerDeck[4].value){
      userHoldPile.push(userPlayerDeck[0,1,2,3,4]);
      userHoldPile.push(computerPlayerDeck[0,1,2,3,4]);
      computerPlayerDeck.splice(0,5);
      userPlayerDeck.splice(0,5);
      userCardTracker += 10;
    }
  }
  if (computerPlayerDeck.length > 4 && userPlayerDeck.length > 4){
    if (computerPlayerDeck[3].value > userPlayerDeck[3].value){
      computerHoldPile.push(computerPlayerDeck[0,1,2,3]);
      computerHoldPile.push(userPlayerDeck[0,1,2,3]);
      computerPlayerDeck.splice(0,4);
      userPlayerDeck.splice(0,4);
      computerCardTracker += 8;
    } else {
      if (computerPlayerDeck[3].value < userPlayerDeck[3].value){
        userHoldPile.push(userPlayerDeck[0,1,2,3]);
        userHoldPile.push(computerPlayerDeck[0,1,2,3]);
        computerPlayerDeck.splice(0,4);
        userPlayerDeck.splice(0,4);
        userCardTracker += 8;
      }
    }
  }if (computerPlayerDeck.length > 3 && userPlayerDeck.length > 3){
    if (computerPlayerDeck[2].value > userPlayerDeck[2].value){
      computerHoldPile.push(computerPlayerDeck[0,1,2]);
      computerHoldPile.push(userPlayerDeck[0,1,2]);
      computerPlayerDeck.splice(0,3);
      userPlayerDeck.splice(0,3);
      computerCardTracker += 6;
    } else {
      if (computerPlayerDeck[2].value < userPlayerDeck[2].value){
        userHoldPile.push(userPlayerDeck[0,1,2]);
        userHoldPile.push(computerPlayerDeck[0,1,2]);
        computerPlayerDeck.splice(0,3);
        userPlayerDeck.splice(0,3);
        userCardTracker += 6;
      }
    }
  }if (computerPlayerDeck.length > 2 && userPlayerDeck.length > 2){
    if (computerPlayerDeck[1].value > userPlayerDeck[1].value){
      computerHoldPile.push(computerPlayerDeck[0,1]);
      computerHoldPile.push(userPlayerDeck[0,1]);
      computerPlayerDeck.splice(0,2);
      userPlayerDeck.splice(0,2);
      computerCardTracker += 4;
    } else {
      if (computerPlayerDeck[1].value < userPlayerDeck[1].value){
        userHoldPile.push(userPlayerDeck[0,1]);
        userHoldPile.push(computerPlayerDeck[0,1]);
        computerPlayerDeck.splice(0,2);
        userPlayerDeck.splice(0,2);
        userCardTracker += 4;
      }
    }
  }if (computerPlayerDeck.length > 1 && userPlayerDeck.length > 1){
    computerHoldPile.push(computerPlayerDeck[0]);
    userHoldPile.push(userPlayerDeck[0]);
    computerPlayerDeck.splice(0,1);
    userPlayerDeck.splice(0,1);
    computerCardTracker++;
    userCardTracker++;
    return;
  }
}

makeEachCard();
shuffleDeck();
dealTheDeck();
chooseYourCard();

function userDeckClick(){
  userEl.src = userPlayerDeck[0].path;
  cpuEl.src = computerPlayerDeck[0].path;
  setTimeout(compareCards(), 2000);
  setTimeout(resetPlayingField, 2000);
  clickCounter++;
}


function resetPlayingField(){
  userEl.src = 'img/red_back.png';
  cpuEl.src = 'img/red_back.png';
}

document.getElementById('user-deck').addEventListener('click', userDeckClick);
