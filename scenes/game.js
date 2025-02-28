// scenes/game.js
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' }); // inicializa a cena do jogo
    }

    preload() {
        // carrega a spritesheet do ninja com largura e altura dos frames
        this.load.spritesheet('ninja', 'assets/ninja.png', {
            frameWidth: 48, // ajuste conforme necessario
            frameHeight: 48,
            margin: 0,      // adicionado
            spacing: 0      // adicionado
        });

        // carrega imagens do jogo
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('background', 'assets/background.png');
    }

    create() {
        // adiciona o background e ajusta o tamanho da tela
        this.add.image(400, 300, 'background').setDisplaySize(800, 600); 

        // cria o personagem ninja com fisica aplicada
        this.ninja = this.physics.add.sprite(400, 500, 'ninja');
        this.ninja.setCollideWorldBounds(true); // impede que o ninja saia da tela

        // garante origem central (caso queira ajustar a ancoragem)
        this.ninja.setOrigin(0.5, 0.5); // adicionado

        // garante que o tamanho do corpo de física seja 48x48 e sem offset
        this.ninja.body.setSize(48, 48).setOffset(0, 0); // adicionado
        
        // cria a animacao de corrida do ninja
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('ninja', { start: 0, end: 5 }), // ajuste conforme necessario
            frameRate: 10,
            repeat: -1
        });

        // cria a animacao do ninja parado
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'ninja', frame: 0 }],
            frameRate: 10
        });
        
        // captura teclas direcionais para movimentacao
        this.cursors = this.input.keyboard.createCursorKeys();

        // grupo de bombas que caem do ceu
        this.bombs = this.physics.add.group();
        this.bombSpeed = 200; // velocidade inicial das bombas
        this.bombsPerWave = 1; // quantidade inicial de bombas por onda
        
        // define um evento que solta bombas a cada segundo
        this.time.addEvent({ 
            delay: 1000, 
            callback: this.dropBombs, 
            callbackScope: this, 
            loop: true 
        });

        // verifica colisao entre ninja e bombas
        this.physics.add.collider(this.ninja, this.bombs, this.hitBomb, null, this);

        // inicializa a pontuacao e exibe no canto da tela
        this.score = 0;
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#fff' });
    }

    update() {
        // movimentacao do ninja para esquerda
        if (this.cursors.left.isDown) {
            this.ninja.setVelocityX(-200);
            this.ninja.anims.play('run', true);
        } 
        // movimentacao do ninja para direita
        else if (this.cursors.right.isDown) {
            this.ninja.setVelocityX(200);
            this.ninja.anims.play('run', true);
        } 
        // se nenhuma tecla for pressionada, ninja fica parado
        else {
            this.ninja.setVelocityX(0);
            this.ninja.anims.play('idle');
        }

        // aumenta a pontuacao ao longo do tempo
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
        
        // aumenta a dificuldade: mais velocidade e mais bombas a cada 200 pontos
        if (this.score % 200 === 0) {
            this.bombSpeed += 50;
            this.bombsPerWave += 1;
        }
    }

    dropBombs() {
        // cria bombas na tela de acordo com a quantidade definida por onda
        for (let i = 0; i < this.bombsPerWave; i++) {
            var x = Phaser.Math.Between(50, 750); // escolhe uma posicao aleatoria
            var bomb = this.bombs.create(x, 0, 'bomb');
            bomb.setVelocityY(this.bombSpeed); // define a velocidade da bomba
            bomb.setScale(0.03); // reduz o tamanho da bomba 
        }
    }

    hitBomb() {
        // muda para a cena de game over e passa a pontuacao final
        this.scene.start('GameOverScene', { score: this.score });
    }
}