let winners     = [];
const choices   = ["rock", "paper", "scissors"];



function resetGame() {
    winners = [];
    document.querySelector(".playerScore")      .textContent    = "Score: 0";
    document.querySelector(".computerScore")    .textContent    = "Score: 0";
    document.querySelector(".ties")             .textContent    = "Ties: 0";
    document.querySelector(".winner")           .textContent    = "";
    document.querySelector(".playerChoice")     .textContent    = "";
    document.querySelector(".computerChoice")   .textContent    = "";
    document.querySelector(".reset")            .style.display  = "none";
}




//plays the game until someone wins 5 times
function startGame() {
    let imgs = document.querySelectorAll('img');
    
    imgs.forEach((img) =>
        img.addEventListener('click', () => {
            if (img.id) {
                playRound(img.id);
            }
        })
    );
}


// has 2 functions, tallyWins & displayRound
function playRound(playerChoice) {
    let wins = checkWins();
    if (wins >=5) {
        return;
    }

    const computerChoice = computerSelect();
    const winner         = checkWinner (playerChoice, computerChoice);

    winners.push(winner);
    
    tallyWins();

    displayRound (playerChoice, computerChoice, winner);
    wins = checkWins();

    if (wins == 5) {
        displayEnd();
    }

}


function displayEnd() {
    let playerWins = winners.filter((item) => item =="Player").length;

    if (playerWins == 5) {
        document.querySelector(".winner").textContent = "You won 5 games!";
    }else {
        document.querySelector(".winner").textContent = "Computer won 5 games";
    }
    document.querySelector(".reset").style.display = "flex";
}



function displayRound(playerChoice, computerChoice, winner) {
    document.querySelector(".playerChoice").textContent = `You chose: ${
        playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
    }`;
    document.querySelector(".computerChoice").textContent = `Computer chose ${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
    }`;
    displayRoundWinner(winner);
}



function displayRoundWinner (winner) {
    if          (winner == "Player")    {
        document.querySelector(".winner").textContent = "You won this round!"
    }else if    (winner == "Computer")  {
        document.querySelector(".winner").textContent = "Computer won this round!"
    }else {
        document.querySelector(".winner").textContent = "Tie."
    }
}




function tallyWins() {
    const pWinCount = winners.filter((item) => item == "Player")    .length;
    const cWinCount = winners.filter((item) => item == "Computer")  .length;
    const ties      = winners.filter((item) => item == "Tie")       .length;
    document.querySelector(".playerScore")  .textContent    = `Score: ${pWinCount}`;
    document.querySelector(".computerScore").textContent    = `Score: ${cWinCount}`;
    document.querySelector(".ties")         .textContent    = `Ties:  ${ties}`;
}



function computerSelect() {
    const choice = choices[Math.floor(Math.random() * choices.length)];
    

    document.querySelector(`.${choice}`).classList.add("active");

    setTimeout(() => {
        document.querySelector(`.${choice}`).classList.remove("active");
    }, 700);

    return choice;
}



function checkWins () {
    const pWinCount = winners.filter((item) => item == "Player")  .length;
    const cWinCount = winners.filter((item) => item == "Computer").length;
    return Math.max(pWinCount, cWinCount);
}

function checkWinner(choice1, choice2) {
    if (
        (choice1 == "rock"      && choice2 == "scissors") ||
        (choice1 == "scissors"  && choice2 == "paper") ||
        (choice1 == "paper"     && choice2 == "rock")
    ) {
        return "Player";
    }else if(choice1 == choice2){
        return "Tie";
    }else{
        return "Computer";
    }
}


function setWins() {
    const pWinCount = winners.filter((item) => item == "Player").length;
    const cWinCount = winners.filter((item) => item == "Computer").length;
    const ties      = winners.filter((item) => item == "Tie").length;
}

startGame();