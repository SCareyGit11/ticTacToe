$(document).ready(function(){
	console.log('loaded');
	
	function Game(){
		this.turn = 0;
		this.board = [0,0,0,0,0,0,0,0,0];

		// available choices left on the board
		this.choice = [0,1,2,3,4,5,6,7,8];

		// remove the chosen square from those available
		this.chooseSquare = function(square){
			for(var i=0; i<this.choice.length; i++){
				if(this.choice[i] == square){
					for(var j=i; j<this.choice.length-1; j++){
						this.choice[j] = this.choice[j+1];
					}
					this.choice.pop();
				}
				
			}
			
			console.log(this.choice);
		} // end of this.chooseSquare
		
		this.computerTurn = function(){
			var square = this.choice[Math.floor(Math.random()*this.choice.length)]
			console.log('computerTurn square '+square);
			// change board element to match computer(-1)
			this.board[square] = -1
			this.chooseSquare(square);
			// change the html dom element to 'O'
			var domSquare = document.getElementById(square.toString())
			$(domSquare).html('O');

			this.turn++;
		}
		this.checkWinner = function(){
			console.log('checking for a winner');
			var winner;
			// 8 ways to win a tic tac toe game
		    var ways = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

		    for(var i in ways){
		    	// check selected board squares along the 8 ways to win the game
		    	switch (game.board[ways[i][0]] + game.board[ways[i][1]] + game.board[ways[i][2]]) {
		    		case 3: return 'You';
		    		case -3: return 'Computer';
		    		default: winner = false;
		    	}

		    }
		    if(this.turn == 9 && !winner){
		    	return 'No one'
		    }
		    return winner;
		} // end of checkWinner();

		this.reset = function(){
			this.board = [0,0,0,0,0,0,0,0,0];
			this.choice = [0,1,2,3,4,5,6,7,8];
			// reset the dom squares
			var i=0;
			while(i<9){
				$('button#'+i).html("");
				console.log('button#'+i);
				i++;
			}
			this.turn = 0;
			$('#result').html("");
		}
	}

	var game = new Game();

	$('button.board').click(function(){
		// get the square that the player clicked
		var square = parseInt($(this).attr('id'),10);
		// if that square has not already been taken
		if(game.board[square] === 0){
			// change the board element to match the player(+1)
			game.board[square] = 1;
			// change the html dom element to 'X'
			$(this).html('X');
			console.log(parseInt($(this).attr('id'),10));
			// remove that square from those available for the computer to choose			
			game.chooseSquare(square);
			console.log(game.board);
			game.turn++;
		}
		// after player turn, check for winner, computer turn, check for winner
		var winner = game.checkWinner();
		if(winner){
			console.log(winner);
			$('#result').html(winner+" Won");
		}
		else{
			game.computerTurn();
		}
		winner = game.checkWinner();
		if(winner){
			console.log(winner);
			$('#result').html(winner+" Won");
		}
	});


	$('button#reset').click(function(){
		game.reset();
		
	})
})