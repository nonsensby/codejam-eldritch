import ancientsData from '../data/ancients.js';
import cardsDataBlue from '../data/mythicCards/blue/index.js';
import cardsDataBrown from '../data/mythicCards/brown/index.js';
import cardsDataGreen from '../data/mythicCards/green/index.js';


//поиск случайного числа
function getRandomNum(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};

//замешать массив
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
  
      // поменять элементы местами
      // мы используем для этого синтаксис "деструктурирующее присваивание"
      // подробнее о нём - в следующих главах
      // то же самое можно записать как:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
};


//функция поиск выбранного древнего
function getAncient (str) {
    for (let key in ancientsData) {
        if (ancientsData[key].id === str) {
            return ancientsData[key];
        }
    }
};

// переменная для карты древнего
let ancient ;


//функция получение количества состава карты
function getNumberCards (str) {
    let sum = 0;
    sum = ancient.firstStage[str] + ancient.secondStage[str] + ancient.thirdStage[str];
    return sum
};


//функция получения количества карт для колоды по цветам
let greenCards
let blueCards
let brownCards
function getColorNumberCards () {
    greenCards = getNumberCards('greenCards');
    blueCards = getNumberCards('blueCards');
    brownCards = getNumberCards('brownCards');
};

//функция подсчета количества карт по сложности
function getNumberLevelCards(strDifficulty,cardsData) {
    let count = 0;
    for (let key in cardsData) {
        if (cardsData[key].difficulty === strDifficulty) {
            count = count + 1;
        }
    }
    return count
}




//функция формирования колоды
function getDeckCards (deckNumbers, cardsData, level) {
    let deckCards = new Set();
    let array = [];
    let randomNumber;
    if (level === 'normal') {
        while (deckCards.size != deckNumbers) {
            randomNumber =  getRandomNum(0, cardsData.length);
            deckCards.add(cardsData[randomNumber]);
           }
        }
    if (level === 'very-easy') {
        console.log('level very-easy')
        let numberEasy = getNumberLevelCards('easy',cardsData);
        console.log('numberEasy',numberEasy)
            if (numberEasy >= deckNumbers) {
                console.log('numberEasy >= deckNumbers')
                while (deckCards.size != deckNumbers) {
                    console.log(deckCards.size)
                    console.log('deckNumbers',deckNumbers)
                     randomNumber =  getRandomNum(0, cardsData.length);
                    if (cardsData[randomNumber].difficulty === 'easy') {

                        deckCards.add(cardsData[randomNumber]);
                    }
                }
                
            } else { 
                console.log('numberEasy < deckNumbers')
                while (deckCards.size != numberEasy ) {
                    randomNumber =  getRandomNum(0, cardsData.length);
                    if (cardsData[randomNumber].difficulty === 'easy') {
                        deckCards.add(cardsData[randomNumber])
                    }
                }
                while (deckCards.size != deckNumbers ) {
                    randomNumber =  getRandomNum(0, cardsData.length);
                    if (cardsData[randomNumber].difficulty === 'normal') {
                        deckCards.add(cardsData[randomNumber])
                    }
                }
            }   
    }
    if (level === 'easy') {
        console.log('level easy')
            while (deckCards.size != deckNumbers) {
                randomNumber =  getRandomNum(0, cardsData.length);
                if (cardsData[randomNumber].difficulty != 'hard') {
                    deckCards.add(cardsData[randomNumber])
                }
            }
        }

        if (level === 'hard') {
            console.log('level hard')
                while (deckCards.size != deckNumbers) {
                    randomNumber =  getRandomNum(0, cardsData.length);
                    if (cardsData[randomNumber].difficulty != 'easy') {
                        deckCards.add(cardsData[randomNumber])
                    }
                }
            }   
            if (level === 'very-hard') {
                console.log('level very-hard')
                let numberHard = getNumberLevelCards('hard',cardsData);
                console.log('numberHard',numberHard)
                    if (numberHard >= deckNumbers) {
                        console.log('numberHard >= deckNumbers')
                        while (deckCards.size != deckNumbers) {
                            console.log(deckCards.size)
                            console.log('deckNumbers',deckNumbers)
                             randomNumber =  getRandomNum(0, cardsData.length);
                            if (cardsData[randomNumber].difficulty === 'hard') {
                                deckCards.add(cardsData[randomNumber]);
                            }
                        }
                        
                    } else { 
                        console.log('numberHard < deckNumbers')
                        while (deckCards.size != numberHard ) {
                            randomNumber =  getRandomNum(0, cardsData.length);
                            if (cardsData[randomNumber].difficulty === 'hard') {
                                deckCards.add(cardsData[randomNumber])
                            }
                        }
                        while (deckCards.size != deckNumbers ) {
                            randomNumber =  getRandomNum(0, cardsData.length);
                            if (cardsData[randomNumber].difficulty === 'normal') {
                                deckCards.add(cardsData[randomNumber])
                            }
                        }
                    }   
            }
    
    
    for (let value of deckCards) {
    array.push(value)
    }
    console.log(array) 
    return array
};


