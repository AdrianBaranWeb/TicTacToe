const HIDDEN_SCREEN = 'hidden'

class Modal {
    container = document.querySelector('.game__modal')
    content = document.querySelector('.game__information')

    showModal(winner, isWin){
        this.container.classList.toggle(HIDDEN_SCREEN)
        isWin ? this.content.innerHTML = `${winner} is a winner!` : this.content.innerHTML = `Draw!`;
    }
}

export const modal = new Modal();