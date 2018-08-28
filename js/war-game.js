'use strict';

var completeDeck = []; //array to hold all cards in completeDeck

var computerPlayerDeck = [];
var userPlayerDeck = [];

var computerHoldPile = [];
var userHoldPile = [];

var gamePlayField = [];

var userCardTracker = 0;
var computerCardTracker = 0;


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
    war();
  }
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