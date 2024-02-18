const restart = document.querySelector('.restart')
const start = document.querySelector('.start')
const places = document.querySelectorAll('.board__place')
const info = document.querySelector('.info')

let turn = 1;
const cross = 'X'
const circle = 'O'
let gameRunning = false;
let board = ["","","","","","","","","",]
const wins = [
    ["0","1","2"],
    ["3","4","5"],
    ["6","7","8"],
    ["0","3","6"], 
    ["1","4","7"], 
    ["2","5","8"],
    ["0","4","8"], 
    ["2","4","6"]
]

const play = () => {
   clear()
    gameRunning = true;
    info.textContent = `${cross}'s turn`
  
}


const clear = () => {
    places.forEach((place) => place.innerHTML = '')
    board = ["", "", "", "", "", "", "", "", ""];
    turn = 1;
    gameRunning = false;
    info.textContent = '';
}

const addSign = (e) => {
    if(gameRunning){
        const placeId = e.target.id
        if(e.target.innerHTML === `cross` || e.target.innerHTML === `circle`)
            return
        else if(e.target.innerHTML === ''){
            const playerTurn = turn % 2 === 0 ? circle : cross;
            e.target.innerHTML = playerTurn;
            board[placeId] = playerTurn;
            const playerTurnInfo = turn % 2 === 0 ? cross : circle;
            info.textContent = `${playerTurnInfo}'s turn`
  
            if(checkWin(playerTurn)){
                info.textContent = `${playerTurn} wins`
                gameRunning = false;
            } else if(checkDraw()){
                info.textContent = `Draw`
                gameRunning = false;
            } 
            turn++
        }
    } return
    
}



const checkWin = (player) => {
    return wins.some(combination =>
        combination.every(index => board[index] === player)
    );
};
  
const checkDraw = () => {
    return board.every(cell => cell !== '');
};


restart.addEventListener('click', clear)
start.addEventListener('click', play)
places.forEach((place) => place.addEventListener('click', addSign))