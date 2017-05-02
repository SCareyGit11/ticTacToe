$(document).ready(function(){
	console.log('loaded');
	
	function Game(){

		this.turn = 0;
		this.board = [0,0,0,0,0,0,0,0,0];
		
		console.log('board',this.board);
		
		$('button.board').html("");
		$('#result').html("");
		// available choices left on the board
		this.choice = [0,1,2,3,4,5,6,7,8];

		// remove the chosen square from those left available
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
			var square;
			// checkWinner before the computer's pick
			var move = this.checkWinner();
			if(typeof(move) == 'string'){
				// checkWinner found a winner, end the game
				return move;
			}
			else if(typeof(move) == 'number'){
				// checkWinner found no winner but computer needs to take a square for the win/loss
				square = move;
			}
			// if the computer isn't one move from a win/loss then just pick a random square
			else{
				square = this.choice[Math.floor(Math.random()*this.choice.length)]
			}
			console.log('computerTurn square '+square);
			// change board element to match computer(-1)
			this.board[square] = -1;
			this.chooseSquare(square);
			// change the html dom element to 'O'
			var domSquare = document.getElementById(square.toString())
			$(domSquare).html('O');

			this.turn++;

			// checkWinner again after the computer's move, if a winner is found then end the game
			var winner = this.checkWinner();
			if(typeof(winner) == 'string'){
				return winner;
			}

		}
		this.checkWinner = function(){
			// checkWinner returns a string if the game is over and
			// it returns a number when there is a row that is one square away from a winner
			console.log('checking for a winner');
			var winner;
			// 8 ways to win a tic tac toe game
		    var ways = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
		    var one_square;
		    
			    for(var i in ways){
			    	// check selected board squares along the 8 ways to win the game
			    	switch (game.board[ways[i][0]] + game.board[ways[i][1]] + game.board[ways[i][2]]) {
			    		case 3: return 'You';
			    		case -3: return 'Computer';
			    		// check each possible way for a win, save a 'way' that is one square from a win
			    		case 2:
			    		case -2: for(var s in ways[i]){ 
			    			if(game.board[ways[i][s]] === 0){
			    				// one_square is the one that would complete three in a row 
			    				console.log(ways[i][s]);
			    				console.log('typeof s is '+typeof(ways[i][s]));
			    				one_square = ways[i][s];
			    				break;
			    			}

			    			
			    		}
			    		default: winner = false;
			    	}
			    }
			    // no winner but at least one row with two of a kind
			    if(game.turn<9 && one_square){
			    	return one_square;
			    }


			 
			
		    if(this.turn == 9 && !winner){
		    	return 'No one'
		    }
		    return winner;
		} // end of checkWinner();

		
	}

	

	var game = new Game();

	$('button.board').click(function(){
		// get the square that the player clicked
		var square = parseInt($(this).attr('id'),10);
		
		// if that square is available...
		if(game.board[square] === 0){
			// change the board element to match the player(1)
			game.board[square] = 1;
			// change the html dom element to 'X'
			$(this).html('X');
			console.log(parseInt($(this).attr('id'),10));
			// remove that square from those available for the computer to choose			
			game.chooseSquare(square);
			console.log(game.board);
			game.turn++;
			
			// after player turn, call computerTurn(), computerTurn calls checkWinner() before and after(if necessary) the 
			// computer's selection
			var winner = game.computerTurn();
			if(winner){
				console.log(winner);
				$('#result').html(winner+" Won");

			}
			
			
		}


		
	});


	$('#reset').click(function(){
		game = new Game;
		
	})
})