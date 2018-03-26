"use strict";

// define the sprites constants
const constants = {
    SPRITE_Y_POSITIONS: [81.5, 132, 182.5, 233, 283.5, 334, 384.5],
    // enemy-only constants
    ENEMY_WIDTH: 98,
    ENEMY_HEIGHT: 77,
    ENEMY_Y_POSITIONS: [110.5, 149, 187.5, 226, 264.5, 303, 341.5, 380, 418.5],
    ENEMY_MIN_SPEED: 50,
    ENEMY_MAX_SPEED: 500,
    // gem-only constants
    GEM_WIDTH: 95,
    GEM_HEIGHT: 111,
    GEM_X_POSITIONS: [3, 53.5, 104, 154.5, 205, 255.5, 306, 356.5, 407],
    GEM_Y_POSITIONS: [25.5, 81, 136.5, 192, 247.5, 303, 358.5, 414, 469.5],
    // player-only constants
    PLAYER_DEFAULT_WIDTH: 67,
    PLAYER_DEFAULT_HEIGHT: 87,
    PLAYER_DEFAULT_X_POSITION: 219,
    PLAYER_DEFAULT_Y_POSITION: 497,
    PLAYER_STEP: 50.5
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
        this.sprite = "/img/enemy-bug.png";
        this.width = constants.ENEMY_WIDTH;
        this.height = constants.ENEMY_HEIGHT;
        this.x = getRandomInteger(-980, -98);
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
            const spriteSpeed = getRandomInteger(constants.ENEMY_MIN_SPEED, constants.ENEMY_MAX_SPEED);
            const enemyDefaultY = getRandomInteger(0, 10);
            this.createdEnemies[allEnemies.length] = new Enemy(constants.ENEMY_Y_POSITIONS[enemyDefaultY], spriteSpeed);
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
        this.sprite = `/img/${gemsColors[getRandomInteger(0, 2)]}.png`;
        this.width = constants.GEM_WIDTH;
        this.height = constants.GEM_HEIGHT;
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
            const gemDefaultY = getRandomInteger(0, 10);
            this.createdGems[allGems.length] = new Gem(constants.GEM_X_POSITIONS[gemDefaultX], constants.SPRITE_Y_POSITIONS[gemDefaultY]);
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

// set the lives counter
const livesCounter = document.getElementById("lives-counter");

/**
 * @description create a player
 * @constructor
 */
class Player {
    // the player proprieties
    constructor() {
        this.sprite = "/img/char-boy.png";
        this.width = constants.PLAYER_DEFAULT_WIDTH;
        this.height = constants.PLAYER_DEFAULT_HEIGHT;
        this.x = constants.PLAYER_DEFAULT_X_POSITION;
        this.y = constants.PLAYER_DEFAULT_Y_POSITION;
        this.lives = 3;
        livesCounter.innerHTML = this.lives;
        this.reset();
    }

    // update the player
    update() {
        this.x;
        this.y;
    }

    // move the player
    move(key) {
        if (key === "left" && this.x > 50.5) {
            this.x += -constants.PLAYER_STEP;
        }

        if (key === "up" && this.y > 50.5) {
            this.y += -constants.PLAYER_STEP;
        }

        if (key === "right" && this.x < 421) {
            this.x += constants.PLAYER_STEP;
        }

        if (key === "down" && this.y < 497) {
            this.y += constants.PLAYER_STEP;
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
        this.x = constants.PLAYER_DEFAULT_X_POSITION;
        this.y = constants.PLAYER_DEFAULT_Y_POSITION;
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