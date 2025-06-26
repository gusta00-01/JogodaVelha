const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;
let isHumanTurn= false;
let jogada;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    isCircleTurn = false;
    isHumanTurn = !isHumanTurn;
    jogada = 1;

    for (const cell of cellElements) {
        cell.classList.remove("x");
        cell.classList.remove("circle");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");

    if (isHumanTurn == false) {
        isHumanTurn = !isHumanTurn;
        isCircleTurn = !isCircleTurn;
        cpuPlays();
    }

}

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = 'Empatou !!';
    } else {
        winningMessageTextElement.innerText = isHumanTurn ? 'Você venceu !!' : 'Eu venci !!';
    }

    winningMessage.classList.add('show-winning-message');
}


const checkForWin = (currentPlayer) => {
    return winningCombination.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
}

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
    jogada++;
}

const setBoardHoverClass = () => {
    board.classList.remove('x');
    board.classList.remove('circle');

    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    isHumanTurn = !isHumanTurn;

    setBoardHoverClass();

}

const defendeJogada = (jogadaCPU, quemJoga) => {
    resposta = jogadaCPU;
    
    if (!cellElements[0].classList.contains('x') && !cellElements[0].classList.contains('circle')) {
        if (cellElements[1].classList.contains(quemJoga) && cellElements[2].classList.contains(quemJoga))
            resposta = 0;
        if (cellElements[4].classList.contains(quemJoga) && cellElements[8].classList.contains(quemJoga))
            resposta = 0;
        if (cellElements[3].classList.contains(quemJoga) && cellElements[6].classList.contains(quemJoga))
            resposta = 0;
    }

    if (!cellElements[2].classList.contains('x') && !cellElements[2].classList.contains('circle')) {
        if (cellElements[0].classList.contains(quemJoga) && cellElements[1].classList.contains(quemJoga))
            resposta = 2;
        if (cellElements[4].classList.contains(quemJoga) && cellElements[6].classList.contains(quemJoga))
            resposta = 2;
        if (cellElements[5].classList.contains(quemJoga) && cellElements[8].classList.contains(quemJoga))
            resposta = 2;
    }

    if (!cellElements[6].classList.contains('x') && !cellElements[6].classList.contains('circle')) {
        if (cellElements[7].classList.contains(quemJoga) && cellElements[8].classList.contains(quemJoga))
            resposta = 6;
        if (cellElements[4].classList.contains(quemJoga) && cellElements[2].classList.contains(quemJoga))
            resposta = 6;
        if (cellElements[0].classList.contains(quemJoga) && cellElements[3].classList.contains(quemJoga))
            resposta = 6;
    }

    if (!cellElements[8].classList.contains('x') && !cellElements[8].classList.contains('circle')) {
        if (cellElements[2].classList.contains(quemJoga) && cellElements[5].classList.contains(quemJoga))
            resposta = 8;
        if (cellElements[4].classList.contains(quemJoga) && cellElements[0].classList.contains(quemJoga))
            resposta = 8;
        if (cellElements[6].classList.contains(quemJoga) && cellElements[7].classList.contains(quemJoga))
            resposta = 8;
    }

    if (!cellElements[1].classList.contains('x') && !cellElements[1].classList.contains('circle')) {
        if (cellElements[0].classList.contains(quemJoga) && cellElements[2].classList.contains(quemJoga))
            resposta = 1;
        if (cellElements[4].classList.contains(quemJoga) && cellElements[7].classList.contains(quemJoga))
            resposta = 1;
    }

    if (!cellElements[3].classList.contains('x') && !cellElements[3].classList.contains('circle')) {
        if (cellElements[0].classList.contains(quemJoga) && cellElements[6].classList.contains(quemJoga))
            resposta = 3;
        if (cellElements[4].classList.contains(quemJoga) && cellElements[5].classList.contains(quemJoga))
            resposta = 3;
    }

    if (!cellElements[5].classList.contains('x') && !cellElements[5].classList.contains('circle')) {
        if (cellElements[2].classList.contains(quemJoga) && cellElements[8].classList.contains(quemJoga))
            resposta = 5;
        if (cellElements[3].classList.contains(quemJoga) && cellElements[4].classList.contains(quemJoga))
            resposta = 5;
    }

    if (!cellElements[7].classList.contains('x') && !cellElements[7].classList.contains('circle')) {
        if (cellElements[6].classList.contains(quemJoga) && cellElements[8].classList.contains(quemJoga))
            resposta = 7;
        if (cellElements[4].classList.contains(quemJoga) && cellElements[1].classList.contains(quemJoga))
            resposta = 7;
    }

    return resposta;
}

