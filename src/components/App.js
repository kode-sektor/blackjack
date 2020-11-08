import React, { Component } from 'react'

export default class App extends Component {

    render() {

        return (

            <>

            <div className="container-1"></div>
            <div className="container-2"></div>
            <div className="container-3"></div>
            <div className="container-4"></div>
            
            <div className="container-5">
                <h2>BlackJack</h2>
                <h3>
                    <span id="blackjack-result" style={{color: 'black'}}>Let's Play</span>
                </h3>
                <div className="flex-blackjack-row-1">
                    <div id="your-box">
                        <h2>You: <span id="your-blackjack-result">0</span></h2>
                    </div>
                    <div id="dealer-box">
                        <h2>Dealer: <span id="dealer-blackjack-result">0</span></h2>
                    </div>
                </div>
                <div className="flex-blackjack-row-2">
                    <div>
                        <button className="btn-lg btn-primary mr-2" id="blackjack-hit-button">Hit</button>
                        <button className="btn-lg btn-danger mr-2" id="blackjack-deal-button">Deal</button>
                        <button className="btn-lg btn-warning" id="blackjack-stand-button">Stand</button>
                    </div>
                </div>
                <div className="flex-blackjack-row-3">
                    <table>
                        <tbody>
                            <tr>
                                <th>Wins</th>
                                <th>Draws</th>
                                <th>Losses</th>
                            </tr>
                            <tr>
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
