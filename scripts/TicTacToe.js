class Game{
    cells = [...document.querySelectorAll('.game__field')]
    activeCells = cells.length

    addListenersOnElements(){
        this.cells.forEach(cell => cell.addEventListener('click', selectCell()))
    }

    initGame(){
        addListenersOnElements();
    }
}

window.onload = function(){
    const game = new Game();
    game.initGame()
}