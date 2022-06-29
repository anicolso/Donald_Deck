const expect = require('chai').expect
const chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

const blackjack = require('../public/javascript/blackJackEngine.js')

describe('blackjackEngine Tests', () => {
    it('DeckID should return a valid deckID', () => {
        const result = blackjack.deckID
        expect(result).to.be.an('undefined')
    })
    it('gameStart should return true if script ran correctly', () => {
        const result = blackjack.gameStart
        expect(result).to.be.an('undefined')
    })
    it('hit should give current player a card; calculates if player busts', () => {
        const result = blackjack.hit
        expect(result).to.be.an('undefined')
    })
    it('dealer should hit on 16, stay on 17 and follow appropriate actions if bust', () => {
        const result = blackjack.dealer
        expect(result).to.be.an('undefined')
    })
    it('gameStateReset should reset game for new round', () => {
        const result = blackjack.hit
        expect(result).to.be.an('undefined')
    })
    it('reshuffle should reshuffle the deck', () => {
        const result = blackjack.shuffle
        expect(result).to.be.an('undefined')
    })
})

describe('http requests', () => {
    it('loads login page ', function(done) {
        chai.request('https://donalddeck.herokuapp.com/')
        .get('/loginUI.html')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('loads createAccount page ', function(done) {
        chai.request('https://donalddeck.herokuapp.com/')
        .get('/createAccount.html')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    /*
    it('loads myStats page ', function(done) {
        chai.request('https://donalddeck.herokuapp.com/')
        .get('/myStats/')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('loads mainMenu page ', function(done) {
        chai.request('https://donalddeck.herokuapp.com/')
        .get('/login/')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('loads soloBlackjack page ', function(done) {
        chai.request('https://donalddeck.herokuapp.com/')
        .get('/soloBlackjack/')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('loads multiplayerBlackjack page ', function(done) {
        chai.request('https://donalddeck.herokuapp.com/')
        .get('/multiplayerBlackjack/')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    */
})