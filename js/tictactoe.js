/*
Technical Requirements

Your app must:

Render a game board in the browser
Switch turns between X and O (or whichever markers you select)
Visually display which side won if a player gets three in a row or show a draw/"cat’s game" if neither wins
Include separate HTML / CSS / JavaScript files
Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
Use Javascript for DOM manipulation
Deploy your game online, where the rest of the world can access it
Use semantic markup for HTML and CSS (adhere to best practices)
*/


var player = "cross";
var player1Score = 0;
var player2Score = 0;
var drawScore = 0;
var win = false;
var draw = false;
var move = 0;
var statement;
var roundIndex = 1;
var cell;
var crossTune = new Audio("http://soundbible.com/grab.php?id=761&type=wav");
var circleTune = new Audio("http://soundbible.com/grab.php?id=1705&type=wav");
var gameOverTune = new Audio("http://soundbible.com/grab.php?id=1744&type=wav");

var GameOn = {

	startGame: function (e) {
		e.stopPropagation();
		e.stopImmediatePropagation();

		player1Score = parseInt(window.localStorage.getItem("player1Score"));
		player2Score = parseInt(window.localStorage.getItem("player2Score"));
		drawScore = parseInt(window.localStorage.getItem("drawScore"));
		roundIndex = parseInt(window.localStorage.getItem("roundIndex"));

		if (player == "cross" && GameOn.isEmptyCell($(this))) {
			$(this).attr('pattern', player);
			$(this).addClass(player);
			$(this).addClass('flipped');
			crossTune.play();
			move += 1;
		} else if (player == "circle" && GameOn.isEmptyCell($(this))) {
			$(this).attr('pattern', player);
			$(this).addClass(player);
			$(this).addClass('flipped');
			circleTune.play();
			move += 1;
		} else {
			GameOn.swapPlayer();
		}

		GameOn.swapPlayer();
		GameOn.whoIstheWinner();


		if (!win && draw) {
			$('#cell1').addClass('highlight');
			$('#cell2').addClass('highlight');
			$('#cell3').addClass('highlight');
			$('#cell4').addClass('highlight');
			$('#cell7').addClass('highlight');
			$('#cell8').addClass('highlight');
			$('#cell9').addClass('highlight');
			statement = "It's a draw! Play again?";
		} else if (win && player == "circle") {
			statement = "Player 1 won! Play again?";
		} else {
			statement = "Player 2 won! Play again?";
		}


		if (win || draw) {
			gameOverTune.play();
			$('#play-again').addClass('is-visible');
			$('#play-again').text(statement);
			$('.cell').off('click');

			roundIndex += 1;		//update Round index before click play again event

			Store_cookies.updateGameState();

			$('#play-again').on('click', function(){
				$('#round').text("ROUND "+roundIndex);
				GameOn.resetGame();
				$('.cell').on('click', GameOn.startGame);
			});
		}
	},

	swapPlayer: function () {
		if (player == "cross") {
			player = "circle";
		} else {
			player = "cross";
		}

		return player;
	},

	withComputerPlayerGame: function (e) {

		e.stopPropagation();
		e.stopImmediatePropagation();

		player1Score = parseInt(window.localStorage.getItem("player1Score"));
		player2Score = parseInt(window.localStorage.getItem("player2Score"));
		drawScore = parseInt(window.localStorage.getItem("drawScore"));
		roundIndex = parseInt(window.localStorage.getItem("roundIndex"));

		if (GameOn.isEmptyCell($(this))) {
			player = 'cross';
			$(this).attr('pattern', player);
			$(this).addClass(player);
			$(this).addClass('flipped');
			crossTune.play();
			move += 1;
		}

		cell = GameOn.computerMove();

		if (cell != undefined ) {
			player = 'circle';
			$(cell).attr('pattern', player);
			$(cell).addClass(player);
			$(cell).addClass('flipped');
			circleTune.play();
			move += 1;
		}

		GameOn.whoIstheWinner();


		if (!win && draw) {
			$('#cell1').addClass('highlight');
			$('#cell2').addClass('highlight');
			$('#cell3').addClass('highlight');
			$('#cell4').addClass('highlight');
			$('#cell7').addClass('highlight');
			$('#cell8').addClass('highlight');
			$('#cell9').addClass('highlight');
			statement = "It's a draw! Play again?";
		} else if (win && player == "circle") {
			statement = "Player 1 won! Play again?";
		} else {
			statement = "Player 2 won! Play again?";
		}


		if (win || draw) {
			gameOverTune.play();
			$('#play-again').addClass('is-visible');
			$('#play-again').text(statement);
			$('.cell').off('click');

			roundIndex += 1;		//update Round index before click play again event

			Store_cookies.updateGameState();

			$('#play-again').on('click', function(){
				$('#round').text("ROUND "+roundIndex);
				GameOn.resetGame();
				$('.cell').on('click', GameOn.withComputerPlayerGame);
			});
		}
	},

	computerMove: function () {

		//First to cater for opponent
		if ($('#cell1').attr('pattern') == undefined &&
			(($('#cell3').attr('pattern') == 'cross' && $('#cell2').attr('pattern') == 'cross')
				|| ($('#cell5').attr('pattern') == 'cross' && $('#cell9').attr('pattern') == 'cross')
				|| ($('#cell4').attr('pattern') == 'cross' && $('#cell7').attr('pattern') == 'cross'))) {
					return $('#cell1');
		} else if ($('#cell2').attr('pattern') == undefined &&
			(($('#cell1').attr('pattern') == 'cross' && $('#cell3').attr('pattern') == 'cross')
				|| ($('#cell5').attr('pattern') == 'cross' && $('#cell8').attr('pattern') == 'cross'))) {
					return $('#cell2');
		} else if ($('#cell3').attr('pattern') == undefined &&
			(($('#cell1').attr('pattern') == 'cross' && $('#cell2').attr('pattern') == 'cross')
				|| ($('#cell6').attr('pattern') == 'cross' && $('#cell9').attr('pattern') == 'cross')
				|| ($('#cell5').attr('pattern') == 'cross' && $('#cell7').attr('pattern') == 'cross'))) {
					return $('#cell3');
		} else if ($('#cell4').attr('pattern') == undefined &&
			(($('#cell5').attr('pattern') == 'cross' && $('#cell6').attr('pattern') == 'cross')
				|| ($('#cell1').attr('pattern') == 'cross' && $('#cell7').attr('pattern') == 'cross'))) {
					return $('#cell4');
		} else if ($('#cell5').attr('pattern') == undefined &&
			(($('#cell4').attr('pattern') == 'cross' && $('#cell6').attr('pattern') == 'cross')
				|| ($('#cell2').attr('pattern') == 'cross' && $('#cell8').attr('pattern') == 'cross'))) {
					return $('#cell5');
		} else if ($('#cell6').attr('pattern') == undefined &&
			(($('#cell3').attr('pattern') == 'cross' && $('#cell9').attr('pattern') == 'cross')
				|| ($('#cell4').attr('pattern') == 'cross' && $('#cell5').attr('pattern') == 'cross'))) {
					return $('#cell6');
		} else if ($('#cell7').attr('pattern') == undefined &&
			(($('#cell1').attr('pattern') == 'cross' && $('#cell4').attr('pattern') == 'cross')
				|| ($('#cell3').attr('pattern') == 'cross' && $('#cell5').attr('pattern') == 'cross')
				|| ($('#cell8').attr('pattern') == 'cross' && $('#cell9').attr('pattern') == 'cross'))) {
					return $('#cell7');
		} else if ($('#cell8').attr('pattern') == undefined &&
			(($('#cell2').attr('pattern') == 'cross' && $('#cell5').attr('pattern') == 'cross')
				|| ($('#cell7').attr('pattern') == 'cross' && $('#cell9').attr('pattern') == 'cross'))) {
					return $('#cell8');
		} else if ($('#cell9').attr('pattern') == undefined &&
			(($('#cell3').attr('pattern') == 'cross' && $('#cell6').attr('pattern') == 'cross')
				|| ($('#cell1').attr('pattern') == 'cross' && $('#cell5').attr('pattern') == 'cross')
				|| ($('#cell7').attr('pattern') == 'cross' && $('#cell8').attr('pattern') == 'cross'))) {
					return $('#cell9');
		//Then only cater for first player
		} else if ($('#cell5').attr('pattern') == undefined) {
				return $('#cell5');
		} else if ($('#cell1').attr('pattern') == undefined) {
				return $('#cell1');
		} else if ($('#cell9').attr('pattern') == undefined) {
				return $('#cell9');
		} else if ($('#cell8').attr('pattern') == undefined) {
				return $('#cell8');
		} else if ($('#cell4').attr('pattern') == undefined) {
				return $('#cell4');
		} else if ($('#cell7').attr('pattern') == undefined) {
				return $('#cell7');
		} else if ($('#cell6').attr('pattern') == undefined) {
				return $('#cell6');
		} else if ($('#cell2').attr('pattern') == undefined) {
				return $('#cell2');
		} else if ($('#cell3').attr('pattern') == undefined) {
			return $('#cell3');
		} else {
			return undefined;
		}

	},



	isEmptyCell: function (thisCell) {
		return !thisCell.attr('pattern');
	},

	resetGame: function () {

		for (var i = 0; i <= $('.cell').length; i++) {
			$('#cell'+i).removeAttr('pattern');
			$('#cell'+i).removeClass('circle');
			$('#cell'+i).removeClass('cross');
		}
		$('#play-again').removeClass('is-visible');
		$('.cell').removeClass('highlight');
		$('.cell').removeClass('flipped');
		move = 0;
		win = false;
		draw = false;
		player = 'cross';

		return;
	},

	whoIstheWinner: function () {
		GameOn.getWinnerProcess('circle', '#cell1', '#cell2', '#cell3');
		GameOn.getWinnerProcess('circle', '#cell4', '#cell5', '#cell6');
		GameOn.getWinnerProcess('circle', '#cell7', '#cell8', '#cell9');
		GameOn.getWinnerProcess('circle', '#cell1', '#cell4', '#cell7');
		GameOn.getWinnerProcess('circle', '#cell2', '#cell5', '#cell8');
		GameOn.getWinnerProcess('circle', '#cell3', '#cell6', '#cell9');
		GameOn.getWinnerProcess('circle', '#cell1', '#cell5', '#cell9');
		GameOn.getWinnerProcess('circle', '#cell3', '#cell5', '#cell7');

		GameOn.getWinnerProcess('cross', '#cell1', '#cell2', '#cell3');
		GameOn.getWinnerProcess('cross', '#cell4', '#cell5', '#cell6');
		GameOn.getWinnerProcess('cross', '#cell7', '#cell8', '#cell9');
		GameOn.getWinnerProcess('cross', '#cell1', '#cell4', '#cell7');
		GameOn.getWinnerProcess('cross', '#cell2', '#cell5', '#cell8');
		GameOn.getWinnerProcess('cross', '#cell3', '#cell6', '#cell9');
		GameOn.getWinnerProcess('cross', '#cell1', '#cell5', '#cell9');
		GameOn.getWinnerProcess('cross', '#cell3', '#cell5', '#cell7');

		if (win === false) {
			if (move % 9 == 0) {
				drawScore += 1;
				$('#draw_score').text(drawScore);
				draw = true;
			}
		}
		return [win, draw];
	},

	getWinnerProcess: function (pattern, cell1, cell2, cell3) {
		if ($(cell1).attr('pattern') == pattern
			&& $(cell2).attr('pattern') == pattern
				&& $(cell3).attr('pattern') == pattern) {

			if (pattern == 'cross') {
				player1Score += 1;
			} else {
				player2Score +=1;
			}

			$('#player1_score').text(player1Score);
			$('#player2_score').text(player2Score);

			$(cell1).addClass('highlight');
			$(cell2).addClass('highlight');
			$(cell3).addClass('highlight');

			return win = true;
		}
	},


};

