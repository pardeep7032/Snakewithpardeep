//Game constants and Variables
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("food.mp3");
const gameoversound = new Audio("gameover.mp3");
const movesound = new Audio("move.mp3");
const musicsound = new Audio("music.mp3");
let speed = 9;
let score = 0;
let lastpainttime = 0;
let snakearr = [{ x: 12, y: 15 }];
let food = { x: 5, y: 7 };

//Game Functions

function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastpainttime) / 1000 < 1 / speed) {
    return;
  }
  lastpainttime = ctime;
  gameengine();
}

//Collide function
function isCollide(snake) {
    //if you bump into yourself      note:snake[0]= head of snake
    for(let i=1; i<snakearr.length ; i++){
      if (snake[i].x===snake[0].x && snake[i].y===snake[0].y) {
        return true;
      }
    }
    //if you bump into the wall
    if (snake[0].x>=18 || snake[0].x<=0  || snake[0].y>=18 || snake[0].y<=0) {
      return true;
    }
}
 
//Game Engine
function gameengine() {
  //Part-1  Updating the snake and food
  //When snake collide with each other then game stop
  if (isCollide(snakearr)) {
    gameoversound.play();
    musicsound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over ! Press the key to Play Again");
    snakearr = [{ x: 12, y: 15 }];
    score = 0;
    scorebox.innerHTML = "Score : 0";
  }

  //When snake eaten food then snake array will be incerement , increment the score and regenerate the Food in random grid
  if ((snakearr[0].x === food.x)&&(snakearr[0].y === food.y)) {
      score += 1;
      scorebox.innerHTML = "Score : "+score;
      if (score>hiscoreval) {
        hiscoreval = score;
        localStorage.setItem("hiscores",JSON.stringify(hiscoreval));
        hiscorebox.innerHTML = "Hi Score : "+hiscoreval;
      }
      foodsound.play();
      snakearr.unshift({x:snakearr[0].x + inputDir.x , y:snakearr[0].y + inputDir.y });
      let a = 2;
      let b = 17;
      food = {x:Math.round(a + (b-a)*Math.random()),y:Math.round(a + (b-a)*Math.random())}
  }

  //Moving the Snake
  for (let i = snakearr.length - 2; i>=0 ; i-- ) {
      snakearr[i+1] = {...snakearr[i]}
  }
  snakearr[0].x += inputDir.x;
  snakearr[0].y += inputDir.y;
  


  //Part-2  Displaying the snake and food
  //Display Snake element
  board.innerHTML = "";
  snakearr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //Display Food element
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}



//Game Main Logic start here--------->


window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  musicsound.play();
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir = { x: 0, y: -1 };
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir = { x: 0, y: 1 };
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir = { x: 1, y: 0 };
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir = { x: -1, y: 0 };
      break;

    default:
      break;
  }
});

//Hi score save in localstorage 
let hiscores = localStorage.getItem("hiscores")
if (hiscores === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscores",JSON.stringify(hiscoreval));
}
else{
  hiscoreval = JSON.parse (hiscores);
  hiscorebox.innerHTML= "Hi Score : "+hiscores;
}