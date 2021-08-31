// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
  while(playerHealth > 0 && enemyHealth > 0) {
    var promptFight = window.prompt(" Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose. ");

    if (promptFight === "skip" || promptFight === "SKIP") {
        var confirmSkip = window.confirm("Are you sure you'd like to quit");

        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye! ");
            playerMoney = playerMoney -10;
            console.log("playerMoney", playerMoney);
            break;
        }
    }
    //if (promptFight === "fight" || promptFight === "FIGHT") {
    
    enemyHealth = enemyHealth - playerAttack;
    // Log a resulting message to the console so we know that it worked.
    console.log(
    playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining "
    );
    //check enemy health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died ");
        break;
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left ");
    }
    // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
    playerHealth =  playerHealth - enemyAttack;
    // Log a resulting message to the console so we know that it worked.
    console.log (
    enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining "
    );
    if (playerHealth <=0) {
        window.alert(playerName + " has died ");
        break;
    }else {
        window.alert(playerName + " still has " + playerHealth + " health left ");
    } 
  }
};

for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
        // pick new enemy to fight based on the index of the enemyNames array
        var pickedEnemyName = enemyNames[i];
        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        enemyHealth = 50;
        //debugger
        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);
    }

   else {
       window.alert("You have lost your robot in battle! Game Over!");
       break;
   }
}

 //if (promptFight === "fight" || promptFight === "FIGHT") {




