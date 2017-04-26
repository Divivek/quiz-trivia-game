    var gameChoice = 5;
    var wins = false;
    var losses = false;
    var unAnswered = 0; // Remove 
    var nextQuestion = 0;
   // var userAnswers = {};
    var timeAllowed = 30;   // seconds 
    var myVar;// = setInterval(myTimer, 1000);
    var resultsVar; // = setInterval(resultsTimer, 1000);
      
var questionsAnswersArray = [   
   {
      question: "In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?",

      options: [ 'William and Elizabeth', 'Joseph and Catherine' ,'John and Mary','George and Anne'],

      answerINdex: 3
    },
    {
      question: "When did the Liberty Bell get its name?",
      options: [ "when it was made, in 1701",'when it rang on July 4, 1776', "in the 19th century, when it became a symbol of the abolition of slavery","none of the above"],
      answerINdex: 3
    },
     {
     question: "In the Roy Rogers -Dale Evans Museum you will find Roy and Dales stuffed horses. Roys horse was named Trigger which was Dales horse?",
      options: [ 'Buttermilk', 'Daisy', 'Scout', 'Tulip'],

      answerINdex:1 
    },
    {
     question: "In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?",      options: ['8 18 38 58'],
      answerINdex: 1
    }

  ];
    
function createForm(questionNumber){
      $("#btnStart").remove();
      $("body").removeClass("flower");
      $("body").addClass("col-sm-8");
      $("#divResult").empty();
       console.log("form creating now...");
      var questionsForm = $("<form id='trivia-game-form'>");
      var timer   = $("<h3 id=timer>");
      questionsForm.append(timer);
      i = questionNumber;
      console.log(questionsAnswersArray[i]);
      var questionToAsk = questionsAnswersArray[i].question;
      var currentQuestion = $("<h3>");
      currentQuestion.text(questionToAsk);
      console.log(currentQuestion);
      questionsForm.append(currentQuestion);
      var currentQuestionOptions = questionsAnswersArray[i].options;
      console.log(currentQuestionOptions);
      var correctAnswer = questionsAnswersArray[i].answerINdex;   
   
      for (var j = 0; j < currentQuestionOptions.length; j++) {
      currentQuestionOptions[j] // ??
      var optionLabel = $("<label>");
      var optionInput = $("<input type='radio'>");
      optionLabel.html( currentQuestionOptions[j] );
      optionLabel.attr("for", j);
      var nameToAdd = "Q"+(i+1); // ??
      optionInput.attr("name", nameToAdd);
      optionInput.attr("id", j);
      optionInput.attr("value", j );
      questionsForm.append(optionLabel);
      questionsForm.append(optionInput);
    }
      var submitBtn = $("<button>");
      submitBtn.attr("id", "done");
      submitBtn.text("Submit");
      questionsForm.append(submitBtn);
      $("#divQuestions").append(questionsForm);
      timeAllowed = 60;   // seconds 
      myVar = setInterval(myTimer, 1000);
    } // End of Functoin createForm

function showResult(){
       $.each($('#trivia-game-form').serializeArray(), function(i, selected)  {
      console.log(selected);
      if  (selected.value == questionsAnswersArray[nextQuestion].answerINdex) { 
        wins=true;
      }
      else
      {
        losses=true;
      }
      
    });

    $("#divQuestions").empty();
    if ( wins == true) {
       var resultlosses = $("<h1>");
       resultlosses.text("You Rock!!! ");
       $("#divResult").append(resultlosses); 
       var resultImage = $("<img src=./assets/images/congratulations.jpg width='200px' >");
       $("#divResult").append(resultImage);   
       wins=false;    
     }
     else {   
       var resultlosses = $("<h1>");
       resultlosses.text("incorrect Answer-- ");
       $("#divResult").append(resultlosses); 

       var correctAnswer = $("<h1>");
       correctAnswer.text(" Correct Answer is--"+ questionsAnswersArray[nextQuestion].options[questionsAnswersArray[nextQuestion].answerINdex] );
       $("#divResult").append(correctAnswer); 
       var resultImage = $("<img src=./assets/images/sad.jpeg width='200px' >");
       $("#divResult").append(resultImage);  
       losses=false;  
        }
      
        resultsVar = setInterval(resultTimer, 5000);
        nextQuestion++;
        if (nextQuestion >= questionsAnswersArray.length) { 
        var endGame = $("<h1>");
        endGame.text("END GAME - Hope you had fun ");
        $("#divEndGame").append(endGame);     
        clearTimeout(resultsVar);  
        clearTimeout(myVar); 
        }
    }  // end of showResult

function resultTimer() {
      clearTimeout(resultsVar);
      createForm(nextQuestion) ; 
    }
function myTimer() {
        timeAllowed--;
        document.getElementById("timer").innerHTML ="Time remaning = " + timeAllowed;
        console.log(timer);
        if ( timeAllowed <= 0 ){
        clearTimeout(myVar);
        showResult() ; 
    }
  }

      $( "#btnStart").on("click", function() {
      console.log("button clicked" );
      createForm(nextQuestion);
  });

      $("#divQuestions").on("click", "#done", function()  {
      $( "#trivia-game-form" ).submit(function( event )   {
      console.log(event);
      clearTimeout(myVar);
      showResult();
    });
  })
