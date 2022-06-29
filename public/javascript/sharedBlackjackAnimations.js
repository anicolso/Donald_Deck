// JavaScript Shared Blackjack Animations
// animations and placement of object
console.log(document.getElementById(CurrentBet.value));

document.getElementById('Add5').addEventListener('click', function () {
    var currbet = document.getElementById("CurrentBet").value;
    console.log("click:", parseInt(currbet));
    var numcoins = parseInt(currbet);
    if (Number.isNaN(numcoins)) {
        numcoins = 5;
    }
    else {
        numcoins = numcoins + 5;
    }
    document.getElementById("CurrentBet").innerHTML = "Current Bet: " + numcoins;
    document.getElementById("CurrentBet").value = numcoins;
});

document.getElementById('Add10').addEventListener('click', function () {
    var currbet = document.getElementById("CurrentBet").value;
    console.log("click:", parseInt(currbet));
    var numcoins = parseInt(currbet);
    if (Number.isNaN(numcoins)) {
        numcoins = 10;
        console.log(numcoins);
    }
    else {
        numcoins = numcoins + 10;
    }
    document.getElementById("CurrentBet").innerHTML = "Current Bet: " + numcoins;
    document.getElementById("CurrentBet").value = numcoins;
});

document.getElementById('Add25').addEventListener('click', function () {
    var currbet = document.getElementById("CurrentBet").value;
    console.log("click:", parseInt(currbet));
    var numcoins = parseInt(currbet);
    if (Number.isNaN(numcoins)) {
        numcoins = 25;
    }
    else {
        numcoins = numcoins + 25;
    }
    document.getElementById("CurrentBet").innerHTML = "Current Bet: " + numcoins;
    document.getElementById("CurrentBet").value = numcoins;
});

document.getElementById('Add100').addEventListener('click', function () {
    var currbet = document.getElementById("CurrentBet").value;
    console.log("click:", parseInt(currbet));
    var numcoins = parseInt(currbet);
    if (Number.isNaN(numcoins)) {
        numcoins = 100;
    }
    else {
        numcoins = numcoins + 100;
    }
    document.getElementById("CurrentBet").innerHTML = "Current Bet: " + numcoins;
    document.getElementById("CurrentBet").value = numcoins;
});

document.getElementById('Sub5').addEventListener('click', function () {
    var currbet = document.getElementById("CurrentBet").value;
    console.log("click: -5", parseInt(currbet));
    var numcoins = parseInt(currbet);
    if (Number.isNaN(numcoins)) {
        numcoins = 0;
    }
    else {
        if (numcoins >= 5) {
            numcoins = numcoins - 5;
        }
    }
    document.getElementById("CurrentBet").innerHTML = "Current Bet: " + numcoins;
    document.getElementById("CurrentBet").value = numcoins;
});

document.getElementById('Sub10').addEventListener('click', function () {
    var currbet = document.getElementById("CurrentBet").value;
    console.log("click: -10", parseInt(currbet));
    var numcoins = parseInt(currbet);
    if (Number.isNaN(numcoins)) {
        numcoins = 0;
    }
    else {
        if (numcoins >= 10) {
            numcoins = numcoins - 10;
        }
    }
    document.getElementById("CurrentBet").innerHTML = "Current Bet: " + numcoins;
    document.getElementById("CurrentBet").value = numcoins;
});

document.getElementById('Sub25').addEventListener('click', function () {
    var currbet = document.getElementById("CurrentBet").value;
    console.log("click: -25", parseInt(currbet));
    var numcoins = parseInt(currbet);
    if (Number.isNaN(numcoins)) {
        numcoins = 0;
    }
    else {
        if (numcoins >= 25) {
            numcoins = numcoins - 25;
        }
    }
    document.getElementById("CurrentBet").innerHTML = "Current Bet: " + numcoins;
    document.getElementById("CurrentBet").value = numcoins;
});

document.getElementById('Sub100').addEventListener('click', function () {
    var currbet = document.getElementById("CurrentBet").value;
    console.log("click: -100");
    var numcoins = parseInt(currbet);
    if (Number.isNaN(numcoins)) {
        numcoins = 0;
    }
    else {
        if (numcoins >= 100) {
            numcoins = numcoins - 100;
        }
    }
    document.getElementById("CurrentBet").innerHTML = "Current Bet: " + numcoins;
    document.getElementById("CurrentBet").value = numcoins;
});

function hideBetButtons() {
    document.getElementById("Add5").style.visibility = "hidden";
    document.getElementById("Add10").style.visibility = "hidden";
    document.getElementById("Add25").style.visibility = "hidden";
    document.getElementById("Add100").style.visibility = "hidden";
    document.getElementById("Sub5").style.visibility = "hidden";
    document.getElementById("Sub10").style.visibility = "hidden";
    document.getElementById("Sub25").style.visibility = "hidden";
    document.getElementById("Sub100").style.visibility = "hidden";
    document.getElementById("CurrentBet").style.visibility = "hidden";
}
function showBetButtons() {
    document.getElementById("Add5").style.visibility = "visible";
    document.getElementById("Add10").style.visibility = "visible";
    document.getElementById("Add25").style.visibility = "visible";
    document.getElementById("Add100").style.visibility = "visible";
    document.getElementById("Sub5").style.visibility = "visible";
    document.getElementById("Sub10").style.visibility = "visible";
    document.getElementById("Sub25").style.visibility = "visible";
    document.getElementById("Sub100").style.visibility = "visible";
    document.getElementById("CurrentBet").style.visibility = "visible";
}
