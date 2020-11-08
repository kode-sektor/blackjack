import React, { Component } from 'react'
import { Button, ButtonGroup } from 'reactstrap';


export default class App extends Component {

    render() {

        return (

            <>

            <div className="container-fluid">
                <header>
                    <h1 className="gameTitle">BlackJack</h1>
                    <h2>
                        <span id="blackjack-result">Let's Play</span>
                    </h2>
                </header>
                
                <div className="flex-blackjack-row-1">
                    <div id="your-box">
                        <h2>You: <span id="your-blackjack-result">0</span></h2>
                    </div>
                    <div id="dealer-box">
                        <h2>Dealer: <span id="dealer-blackjack-result">0</span></h2>
                    </div>
                </div>
                <div className="flex-blackjack-row-2">
                    <ButtonGroup>
                        <Button className="btn-lg btn-primary mr-2" id="blackjack-hit-button">Hit</Button>
                        <Button className="btn-lg btn-danger mr-2" id="blackjack-deal-button">Deal</Button>
                        <Button className="btn-lg btn-warning" id="blackjack-stand-button">Stand</Button>
                    </ButtonGroup>
                </div>
                <div className="flex-blackjack-row-3 result">
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
                </div>
        
            </div>
            
            </>
        )
    }
}
