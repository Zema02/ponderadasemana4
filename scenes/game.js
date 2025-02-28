// scenes/game.js
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.spritesheet('ninja', 'assets/ninja.png', {
            frameWidth: 48, // Ajuste conforme necessário
            frameHeight: 48 
        });
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('background', 'assets/background.png');
    }

    create() {
        this.add.image(400, 300, 'background').setDisplaySize(800, 600); // Ajusta o tamanho do background
        this.ninja = this.physics.add.sprite(400, 500, 'ninja');
        this.ninja.setCollideWorldBounds(true);
        
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('ninja', { start: 0, end: 5 }), // Ajuste conforme necessário
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{ key: 'ninja', frame: 0 }],
            frameRate: 10
        });
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.bombs = this.physics.add.group();
        this.bombSpeed = 200; // Velocidade inicial das bombas
        this.bombsPerWave = 1; // Quantidade inicial de bombas por onda
        
        this.time.addEvent({ 
            delay: 1000, 
            callback: this.dropBombs, 
            callbackScope: this, 
            loop: true 
        });

        this.physics.add.collider(this.ninja, this.bombs, this.hitBomb, null, this);

        this.score = 0;
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.ninja.setVelocityX(-200);
            this.ninja.anims.play('run', true);
        } else if (this.cursors.right.isDown) {
            this.ninja.setVelocityX(200);
            this.ninja.anims.play('run', true);
        } else {
            this.ninja.setVelocityX(0);
            this.ninja.anims.play('idle');
        }

        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
        
        // Aumentar velocidade das bombas e quantidade de bombas a cada 200 pontos
        if (this.score % 200 === 0) {
            this.bombSpeed += 50;
            this.bombsPerWave += 1;
        }
    }

    dropBombs() {
        for (let i = 0; i < this.bombsPerWave; i++) {
            var x = Phaser.Math.Between(50, 750);
            var bomb = this.bombs.create(x, 0, 'bomb');
            bomb.setVelocityY(this.bombSpeed);
            bomb.setScale(0.03); // Reduz o tamanho da bomba 
        }
    }

    hitBomb() {
        this.scene.start('GameOverScene', { score: this.score });
    }
}