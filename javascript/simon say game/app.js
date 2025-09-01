let gameSeq=[];
let userSeq=[];
let score = [];
let started = false;
let level = 0;
let levelValue = document.querySelector("#title2");
let btns = ["green" , "red", "yellow", "blue"];


document.addEventListener('keypress', function(){
  if(started == false){
    console.log("Started");
    started= true;
    levelUp();
  }
})

function levelUp(){
  userSeq=[];
  level++;
  levelValue.innerText = `Level ${level}`;
  
  let randIndx = Math.floor(Math.random() * 3);
  let randColor = btns[randIndx];
  let randBtn = document.querySelector(`#${randColor}`);
  //console.log(randIndx);
  //console.log(randColor);
  //console.log(randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);
  flash(randBtn);

}

//flash 
function flash(btn){
 btn.classList.add("flash");
 setTimeout(function(){
  btn.classList.remove("flash");
 },250);
}
function userFlash(btn){
 btn.classList.add("userFlash");
 setTimeout(function(){
  btn.classList.remove("userFlash");
 },250);
}

function highest(score){
  let max = 0;
  for(let i = 0; i<score.length; i++){
    if(score[i] > max){
        max = score[i];
    }
  }
  return max;
}
function checkAns(idx){
  if(userSeq[idx] == gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
      setTimeout(levelUp,1000);
    }
  }
  else{
    score.push(level);

    levelValue.innerHTML = `Game Over! Your score is <b>${level} points</b> <br> Press any key to start again <br>Highest score is ${highest(score)} points`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
      document.querySelector("body").style.backgroundColor="#222";
    }, 150);

    reset();
  }
}
//activating buttons
let allBtns = document.querySelectorAll(".btn");


function btnPress(){
  console.log(this);
  let btn =this;
  userFlash(btn);
  let userPlay = btn.getAttribute("id");
  userSeq.push(userPlay);
  checkAns(userSeq.length-1);   
}


allBtns.forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

function reset(){
  started = false;
  gameSeq=[];
  userSeq=[];
  level = 0;
}