var board = [];
var move = 0;
var movecount = 0;
var speed = 3.5;
var moveState = "";
var p1name = "";
var p2name = "";
var players = [];
const redCell = "https://i.imgur.com/lpCPbnt.png";
const yellowCell = "https://i.imgur.com/km8rY9I.png";
const blankCell = "https://i.imgur.com/esKL89z.png";
const blankMove = "https://i.imgur.com/OyC93RA.png";
const redMove = "https://i.imgur.com/kNXDkDC.png";
const yellowMove = "https://i.imgur.com/x9Ry5Ix.png";
showPage(pSelect)

function showPage(page) {
  var pages = document.getElementsByClassName("pages");
  for (i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  page.style.display = "block";
}

function setName() {
  if (player1.value == "" || player2.value == "") {
    errorName.innerHTML = "please put names for both players"
  }
  else {
    if (player1.value == player2.value) {
      errorName.innerHTML = "the names cannot be the same"
    }
    else {
      p1name = player1.value;
      p2name = player2.value;
      if (!(p1name in players)) {
        players.push({name: p1name, wins: 0, losses: 0, ties: 0});
      }
      if (!(p2name in players)) {
        players.push({name: p2name, wins: 0, losses: 0, ties: 0});
      }
      showPage(connect4);
      newGame()
    }
  }
}
function newGame() {
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
  }
  document.getElementById("yMoving").style.visibility = "hidden";
  document.getElementById("rMoving").style.visibility = "hidden";
  win.innerHTML = ""
}

function moveChoiceOn(i) {
    document.getElementById("top" + String(i)).src = [redMove, yellowMove][movecount%2];
}

function moveChoiceOff(i) {
  document.getElementById("top" + String(i)).src = blankMove;
}

function gameState() {
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
  if (board.indexOf("E") == -1) {
    return "draw";
  }
}

function doMove(i) {
  if (moveState == "ready") {
    move = i;
    if (board[7*move + 6] != 6) {
      moveState = "moving";
      movecount++;
      moveChoiceOn(move);
      animation();
    }
  }
}

function showCell() {
  board[7*move + board[7*move + 6]] = ["Y","R"][movecount%2];
  document.getElementById(String(7*move + board[7*move + 6])).src = [yellowCell, redCell][movecount%2];
  board[7*move + 6]++;
  if (gameState() == "win") {
    win.innerHTML = [p2name, p1name][movecount%2] + " won against " + [p1name, p2name][movecount%2]
    for (i = 0; i < players.length; i++) {
      if (players[i].name == [p2name, p1name][movecount%2]) {
        players[i].wins++
      }
      if (players[i].name == [p1name, p2name][movecount%2]) {
        players[i].losses++
      }
    }
  }
  if (gameState() == "draw") {
    win.innerHTML = "its a draw oof"
    for (i = 0; i < players.length; i++) {
      if (players[i].name == p1name || players[i].name == p2name) {
        players[i].ties ++
      }
    }
  }
  moveState = "ready";
  document.getElementById("yMoving").style.visibility = "hidden";
  document.getElementById("rMoving").style.visibility = "hidden";
}

function animation() {
  var elem = document.getElementById(["yMoving","rMoving"][movecount%2]);
  var height = document.getElementById("top0").getBoundingClientRect().top + window.scrollY;
  elem.style.left = (document.getElementById("top0").getBoundingClientRect().left + 100*move + window.scrollX) + "px";
  document.getElementById(["yMoving", "rMoving"][movecount%2]).style.visibility = "visible";
  var i = 0;
  var id = setInterval(frame, 1);
  function frame() {
    if (i >= 100 * (6 - board[7*move + 6])) {
      clearInterval(id);
      showCell();
    }
    else {
      i += speed;
      height += speed;
      elem.style.top = height + "px";
    }
  }
}
