//-- Variables --//
var deckOfCards = [];
var playerHandValue;
var dealerVisibleHandValue;
var dealerHandValue;
var newDeckID;
var playerCardIndex;
var dealerCardIndex;
var dealerHiddenCard;
var dealerAces;
var playerAces;
// Functions to be implemented //
/*
       ? - store card values in deckOfCards
*/

async function deckID(){
  await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(async (response) => {
      if (response.ok) {
        var temp = await response.json();
        newDeckID = temp.deck_id;
      } else {
        throw new Error('Response did not return 200');
      }
    })
    .catch(async (error) => {
        console.log(error);
    })
  return newDeckID;
}

//betting see ejs file since it uses socket
async function gameStart(){
  await deckID();
  await fetch(`https://deckofcardsapi.com/api/deck/${newDeckID}/draw/?count=4`)
    .then(async (response) => {
      if (response.ok) {
        var temp = await response.json();
        dealerHandValue = 0;
        dealerVisibleHandValue = 0;
        dealerCardIndex = 1;
        playerHandValue = 0;
        playerCardIndex = 1;
        dealerAces = 0;
        playerAces = 0;
        document.getElementById("d1").src = "/images/cardback.png";
        for(var i = 0; i < temp.cards.length; i++){
          var playerCard = document.getElementById(`c${playerCardIndex}`);
          var dealerCard = document.getElementById(`d${dealerCardIndex}`);

          if(temp.cards[i].value == "JACK" || temp.cards[i].value == "QUEEN" || temp.cards[i].value == "KING"){
            if(i%2 == 0){
              dealerHandValue += 10;
              if(i == 2){
                dealerVisibleHandValue = 10;
              }
            }
            else{
              playerHandValue += 10;
            }
          }
          else if(temp.cards[i].value == "ACE"){
            if(i%2 == 0){
              dealerHandValue += 11;
              dealerAces++;
              if(i == 2){
                dealerVisibleHandValue = 11;
              }
            }
            else{
              playerHandValue += 11;
              playerAces++;
            }
          }
          else {
            if(i%2 == 0){
              dealerHandValue += parseInt(temp.cards[i].value);
              if(i == 2){
                dealerVisibleHandValue = parseInt(temp.cards[i].value);
              }
            }
            else{
              playerHandValue += parseInt(temp.cards[i].value);
            }
          }
          if(i%2 == 0){
            if(i == 0){
              dealerHiddenCard = temp.cards[i].image;
              dealerCard.style.visibility = "visible";
            }
            else{
              dealerCard.src = temp.cards[i].image;
              dealerCard.style.visibility = "visible";
            }
            dealerCardIndex++;

            console.log("Dealer dealt")
            console.log("Dealer score: " + dealerHandValue)
          }
          else {
            playerCard.src = temp.cards[i].image;
            playerCard.style.visibility = "visible";
            playerCardIndex++;
            console.log("Player dealt")
          }
        }
        while(playerAces > 0 && playerHandValue > 21){
          playerAces--;
          playerHandValue -= 10;
        }
        document.getElementById("playerCounter").innerHTML = playerHandValue;
        document.getElementById("dealerCounter").innerHTML = dealerVisibleHandValue;

        //Player hits Blackjack + payout
        if(playerHandValue == 21){
          document.getElementById('winloss').innerHTML = "BLACKJACK!";
          document.getElementById('winloss').style.visibility = "visible";
          document.getElementById("hit").style.visibility = "hidden";
          document.getElementById("stay").style.visibility = "hidden";
          document.getElementById("changeBet").style.visibility = "visible";
          document.getElementById("playAgain").style.visibility = "visible";

          payout();
        }
      } else {
        throw new Error('Response did not return 200');
        return false
      }
    })
    .catch(async (error) => {
        console.log(error);
        return false
    })
    return true
}
/*
    convert card value to usable value
        - A -> 11 or 1
        - 2-9 -> 2-9
        - J, Q, K -> 10
*/

/*
    Hit or stand actions
        - check if player total <= 21
            - if > 21, continue to next player/dealer action
            - if <= 21, continue until player chooses stand
*/

