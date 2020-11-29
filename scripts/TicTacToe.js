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
    round = 1;
    row = null;
    column = null;
    isWin = false;
    
    selectCell(cell){
        if(this.isWin) return
        let player;
        let row = this.row;
        let column = this.column;
        row = cell.getAttribute('data-row') - 1;
        column = cell.getAttribute('data-column') - 1;
        
        this.round % 2 === 0 ? player = PLAYER_ONE : player = PLAYER_TWO;
        
        if(this.currentGameCombination[row][column]) return;
        
        cell.classList.add(player)
        this.currentGameCombination[row][column] = player;
        this.addPlayerPosition(player)
    }

    addPlayerPosition(player){
        this.round++  
        let arr = [].concat(...this.currentGameCombination);
        let palyerPositions = [];
        let i = -1;
        while ((i = arr.indexOf(player, i+1)) != -1){
            palyerPositions.push(i);
        }
        if(palyerPositions.length >= 3) this.checkCombinations(palyerPositions, player)
    }

    checkCombinations(palyerPositions, player){ 
        const winCombinations = this.winGameCombinations;
        let compatibility = 0;
        
        for(let combination of winCombinations){
            compatibility = 0;
            palyerPositions.forEach(position => {
                if(combination.includes(position)) compatibility++;
                if(compatibility === 3){ 
                    this.isWin = true
                    this.won(combination, player)
                };
            })
        }
        if(this.round > 9 && !this.isWin) alert('Draw')
    }

    won(wonCombination, playerWon){
        wonCombination.forEach(numberElement => this.cells[numberElement].style.background = 'red')
        alert(`${playerWon} is a winner`)
    }

    addListenersOnElements(){
        this.cells.forEach(cell => cell.addEventListener('click', () => this.selectCell(cell)))
    }

    initGame(){
        this.addListenersOnElements();
    }
}

window.onload = function(){
    const game = new Game();
    game.initGame()
}