'use strict';

function getInstructions () {
  document.getElementById('instructDropdown').classList.toggle('show');
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (var i = 0; i< dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

function gameInfo(event) {
  var playerName = document.getElementById('name').value;
  document.location = 'war-game.html';
  var setNumber = document.getElementById('number-sets').value;

  localStorage.setItem('player', playerName);
  localStorage.setItem('sets', JSON.stringify(setNumber));
}

document.getElementById('play-button').addEventListener('click', gameInfo);