// JavaScript soloBlackjack
// animations and placement of object

document.getElementById('start').addEventListener('click', function () {
    //to start the game:
    document.getElementById("CurrentBet").style.visibility= "visible";
    document.getElementById("start").style.display = "none";
    document.getElementById("backOfCardRework").style.visibility = "hidden";
    document.getElementById("startround").style.visibility = "visible";
    showBetButtons();

});

document.getElementById('startround').addEventListener('click', function () {
    var bet = document.getElementById("CurrentBet").value;
    if (Number.isNaN(bet) || bet==0||bet==undefined){
        return;
    }
    else {
        console.log(bet);
        document.getElementById('startround').style.visibility = 'hidden';
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
        hideBetButtons();
    }
});

document.getElementById('changeBet').addEventListener('click', function () {
    showBetButtons();
    document.getElementById("Dealer").style.visibility = "hidden";
    document.getElementById("Player").style.visibility = "hidden";
    document.getElementById("dealerCounter").style.visibility = "hidden";
    document.getElementById("playerCounter").style.visibility = "hidden";
    document.getElementById("bet").style.visibility = "hidden";
    document.getElementById('winloss').style.visibility = "hidden";
    document.getElementById("changeBet").style.visibility = "hidden";
    document.getElementById("playAgain").style.visibility = "hidden";

    document.getElementById("CurrentBet").style.visibility = "visible";
    document.getElementById("startround").style.visibility = "visible";
});

document.getElementById('playAgain').addEventListener('click', function () {
    document.getElementById('winloss').style.visibility = "hidden";
    document.getElementById("changeBet").style.visibility = "hidden";
    document.getElementById("playAgain").style.visibility = "hidden";

    document.getElementById("hit").style.visibility = "visible";
    document.getElementById("stay").style.visibility = "visible";
    gameStart();
});
