'use strict';

completeDeck = []; //array to hold all cards in completeDeck

function DeckCreator (name, value){
  this.name = name;
  this.path = 'img/${name}.png';
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