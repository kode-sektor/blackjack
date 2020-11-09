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
                cardImage : ''
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
        // if (this.state.blackjackGame['isStand'] === false) {	 // 'Hit' should only work if stand button has not yet been clicked (COM has played)
            let card = this.randomCard()	// get random card
            this.showCard(this.state.blackjackGame['you'], card) // .then(hitSound.play());	// show random card in HTML
        // }
    }

    randomCard = () => {
        let randomIndx = Math.floor(Math.random() * 13);	// 13 possibilities
        console.log(this.state.blackjackGame)
        return this.state.blackjackGame.cards[randomIndx];
    }

    // Create random image element and insert in HTML
    showCard = (activePlayer, card) => {
        // Set threshold to prevent game from continuing past score
        alert('ok')
        // if (activePlayer.score <= 21) {	 

            this.setState({
                blackjackGame : {
                    ...this.state.blackjackGame,
                    you : {
                        ...this.state.blackjackGame.you,
                        cardImage : [...this.state.blackjackGame.you.cardImage, <img src={`images/cards/${card}.png`} alt={`${card}`}/>]
                    }
                }
            })
        // }
    }


    render() {

        console.log(this.state.blackjackGame.you.cardImage)

        return (

            <>

            <div className="container-fluid">
                <header>
                    <h1 className="gameTitle">BlackJack</h1>
                    <h2>
                        <span id="blackjack-result">Let's Play</span>
                    </h2>
                </header>
                
                <section className="flex-blackjack-row-1">
                    <div id="your-box">
                        <h2>You: <span id="your-blackjack-result">0</span></h2>
                        <section>
                            {(this.state.blackjackGame.you.cardImage).map((index, element) => {
                                return (
                                    index
                                )
                            })}
                        </section>
                    </div>
                    <div id="dealer-box">
                        <h2>Dealer: <span id="dealer-blackjack-result">0</span></h2>
                    </div>
                </section>
                <section className="flex-blackjack-row-2">
                    <ButtonGroup>
                        <Button onClick={(e)=> {this.blackjackHit()}} className="btn-lg btn-primary mr-2" id="blackjack-hit-button">Hit</Button>
                        <Button onClick={(e)=> {this.blackjackHit()}} className="btn-lg btn-danger mr-2" id="blackjack-deal-button">Deal</Button>
                        <Button onClick={(e)=> {this.blackjackHit()}} className="btn-lg btn-warning" id="blackjack-stand-button">Stand</Button>
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
            
            </>
        )
    }
}
