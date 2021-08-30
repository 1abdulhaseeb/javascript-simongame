
$(".restart-button").hide();
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["blue", "green", "yellow", "red"];
var level;
var count = 0;

$(".start-button").click(function(){
  level = 0;
  $(".main-text").text("Level " + level);
  $(".start-button").hide();
  $(".side-text").hide();
  computer();
});


$(".button").click(function(){
  var userColor = this.id;
  userClickedPattern.push(userColor);
  count++;
  var address = "sounds/" + userColor + ".mp3";
  playSound(address);
  animatePress(userColor);
  if(count > level){
    count =0;
    checkAnswer(userClickedPattern.length - 1);
  }

});


function checkAnswer(currentLevel){
  if(checkEqual(currentLevel)){
    setTimeout(function(){
    level++;
    $(".main-text").text("Level " + level);
    userClickedPattern = [];
    computer();
  }, 1000)

  }
  else
  {
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    }, 200);

    $(".main-text").text("Game Over! at level " + level);
    $(".restart-button").show();
    $(".restart-button").click(function(){
      startOver();
    })
  }
}
function computer(){
  var randomColor = buttonColors[sequence()];
  gamePattern.push(randomColor);
  animatePress(randomColor);
  var colorAudio = "sounds/" + randomColor + ".mp3";
  playSound(colorAudio);
}

function sequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

function animatePress(currentColor){
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(address){
  var audio = new Audio(address);
  audio.play();
}

function checkEqual(currentLevel){
  var flag = true;
  for(var i=0; i<gamePattern.length; i++){
    if(gamePattern[i]!= userClickedPattern[i])
    {
      flag = false;
    }
  }
  if(flag == true){
    return true;
  }
  else{
    return false;
  }
}

function startOver(){
  level =0;
  gamePattern = [];
  userClickedPattern = [];
  count = 0;
  $(".main-text").text("Simon Game");
  $(".side-text").show();
  $(".restart-button").hide();
  $(".start-button").show();
}
