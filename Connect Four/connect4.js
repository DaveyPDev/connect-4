/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let playersTurn = document.querySelector('.players-turn');

let board = []; // array of rows, each row is array of cells  (board[y][x])

//!    <--    Target Check    -->    //
let targetCheck = document.addEventListener('click', (e) => {
	console.log('// EVENT INFO //', e);
	console.log('// TARGET //', e.target);
});
//!    <--    Target Check    -->    //

//#   <--    Start Make Board ()   -->    //
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard () {
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
	for (let i = 0; i < WIDTH; i++) {
		board.push(new Array(HEIGHT).fill());
	}
	return board;
}
//#    <--    End Make Board ()   -->    //

//#    <--    Start HTML Board ()   -->    //
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard () {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	let board = document.getElementById('board');
	// TODO: add comment for this code
	// Add click event to  HTML Board //
	let top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);

	// Appending WIDTH  cells to table //
	for (let x = 0; x < WIDTH; x++) {
		let headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	board.append(top);

	// TODO: add comment for this code
	// Appending HEIGHT cells to table
	for (let y = 0; y < HEIGHT; y++) {
		let row = document.createElement('tr');

		for (let x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		board.append(row);
	}
}
//#    <--    End HTML Board ()   -->    //

//#    <--    Start Column    -->    //
/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol (x) {
	// TODO: write the real version of this, rather than always returning 0
	//!  ** will need to come back to this and rewrite  ** //
	for (let y = HEIGHT - 1; y >= 0; y--) {
		if (!board[y][x]) {
			return y;
		}
	}
	return null;
}
//   //! borrwing from solution //
//   function findSpotForCol(x) {
//   for (let y = HEIGHT - 1; y >= 0; y--) {
//     if (!board[y][x]) {
//       return y;
//     }
//   }
//   return null;
// }

//#    <--    End Column    -->    //

//#    <--    Start table placement  -->    //
/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable (y, x) {
	// TODO: make a div and insert into correct table cell
	const piece = document.createElement('div');
	piece.classList.add('piece');
	piece.classList.add(`p${currPlayer}`);
	piece.style.top = -50 * (y - 2);

	const spot = document.getElementById(`${y}-${x}`);
	spot.append(piece);
}
//#    <--    End table placement    -->    //

//#    <--    Start end game message    -->    //
/** endGame: announce game end */

function endGame (msg) {
	// TODO: pop up alert message
	alert(msg);
}
//#    <--    End end game message    -->    //
/** handleClick: handle click of column top to play piece */

//#    <--    Start Hand Click Event    -->    //
function handleClick (evt) {
	// get x from ID of clicked cell
	let x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	let y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	board[y][x] = currPlayer;
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
  // //! Borrowed from solution, keep falling to get it to work -_-* //
  // if (board.every(row => row.every(cell => cell))) {
  //   return endGame('Tie!');
  // }
  //! Borrowed from solution, failing to work //


		//#    <--    Start player switch    -->    //
		// switch players
		// TODO: switch currPlayer 1 <-> 2
		currPlayer = currPlayer === 1 ? 2 : 1;

	//#    <--    Start player switch    -->    //
}
//#    <--    End Hand Click Event    -->    //

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin () {
	function _win (cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer);
	}

	// TODO: read and understand this code. Add comments to help you.

	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			const horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			const vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			const diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			const diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
