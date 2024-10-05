/*
Explanation :-
1.Use keypress Event To Game Start. 
2.button_Flash + Level 1.
3.Button Press -> check (user<->game)
Check :-
#1.If Same "LevelUp".
#2.Then "Game Over".
*/
let gameSequence=[];
let userSequence=[];
let buttons=["yellow","red","purple","green"];
let Started=false;
let level=0;
let highScore=0;
let h2=document.querySelector("h2");
let highScoreDisplay=document.querySelector("h3");
//First Step Is Completed.
document.addEventListener("keypress",function(){
    if(Started==false){
        console.log("Game Is Started");
        Started=true;
        levelUp();
    }
});
//Second Step Is Completed ith btnFlash And levelUp Function.
function gameFlash(btn){
 btn.classList.add("flash");
 setTimeout(function(){
    btn.classList.remove("flash");
 },250);
}
function levelUp(){
    userSequence=[];
    level++;
    h2.innerText=`Level ${level}`;
    //Random Button Choose
    let randomIndex=Math.floor(Math.random()*3);
    let randomColor=buttons[randomIndex];
    let randomButton=document.querySelector(`.${randomColor}`);
    /*console.log(randomIndex);console.log(randomColor);console.log(randomButton);*/
   gameSequence.push(randomColor);
   console.log(gameSequence);
   gameFlash(randomButton);
   if(level>highScore){
    highScore=level;
    highScoreDisplay.innerText=`Highest Score Is ${highScore}`;
   }
}

//
function checkAnswer(index){
    //console.log("Current Level",level++);
    if(userSequence[index]===gameSequence[index]){
        if(userSequence.length===gameSequence.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML=`Game Over ! Your Score Is <b>${level}.</b><br>Press Any Key To Start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150)
        reset();
    }
}
function buttonPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userSequence.push(userColor);
    checkAnswer(userSequence.length-1);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
       btn.classList.remove("userFlash");
    },250);
   }
let allButtons=document.querySelectorAll(".button");
for(let btn of allButtons){
    btn.addEventListener("click",buttonPress);
}
function reset(){
    Started=false;
    gameSequence=[];
    userSequence=[];
    level=0;
}