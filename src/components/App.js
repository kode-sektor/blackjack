import React, { Component } from 'react'
import { Button, ButtonGroup } from 'reactstrap';


export default class App extends Component {

    state = {
        blackjackGame : {
			you : {
                score : 0, 
                cardImage : []
			},
			dealer : {
                score : 0, 
                cardImage : []
			},
			cards : ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
			cardsMap : {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':[1,11] },
			wins : 0,
			losses : 0,
			draws : 0,

			isStand : false,
			turnsOver : false
		}
    }

    // On click of 'Hit', generate random card, update and show score
    blackjackHit = () => {
        console.log(this.state.blackjackGame['isStand'])
        if (this.state.blackjackGame['isStand'] === false) {	 // 'Hit' should only work if stand button has not yet been clicked (COM has played)
            console.log(this)
            let card = this.randomCard()	// get random card

            if (this.state.blackjackGame['you']['score'] <= 21) {
                let cardImg = this.showCard(this.state.blackjackGame['you'], card) // .then(hitSound.play());	// show random card in HTML
                let score = this.updateScore(this.state.blackjackGame['you'], card)  // Update the score

                this.setState({
                    blackjackGame : {
                        ...this.state.blackjackGame,
                        you : {
                            score,
                            cardImage : [...this.state.blackjackGame.you.cardImage, <img src={`images/cards/${card}.png`} alt={`${card}`}/>]
                        }
                    }
                })
            }
        }
    }

    // On the click of 'Stand', generate and insert random card, play sound, update and show score
    standLogic = () => {

        // On the click of 'stand', ensure 'hit' button can no longer commit 
        // blackjackGame['isStand'] = true;  

        // Bot decides to commit game when its score is greater than 15 + x, where x is a
        // random number between 0 and 4 -- and 75% skewed to occur between 0 and 2

        let rand = Math.round(Math.random() * 100);	// 75
        rand = (rand < 75) ? (Math.round(Math.random() * 2)) : (Math.round(Math.random() * 4));

        // Make 'deal' button hit automatically, after being hit once, and then compute
        // winner as it normally would after commiting (3-d.)
        const deal = () => {

            let card = this.randomCard();	// get random card

            if (this.state.blackjackGame['dealer']['score'] <= 21) {
                let cardImg = this.showCard(this.state.blackjackGame['dealer'], card) // .then(hitSound.play());	// show random card in HTML
                let score = this.updateScore(this.state.blackjackGame['dealer'], card)  // Update the score

                this.setState({
                    blackjackGame : {
                        ...this.state.blackjackGame,
                        dealer : {
                            score,
                            cardImage : [...this.state.blackjackGame.dealer.cardImage, <img src={`images/cards/${card}.png`} alt={`${card}`}/>]
                        }
                    }
                })
            }

            if (this.state.blackjackGame['dealer']['score'] > (15 + rand)) {
                // showResult (computeWinner());   // First decide winner then show result of winner's details in HTML

                // Prep game for reset after bot's game is committed. Game is over after
                // winner has been computed		
                this.state.blackjackGame['turnsOver'] = true;	
            } else {
                setTimeout(deal, 400);	// 6a. Cycle every 4ms (recursive)
            }

        }

        deal ();
    }

    randomCard = () => {
        let randomIndx = Math.floor(Math.random() * 13);	// 13 possibilities
        return this.state.blackjackGame.cards[randomIndx];
    }

    // Create random image element and insert in HTML
    showCard = (activePlayer, card) => {
        // Set threshold to prevent game from continuing past score
        return <img src={`images/cards/${card}.png`} alt={`${card}`}/>
    }

    // 1b. Any random card has a mapped value. Update by adding
    updateScore = (activePlayer, card) => {

        // For ACE, it's either 1 or 11. Choose 11 if game wouldn't hit threshold
        // otherwise choose 1
        if (card === 'A') {	// Run for only ACE and try not to add lesser of ACE values if it exceeds 21
            if (activePlayer['score'] + this.state.blackjackGame['cardsMap'][card][1] <= 21) { 
                return activePlayer['score'] + this.state.blackjackGame['cardsMap'][card][1]    // existing score + value of card 
            } else {
                return activePlayer['score'] + this.state.blackjackGame['cardsMap'][card][0]
            }
        } else {
            // Without ACE (will run most of the time) existing score + value of card 
            return activePlayer['score'] + this.state.blackjackGame['cardsMap'][card]
        }
    }


    render() {

        console.log(this.state.blackjackGame)

        return (

            <div className="container-fluid">
                <header>
                    <h1 className="gameTitle">BlackJack</h1>
                    <h2>
                        <span id="blackjack-result">Let's Play</span>
                    </h2>
                </header>
                
                <section className="flex-blackjack-row-1">
                    <div id="your-box">
                        <h2>
                            You : &nbsp; 
                            <span id="your-blackjack-result">
                                {this.state.blackjackGame['you']['score'] < 21 ? this.state.blackjackGame['you']['score'] : 'BUST'}
                            </span>
                        </h2>
                        <section>
                            {(this.state.blackjackGame.you.cardImage).map((element, index) => {
                                return (
                                    element
                                )
                            })}
                        </section>
                    </div>
                    <div id="dealer-box">
                        <h2>
                            Dealer : &nbsp; 
                            <span id="dealer-blackjack-result">
                                {this.state.blackjackGame['dealer']['score'] < 21 ? this.state.blackjackGame['dealer']['score'] : 'BUST'}
                            </span>
                        </h2>
                        <section>
                            {(this.state.blackjackGame.dealer.cardImage).map((element, index) => {
                                return (
                                    element
                                )
                            })}             
                        </section>
                    </div>
                </section>
                <section className="flex-blackjack-row-2">
                    <ButtonGroup>
                        <Button onClick={(e)=> {this.blackjackHit()}} className="btn-lg btn-primary mr-2" id="blackjack-hit-button">Hit</Button>
                        <Button onClick={(e)=> {this.blackjackHit()}} className="btn-lg btn-danger mr-2" id="blackjack-deal-button">Deal</Button>
                        <Button onClick={(e)=> {this.standLogic()}} className="btn-lg btn-warning" id="blackjack-stand-button">Stand</Button>
                    </ButtonGroup>
                </section>
                <section className="flex-blackjack-row-3 result">
                    <table>
                        <tbody>
                            <tr>
                                <th>Wins</th>
                                <th>Draws</th>
                                <th>Losses</th>
                            </tr>
                            <tr className="score">
                                <td><span id="wins">0</span></td>
                                <td><span id="draws">0</span></td>
                                <td><span id="losses">0</span></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
        
            </div>
        )
    }
}
