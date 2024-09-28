let cardOne = 7;
let cardTwo = 5;
let cardThree = 7;
let sum = cardOne + cardTwo;
let cardOneBank = 7;
let cardTwoBank = 5;
let cardThreeBank = 6;
let cardFourBank = 4;
sum += cardThree;
if (sum === 21) console.log('You win');
else if (sum > 21) console.log('You lose');
else console.log(`You have ${sum} points`);

let bankSum = cardOneBank + cardTwoBank;
if (bankSum < 17) bankSum += cardThreeBank;
if (bankSum < 17) bankSum += cardFourBank;

if (bankSum === 21) console.log('Bank win');
else if (bankSum > 21) console.log('Bank lose');
else console.log(`Bank have ${bankSum} points`);

if (sum < 21 && bankSum < 21) {
    if (sum === bankSum) console.log('Draw');
    else if (sum > bankSum) console.log('You win');
    else console.log('You lose');
}
