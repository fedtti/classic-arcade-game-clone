// define the sprites coordinates
const coordinates = {
    spriteWidth: 101,
    spriteHeight: 50.5,
    spriteMinSpeed: 50,
    spriteMaxSpeed: 500,
    spritePositionsX: [0, 50.5, 101, 151.5, 202, 252.5, 303, 353.5, 404],
    spritePositionsY: [81.5, 132, 182.5, 233, 283.5, 334, 384.5],
    spriteMove: 50.5,
};

/**
 * @description generate a random number
 * @params {number} min, {number} max
 * @return {number}
 */
const getRandomInteger = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// an array of created enemies
let allEnemies = [];

/**
 * @description create an enemy
 * @constructor
 */
class Enemy {
    // the enemy proprieties
    constructor(enemyDefaultY, spriteSpeed) {
        this.sprite = "/images/enemy-bug.png";
        this.width = coordinates.spriteWidth;
        this.height = coordinates.spriteHeight;
        this.x = getRandomInteger(-1010, -101);
        this.y = enemyDefaultY;
        this.speed = spriteSpeed;
    }

    // update the enemy
    update(dt) {
        this.x = this.x + this.speed * dt;
        if (this.x > canvas.width) {
            this.x = getRandomInteger(-1010, -101);
        }
    }

    // render the enemy
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// instantiate an enemy
const enemy = new Enemy();

/**
 * @description create the enemies
 * @constructor
*/
class Enemies {
    // the enemies proprieties
    constructor() {
        this.createdEnemies = [];
    }

    // spawn the enemies
    spawn(num) {
        for (let i = 0; i < num; i++) {
            const spriteSpeed = getRandomInteger(coordinates.spriteMinSpeed, coordinates.spriteMaxSpeed);
            const enemyDefaultY = getRandomInteger(0, 8);
            this.createdEnemies[allEnemies.length] = new Enemy(coordinates.spritePositionsY[enemyDefaultY], spriteSpeed);
            allEnemies.push(this.createdEnemies[allEnemies.length]);
        }
    }

    // reset the enemies
    reset() {
        for (let i = 0; i < allEnemies.length; i++) {
            allEnemies.splice(i, allEnemies.length);
        }
    }
};

// instantiate the enemies
const enemies = new Enemies();

// an array of created gems
let allGems = [];

/**
 * @description create a gem
 * @constructor
 */
class Gem {
    // the gem proprieties
    constructor(gemDefaultX, gemDefaultY) {
        const gemsColors = ["gem-blue", "gem-green", "gem-orange"];
        this.sprite = `/images/${gemsColors[getRandomInteger(0, 2)]}.png`;
        this.width = coordinates.spriteWidth;
        this.height = coordinates.spriteHeight;
        this.x = gemDefaultX;
        this.y = gemDefaultY;
    }

    // clear the gem
    clear() {
        this.x = -101;
    }

    // reset the gem
    reset() {
        gem = new Gem();
    }

    // render the gem
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// instantiate a gem
let gem = new Gem();

// define and set the gems count
let gemsCount = 0;
const gemsCounter = document.getElementById("gems-counter");
gemsCounter.innerHTML = gemsCount;

/**
 * @description create the gems
 * @constructor
 */
class Gems {
    // the gems proprieties
    constructor() {
        this.createdGems = [];
    }

    // spawn the gems
    spawn(num) {
        for (let i = 0; i < num; i++) {
            const gemDefaultX = getRandomInteger(0, 10);
            const gemDefaultY = getRandomInteger(0, 8);
            this.createdGems[allGems.length] = new Gem(coordinates.spritePositionsX[gemDefaultX], coordinates.spritePositionsY[gemDefaultY]);
            allGems.push(this.createdGems[allGems.length]);
        }
    }

    // reset the gems
    reset() {
        for(let i = 0; i < allGems.length; i++) {
            allGems.splice(i, allGems.length);
        }
    }
};

// instantiate the gems
const gems = new Gems();

// fix a resources.js issue
let playerCharacter = "boy";

// define the player position
const playerDefaultY = 435;
const playerDefaultX = 202;

// set the lives counter
const livesCounter = document.getElementById("lives-counter");

/**
 * @description create a player
 * @constructor
 */
class Player {
    // the player proprieties
    constructor() {
        this.sprite = "/images/char-boy.png";
        this.width = coordinates.spriteWidth;
        this.height = coordinates.spriteHeight;
        this.x = playerDefaultX;
        this.y = playerDefaultY;
        this.lives = 3;
        livesCounter.innerHTML = this.lives;
        this.reset();
    }

    // setup the player
    setup() {
      this.sprite = `/images/char-${playerCharacter}.png`;
    }

    // update the player
    update() {
        this.playerCurrentX = this.x;
        this.playerCurrentY = this.y;
    }

    // move the player
    move(key) {
        if (key === "left" && this.x > 0) {
            this.x = this.playerCurrentX + -coordinates.spriteMove;
        }

        if (key === "up" && this.y > 0) {
            this.y = this.playerCurrentY + -coordinates.spriteMove;
        }

        if (key === "right" && this.x < 404) {
            this.x = this.playerCurrentX + coordinates.spriteMove;
        }

        if (key === "down" && this.y < 435) {
            this.y = this.playerCurrentY + coordinates.spriteMove;
        }
    }

    // handle the player hit
    hit() {
        this.reset();
    }

    // handle the player death
    die() {
        this.lives--;
        livesCounter.innerHTML = this.lives;
        this.reset();
    }

    // reset the player
    reset() {
        this.x = playerDefaultX;
        this.y = playerDefaultY;
    }

    // render the player
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// instantiate a player
const player = new Player();

// define and set the allowed keys
document.addEventListener("keyup", e => {
    const allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    player.move(allowedKeys[e.keyCode]);
});

// set the level counter
const levelCounter = document.getElementById("level-counter");

/**
 * @description create a level
 * @constructor
 */
class Level {
    // the level proprieties
    constructor() {
        this.level = 1;
        levelCounter.innerHTML = this.level;
        enemies.spawn(2);
        gems.spawn(2);
    }

    // update the level
    update() {
        this.level++;
        levelCounter.innerHTML = this.level;
        if (this.level > 1) {
            enemies.spawn(1);
        }
        gems.reset();
        gems.spawn(getRandomInteger(2, 4));
        player.reset();
    }

    // reset the level
    reset() {
        this.level = 1;
        levelCounter.innerHTML = this.level;
        enemies.reset();
        enemies.spawn(2);
        gemsCount = 0;
        gemsCounter.innerHTML = gemsCount;
        gem.reset();
        player.lives = 3;
        livesCounter.innerHTML = player.lives;
        player.reset();
    }
};

// instantiate a level
const level = new Level();