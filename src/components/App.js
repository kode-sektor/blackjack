import React, { Component } from 'react'
import { Button, ButtonGroup, Card, Row, Col, CardTitle, CardText } from 'reactstrap';


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
            roundMessage : 'Let\'s Play',

            audio : {
                play : new Audio ('sounds/swish.m4a'),
                win : new Audio ('sounds/cash.mp3'),
                loss : new Audio ('sounds/aww.mp3')
            }
		}
    }

    // On click of 'Hit', generate random card, update and show score
    blackjackHit = () => {
        if (this.state.blackjackGame['turnsOver'] === false) {	 // 'Hit' should only work if stand button has not yet been clicked (COM has played)
            let card = this.randomCard()	// get random card

            if (this.state.blackjackGame['you']['score'] <= 21) {
                let cardImg = this.showCard(this.state.blackjackGame['you'], card) // .then(hitSound.play());	// show random card in HTML
                let score = this.updateScore(this.state.blackjackGame['you'], card)  // Update the score
                this.state.blackjackGame.audio.play.play()

                this.setState({
                    blackjackGame : {
                        ...this.state.blackjackGame,
                        you : {
                            score,
                            cardImage : [...this.state.blackjackGame.you.cardImage, cardImg]
                        },
                        isStand : true
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
        // winner as it normally would after commiting
        const deal = () => {

            let card = this.randomCard();	// get random card
            let DEALER = this.state.blackjackGame['dealer']

            let cardImg = this.showCard(DEALER, card) // .then(hitSound.play());	// show random card in HTML
            let score = Number(this.updateScore(DEALER, card))  // Updated score
            this.state.blackjackGame.audio.play.play()

            let dealer = {
                            score,
                            cardImage : [...this.state.blackjackGame.dealer.cardImage, cardImg]
                        }
            
            this.setState({
                blackjackGame : {
                    ...this.state.blackjackGame,
                    dealer
                }
            })

            if (score > (15 + rand)) {

                let winner = this.computeWinner(score)   // First decide winner then show result of winner's details in HTML
                let YOU = this.state.blackjackGame.you
                let roundMessage = ''

                if (winner[0] === YOU) {
                    roundMessage = 'You won!'
                    this.state.blackjackGame.audio.win.play()
                } else if (winner[0] === dealer) {
                    roundMessage = 'You lost!'
                    this.state.blackjackGame.audio.loss.play()
                } else {
                    roundMessage = 'DRAW!'
                }

                // console.log(this.state.blackjackGame)
                 
                this.setState({
                    blackjackGame : {
                        ...this.state.blackjackGame,
                        wins : this.state.blackjackGame.wins + winner[1][0],
                        losses : this.state.blackjackGame.losses + winner[1][2],
                        draws : this.state.blackjackGame.draws + winner[1][1],

                        isStand : false,
                        turnsOver : true,
                        roundMessage
                    }
                })
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
    showCard (activePlayer, card) {
        // Set threshold to prevent game from continuing past score
        return <img src={`images/cards/${card}.png`} alt={`${card}`}/>
    }

    // Any random card has a mapped value. Update by adding
    // Adds current score + old score
    updateScore = (activePlayer, card) => {

        let cardVal = this.state.blackjackGame['cardsMap'][card]

        // For ACE, it's either 1 or 11. Choose 11 if game wouldn't hit threshold
        // otherwise choose 1
        if (card === 'A') {	// Run for only ACE and try not to add lesser of ACE values if it exceeds 21
            if (activePlayer['score'] + cardVal[1] <= 21) { 
                return activePlayer['score'] + cardVal[1]    // existing score + value of card 
            } else {
                return activePlayer['score'] + cardVal[0]
            }
        } else {
            // Without ACE (will run most of the time) existing score + value of card 
            return activePlayer['score'] + cardVal
        }
    }

    // Decide winner and return YOU or DEALER object

    computeWinner = (score) => {

        let winner;
        const BLACKJACK = this.state.blackjackGame
        const YOU = BLACKJACK['you']
        const DEALER = BLACKJACK['dealer']

        let win = 0
        let draw = 0
        let loss = 0

        // console.log(this.state)

        if (YOU['score'] <= 21) {
            // If your score is less than 21 but greater than bot's score, you win
            // If your score is less than 21 and bot busts(score greater than 21), you win

            if (YOU['score'] > score || score > 21) {
                winner = YOU;
                win = 1;	// Update standings
            }
            
            // If your score is less than 21 and less than bot's score, you lose
            else if (YOU['score'] < score) {
                winner = DEALER;
                loss = 1;	
            } 

            // If your score is less than 21 and same with bot's, you draw
            else if (YOU['score'] === score) {
                winner = 'DRAW';
                draw = 1;
            }
        } 

        // Else if your score is greater than 21 bot's score is less, you lose
        else if (YOU['score'] > 21 && score <= 21) {
            winner = DEALER;
            loss = 1;	
        } 

        // Else if you both bust, you draw
        else if (YOU['score'] > 21 && score > 21) {
            winner = 'DRAW';
            draw = 1;	
        }
        return [winner, [win, draw, loss]]
    }

    // On click of 'Deal', remove cards
    blackjackDeal = () => {

        // Only run the 'Deal' button after bot's game is committed. In other words, the 
        // winner has been computed
        if (this.state.blackjackGame['turnsOver'] === true) {

            this.setState({
                blackjackGame : {
                    ...this.state.blackjackGame, 
                    you : {
                        score : 0, 
                        cardImage : []
                    },
                    dealer : {
                        score : 0, 
                        cardImage : []
                    },
        
                    isStand : false,
                    turnsOver : false,
                    roundMessage : 'Let\'s Play'
                }
            })
        }
    }


    render() {

        // console.log(this.state.blackjackGame)

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
                                {this.state.blackjackGame['you']['score'] <= 21 ? this.state.blackjackGame['you']['score'] : 'BUST'}
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
                            BlackJackBot : &nbsp; 
                            <span id="dealer-blackjack-result">
                                {this.state.blackjackGame['dealer']['score'] <= 21 ? this.state.blackjackGame['dealer']['score'] : 'BUST'}
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
                        <Button onClick={(e)=> {this.blackjackHit()}} className="btn-lg btn-primary hit mr-2" disabled={this.state.blackjackGame.turnsOver === false ? false : true } id="blackjack-hit-button">Hit</Button>
                        <Button onClick={(e)=> {this.blackjackDeal()}} className="btn-lg btn-danger deal mr-2" disabled={this.state.blackjackGame.turnsOver === false ? true : false} id="blackjack-deal-button">Deal</Button>
                        <Button onClick={(e)=> {this.standLogic()}} className="btn-lg btn-warning stand" disabled={this.state.blackjackGame.isStand === false ? true : false} id="blackjack-stand-button">Stand</Button>
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
                <Row className="author">
                    <Col>
                        <Card body>
                            <CardTitle tag="h5">Built by CodeSector</CardTitle>
                            <CardText><small>Credits : <a href="https://www.youtube.com/channel/UCqrILQNl5Ed9Dz6CGMyvMTQ">CleverProgrammer</a></small></CardText>
                        </Card>
                    </Col>
                </Row>

        
            </div>
        )
    }
}
