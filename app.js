let body = document.querySelector("body");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let msgWD = document.querySelector("#msg-wd");

//PlayerO//PlayerX
let turnO = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6]
];

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBox();
    msgContainer.classList.add("hide");
    body.classList.remove("noscroll");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            //PlayerO
            box.innerHTML = "O";
            box.style.color = '#5E239D';
            turnO = false;
        }else{
            //PlayerX
            box.innerHTML = "X";
            box.style.color = '#F61067';
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `XO`;
    msg.style.color = '#FF312E';
    msgWD.innerText = `DRAW!`;
    msgContainer.classList.remove("hide");
    disableBox();
};

const disableBox = () =>{
    for( let box of boxes){
        box.disabled = true;
    }
};

const enableBox = () =>{
    for( let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `${winner}`;
    msg.style.color = '#32A287';
    msgWD.innerText = `Winner!`;
    msgContainer.classList.remove("hide");
    disableBox();
    body.classList.add("noscroll");
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);