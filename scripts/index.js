//game constants and variable
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('eat.wav');
const gameOver = new Audio('over.wav');
const moveSound = new Audio('move.wav');
const musicSound = new Audio("back_music.mp3"); 
let score = 0;
let speed = 6;
let lastPaintTime = 0;
let board = document.getElementById("board");
let snakeArray = [
    {x: 13 , y: 15}
];
let food = {x: 6 , y: 7};
// game Functons 
function main(ctime){
    window.requestAnimationFrame(main);
    
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // if you bump into yourself;
    for( let i = 1; i < snakeArray.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if you bump in the wall 
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    //  part 1 updating the snake array
   if(isCollide(snakeArray)){
       gameOver.play();
       musicSound.pause();
       inputDir = {x: 0, y: 0};
       alert("Game over Chal nikal! press any key to paly again");
       snakeArray = [{x: 13 , y: 15}];
       musicSound.play();
       score = 0;
   }
   // if you have eat the food then, increase the score and Genrate the food
   if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
       foodSound.play();
       score++;
       if(score > highscore){
           high = score;
        localStorage.setItem("highscore", JSON.stringify(high));
        highscore.innerHTML =  "High Score:" + highscore;
       }
       document.getElementById("score").innerHTML = "Score :" + score;

       snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
       let a = 2; 
       let b = 16;
       food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)*Math.random())}
   }
   // moving the snake 
   for (let i = snakeArray.length-2; i>= 0;  i--) {
       snakeArray[i+1] = {...snakeArray[i]};   
   }
   snakeArray[0].x += inputDir.x;
   snakeArray[0].y += inputDir.y;


    // part 2: display the snack nad food
    //display the snack
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
       let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //display the food;
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}







let highscore = localStorage.getItem("highscore");
if(highscore === null){
   let high = 0;
    localStorage.setItem("highscore", JSON.stringify(high));
}else{
    high = JSON.parse(highscore);
    highscore.innerHTML =  "High Score:" + highscore;
}

// main logic statrs here

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x:0, y:1} // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});