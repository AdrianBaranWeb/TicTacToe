const PLAYER_ONE = 'round';
const PLAYER_TWO = 'cross';

class Game{
    cells = [...document.querySelectorAll('.game__field')]
    currentGameCombination = [
        ['','',''],
        ['','',''],
        ['','',''],
    ]
    winGameCombinations = [
        [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]
    ]
    round = 1;
    maxRounds = 9;
    row = null;
    column = null;
    isWin = false;
    
    selectCell(cell){
        let player;
        let row = this.row;
        let column = this.column;
        row = cell.getAttribute('data-row') - 1;
        column = cell.getAttribute('data-column') - 1;
        
        if(this.round % 2 === 0){
            player = PLAYER_ONE
        }else{
            player = PLAYER_TWO
        } 
        
        if(this.currentGameCombination[row][column]) return;
        
        cell.classList.add(player)
        this.currentGameCombination[row][column] = player;
        if(this.round !== 9) this.round++
        this.checkPosition(player)
    }

    checkPosition(player){
        let arr = [].concat(...this.currentGameCombination);
        let indexes = [];
        let i = -1;
        while ((i = arr.indexOf(player, i+1)) != -1){
            indexes.push(i);
        }
        if(indexes.length >= 3){
            this.checkCombinations(indexes)
            if(this.isWin) this.won()
        }
    }

    checkCombinations(indexes){
        const winComb = this.winGameCombinations;
        let compatibility = 0;
        
        for(let array of winComb){
            compatibility = 0;
            indexes.forEach(cell => {
                if(array.includes(cell)) compatibility++;
                if(compatibility === 3) this.isWin = true;
            })
        }
    }

    won(){
        console.log('wygrana');
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