const gameArea = document.querySelector('.game');
const result = document.querySelector('.result');
const newGameBtn = document.querySelector('.new_game');
const fields = document.querySelectorAll('.field');
let circle = `
    <svg class="circle">
        <circle r="45" cx="58" cy="58" stroke="blue" stroke-width="10" fill="none" stroke-linecap="round" />
    </svg>`;
let cross = `
    <svg class="cross">
        <line class="first_line" x1="15" y1="15" x2="100" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
        <line class="second_line" x1="100" y1="15" x2="15" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
    </svg>`;

let step = false;
let winnerX = false;
let winnerO = false;
let count = 0;

// Отрисовываем Х
function stepCross(target) {
    target.innerHTML = cross;
    target.classList.add('x');
    count++;
}

// Отрисовываем О
function stepZero(target) {
    target.innerHTML = circle;
    target.classList.add('o');
    count++;
}

// В зависимости от значения переменной рисуем Х или О
function init(e) {
    if (!step) {
        stepCross(e.target);
    } else {
        stepZero(e.target);
    }

    step = !step;
    game();
}


function newGame() {
    step = false;
    winnerO = false;
    winnerX = false;
    count = 0;
    result.innerHTML = '';
    fields.forEach((item) => {
        item.innerHTML = '';
        item.classList.remove('x', 'o', 'active');
    })
    gameArea.addEventListener('click', init);
}


function game() {
    // создаем массив с возможными выигрышными комбинациями
    let comb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // проходимся по массиву с комбинациями и проверяем запоненность полей по соответсвующим классам
    for (let i = 0; i < comb.length; i++) {
        if ( fields[comb[i][0]].classList.contains('x') &&
            fields[comb[i][1]].classList.contains('x') &&
            fields[comb[i][2]].classList.contains('x') ) {
                setTimeout(() => {
                    fields[comb[i][0]].classList.add('active');
                    fields[comb[i][1]].classList.add('active');
                    fields[comb[i][2]].classList.add('active');
                    result.innerHTML = 'Победитель Х';
                    winnerX = true;
                }, 1000);
                gameArea.removeEventListener('click', init);

        } else if ( 
            fields[comb[i][0]].classList.contains('o') &&
            fields[comb[i][1]].classList.contains('o') &&
            fields[comb[i][2]].classList.contains('o') 
        ) {
            setTimeout(() => {
                fields[comb[i][0]].classList.add('active');
                fields[comb[i][1]].classList.add('active');
                fields[comb[i][2]].classList.add('active');
                result.innerHTML = 'Победитель O';
                winnerO = true;
            }, 1000);
            gameArea.removeEventListener('click', init);

        } else if (count === 9) {
            if (winnerO === false && winnerX === false) {
                result.innerHTML = 'Ничья';
            }
            
            gameArea.removeEventListener('click', init);
        }
    }
}


function resize() {
    if (window.screen.width < 450) {
        circle = `<svg class="circle"><circle r="45" cx="52" cy="52" stroke="blue" stroke-width="8" fill="none" stroke-linecap="round" /></svg>`;
        cross = `<svg class="cross">
            <line class="first_line" x1="15" y1="15" x2="90" y2="90" stroke="red" stroke-width="10" stroke-linecap="round" />
            <line class="second_line" x1="90" y1="15" x2="15" y2="90" stroke="red" stroke-width="10" stroke-linecap="round" />
        </svg>`;
    }
}

resize();


newGameBtn.addEventListener('click', newGame);
gameArea.addEventListener('click', init);