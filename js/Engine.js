
class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    addBackground(this.root);
  }

  gameLoop = () => {
    let speedFactor = 0.25;

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff,speedFactor);
    });

    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    if (this.isPlayerDead()) {
      window.alert('Game over');
      return;
    }

    setTimeout(this.gameLoop, 20);
    setTimeout(speedFactor+=500,2000);
  };

  isPlayerDead = () => {
    //TODO loop over enemies
    // let enemyRightSide;
    // let enemyLeftSide;
    // let playerRightSide = this.player.x + PLAYER_WIDTH;
    // let playerLeftSide = this.player.x;
    // let playerY = GAME_HEIGHT - PLAYER_HEIGHT - 10;
    // for (let i = 0; i < this.enemies.length; i++) {
    //   //check if collision with player exists
    //   enemyRightSide = this.enemies[i].x + ENEMY_WIDTH;
    //   enemyLeftSide = this.enemies[i].x;

    //     if(enemyLeftSide < playerLeftSide 
    //       && (enemyRightSide>playerLeftSide && enemyRightSide<playerRightSide)
    //       && this.enemies[i].y + ENEMY_HEIGHT >= playerY){
    //         return true;
    //     }
    //     if(enemyLeftSide>playerLeftSide && enemyLeftSide<playerRightSide
    //       && this.enemies[i].y + ENEMY_HEIGHT >= playerY){
    //       return true;
    //     }

    // }
    let enemyR;
    let enemyL;
    let playerR = this.player.x + PLAYER_WIDTH;
    let playerL = this.player.x;
    let playerY = GAME_HEIGHT - PLAYER_HEIGHT - 10;
    for (let i = 0; i < this.enemies.length; i++) {
      //check if collision with player exists
      enemyR = this.enemies[i].x + ENEMY_WIDTH;
      enemyL = this.enemies[i].x;

        if(enemyL < playerL 
          && (enemyR>playerL && enemyR<playerR)
          && this.enemies[i].y + ENEMY_HEIGHT >= playerY){
            return true;
        }
        if(enemyL>playerL && enemyL<playerR
          && this.enemies[i].y + ENEMY_HEIGHT >= playerY){
          return true;
        }

    }

    return false;

  };
}
