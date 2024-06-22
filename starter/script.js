'use strict';
// selecting all the required elements
let score0 = document.getElementById('score--0');
let score1 = document.getElementById('score--1');

let current0 = document.getElementById('current--0');
let current1 = document.getElementById('current--1');

let btnnew = document.querySelector('.btn--new');
let btnroll = document.querySelector('.btn--roll');
let btnhold = document.querySelector('.btn--hold');

let dice = document.querySelector('.dice');

let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

let currentscore ;
let activeplayer;
let scores ;
let playing ;

const init = function(){

    currentscore =0;
    activeplayer =0;
    scores =[0,0];
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    dice.classList.add('hidden');
    
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}
init();
//switch player
const switchplayer= function(){
    
    document.getElementById(`current--${activeplayer}`).textContent= 0;
    currentscore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

btnroll.addEventListener('click', function(){
    if(playing){

   
    //1. generate random number for dice

    const randomnum = Math.trunc(Math.random()*6)+1;

    //2. display dice img
    dice.classList.remove('hidden');
    dice.src =`dice-${randomnum}.png`;

    //3. check for rolled 1: if true, switch to next player

    if(randomnum!==1){
        //add dice to current score
       currentscore=currentscore +randomnum;
       document.getElementById(`current--${activeplayer}`).textContent=currentscore;

    //    current0.textContent=currentscore;

    }else{
        //switch player
       switchplayer();

    }
}
})

btnhold.addEventListener('click', function(){
    if(playing){

   
    //1. add current score to activeplayer's score
      scores[activeplayer]+=currentscore;
    //   scores[1]=scores[1]+currentscore
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];


    //2.check player's score is >=100
    //finish the game
    if(scores[activeplayer]>=10){
        playing=false;
        dice.classList.add('hidden');
        document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
        currentscore = 0;
        document.getElementById(`current--${activeplayer}`).textContent= 0;
      

    }else{
         //switch to next player
      switchplayer();
    }
    
    }


})

btnnew.addEventListener('click',init);