//STAND ONCLICK CALLS DEALER AI
//NEED TO IMPLEMENT WHAT BUST SHOULD LOOK LIKE
async function hit(){
  await fetch(`https://deckofcardsapi.com/api/deck/${newDeckID}/draw/?count=1`)
    .then(async (response) => {
      if (response.ok) {
        var temp = await response.json();
        var playerCard = document.getElementById(`c${playerCardIndex}`);
        if(temp.cards[0].value == "JACK" || temp.cards[0].value == "QUEEN" || temp.cards[0].value == "KING"){
            playerHandValue += 10;
        }
        else if(temp.cards[0].value == "ACE"){
              playerHandValue += 11;
              playerAces++;
        }
        else {
            playerHandValue += parseInt(temp.cards[0].value);
        }
        playerCard.src = temp.cards[0].image;
        playerCard.style.visibility = "visible"
        playerCardIndex++;
        while(playerAces > 0 && playerHandValue > 21){
          playerAces--;
          playerHandValue -= 10;
        }
        if(playerHandValue == 21){
          document.getElementById("hit").style.visibility = "hidden";
          document.getElementById("stay").style.visibility = "hidden";
          document.getElementById("changeBet").style.visibility = "visible";
          document.getElementById("playAgain").style.visibility = "visible";
          await dealer();
        }
        else if(playerHandValue > 21){
          //BUST
          document.getElementById("hit").style.visibility = "hidden";
          document.getElementById("stay").style.visibility = "hidden";
          document.getElementById("changeBet").style.visibility = "visible";
          document.getElementById("playAgain").style.visibility = "visible";
          document.getElementById('winloss').innerHTML = "YOU BUST";
          document.getElementById('winloss').style.visibility = "visible";
        }
        document.getElementById("playerCounter").innerHTML = playerHandValue;
      }
     else {
        throw new Error('Response did not return 200');
        return false
      }
    })
    .catch(async (error) => {
        console.log(error);
        return false
    })
    return true
}

/*
    Dealer AI
        - if value >= 17, stay
        - else, hit

*/

async function dealer(){
  document.getElementById('d1').src = dealerHiddenCard;
  document.getElementById("dealerCounter").innerHTML = dealerHandValue;
  while(dealerHandValue < 17){
    await fetch(`https://deckofcardsapi.com/api/deck/${newDeckID}/draw/?count=1`)
      .then(async (response) => {
        if (response.ok) {
          var temp = await response.json();
          var dealerCard = document.getElementById(`d${dealerCardIndex}`);
          if(temp.cards[0].value == "JACK" || temp.cards[0].value == "QUEEN" || temp.cards[0].value == "KING"){
              dealerHandValue += 10;
          }
          else if(temp.cards[0].value == "ACE"){
                dealerHandValue += 11;
          }
          else {
              dealerHandValue += parseInt(temp.cards[0].value);
          }
          dealerCard.src = temp.cards[0].image;
          dealerCard.style.visibility = "visible"
          dealerCardIndex++;
          while(dealerAces > 0 && dealerHandValue > 21){
            dealerAces--;
            dealererHandValue -= 10;
          }
          document.getElementById("dealerCounter").innerHTML = dealerHandValue;
          //SHUFFLE DECK IF LOW ON CARDS
          if(parseInt(temp.remaining) < 13){
            await shuffleDeck();
          }
        }
       else {
          throw new Error('Response did not return 200');
          return false
        }
      })
      .catch(async (error) => {
          console.log(error);
          return false
      })
  }
  document.getElementById("hit").style.visibility = "hidden";
  document.getElementById("stay").style.visibility = "hidden";
  document.getElementById("changeBet").style.visibility = "visible";
  document.getElementById("playAgain").style.visibility = "visible";

  if(dealerHandValue > 21 || dealerHandValue < playerHandValue){
      //PAY PLAYER
      document.getElementById('winloss').innerHTML = "YOU WIN";
      //win = need to pay player
      document.getElementById('winloss').style.visibility = "visible";
      console.log('payout called');
      payout();
  }
  else if(dealerHandValue > playerHandValue){
      //PLAYER LOSES
      document.getElementById('winloss').innerHTML = "YOU LOSE";
      document.getElementById('winloss').style.visibility = "visible";
  }
  else{
      //DRAW;PUSH
      document.getElementById('winloss').innerHTML = "PUSH";
      document.getElementById('winloss').style.visibility = "visible";
      push();
  }
  return true
}

async function gameStateReset(){
  cardReset = document.getElementsByClassName("card");
  for(var i = 0; i < cardReset.length; i++)
  {
    cardReset[i].style.visibility = "hidden";
  }
  return true
}

async function shuffleDeck(){
  await fetch(`https://deckofcardsapi.com/api/deck/${newDeckID}/shuffle/`)
    .then(async (response) => {
      if (response.ok) {
        var temp = await response.json();
        if(temp.success == true){
          return true
        }
      } else {
        throw new Error('Response did not return 200');
        return false
      }
    })
    .catch(async (error) => {
        console.log(error);
        return false
    })
}
/*
    Display values/card images
        - change img http link to deckofcards API img
        - change counters innerHTML to corresponding values
*/
