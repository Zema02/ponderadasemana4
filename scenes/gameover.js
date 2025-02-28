// scenes/gameover.js
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' }); // inicializa a cena com a chave 'GameOverScene'
    }

    init(data) {
        this.finalScore = data.score; // armazena a pontuacao final recebida da cena anterior
    }

    create() {
        // exibe a mensagem de game over na tela
        this.add.text(250, 250, 'Game Over', { fontSize: '32px', fill: '#fff' });

        // mostra a pontuacao final do jogador
        this.add.text(200, 300, 'Pontuacao: ' + this.finalScore, { fontSize: '20px', fill: '#fff' });

        // instrui o jogador a pressionar R para reiniciar o jogo
        this.add.text(200, 350, 'Pressione R para reiniciar', { fontSize: '20px', fill: '#fff' });

        // escuta o pressionamento da tecla R e reinicia o jogo
        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('GameScene'); // volta para a cena do jogo
        });
    }
}