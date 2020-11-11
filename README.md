# blackjack

Deployed site : https://blakjack.netlify.app/

<img src="/public/images/project-poster.png">

## This is a miniature React app that simulates the BlackJack Game

This BlackJack app is a game between you as a user versus the computer (COM). As the user, you are to 'hit' a number of cards below 22. The cards dealt are random. And to win a round, the sumtotal of these card values should be more than what COM chooses. COM, of course, is programmed to deal cards close to 21 score. 

COM would not settle for any score less than 16. Between score 16 and 19, COM tries to make a choice of whether to deal an additional card. This choice is made at a skewed randomness with the generated random number skewed to occur between 0 and 2, 75% of the time.

The program would determine the winner of a round by comparing the score of the user with that of COM. Then the scores are updated in the table standings.