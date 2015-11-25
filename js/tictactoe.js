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

var GameOn = {

	startGame: function (e) {
		e.stopPropagation();
		e.stopImmediatePropagation();

		if (player == "cross" && GameOn.isEmptyCell($(this))) {
			$(this).attr('pattern', player);
			$(this).addClass(player);
			$(this).addClass('flipped');
			move += 1;
		} else if (player == "circle" && GameOn.isEmptyCell($(this))) {			
			$(this).attr('pattern', player);
			$(this).addClass(player);
			$(this).addClass('flipped');			
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
			$('#play-again').addClass('is-visible');
			$('#play-again').text(statement);
			$('.cell').off('click');
			roundIndex = roundIndex + 1;
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

	/*
	computerMove: function () {

		//Do in random calculation
		var randomCalculation = Math.ceil(Math.random() * 9) + 1;
		cell = $('#cell' + randomCalculation);

		if (GameOn.isEmptyCell(cell)) {		
			$(cell).addClass('circle');
			$(cell).attr('pattern', 'circle');			
		} else {

		}
		GameOn.whoIstheWinner();	
		console.log('cellCalculation = ',cell);
	},
	*/
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
	}  

};


$(document).ready(function (){
	$('.cell').click(GameOn.startGame);	
});