var Store_cookies = {

	supportsLocalStorage: function () {
	  	try {
	    	return 'localStorage' in window && window['localStorage'] !== null;
	  	} catch (e) {
	    	return false;
	  	}
	},

	updateGameState: function () {
		if (!Store_cookies.supportsLocalStorage()) {
			return false;
		}
		window.localStorage.setItem("player1Score", player1Score);
		window.localStorage.setItem("player2Score", player2Score);
		window.localStorage.setItem("drawScore", drawScore);
		window.localStorage.setItem("roundIndex", roundIndex);

		return true;
	},

	resumeGameState: function () {
		if (!Store_cookies.supportsLocalStorage()) {
			return false;
		}
		if (!player1Score >= 0) {
			player1Score = 0;
		}

		var updatedPlayer1Score = parseInt(window.localStorage.getItem("player1Score"));
		var updatedPlayer2Score = parseInt(window.localStorage.getItem("player2Score"));
		var updatedDrawScore = parseInt(window.localStorage.getItem("drawScore"));
		var updatedRoundIndex = parseInt(window.localStorage.getItem("roundIndex"));

		$('#player1_score').text(updatedPlayer1Score);
		$('#player2_score').text(updatedPlayer2Score);
		$('#draw_score').text(updatedDrawScore);
		$('#round').text("ROUND "+updatedRoundIndex);

		return true;
	},

	clearAll: function () {
		localStorage.clear();
		player1Score = window.localStorage.setItem("player1Score", 0);
		player2Score = window.localStorage.setItem("player2Score", 0);
		drawScore = window.localStorage.setItem("drawScore", 0);
		roundIndex = window.localStorage.setItem("roundIndex", 1);
		location.reload();

	}
};

$(document).ready(function (){
	var radioButton = $('input[name="player-type"]');

    Store_cookies.resumeGameState();
	$('.cell').click(GameOn.withComputerPlayerGame);

    $(radioButton).click(function(){
        if($("input[name='player-type']:checked").val() == 'complayer'){
        	$('.cell').off('click', GameOn.startGame);
        	$('.cell').click(GameOn.withComputerPlayerGame);
    	} else {
    		$('.cell').off('click', GameOn.withComputerPlayerGame);
            $('.cell').click(GameOn.startGame);
        }
    });

    $('#clear-cookies').click(Store_cookies.clearAll);

});