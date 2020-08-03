'use strict';

var gCurrQuestIdx;
var gQuests;
var gScore;

function init() {
    gCurrQuestIdx = 0;
    gScore = 0;
    renderScore();

    gQuests = [
        { id: 1, opts: ["7 dwarves", "3 Wolves"], correctOptIndex: 0 },
        { id: 2, opts: ["Timon && Pumbaa", "Lilo && Stitch"], correctOptIndex: 1 },
        { id: 3, opts: ["Pumbaa is a pig!", "Pubaa is a lion!"], correctOptIndex: 0 },
        { id: 4, opts: ["The king of jungle", "The looser of the jungle"], correctOptIndex: 0 },
        { id: 5, opts: ["Forget about your worries", "The life is teribble"], correctOptIndex: 0 },
        { id: 6, opts: ["This is Sindarala", "This is Rapunzel"], correctOptIndex: 1 },
        { id: 7, opts: ["Pocahontas is an Indian", "Pocahontas is Chinese"], correctOptIndex: 0 },
        { id: 8, opts: ["Can you feel the love tonight?", "A whole new world"], correctOptIndex: 1 },
        { id: 9, opts: ["Bambi", "Dambi"], correctOptIndex: 0 },
        { id: 10, opts: ["Piter Pan", "Pinokyo"], correctOptIndex: 1 },
        { id: 11, opts: ["The beauty and the beast?", "The beast and the handsome"], correctOptIndex: 0 }
    ];

    nextQuestion();
}

function nextQuestion() {
    createQuests();
}

function createQuests() {
    var elCont = document.querySelector('.container');
    var htmlStr = renderImg();
    htmlStr += renderQuest();
    elCont.innerHTML = htmlStr;
}

function renderQuest() {
    var htmlStr = '<div class=answers-options>';
    for (var j = 0; j < gQuests[gCurrQuestIdx].opts.length; j++) {
        var ans = gQuests[gCurrQuestIdx].opts[j];
        htmlStr += '<button class="answer" onclick="ansClicked(this)"  data-id="'
            + j + '">' + ans + '</button>';
    }
    htmlStr += '</div>'
    return htmlStr;
}

function renderImg() {
    var htmlStr = '<img src="img/' + (+gQuests[gCurrQuestIdx].id)
        + '.jpg" class="image"/>';
    return htmlStr;
}

function renderScore() {
    var elScore = document.querySelector('.score h3');
    var htmlStr = gScore;
    elScore.innerHTML = 'Your score: </br> <span>' + gScore + '</span>';
}

function ansClicked(elAns) {
    if (gCurrQuestIdx < gQuests.length) {
        var dataID = +elAns.dataset.id;
        if (dataID === gQuests[gCurrQuestIdx].correctOptIndex) {
            correctAnswerClicked();
        }
        else {
            worngAnsower();
        }
        renderScore();
    }
}

function correctAnswerClicked() {
    gScore += 10;
    var txt = 'Good Answer👏 \n You win 10 points!';
    gCurrQuestIdx++;
    if (gCurrQuestIdx === gQuests.length) {
        endGame();
    }
    else {
        openModal(txt);
        nextQuestion();
    }
}

function worngAnsower() {
    var txt = '';
    gScore = (gScore === 0) ? gScore : gScore - 5;
    txt = 'Worng Answer👎\n You loose 5 points';
    openModal(txt);
}

function endGame() {
    var txt = 'THE GAME IS OVER YOU GOT: \n' + gScore + ' POINTS 🤗';
    openModal(txt);
    document.querySelector('.full-screen').style.display = 'flex'
    document.querySelector('.modal-win').style.display = 'block'

    setTimeout(() => {
        document.querySelector('.full-screen').style.display = 'none'
        document.querySelector('.modal-win').style.display = 'none'
    }, 3000);
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none'
}

function openModal(txt) {
    var elModal = document.querySelector('.modal');
    var elModalH3 = document.querySelector('.modal h3');
    elModalH3.innerText = txt;
    elModal.style.display = 'block';
}

function playAgain() {
    closeModal();
    init();
}