class Player1Controller {
    constructor(x, y, configs, game) {
        this.sprite = player1Group.create(x, y, "player1");
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(32, 32, 0, 0);
        this.configs = configs;
        this.timeSinceLastFire = 0;
        this.game = game;
        this.point = new Phaser.Point(0, -1);
    }
    update() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        //Thiet lap viec di chuyen cua tank
        if (keyboard.isDown(this.configs.up)) {
            this.sprite.angle = 0;
            this.sprite.body.velocity.y = -Player1Controller.TANK_SPEED;
            this.point = new Phaser.Point(0, -1);
        } else if (keyboard.isDown(this.configs.down)) {
            this.sprite.angle = 180;
            this.sprite.body.velocity.y = Player1Controller.TANK_SPEED;
            this.point = new Phaser.Point(0, 1);
        } else if (keyboard.isDown(this.configs.left)) {
            this.sprite.angle = -90;
            this.sprite.body.velocity.x = -Player1Controller.TANK_SPEED;

        } else if (keyboard.isDown(this.configs.right)) {
            this.sprite.angle = 90;
            this.sprite.body.velocity.x = Player1Controller.TANK_SPEED;

        }

        if (this.sprite.angle == 180) {
            this.point = new Phaser.Point(0, 1);
        } else if (this.sprite.angle == -90) {
            this.point = new Phaser.Point(-1, 0);
        } else if (this.sprite.angle == 90) {
            this.point = new Phaser.Point(1, 0);
        } else {
            this.point = new Phaser.Point(0, -1);
        }
        this.timeSinceLastFire += this.game.time.physicsElapsed;

        // Kiem tra xem nguoi choi co an phim ban dan hay khong va thuc hien ban dan
        if (keyboard.isDown(this.configs.fire)) {
            this.tryFire();
        }
    }

    tryFire() {
        if (this.timeSinceLastFire >= this.configs.cooldown) {
            this.fire();
            this.timeSinceLastFire = 0;
        }
    }
    fire() {
        this.createBullet(this.point);
    }
    createBullet(direction) {
        new BulletPlayer1Controller(
            this.sprite.position,
            direction,
            "BulletType2.png",
            this.sprite.angle
        );
    }
}

Player1Controller.TANK_SPEED = 100;
Player1Controller.TANK_NAME = "tank_player1_up_c0_t1.png";
