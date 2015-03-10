(function(){
  var SIZE = 4,  //TODO: enlarge later
WHITE = 'white',
EMPTY = 'empty',
BLACK = 'black',
board = {};


function initBoard() {
  for (var x = 0; x < SIZE; x++) {
    for (var y = 0; y < SIZE; y++) {
      board[[x,y]] = EMPTY;
    }
  }
  board[[SIZE/2,SIZE/2]] = WHITE;
  board[[(SIZE/2)-1,(SIZE/2)-1]] = WHITE;
  board[[SIZE/2,(SIZE/2)-1]] = BLACK;
  board[[(SIZE/2)-1,SIZE/2]] = BLACK;
  return board;
}

function drawBoard(board, player) {
  var ss = [];
  ss.push('<table>');

  for (var i = -1; i < SIZE; i++) {
    ss.push('<tr>');
    for (var j = -1; j < SIZE; j++) {
      if (i > -1 && j > -1) {
        ss.push('<td class="');
        ss.push('mas');
        ss.push(' ');
        ss.push(board[[i,j]]);
        ss.push('">');
        ss.push('<span class="circle"></span>');
        ss.push('</td>');
      }else if (i === -1 && j > -1) {
        ss.push('<th>'+ 'abcdefgh'[j] + '</th>');
      }else if (i > -1 && j === -1) {
        ss.push('<th>'+ '12345678'[i]+ '</th>');
      }else {
        ss.push('<th></th>');
      }
    }
    ss.push('</tr>'); 
  }
  ss.push('</table>');

  $('#game-board').html(ss.join(''));
  $('#current-player-name').text(player);
}

function createGameTree(board, player, wasPassed) {
  return{
    board: board,
    player: player,
    moves: listPossibleMoves(board, player, wasPassed)
  };
}

function listPossibleMoves(board, player, wasPassed) {
  return completePassingMove(
      listAttackingMoves(board, player),
      board,
      player,
      wasPassed
      );
}


function completePassingMove(attackingMoves, board, player, wasPassed) {
  if (0 < attackingMoves.length) {
    return attackingMoves;
  }else if(!wasPassed) {
    return [{
      isPassingMove: true,
        gameTree: createGameTree(board, nextPlayer(player), true)
    }];
  } else {
    return [];
  }
}

function listAttackingMoves(board, player) {
  var moves = [];

  for (var x = 0; x < SIZE; x++) {
    for (var y = 0; y < SIZE; y++) {
      if (canAttack(board, x, y, player)) {
        moves.push({
          x:x,
          y:y,
          gameTree: createGameTree(
            createAttackedBoard(board, x, y, player),
            nextPlayer(player),
            false
            )
        });
      }
    }
  }
  return moves;
}

function nextPlayer(player) {
  return player === BLACK ? WHITE : BLACK;
}

function canAttack(board, x, y, player) {
  return listVulnerableCells(board, x, y, player).length;
}

function createAttackedBoard(board, x, y, player) {
  var newBoard = JSON.parse(JSON.stringify(board));
  var vulnerableCells = listVulnerableCells(board, x, y, player);
  for (i = 0; i < vulnerableCells.length; i++) {
    newBoard[vulnerableCells[i]] = player;
  }
  return newBoard;
}

function listVulnerableCells(board, x, y, player) {
  var vulnerableCells = [];

  if (board[[x,y]] !== EMPTY) {
    return vulnerableCells;
  }

  var opponent = nextPlayer(player);
  for (var dx = -1; dx <= 1; dx++) {
    for (var dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) {
        continue;
      }
      for (var i = 1; i < SIZE; i++) {
        var nx = x + i * dx;
        var ny = y + i * dy;
        if (nx < 0 || SIZE <= nx || ny < 0 || SIZE <= ny){
          break;
        }
        var cell = board[[nx,ny]];
        if (cell === player && 2 <= i) {
          for (j = 0; j < i; j++) {
            vulnerableCells.push([x + j * dx, y + j * dy]);
            break;
          }
        }
        if (cell !== opponent) {
          break;
        }
      }
    }
  }
  return vulnerableCells;
}

function setUpUIToChooseMove(gameTree) {
  $('#message').text('Choose Your Move');
  gameTree.moves.forEach(function (m,i) {
    $('#console').append(
      $('<input type="button" class="btn">').val(createLabelForMove(m)).click(function () {
        shiftToNewGameTree(m.gameTree);
      })
      );
  });
}

function createLabelForMove(move) {
  if (move.isPassingMove) {
    return 'Pass';
  } else {
    return 'abcdefgh'[move.x] + '12345678'[move.y];
  }
}

function resetUI() {
  $('#console').empty();
  $('#message').empty();
}

function showWinner(board) {
  var nt = {};
  nt[BLACK] = 0;
  nt[WHITE] = 0;

  for (var x = 0; x < SIZE; x++) {
    for (var y = 0; y < SIZE; y++) {
      nt[board[[x,y]]]++;
    }
  }

  $('#message').text(
      nt[BLACK] === nt[WHITE] ? 'The game ends in a draw.' : 'The winner is ' + (nt[WHITE] < nt[BLACK] ? BLACK : WHITE) + '.');
}

function setUpUIToReset() {
  $('#console').append(
      $('<input type="button" class="btn">').val('Start a new game').click(function() {
        resetGame();
      })
  );
}

function resetGame() {
  shiftToNewGameTree(createGameTree(initBoard(), BLACK, false));
}

function shiftToNewGameTree(gameTree) {
  drawBoard(gameTree.board, gameTree.player, gameTree.moves);
  resetUI();
  if(gameTree.moves.length === 0) {
    showWinner(gameTree.board);
    setUpUIToReset();
  } else {
    setUpUIToChooseMove(gameTree);
  }
}

resetGame();
})();




