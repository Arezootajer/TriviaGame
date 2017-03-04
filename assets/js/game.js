
//define variable 


var questionArray = ["Who was the legendary Benedictine monk who invented champagne? ",
 "Name the largest freshwater lake in the world?",
  "Where would you find the Sea of Tranquility?",
  "What is someone who shoes horses called?",
   "What item of clothing was named after its Scottish inventor?", 
  "What kind of weapon is a falchion?", 
  "What is another word for lexicon?",
   ];
var answerArray = [["Dom Perignon", "Walt Whitman", "George Harrison", "Amelia Earhart"],
 					["Botswana","Lake Superior","Malawi","Sudan"],
 					["The Sky", "The Moon", "Sea", "Night"], 
 					["abuse","ghost","A farrier","repress"],
 					 ["strawberry", "press", "large", "A Mackintosh"],
 					 ["gondola","A sword","elegant","frighten"], 
 					 ["Dictionary", "blame", "rigid", "angel"],];

var correctAnswers = ["Dom Perignon", "Lake Superior", "The Moon", "A farrier", "A Mackintosh", "A sword", "Dictionary"];
var questionCounter = 0;
var counter = 30;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unanswered = 0;
var gameHTML;
var clickSound = new Audio("assets/sound/click.mp3");






//for showing question creat html 
function generate() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'> " + answerArray[questionCounter][0] + "</p><p class='answer'>"+answerArray[questionCounter][1]+"</p><p class='answer'>"+answerArray[questionCounter][2]+"</p><p class='answer'>"+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}


function timer() {

	theClock = setInterval(run, 1000);
	function run() {
		if (counter === 0) {
			clearInterval(theClock);
			generateTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}


function generateTimeOut() {
	unanswered++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/image/1.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}


$(document).ready(function() {


$("body").on("click", ".start-button", function(event){
	
	clickSound.play();
	generate();
	timer();
}); 

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
});

}); 







function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" +"<img class='center-block' src='assets/image/correct2.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/image/error.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);
}



function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generate();
	counter = 30;
	timer();
	}
	else {
		finalScreen();
	}
}



function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generate();
	timer();
}

