const Player = function(name, symbol) {
	return {
		name, symbol
	};
};

const player1 = Player("player1", "X");
const player2 = Player("player2", "O");

const Gameboard = (function() {
	let board = ["", "", "", "", "", "", "", "", ""];
	let currentPlayer = player1;
	let moveNumber = 0;
	return{
		board,
		currentPlayer,
		moveNumber
	}
})();

const render = (function() {
	showInput = (el) => {
		el.textContent = Gameboard.currentPlayer.symbol;
	}

	gameOver = () => {
		inputBoxes.forEach(box => {
			box.textContent = "";
			box.addEventListener('click', passArg);
		});
		Gameboard.board = ["", "", "", "", "", "", "", "", ""];
		Gameboard.moveNumber = 0;
		console.log(Gameboard.currentPlayer);
		alert(`${Gameboard.currentPlayer.symbol} Wins`);
	}

	draw = () => {
		inputBoxes.forEach(box => {
			box.textContent = "";
			box.addEventListener('click', passArg);
		});
		Gameboard.board = ["", "", "", "", "", "", "", "", ""];
		Gameboard.moveNumber = 0;
		alert("Draw");
	}
	return {
		showInput,
		gameOver,
		draw
	};
})();

const getInput = (function() {
	addToArray = (el) => {
		el.removeEventListener('click', passArg);
		Gameboard.board.splice(parseInt(el.id), 1, Gameboard.currentPlayer.symbol);
		render.showInput(el);
		checkIfWon.whoWon();
		if(Gameboard.currentPlayer === player1){
			Gameboard.currentPlayer = player2;
		}
		else{
			Gameboard.currentPlayer = player1;
		}
		Gameboard.moveNumber++;
	}

	return { addToArray };
})();

const checkIfWon = (function() {
	whoWon = () => {
		if(Gameboard.moveNumber >= 4) {
			if((Gameboard.board[0] === Gameboard.board[1] && Gameboard.board[0] === Gameboard.board[2] && Gameboard.board[0] !== "") || (Gameboard.board[3] === Gameboard.board[4] && Gameboard.board[3] === Gameboard.board[5] && Gameboard.board[3] !== "") || (Gameboard.board[6] === Gameboard.board[7] && Gameboard.board[6] === Gameboard.board[8] && Gameboard.board[6] !== "") || (Gameboard.board[0] === Gameboard.board[3] && Gameboard.board[0] === Gameboard.board[6] && Gameboard.board[0] !== "") || (Gameboard.board[1] === Gameboard.board[4] && Gameboard.board[1] === Gameboard.board[7] && Gameboard.board[1] !== "") || (Gameboard.board[2] === Gameboard.board[5] && Gameboard.board[2] === Gameboard.board[8] && Gameboard.board[2] !== "") || (Gameboard.board[0] === Gameboard.board[4] && Gameboard.board[0] === Gameboard.board[8] && Gameboard.board[0] !== "") || (Gameboard.board[2] === Gameboard.board[4] && Gameboard.board[2] === Gameboard.board[6] && Gameboard.board[2] !== "")) {
				render.gameOver();
			}
			else if(Gameboard.moveNumber === 9) {
				render.draw()
			}
		}
	};

	return { whoWon } ;
})();

//Event Handlers
let inputBoxes = document.querySelectorAll('[data-input]');
inputBoxes.forEach(box => {
	box.addEventListener('click', passArg);
});
function passArg(e) {
	getInput.addToArray(e.target);
}
