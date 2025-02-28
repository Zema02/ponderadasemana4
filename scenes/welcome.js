// scenes/welcome.js
class WelcomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WelcomeScene' });
    }

    create() {
        this.add.text(250, 200, 'Ninja Escape', { fontSize: '32px', fill: '#fff' });
        this.add.text(150, 300, 'Pressione ESPAÇO para começar', { fontSize: '20px', fill: '#fff' });
        this.add.text(150, 350, 'Use as setas para mover o ninja', { fontSize: '18px', fill: '#fff' });
        
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}