//функция формирования колоды для этапа
function getDeckStageCards (deckNumbers, cardsData) {
    let array = []
    while (array.length != deckNumbers) {
     let randomNumber =  getRandomNum(0, cardsData.length);
     array.push(cardsData[randomNumber]);
     cardsData.splice(randomNumber,1)
    }
  return  array
};


let miniDeckGreen, miniDeckBlue, miniDeckBrown, level

// создаем мини-колоды по цветам карт
function getMiniDeck () {
    console.log('getMiniDeck')
    miniDeckGreen = getDeckCards(greenCards,cardsDataGreen, level);
    miniDeckBlue = getDeckCards(blueCards,cardsDataBlue, level);
    miniDeckBrown = getDeckCards(brownCards,cardsDataBrown, level);
};

//создаем колоды для этапов

function getDeckStage (numberStage) {
    let deckStage =[];
    const numbersGreen = ancient[numberStage].greenCards;
    const numbersBlue= ancient[numberStage].blueCards;
    const numbersBrown= ancient[numberStage].brownCards;
    deckStage = deckStage.concat((getDeckStageCards(numbersGreen,miniDeckGreen)),(getDeckStageCards(numbersBlue,miniDeckBlue)),getDeckStageCards(numbersBrown,miniDeckBrown))
    console.log('deckStage', deckStage)
return shuffle(deckStage)
};

let fullDeck
//создаем полную колоду  для показа карт 
function getFullDeck () {
    fullDeck = [];
    fullDeck = fullDeck.concat((getDeckStage('thirdStage')),(getDeckStage('secondStage')),(getDeckStage('firstStage')));

};



const shuffleCard = document.getElementById('shuffle') 
shuffleCard.addEventListener('click',getFullDeck) 





const nextCard = document.getElementById('card-hidden')
nextCard.addEventListener('click', () =>  {
if (fullDeck.length > 0) {
    let openCard = fullDeck.pop();
    const cardOpen = document.getElementById('card-open');
cardOpen.src = openCard.src;
} else alert('Выпала последняя карта')

})

// блок работы с выбором древнего
const ancients= document.querySelectorAll('.ancients-item');
//функция снятия/включения активности с древнего

function clearActiveAncient (str) {
    for (let i=0; i < ancients.length; i++ ) {
       if (ancients[i].className === 'ancients-item _active') {
        ancients[i].classList.remove('_active')
      }
      if (ancients[i].id === str.id) {
         ancients[i].classList.add('_active')
      }
    }
}





const ancientAzathoth = document.getElementById('azathoth');
ancientAzathoth.addEventListener('click', () => {
    ancient = getAncient('azathoth')
    
    getColorNumberCards();
    clearActiveAncient(ancient);
   
})

const ancientCthulhu = document.getElementById('cthulhu');
ancientCthulhu.addEventListener('click', () => {
    ancient = getAncient('cthulhu')
    getColorNumberCards();
    clearActiveAncient(ancient);
})

const ancientIhogSothot = document.getElementById('iogSothoth');
ancientIhogSothot.addEventListener('click', () => {
    
    ancient = getAncient("iogSothoth")
    
    getColorNumberCards();
    clearActiveAncient(ancient);
})

const ancientShubNiggurath = document.getElementById('shubNiggurath');
ancientShubNiggurath.addEventListener('click', () => {
    ancient = getAncient('shubNiggurath')
     getColorNumberCards();
    clearActiveAncient(ancient);
})

//конец блока выбора древнего

//блок выбора уровня игры
const changeLevelButtons = document.querySelectorAll('.button-item ');


//функция снятия/включения активности с кнопки уровня

function clearActiveLevel (str) {
    console.log('clearActiveLevel run')
   for (let i=0; i < changeLevelButtons.length; i++ ) {
       console.log(changeLevelButtons[i])
       
        if (changeLevelButtons[i].className === 'button-item _active') {
        changeLevelButtons[i].classList.remove('_active')
      }
     if (changeLevelButtons[i].id === str) {
      changeLevelButtons[i].classList.add('_active')
      }
      
    }
}



const changeLevelNormal = document.getElementById('normal');
changeLevelNormal.addEventListener('click', () => {
    level = 'normal';
    getMiniDeck();
    clearActiveLevel(level);

});

const changeLevelVeryEasy = document.getElementById('very-easy');
changeLevelVeryEasy.addEventListener('click', () => {
    level = 'very-easy';
    getMiniDeck();
    clearActiveLevel(level);
});
const changeLevelEasy = document.getElementById('easy');
changeLevelEasy.addEventListener('click', () => {
    level = 'easy';
    getMiniDeck();
    clearActiveLevel(level);
});

const changeLevelHard = document.getElementById('hard');
changeLevelHard.addEventListener('click', () => {
    level = 'hard';
    getMiniDeck();
    clearActiveLevel(level);
});
const changeLevelVeryHard = document.getElementById('very-hard');
changeLevelVeryHard.addEventListener('click', () => {
    level = 'very-hard';
    getMiniDeck();
    clearActiveLevel(level);
});
