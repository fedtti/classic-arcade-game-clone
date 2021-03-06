/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What"s really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas" context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

const Engine = (function(global) {
  /* Predefine the variables we"ll be using within this scope,
   * create the canvas element, grab the 2D context for that canvas
   * set the canvas elements height/width and add it to the DOM.
   */
    const canvas = document.createElement("canvas");
    canvas.width = 505;
    canvas.height = 606;
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    let lastTime;
    const main = function() {
    /* Get our time delta information which is required if your game
     * requires smooth animation. Because everyone"s computer processes
     * instructions at different speeds we need a constant value that
     * would be the same for everyone (regardless of how fast their
     * computer is) - hurray time!
     */
        let now = Date.now(), dt = (now - lastTime) / 1000.0;

    /* Call our update/render functions, pass along the time delta to
     * our update function since it may be used for smooth animation.
     */
        update(dt);
        render();

  /* Set our lastTime variable which is used to determine the time delta
   * for the next time this function is called.
   */
        lastTime = now;

  /* Use the browser"s requestAnimationFrame function to call this
   * function again as soon as the browser is able to draw another frame.
   */
        window.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    const init = function() {
        reset();
        lastTime = Date.now();
        main();
    };

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity"s data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we"ve left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    const update = function(dt) {
        updateEntities(dt);
        checkCollisions();
    };

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    const updateEntities = function(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    };

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that"s how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    const render = function() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        let rowImages = [
                "/img/water-block.png",   // Top row is water
                "/img/stone-block.png",   // Row 1 of 3 of stone
                "/img/stone-block.png",   // Row 2 of 3 of stone
                "/img/stone-block.png",   // Row 3 of 3 of stone
                "/img/grass-block.png",   // Row 1 of 2 of grass
                "/img/grass-block.png"    // Row 2 of 2 of grass
        ],
        numRows = 6,
        numCols = 5,
        row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /* Loop through the number of rows and columns we"ve defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas" context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We"re using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we"re using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    };

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    const renderEntities = function() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        allGems.forEach(function(gem) {
            gem.render();
        });

        player.render();
    };

    // check for all of the collisions between the sprites
    const checkCollisions = function() {
        const collision = (a, b) => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;

        // check if the player hit an enemy
        allEnemies.forEach(enemy => {
            if (collision(player, enemy)) {
                // reset the player position
                player.hit();
                // if the player has more than a life take away a life, otherwise reset the game
                return player.lives > 1 ? player.die() : reset();

            }
        });

        // check if the player collect a gem
        allGems.forEach(gem => {
            if (collision(player, gem)) {
                gemsCount++;
                gemsCounter.innerHTML = gemsCount;
                gem.clear();
            }
        });

        // check if the player hit the water
        if (player.y < 93) {
            level.update();
        }
    };

    // reset the level
    const reset = () => {
        level.reset();
    };

    Resources.load([
        "/img/stone-block.png",
        "/img/water-block.png",
        "/img/grass-block.png",
        "/img/enemy-bug.png",
        "/img/gem-blue.png",
        "/img/gem-green.png",
        "/img/gem-orange.png",
        "/img/char-boy.png",
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);