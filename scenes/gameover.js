// scenes/gameover.js
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score;
    }

    create() {
        this.add.text(250, 250, 'Game Over', { fontSize: '32px', fill: '#fff' });
        this.add.text(200, 300, 'Pontuação: ' + this.finalScore, { fontSize: '20px', fill: '#fff' });
        this.add.text(200, 350, 'Pressione R para reiniciar', { fontSize: '20px', fill: '#fff' });

        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('GameScene');
        });
    }
}
