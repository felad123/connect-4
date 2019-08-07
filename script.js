var board = []; /*array containing the board; 
indexes [7i] to [7i+5] contain the 6 counters, from bottom to top, in column i
index [7i+6] contains the current number of counters in column i,
this makes it easier to determine the height at which the next counter must go to in column i */
var move = 0;
var movecount = 0; //increments with each move
var speed = 5; //how fast the animation goes
var moveState = ""; /*one of 3 values: "ready", "moving", "finished" 
"ready" means that it is ready to do the next player move
"moving" means that counters are moving right now
"finished" means that the game is over, both in a win or a tie */
var p1name = "";
var p2name = "";
var players = []; //array of objects with player names and stats
const redCell = "https://i.imgur.com/lpCPbnt.png";
const yellowCell = "https://i.imgur.com/km8rY9I.png";
const blankCell = "https://i.imgur.com/esKL89z.png";
const blankMove = "https://i.imgur.com/OyC93RA.png";
const redMove = "https://i.imgur.com/kNXDkDC.png";
const yellowMove = "https://i.imgur.com/x9Ry5Ix.png";
showPage(pSelect);

function showPage(page) { //page selector
  var pages = document.getElementsByClassName("pages");
  for (i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  page.style.display = "block";
}

function setName() {
  if (player1.value == "" || player2.value == "") { //check for bad names
    errorName.innerHTML = "please put names for both players";
  }
  else {
    if (player1.value == player2.value) { //check for bad names
      errorName.innerHTML = "the names cannot be the same";
    }
    else {
      p1name = player1.value;
      p2name = player2.value;
      if (!(checkExistingName(p1name, players))) { //check for existing name
        players.push({name: p1name, wins: 0, losses: 0, ties: 0, ratio: 0});
      }
      if (!(checkExistingName(p2name, players))) { //check for existing name
        players.push({name: p2name, wins: 0, losses: 0, ties: 0, ratio: 0});
      }
      showPage(connect4);
      newGame();
    }
  }
}

function checkExistingName(p, allPlayers) { //check for existing name
  for (i = 0; i < allPlayers.length; i++) {
    if (p == allPlayers[i].name) {
      return true;
    }
  }
  return false;
}

function newGame() {
  document.getElementById("continue").style.visibility = "hidden";
  moveState = "ready";
  movecount = 0;
  board = [];
  for (i = 1; i < 50; i++) {
    if (i%7 == 0) {
      board.push(0);
    } 
    else {
      board.push("E");
      document.getElementById(String(i - 1)).src = blankCell;
    }
  } //sets up empty board and resets some other stuff
  document.getElementById("yMoving").style.visibility = "hidden";
  document.getElementById("rMoving").style.visibility = "hidden"; //hides the images used to animate the counter
  win.innerHTML = "" //hides win message
}

function moveChoiceOn(i) { //shows indicator counter at the top of the column the mouse is near
  if (moveState == "ready" || moveState == "moving") { //only shows when the game is not finished
    document.getElementById("top" + String(i)).src = [redMove, yellowMove][movecount%2];
  }
}

function moveChoiceOff(i) { //hides indicator counter when the mouse is away
  document.getElementById("top" + String(i)).src = blankMove;
}

function showScores() {
  while(leaderboard.rows.length > 1) { //removes scoreboard
    leaderboard.deleteRow(-1);
  }
  for (i = 0; i < players.length; i++) { //updates scoreboard with new values
    var row = leaderboard.insertRow(-1);
    row.insertCell(0).innerHTML = players[i].name;
    row.insertCell(1).innerHTML = players[i].wins;
    row.insertCell(2).innerHTML = players[i].wins + players[i].losses + players[i].ties;
    row.insertCell(3).innerHTML = players[i].ratio + "%";
  }
}

function sortLeaderboard() { //sorts leaderboard on 1 of 2 variables, selection sort
  if (leaderboardSort.options[leaderboardSort.selectedIndex].text == "number of wins") {
    var max = 0;
    var maxIndex = 0;
    var temp = 0;
    for (i = 0; i < players.length - 1; i++) {
      max = players[i].wins;
      maxIndex = i;
      for (j = i; j < players.length; j++) {
        if (players[j].wins > max) {
          max = players[j].wins;
          maxIndex = j;
        }
      }
      temp = players[i];
      players[i] = players[maxIndex];
      players[maxIndex] = temp;
    }
  }
  if (leaderboardSort.options[leaderboardSort.selectedIndex].text == "win ratio") {
    var max = 0;
    var maxIndex = 0;
    var temp = 0;
    for (i = 0; i < players.length - 1; i++) {
      max = players[i].ratio;
      maxIndex = i;
      for (j = i; j < players.length; j++) {
        if (players[j].ratio > max) {
          max = players[j].ratio;
          maxIndex = j;
        }
      }
      temp = players[i];
      players[i] = players[maxIndex];
      players[maxIndex] = temp;
    }
  }
  showScores();
}

function gameState() { //determines whether the game is finished or not
  var sameC = 1;
  //winning lines downwards
  if (board[7*move + 6] >= 4) {
    for (i = 2; i <= 4; i++) {
      if (board[7*move + board[7*move + 6] - 1]==board[7*move + board[7*move + 6] - i]) {
        sameC++;
      }
    }
    if (sameC == 4) {
      return "win";
    }
  }
  var i = move - 1;
  sameC = 1;
  //winning lines sideways
  while (i >= 0) {
    if (board[7*i + board[7*move + 6] - 1]==board[7*move + board[7*move + 6] - 1]){
      sameC++;
    }
    else {
      break;
    } 
    i--;
  }
  i = move + 1;
  while (i <= 6) {
    if (board[7*i + board[7*move + 6] - 1]==board[7*move + board[7*move + 6] - 1]) {
      sameC++;
    }
    else {
      break;
    }
    i++;
  }
  if (sameC >= 4) {
    return "win";
  }
  sameC = 1;
  //winning lines diagonal bottom left to top right
  if (Math.min(move,board[7*move+ 6] - 1) >= 1) {
    for (i = 1; i < Math.min(move,board[7*move + 6] - 1) + 1; i++) {
      if (board[7*move + board[7*move + 6] - 1]==board[7*(move - i) + board[7*move + 6] - 1 - i]) {
        sameC++;
      }
      else {
        break;
      }
    }
  }
  if (Math.min(6 - move,6 - board[7*move + 6]) >= 1) {
    for (i = 1; i < Math.min(6 - move,6 - board[7*move + 6]) + 1; i++) {
      if (board[7*move + board[7*move + 6] - 1]==board[7*(move + i) + board[7*move + 6] - 1 + i]) {
        sameC++;
      }
      else {
        break;
      }
    }
  }
  if (sameC >= 4) {
    return "win";
  }
  sameC = 1;
  //winning lines diagonal bottom right to top left
  if (Math.min(6 - move,board[7*move + 6] - 1) >= 1) {
    for (i = 1; i < Math.min(6 - move,board[7*move + 6]) + 1; i++) {
      if (board[7*move + board[7*move + 6] - 1] == board[7*(move + i) + board[7*move + 6] - 1 - i]) {
        sameC++;
      }
      else {
        break;
      }
    }
  }
  if (Math.min(move,6 - board[7*move + 6] - 1) >= 1) {
    for (i = 1; i < Math.min(move,6 - board[7*move + 6] - 1) + 1; i++) {
      if (board[7*move + board[7*move + 6] - 1]==board[7*(move - i) + board[7*move + 6] - 1 + i]) {
        sameC++;
      }
      else {
        break;
      }
    }
  }
  if (sameC >= 4) {
    return "win";
  }
  if (board.indexOf("E") == -1) { //if board contains no empty cells, and no winning line exists, then it's a draw
    return "draw";
  }
}

function doMove(i) { //places counter in column i
  if (moveState == "ready") { //if a counter is moving while this function is triggered, it will not place another counter
    move = i;
    if (board[7*move + 6] != 6) {
      moveState = "moving";
      movecount++;
      moveChoiceOn(move);
      animation(); //triggers animation of the counter falling
    }
  }
}

function showCell() { //shows the counter in the cell and hides the image doing the animation
  board[7*move + board[7*move + 6]] = ["Y","R"][movecount%2]; //determines colour of the new counter based on movecount
  document.getElementById(String(7*move + board[7*move + 6])).src = [yellowCell, redCell][movecount%2]; //updates cell image
  board[7*move + 6]++;
  moveState = "ready"; //ready for the next move
  document.getElementById("yMoving").style.visibility = "hidden";
  document.getElementById("rMoving").style.visibility = "hidden"; //hides animation image
  if (gameState() == "win") { //update player stats on player win
    moveState = "finished";
    document.getElementById("continue").style.visibility = "visible";
    win.innerHTML = [p2name, p1name][movecount%2] + " won against " + [p1name, p2name][movecount%2]
    for (i = 0; i < players.length; i++) {
      if (players[i].name == [p2name, p1name][movecount%2]) {
        players[i].wins++;
        players[i].ratio = Math.round((players[i].wins/(players[i].wins + players[i].losses + players[i].ties))*100);
      }
      if (players[i].name == [p1name, p2name][movecount%2]) {
        players[i].losses++;
        players[i].ratio = Math.round((players[i].wins/(players[i].wins + players[i].losses + players[i].ties))*100);
      }
    }
  }
  if (gameState() == "draw") { //update player stats on draw
    moveState = "finished";
    document.getElementById("continue").style.visibility = "visible";
    win.innerHTML = "its a draw oof";
    for (i = 0; i < players.length; i++) {
      if (players[i].name == p1name || players[i].name == p2name) {
        players[i].ties++;
        players[i].ratio = (players[i].wins/(players[i].wins + players[i].losses + players[i].ties))*100;
      }
    }
  }
}

function animation() {
  var elem = document.getElementById(["yMoving","rMoving"][movecount%2]);
  var height = document.getElementById("top0").getBoundingClientRect().top + window.scrollY;
  elem.style.left = (document.getElementById("top0").getBoundingClientRect().left + 100*move + window.scrollX) + "px";
  document.getElementById(["yMoving", "rMoving"][movecount%2]).style.visibility = "visible";
  var i = 0;
  var id = setInterval(frame, 1);
  function frame() {
    if (i >= 100 * (6 - board[7*move + 6])) { //controls how far the counter falls
      clearInterval(id);
      showCell(); //shows the counter in the cell and hides the image doing the animation
    }
    else {
      i += speed;
      height += speed;
      elem.style.top = height + "px";
    }
  }
}
