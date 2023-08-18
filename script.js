document.addEventListener('DOMContentLoaded', () => {
    let pScore = 0;
    let cScore = 0;
    let gameOver = false;

    const options = document.querySelectorAll('.options button');
    const playerScoreDisplay = document.querySelector('.player-score-value');
    const computerScoreDisplay = document.querySelector('.computer-score-value');
    const winnerText = document.querySelector('.winner');
    const startButton = document.querySelector('.start-button');
    const newGameButton = document.querySelector('.new-game-button');
    const playerHand = document.querySelector('.playerhand');
    const computerHand = document.querySelector('.computerhand');

    const computerOptions = ['rock', 'paper', 'scissor'];

    const playRound = (playerChoice) => {
        if (gameOver) return;

        const computerChoice = computerOptions[Math.floor(Math.random() * 3)];
        displayHands(playerChoice, computerChoice);

        const result = getWinner(playerChoice, computerChoice);
        updateScore(result);
        checkGameOver();
    };

    const displayHands = (playerChoice, computerChoice) => {
        playerHand.src = `./images/${playerChoice}.png`;
        
        if (computerChoice === 'rock') {
            computerHand.src = `./images/rock.png`;
        } else if (computerChoice === 'paper') {
            computerHand.src = `./images/paper.png`;
        } else if (computerChoice === 'scissor') {
            computerHand.src = `./images/scissor.png`; 
        }
        
        if (playerChoice === 'rock') {
            computerHand.style.transform = 'scaleX(-1)';
        } else if (playerChoice === 'paper') {
            computerHand.style.transform = 'scaleX(-1)';
        } else if (playerChoice === 'scissor') {
            computerHand.style.transform = 'scaleX(-1)'; 
        }
    };

    const getWinner = (playerChoice, computerChoice) => {
        if (playerChoice === computerChoice) {
            return "It's a tie!";
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissor') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissor' && computerChoice === 'paper')
        ) {
            pScore++;
            return 'Player wins this round!';
        } else {
            cScore++;
            return 'Computer wins this round!';
        }
    };

    const updateScore = (result) => {
        playerScoreDisplay.textContent = pScore;
        computerScoreDisplay.textContent = cScore;
        winnerText.textContent = result;
    };

    const checkGameOver = () => {
        if (pScore === 5 || cScore === 5) {
            gameOver = true;
            const gameResult = pScore === 5 ? 'Player wins! Congratulations!!!' : 'Computer wins! Better luck next time...';
            winnerText.textContent = gameResult;
            newGameButton.style.display = 'block';
        }
    };

    const resetGame = () => {
        pScore = 0;
        cScore = 0;
        gameOver = false;
        playerScoreDisplay.textContent = pScore;
        computerScoreDisplay.textContent = cScore;
        winnerText.textContent = 'Choose an option';
        winnerText.classList.remove('final-winner');
    
        playerHand.src = '';
        computerHand.src = '';
        computerHand.style.transform = '';
    };

    options.forEach(option => {
        option.addEventListener('click', () => {
            playRound(option.textContent.toLowerCase());
        });
    });

    startButton.addEventListener('click', () => {
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');
        introScreen.style.display = 'none';
        match.style.display = 'block';
        playerHand.src = './images/rock.png';
        computerHand.src = './images/rock.png';
        computerHand.style.transform = 'scaleX(-1)';
    });

    newGameButton.addEventListener('click', () => {
        resetGame();
        displayHands('rock', 'rock'); 
    });
});
