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
            turnsOver : false,
            roundMessage : 'Let\'s Play'
		}
    }

    // On click of 'Hit', generate random card, update and show score
    blackjackHit = () => {
        if (this.state.blackjackGame['isStand'] === false) {	 // 'Hit' should only work if stand button has not yet been clicked (COM has played)
            let card = this.randomCard()	// get random card

            if (this.state.blackjackGame['you']['score'] <= 21) {
                let cardImg = this.showCard(this.state.blackjackGame['you'], card) // .then(hitSound.play());	// show random card in HTML
                let score = this.updateScore(this.state.blackjackGame['you'], card)  // Update the score

                this.setState({
                    blackjackGame : {
                        ...this.state.blackjackGame,
                        you : {
                            score,
                            cardImage : [...this.state.blackjackGame.you.cardImage, cardImg]
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
                            cardImage : [...this.state.blackjackGame.dealer.cardImage, cardImg]
                        }
                    }
                })
            }

            if (this.state.blackjackGame['dealer']['score'] > (15 + rand)) {
                let winner = this.computeWinner()   // First decide winner then show result of winner's details in HTML
                console.log(winner)
                alert(winner[1][0])
                alert(winner[1][1])
                alert(winner[1][2])
                
                this.setState({
                    blackjackGame : {
                        ...this.state.blackjackGame,
                        wins : winner[1][0],
                        losses : winner[1][2],
                        draws : winner[1][1],

                        turnsOver : true
                    }
                })

                // Prep game for reset after bot's game is committed. Game is over after
                // winner has been computed		
                this.state.blackjackGame['turnsOver'] = true;	
            } else {
                setTimeout(deal, 400);	// Cycle every 4ms (recursive)
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

    // Any random card has a mapped value. Update by adding
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

    // Decide winner and return YOU or DEALER object

    computeWinner = () => {

        let winner;
        const BLACKJACK = this.state.blackjackGame
        const YOU = BLACKJACK['you']
        const DEALER = BLACKJACK['dealer']

        let win = 0
        let draw = 0
        let loss = 0

        if (YOU['score'] <= 21) {
            // If your score is less than 21 but greater than bot's score, you win
            // If your score is less than 21 and bot busts(score greater than 21), you win

            if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
                winner = YOU;
                win = ++BLACKJACK['wins'];	// Update standings
            }
            
            // If your score is less than 21 and less than bot's score, you lose
            else if (YOU['score'] < DEALER['score']) {
                winner = DEALER;
                loss = ++BLACKJACK['losses'];	
            } 

            // If your score is less than 21 and same with bot's, you draw
            else if (YOU['score'] === DEALER['score']) {
                winner = 'DRAW';
                draw = ++BLACKJACK['draws'];	
            }
        } 

        // Else if your score is greater than 21 bot's score is less, you lose

        else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
            winner = DEALER;
            loss = ++BLACKJACK['losses'];	
        } 

        // Else if you both bust, you draw
        else if (YOU['score'] > 21 && DEALER['score'] > 21) {
            winner = 'DRAW';
            draw = ++BLACKJACK['draws'];	
        }
        return [winner, [win, draw, loss]]
    }


    render() {

        console.log(this.state.blackjackGame)

        return (

            <div className="container-fluid">
                <header>
                    <h1 className="gameTitle">BlackJack</h1>
                    <h2>
                        <span id="blackjack-result">{this.state.blackjackGame.roundMessage}</span>
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
                                <td><span id="wins">{this.state.blackjackGame.wins}</span></td>
                                <td><span id="draws">{this.state.blackjackGame.draws}</span></td>
                                <td><span id="losses">{this.state.blackjackGame.losses}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
        
            </div>
        )
    }
}
