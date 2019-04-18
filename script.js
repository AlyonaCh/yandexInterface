'use strict';

// Код валидации формы
function backgroundLi (arr) {
    var arrNew = arr.concat(arr);
    var arrNewTwo = shuffle(arrNew);
    var allLi = document.querySelectorAll('li');
    for (let i = 0; i < allLi.length; i++) {
        var memojiCard = allLi[i].querySelector('.memoji');
        memojiCard.classList.add(arrNewTwo[i]);
    } 
}



var timer; 

function counterStart() { 
    var timerMin = document.querySelector('.min');
    var timerSecond = document.querySelector('.sec');
    if(Number(timerSecond.textContent)==0){
        timerMin.textContent = '00';
        timerSecond.textContent = 59; 
        timer = setInterval(function() { 
            var sec = Number(timerSecond.textContent);
            sec--;
            if(sec==0){
                clearInterval(timer);
                create('Lose');
                timerSecond.textContent = '00';
            }else if(sec<10){
                timerSecond.textContent='0'+sec;
            }else{
                timerSecond.textContent=sec; 
            }
        }, 1000); 
    }

} 
    

function checkLi () {
    document.addEventListener('click', function(event) {
        event.preventDefault();
        var allOpen = document.querySelectorAll('.open');
        var allOpenLength = allOpen.length;
        if(allOpenLength == 2){
            var memojiClass =  allOpen[0].querySelector('.memoji');
            var memojiClassTwo =  allOpen[1].querySelector('.memoji')
            if(memojiClass.classList.item(1) == memojiClassTwo.classList.item(1)){
                allOpen[0].classList.remove('open');
                allOpen[1].classList.remove('open');
                allOpen[0].classList.add('win');
                allOpen[1].classList.add('win');
                var allWin = document.querySelectorAll('.win');
                if(allWin.length==12){
                    clearInterval(timer);
                    create('Win');

                }
            }else{
                allOpen[0].classList.add('lose');
                allOpen[1].classList.add('lose');
            }
        }
        
        
    });
}

function create(status){

    var elem = document.createElement('div');
    elem.className = 'popup';
    document.body.appendChild(elem);

    var elemDocW= document.querySelector('.popup');
    var elemWindow = document.createElement('div');
    elemWindow.className = 'window';
    elemDocW.appendChild(elemWindow);

    var elemDoc= document.querySelector('.window');

    var elemText = document.createElement('div');
    elemText.className = 'text';
    elemText.textContent = status;
    elemDoc.appendChild(elemText);

    var elemBatton = document.createElement('input');
    elemBatton.type = 'button';
    if(status=='Win'){
        elemBatton.value = 'Play again';
    }else{
        elemBatton.value = 'Try again';
    }
    elemDoc.appendChild(elemBatton);
    textMove();

}


document.addEventListener('click', function(event) {
    event.preventDefault();
    var eventType = event.target.type;
    if(eventType == 'button'){
        var timerSecond = document.querySelector('.sec');
        timerSecond.textContent = '00';
        var timerMin = document.querySelector('.min');
        timerMin.textContent = '01';
        var elemDoc = document.querySelector('.popup');
        document.body.removeChild(elemDoc);
        
        var allLi = document.querySelectorAll('li');
        for (let  i = 0;  i < allLi.length;  i++) {
            allLi[i].classList.remove('transform');
            allLi[i].classList.remove('win'); 
            var memoji = allLi[i].querySelector('.memoji');  
            var memojiClass = memoji.classList.item(1) ;
            memoji.classList.remove(memojiClass);       
        }
        backgroundLi(['memojiDog','memojiCat','memojiMouse','memojiRabbit','memojiPanda','memojiMonkey']);
    }      
});


function clickLi () {
    document.addEventListener('click', function(event) {
        event.preventDefault();
        var parentLi = event.target.parentNode;
        if(parentLi.tagName == 'LI'){
            counterStart();
            if(parentLi.classList.contains('win')){
                return false;
            }
        }
        var allOpen = document.querySelectorAll('.open');
        var allOpenLength = allOpen.length;
        if(allOpenLength == 2){
            allOpen[0].classList.remove('open');
            allOpen[1].classList.remove('open');
            allOpen[0].classList.remove('transform');
            allOpen[1].classList.remove('transform');
            allOpen[0].classList.remove('lose');
            allOpen[1].classList.remove('lose');
        }
        
        if(parentLi.tagName == 'LI'){
            parentLi.classList.add('transform');
            parentLi.classList.add('open');  
        }
        
        
    });
}

function shuffle(array) { 
    var currentIndex = array.length, temporaryValue, randomIndex; 
    
    while (0 !== currentIndex) { 
    
         randomIndex = Math.floor(Math.random() * currentIndex); 
         currentIndex -= 1; 
    
         temporaryValue = array[currentIndex]; 
         array[currentIndex] = array[randomIndex]; 
         array[randomIndex] = temporaryValue; 
    }
    
    return array; 
}

function textMove() { 
    var textDoc = document.querySelector('.text');
    var text = textDoc.textContent;
    var charCount=text.length;
    var n = 0;
    textDoc.textContent='';
    for (let i = 0; i < charCount; i++) {
        var elemText = document.createElement('div');
        elemText.textContent = text[i];
        textDoc.appendChild(elemText);
    }
    
    var move = setInterval(function() { 
        var char = textDoc.querySelectorAll('div');
        if(charCount==0){
            clearInterval(move);
        }
        if(n< char.length){
            char[n].classList.add('moveChar');
        }
   
        n++;
        charCount--;
    }, 200); 

}