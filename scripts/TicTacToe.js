const PLAYER_ONE = 'round';
const PLAYER_TWO = 'cross';

class Game{
    cells = [...document.querySelectorAll('.game__field')]
    currentGameCombination = [
        ['','',''],
        ['','',''],
        ['','',''],
    ]
    round = 1;
    maxRounds = 9;
    row = null;
    column = null;

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
        console.log(this.currentGameCombination)
        this.round++;
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