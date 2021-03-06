
// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min) + min);

  return value;
};

var fightOrSkip = function() {
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose");

  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  promptFight = promptFight.toLowerCase();

  // If player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    //if yes (true) leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      
      //return true if player wants to leave
      return true;
    }
  }
  return false;
};

var fight = function(enemy) {

  var isPlayerTurn = true;

  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while(playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      
   if (fightOrSkip()) {
    // if true, leave the fight by breaking loop 
    break;
   }
  
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health +" health remaining. "
    );

    //check enemy health
    if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        //award player money for winning
        playerInfo.money = playerInfo.money + 20;

      break;
    } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left ");
    }
    // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
  } else {
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

  playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
    enemy.name + " attacked " + playerInfo.name + ". " +  playerInfo.name + " now has " + playerInfo.health + " health remaining. "
    );

    if (playerInfo.health <=0) {
        window.alert(playerInfo.name + " has died!");
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left ");
    } 
  }
  //switch turn order for next round
  isPlayerTurn = !isPlayerTurn;
  }
};

//function to start a new game
var startGame = function() {
        playerInfo.reset();
     
for (var i = 0; i < enemyInfo.length; i++) {


    if (playerInfo.health > 0) {
       // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
        // pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyObj = enemyInfo[i];

        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        pickedEnemyObj.health= randomNumber(40, 60);

       
      
        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyObj);

        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {

            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

            if (storeConfirm) {
            shop();
            }
       }
    }
   
    else {
       window.alert("You have lost your robot in battle! Game Over!");
       break;
   }
}

endGame();
};

var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!")

    //check localStorage for high score, if it's not there use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
      highscore = 0;
    }
    //if player has more money than the high score!
    if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);

      alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
      alert(playerInfo.name + " did not beat the high score of " + highScore + ". maybe next time!");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
      // restart the game
      startGame();
    } 
    else {
      window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    } 
};

var shop = function() {
    var shopOptionPrompt = window.prompt(
      "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
      );
  
      shopOptionPrompt = parseInt(shopOptionPrompt);

      switch (shopOptionPrompt) {
        case 1:
          playerInfo.refillHealth();
          break;
        case 2:
          playerInfo.upgradeAttack();
          break;
        case 3:
          window.alert("Leaving the store.");
          // do nothing, so function will end
          break;
        default:
          window.alert("You did not pick a valid option. Try again.");
          // call shop() again to force player to pick a valid option
          shop();
          break;
      }
};


var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
},
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars");
      this.health += 20;
      this.money -=7;
    }
    else {
      window.alert("You don't have enough money!");
    }
},

  upgradeAttack: function() {
    if(this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars")
      this.attack +=6;
      this.money -=7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

startGame();