const cpuPlays = () => {
    swapTurns();
    const cpuJogaCom = isCircleTurn ? 'circle' : 'x';
    const humanoJogaCom = isCircleTurn ? 'x' : 'circle';

    switch (jogada) {
        case 1:  // inicia sempre no centro ou nas quinas
            jogadaCPU = 2 * parseInt(Math.random() * 5);
            break;
        case 2:  // joga no centro se estiver livre; caso contrário, em qualquer uma das quinas.
            if (!cellElements[4].classList.contains('x') && !cellElements[4].classList.contains('circle')) {
                jogadaCPU = 4;
            } else {
                do {
                    jogadaCPU = 2 * parseInt(Math.random() * 5);
                } while (jogadaCPU == 4)
            }
            break;
        case 3: // joga no centro se estiver livre; caso contrário, em qualquer uma das quinas restantes.
            if (!cellElements[4].classList.contains('x') && !cellElements[4].classList.contains('circle')) {
                jogadaCPU = 4;
            } else {
                casaLivre = false;
                do {
                    jogadaCPU = 2 * parseInt(Math.random() * 5); // simplesmente sorteia a casa a jogar
                    if (!cellElements[jogadaCPU].classList.contains('x') && !cellElements[jogadaCPU].classList.contains('circle')) {
                        casaLivre = true;
                    }

                } while (casaLivre == false);
            }
            break;

        case 4:
            casaLivre = false;
            do {
                jogadaCPU = parseInt(Math.random() * 9); // simplesmente sorteia a casa a jogar
                if (!cellElements[jogadaCPU].classList.contains('x') && !cellElements[jogadaCPU].classList.contains('circle')) {
                    casaLivre = true;
                }

            } while (casaLivre == false);

            jogadaCPU = defendeJogada(jogadaCPU, humanoJogaCom);
            break;

        default:
            // sorteia uma casa qualquer para jogar
            casaLivre = false;
            do {
                jogadaCPU = parseInt(Math.random() * 9); // simplesmente sorteia a casa a jogar
                if (!cellElements[jogadaCPU].classList.contains('x') && !cellElements[jogadaCPU].classList.contains('circle')) {
                    casaLivre = true;
                }

            } while (casaLivre == false);

            jogadaCPU = defendeJogada(jogadaCPU, humanoJogaCom);
            jogadaCPU = defendeJogada(jogadaCPU, cpuJogaCom);

           
    }

    
    cellElements[jogadaCPU].classList.add(cpuJogaCom);
    cellElements[jogadaCPU].removeEventListener("click", handleClick); // não deixa mais o jogador ocupar essa casa
    jogada++;

    // verifica se o computador ganhou
    const isWin = checkForWin(cpuJogaCom);

    // verificar por empate
    const isDraw = checkForDraw();

    // verifica se jogo terminou
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        swapTurns();
    }

}


const handleClick = (e) => {
    // colocar a marca X ou círculo
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    // verificar por vitória
    const isWin = checkForWin(classToAdd);

    // verificar por empate
    const isDraw = checkForDraw();

    // verifica se jogo terminou
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        // computador responde
        cpuPlays();
    }


}

startGame();

restartButton.addEventListener('click', startGame);

