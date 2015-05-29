(function() {
  var LINES = 15;
  var WHITE = "white";
  var BLACK = "black";
  var EMPTY = "empty";

  function initBoard() {
    var board = {};

    for (var x = 0; x < LINES; x++) {
      for (var y = 0; y < LINES; y++) {
        board[[x,y]] = EMPTY;
      }
    }

    return board;
  }

  function drawBoard(board, player) {
    var ss = [];

    ss.push('<table>');
    for (var i = -1; i < LINES; i++) {
      ss.push('<tr>');
      for (var j = -1; j < LINES; j++) {

        if (i > -1 && j > -1) {
          ss.push('<td class="');
          ss.push('cell');
          ss.push(' ');
          ss.push(board[[j,i]]);
          ss.push('">');
          ss.push('<span class="circle"></span>');
          ss.push('</td>');

        } else if (i === -1 && j > -1) {
          ss.push('<td>' + 'abcdefghijklmnop'[j] + '</td>');

        } else if (i > -1 && j === -1) {
          ss.push('<td>' + '123456789ABCDEFG'[i] + '</td>');

        } else {
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
