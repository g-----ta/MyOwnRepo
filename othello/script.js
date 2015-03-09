(function(){
  var SIZE = 8,  //TODO: enlarge later
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
        ss.push('<th>'+ '12345678'[j] + '</th>');
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

drawBoard(initBoard(), BLACK);
})();




