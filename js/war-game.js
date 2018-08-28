'use strict';

var completeDeck = []; //array to hold all cards in completeDeck

var computerPlayerDeck = [];
var userPlayerDeck = [];

var computerHoldPile = [];
var userHoldPile = [];

var gamePlayField = [];


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
  }
  else if (userPlayerDeck[0].value > computerPlayerDeck[0].value){
    userHoldPile.push(computerPlayerDeck[0]);
    userHoldPile.push(userPlayerDeck[0]);

    computerPlayerDeck.splice(0, 1);
    userPlayerDeck.splice(0, 1);
  } else {
    console.log('WAR!');
  }
}
