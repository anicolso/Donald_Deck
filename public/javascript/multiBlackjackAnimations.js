//////////////////////////////////
//    Multiplayer Animations    //
//////////////////////////////////

//Readying up
document.getElementById('readyUp').addEventListener('click', function () {
    document.getElementById("roomID").style.visibility= "hidden";
    document.getElementById("backOfCardRework").style.visibility = "hidden";
    document.getElementById("readyUp").style.display = "none";
    document.getElementById("CurrentBet").style.visibility= "visible";
    document.getElementById("startMatch").style.visibility = "visible";

    showBetButtons();
});

document.getElementById('startMatch').addEventListener('click', function () {
    var bet = document.getElementById("CurrentBet").value;
    if (Number.isNaN(bet) || bet==0||bet==undefined){
        return;
    }
    else {
        console.log(bet);
        document.getElementById('startMatch').style.visibility = 'hidden';
        document.getElementById("CurrentBet").style.visibility = "hidden";
        document.getElementById("multicontainer").style.visibility = "hidden";

        document.getElementById("bet").innerHTML = `Bet: ${bet}`;
        document.getElementById("bet").style.visibility = "visible";

        document.getElementById("Player").style.visibility = "visible";
        document.getElementById("Dealer").style.visibility = "visible";
        document.getElementById("playerCounter").style.visibility = "visible";
        document.getElementById("dealerCounter").style.visibility = "visible";
        document.getElementById("hit").style.visibility = "visible";
        document.getElementById("stay").style.visibility = "visible";
        document.getElementById("viewLeaderboard").style.visibility = "visible";

        hideBetButtons();
    }
    gameStart();
});

document.getElementById('changeBet').addEventListener('click', function () {
    document.getElementById("Dealer").style.visibility = "hidden";
    document.getElementById("Player").style.visibility = "hidden";
    document.getElementById("dealerCounter").style.visibility = "hidden";
    document.getElementById("playerCounter").style.visibility = "hidden";
    document.getElementById("bet").style.visibility = "hidden";
    document.getElementById('winloss').style.visibility = "hidden";
    document.getElementById("changeBet").style.visibility = "hidden";
    document.getElementById("playAgain").style.visibility = "hidden";
    document.getElementById("viewLeaderboard").style.visibility = "hidden";
    document.getElementById("leaderboardContainer").style.visibility = "hidden";

    document.getElementById("startMatch").style.visibility = "visible";
    document.getElementById("CurrentBet").style.visibility = "visible";
    showBetButtons();
});

document.getElementById('playAgain').addEventListener('click', function () {
    document.getElementById('winloss').style.visibility = "hidden";
    document.getElementById("changeBet").style.visibility = "hidden";
    document.getElementById("playAgain").style.visibility = "hidden";

    document.getElementById("hit").style.visibility = "visible";
    document.getElementById("stay").style.visibility = "visible";
    gameStart();
});

document.getElementById('viewLeaderboard').addEventListener('click', function(){
    document.getElementById('leaderboardContainer').style.visibility = "visible";
    document.getElementById("hit").style.visibility = "hidden";
    document.getElementById("stay").style.visibility = "hidden";
    document.getElementById('winloss').style.visibility = "hidden";
});

document.getElementById('closeLeaderboard').addEventListener('click', function(){
    document.getElementById('leaderboardContainer').style.visibility = "hidden";
    document.getElementById("hit").style.visibility = "visible";
    document.getElementById("stay").style.visibility = "visible";
});

//////////////////////////////////
//    Modified file end here    //
//////////////////////////////////
