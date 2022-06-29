
### The Quacking Cows present
# Donald Deck

## The Quacking Cows are:
|Name            |
|----------------|
|Malik Feng      |
|Erica Ho        |
|Paymon Jalali   |
|Alyssa Nicholson|
|David Yeung     |

## Abstract

**Donald Deck** is a browser-based card game service that allows users to log in to their accounts and play blackjack solo or with their friends. An AI dealer represents the house when playing solo and acts as the opponent for the player to hone their skills. When playing with others, the user can create a lobby that friends can join using a unique identifier code. This service is mobile-friendly, so a group of people can simply pull out their smartphones anywhere and play. Players can also choose to chat with each other using an online chatroom while playing. If given extra time, we will consider implementing features such as more game modes including different card games, a chat filter, as well as public rooms which can be displayed and can be joined by anyone.

## Overview of Existing Systems

A standard deck of cards can accomplish a lot when it comes to wasting time. However, few people carry around a physical deck of cards with them when they need it most.


Blackjack applications exist for smartphone devices, but many require downloads or minimum hardware requirements and are overcomplicated for a quick game fix (i.e., Blackjack – World Tournament, BLACKJACK!). These applications often exist behind a pay-to-win wall, contain intrusive advertisements, or follow a real money gambling model. Web-based blackjack options also exist with similar drawbacks.

## Solution

As stated, numerous blackjack games and applications already exist. What we hope to provide is a more hassle-free, risk-free, and instantly gratifying way for users to spend their time by developing a simple device-agnostic implementation of a classic card game (or classic card games).


With a web-based approach, our application will be more accessible and easier to play than existing systems. It will feature an ad-free environment with a simple user interface to provide quick, clean fun to users. The game will also offer ways to earn chips for free so that users don’t have to worry about spending money on in-game currency. To further the social aspect of the application, a real-time chat system will be available for those who are playing with friends online. 


Our mobile-friendly implementation will allow users to pull out their cellphones or tablets and connect at any time, without worrying about storage space or data download fees. With this, we hope to provide entertainment to those who love playing card games with their friends but never think to carry a deck of cards around with them.  

## Scope/Features

Users will be greeted by the Donald Deck login page upon navigating to our web-application. If no account exists for the user, they will have the option to create a new account. Upon account creation, their credentials are entered into the user database and the user is credited with their startup chips. 


The user database will contain information associated with each user, including username, password, chip count (“score”), and amount of times a user has gone bankrupt. Bankruptcy statistics and chip count will be used for a leaderboard feature. If time permits, additional information that can be included in the database include games won, games loss, games played, and largest pot win. 


Once logged on, the user will be greeted with a menu where they can select “Solo Play”, “Create Lobby”, or “Join Game”. 


In any game mode, the goal of the user is to beat the dealer. If the user wins, they will be credited with their initial bet plus the house will match their bet thus doubling their winnings (winnings = bet * 2.0). If the user gets blackjack, they will be credited with their bet plus the house will give 1.5 times their bet (winnings = bet * 2.5). These winnings or losses will be reflected in the user database under their chip count and updated after each round. 


The “Solo Play” option will feature 1v1 gameplay with an AI. The AI represents the house as the dealer and the player will play as normal. Their total score from the session will be displayed in a table next to their chip count (i.e., -100 if user loses 150 and wins 50). 
The “Create Match” option offers expanding lobbies up to N-players. There will be a total of N+1 players in each lobby, with one AI representing the house and acting as the dealer. Creating a match will randomly generate a unique access code, which will be displayed on the screen at all times and can be used by other users to connect to the game. Custom matches will feature a chatroom feature, which allows players to interact with each other in real-time with text or emotes, and a leaderboard showing rankings for who has the most/least winnings during the session. 


The “Join Game” option will allow users to enter the unique access code provided to players who are already in-game. It will search through the game database and find the correct lobby, connecting that player with their friends. If all players exit the lobby, it will be removed from the database.


While startup chips are rewarded, more chips can be earned. If a player goes bankrupt at any time, a prompt will appear on screen letting the user know that they can be credited with N chips at the cost of increasing their bankruptcy count. Otherwise, daily chips will be rewarded to all users.


## Feature Additions

In future iterations or if time permits, we hope to add more classic card games to the mix (i.e., Big 2 or Crazy 8s) to mix up variety for our users. We also hope to implement a public game option so that players can browse existing public matches and play with random users. 


We would also hope to amp up the visual appeal of the game. Though simplicity plays a big role in our usability, we would like to implement a feature to display the cards of the users and dealers (face up and down). To limit unwanted interactions or broaden the chat options, a chat filter is also part of our plan.

## User Stories

As a bored individual, I want to be able to play a game with my friends to kill time, but I forgot my deck of cards at home and we only have our phones. 


As a student, I want to be able to play blackjack without worrying that my friends are rigging the game so that we can all have fun together without arguing. 


As a teenager, I want to play casino games without spending money or worrying about finances so that I can be entertained for free. 
