import {modal} from './Modal.js'

const PLAYER_ONE = 'circle';
const PLAYER_TWO = 'cross';

class Game{
    cells = [...document.querySelectorAll('.game__field')];
    currentGameCombination = [
        ['','',''],
        ['','',''],
        ['','',''],
    ];
    winGameCombinations = [
        [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]
    ];
    round = 0;
    row = null;
    column = null;
    isWin = false;
    newGameButton = document.querySelector('.start-game__button');
    winningCombination = [];
    
    selectCell(cell){
        if(this.isWin) return
        let player;
        let row = this.row;
        let column = this.column;
        row = cell.getAttribute('data-row') - 1;
        column = cell.getAttribute('data-column') - 1;
        
        if(this.currentGameCombination[row][column]) return;
        this.round % 2 === 0 ? player = PLAYER_ONE : player = PLAYER_TWO;  
        
        cell.classList.add(player)
        this.currentGameCombination[row][column] = player;
        this.addPlayerPosition(player);
    }
    
    addPlayerPosition(player){
        this.round++  
        let arr = [].concat(...this.currentGameCombination);
        let playerPositions = [];
        let i = -1;
        while ((i = arr.indexOf(player, i + 1)) != -1){
            playerPositions.push(i);
        }
        if(playerPositions.length >= 3) this.checkCombinations(playerPositions, player)
    }

    checkCombinations(playerPositions, player){ 
        const winCombinations = this.winGameCombinations;
        let compatibility = 0;
        
        for(let combination of winCombinations){
            compatibility = 0;
            playerPositions.forEach(position => {
                if(combination.includes(position)) compatibility++;
                if(compatibility === 3) {
                    this.isWin = true;
                    this.winningCombination = combination;
                }
            })
        }
        if(this.round === 9 && !this.isWin) modal.showModal()
        if(this.isWin) this.won(player)
    }

    won(playerWon){
        this.winningCombination.forEach(element => this.cells[element].style.background = 'red')
        modal.showModal(playerWon, this.isWin)
    }

    addListenersOnElements(){
        this.cells.forEach(cell => cell.addEventListener('click', () => this.selectCell(cell)))
        this.newGameButton.addEventListener('click', () => location.reload())
    }

    initGame(){
        this.addListenersOnElements();
    }
}

window.onload = function(){
    const game = new Game();
    game.initGame()
}