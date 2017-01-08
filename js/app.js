// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = Math.floor((Math.random() * 3) + 1 ) * 83-30;
    this.speed = Math.floor((Math.random() * 1) + 1 );
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 400){
       this.x += dt * 30 * this.speed;
    }
    else{
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 2 * 101;
    this.y = 5 * 83 -10;
    this.score = 0;

};

// Update the Player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    allEnemies.forEach(function(enemy) {
        if(player.x<=enemy.x+80 && player.x>= enemy.x){
            if (player.y<=enemy.y+20 && player.y>= enemy.y){
                player.x = 2 * 101;
                player.y = 5 * 83 -10;
                player.score = 0;
                ctx.clearRect(0,5*83+110,500,100);
                ctx.fillText("Score:", 10,6*83+110);
                ctx.fillText(player.score.toString(), 90,6*83+110);
            }else if(enemy.y>=player.y && enemy.y <= player.y+20){
                player.x = 2 * 101;
                player.y = 5 * 83 -10;
                player.score = 0;
                ctx.clearRect(0,5*83+110,500,100);
                ctx.fillText("Score:", 10,6*83+110);
                ctx.fillText(player.score.toString(), 90,6*83+110);
            }
        }else if (enemy.x>=player.x && enemy.x <= player.x+80){
            if (player.y<=enemy.y+20 && player.y>= enemy.y){
                player.x = 2 * 101;
                player.y = 5 * 83 -10;
                player.score = 0;
                ctx.clearRect(0,5*83+110,500,100);
                ctx.fillText("Score:", 10,6*83+110);
                ctx.fillText(player.score.toString(), 90,6*83+110);
            }else if(enemy.y>=player.y && enemy.y <= player.y+20){
                player.x = 2 * 101;
                player.y = 5 * 83 -10;
                player.score = 0;
                ctx.clearRect(0,5*83+110,500,100);
                ctx.fillText("Score:", 10,6*83+110);
                ctx.fillText(player.score.toString(), 90,6*83+110);
            }
        }
    });

};

Player.prototype.handleInput = function(direction) {
    if(direction === 'left'){
        if(this.x >= 101){
            this.x = this.x - 30;
        }
    }
    if(direction === 'right'){
        if(this.x < 404){
            this.x = this.x + 30;
        }
    }
    if(direction === 'up'){
        if(this.y >= 156){
            this.y = this.y - 83;
        }else if(this.y >= 73 && this.y < 155 ){
            this.y = this.y - 83;
            this.score +=50;
            ctx.clearRect(0,5*83+110,500,100);
            ctx.fillText("Score:", 10,6*83+110);
            ctx.fillText(this.score.toString(), 90,6*83+110);
        }else if(this.y == -10){
            player.x = 2 * 101;
            player.y = 5 * 83 -10;
        }
    }
    if(direction === 'down'){
        if(this.y < 4 * 83 && this.y > -10){
            this.y = this.y + 83;
        } else if(this.y == -10){
            player.x = 2 * 101;
            player.y = 5 * 83 -10;
        }
    }

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.selectCharacter = function(width,height,a,b) {
    if(a>=0.60*width && a<=0.79*width && b>=0.13*height && b<=0.27*height){
        this.sprite = 'images/char-boy.png';
    }
    if(a>=0.60*width && a<=0.78*width && b>=0.28*height && b<=0.4*height){
        this.sprite = 'images/char-cat-girl.png';
    }
    if(a>=0.60*width && a<=0.78*width && b>=0.41*height && b<=0.55*height){
        this.sprite = 'images/char-horn-girl.png';
    }
    if(a>=0.60*width && a<=0.78*width && b>=0.56*height && b<=0.68*height){
        this.sprite = 'images/char-pink-girl.png';
    }
    if(a>=0.60*width && a<=0.78*width && b>=0.69*height && b<=0.83*height){
        this.sprite = 'images/char-princess-girl.png';
    }
};


// Now instantiate your objects.
// Place all player objects in an array called allEnemies
var allEnemies = new Array();
for(var i=0;i<4;i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
}
// Place the player object in a variable called player

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// The code for getting Mouse Positon
// When the Users click the screen, get the click position and if it is aiming to change characters, then send signals
function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    var intElemClientWidth = document.body.clientWidth;
    var intElemClientHeight = document.body.clientHeight;
    console.log(intElemClientWidth,intElemClientHeight,x,y);


    player.selectCharacter(intElemClientWidth,intElemClientHeight,x,y);
    return { 'x': x, 'y': y };
}
document.addEventListener('click', getMousePos, false);

