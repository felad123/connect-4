var board = [];
var move = 0;
var movecount = 0;
var speed = 3;
var moveState = "";
function newGame() {
  moveState = "ready"
  movecount = 0;
  board = [];
  for (i = 1; i < 50; i++) {
    if (i%7 == 0) {
      board.push(0);
    } 
    else {
      board.push("E");
      document.getElementById(String(i-1)).src = "https://i.imgur.com/esKL89z.png"
    }
  }
}
function moveChoiceOn(i) {
  if (moveState == "ready") {
    document.getElementById("top"+String(i)).src = ["https://i.imgur.com/kNXDkDC.png","https://i.imgur.com/x9Ry5Ix.png"][movecount%2]
  }  
}
function moveChoiceOff(i) {
  document.getElementById("top"+String(i)).src = "https://i.imgur.com/OyC93RA.png"
}
function gameState() {
  var sameC = 1;
  //winning lines downwards
  if (board[7*move+6] >= 4) {
    for (i = 2; i <= 4; i++) {
      if (board[7*move+board[7*move+6]-1]==board[7*move+board[7*move+6]-i]) {
        sameC++
      }
    }
    if (sameC == 4) {
      return "win"
    }
  }
  var i = move-1;
  sameC = 1;
  //winning lines sideways
  while (i >= 0) {
    if (board[7*i+board[7*move+6]-1]==board[7*move+board[7*move+6]-1]){
      sameC++;
    }
    else {
      break;
    } 
    i--;
  }
  i = move+1
  while (i <= 6) {
    if (board[7*i+board[7*move+6]-1]==board[7*move+board[7*move+6]-1]) {
      sameC++;
    }
    else {
      break;
    }
    i++;
  }
  if (sameC >= 4) {
    return "win"
  }
  sameC = 1 
  //winning lines diagonal bottom left to top right
  if (Math.min(move,board[7*move+6]-1) >= 1) {
    for (i = 1; i < Math.min(move,board[7*move+6]-1)+1; i++) {
      if (board[7*move+board[7*move+6]-1]==board[7*(move-i)+board[7*move+6]-1-i]) {
        sameC++
      }
      else {
        break
      }
    }
  }
  if (Math.min(6-move,6-board[7*move+6]) >= 1) {
    for (i = 1; i < Math.min(6-move,6-board[7*move+6])+1; i++) {
      if (board[7*move+board[7*move+6]-1]==board[7*(move+i)+board[7*move+6]-1+i]) {
        sameC++
      }
      else {
        break
      }
    }
  }
  if (sameC >= 4) {
    return "win"
  }
  sameC = 1
  //winning lines diagonal bottom right to top left
  if (Math.min(6-move,board[7*move+6]-1) >= 1) {
    for (i = 1; i < Math.min(6-move,board[7*move+6])+1; i++) {
      if (board[7*move+board[7*move+6]-1] == board[7*(move+i)+board[7*move+6]-1-i]) {
        sameC++
      }
      else {
        break
      }
    }
  }
  if (Math.min(move,6-board[7*move+6]-1) >= 1) {
    for (i = 1; i < Math.min(move,6-board[7*move+6]-1)+1; i++) {
      if (board[7*move+board[7*move+6]-1]==board[7*(move-i)+board[7*move+6]-1+i]) {
        sameC++
      }
      else {
        break
      }
    }
  }
  if (sameC >= 4) {
    return "win"
  }
  if (board.indexOf("E") == -1) {
    return "draw"
  }
}
function doMove(i) {
  if (moveState == "ready") {
    move = i;
    if (board[7*move+6] != 6) {
      moveState = "moving"
      movecount++
      moveChoiceOff(move)
      animation()
    }
  }
}
function showCell() {
  board[7*move+board[7*move+6]] = ["Y","R"][movecount%2]
  document.getElementById(String(7*move+board[7*move+6])).src = ["https://i.imgur.com/km8rY9I.png","https://i.imgur.com/lpCPbnt.png"][movecount%2]
  board[7*move+6]++
  if (gameState() == "win") {
    console.log(["Y","R"][(movecount)%2] + " won")
  }
  moveState = "ready"
  moveChoiceOn(move)
}

function animation() {
  var elem = document.getElementById(["yMoving","rMoving"][movecount%2]);
  elem.style.left = (document.getElementById("top0").getBoundingClientRect().left + 100*move + window.scrollX) + "px"
  var height = document.getElementById("top0").getBoundingClientRect().top + window.scrollY
  var i = 0;
  var id = setInterval(frame, 1);
  function frame() {
    if (i >= 100*(6-board[7*move+6])) {
      clearInterval(id)
      showCell()
    }
    else {
      i += speed
      height +=speed
      elem.style.top = height + "px"
    }
  }
}
