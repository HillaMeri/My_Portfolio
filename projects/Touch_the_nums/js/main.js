'use strict';

const EAZY_SIZE = 16;
const HARD_SIZE = 25;
const EXTERNAL_SIZE = 36;

var gNums;
var gChoosenLevel = EAZY_SIZE;
var gCounter;
var gInteravlTime;
var gTime;

function init() {
    gNums = [];
    gCounter = 1;
    buildNumsArray(gChoosenLevel);
    renderTimeLabel();
    renderNextNum();
    closeModal();
    play();
}

function renderTimeLabel() {
    clearTimeout(gInteravlTime);
    var elTime = document.querySelector('.time');
    elTime.innerHTML = '⏰Game Time:';
}

function renderNextNum() {
    var elNum = document.querySelector('.number');
    elNum.innerHTML = 'Next Number:' + gCounter;
}

function buildNumsArray(size) {
    for (var i = 0; i < size; i++) {
        gNums[i] = i + 1;
    }
    shuffle(gNums);
}

function play() {
    renderBoard();
}

function renderBoard() {
    var htmlStr = '';
    var sizeBoard = Math.sqrt(gChoosenLevel);
    for (var i = 0; i < sizeBoard; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < sizeBoard; j++) {
            var numCell = gNums.pop();
            var className = 'cell-' + numCell;
            htmlStr += '<td class="cell ' + className + '" onclick = "cellClicked(this)" data-id="' + numCell + '">' + numCell + '</td>';
        }
        htmlStr += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = htmlStr;
}

function selectLevel(elLevel) {
    var ID = elLevel.id;
    switch (ID) {
        case 'EAZY_SIZE': {
            gChoosenLevel = EAZY_SIZE;
            break;
        }
        case 'HARD_SIZE': {
            gChoosenLevel = HARD_SIZE;
            break;
        }
        case 'EXTERNAL_SIZE': {
            gChoosenLevel = EXTERNAL_SIZE;
            break;
        }
        default: {
            gChoosenLevel = EAZY_SIZE;
            break;
        }
    }
    init();
}

function cellClicked(elCell) {
    var dataSet = elCell.dataset;
    var clickedNum = +dataSet.id;
    if (clickedNum === 1) {
        gTime = new Date();
        gTime = gTime.getTime();
        renderTime();
    }
    if (clickedNum === gCounter) {
        correctAns(clickedNum);
    }
    if (gCounter === gChoosenLevel + 1) {
        var winTime = new Date();
        winTime = ((winTime.getTime() - gTime) / 1000).toFixed(3);
        var txt = '🎉You Win🎉\n in: ' + winTime + ' seconds! \n try again'
        endGame(txt);
    }
}

function correctAns(clickedNum) {
    gCounter++;
    renderNextNum();
    renderCellClicked(clickedNum);
}

function renderCellClicked(numCell) {
    var selector = '.cell-' + numCell;
    var el = document.querySelector(selector);
    el.classList.add('clicked-Cell');
}

function renderTime() {
    var date = new Date();
    var milis = date.getTime();
    var milisFixed = (milis - gTime) / 1000;
    milisFixed = milisFixed.toFixed(3);
    var elTime = document.querySelector('.time');
    if (milisFixed >= 40) {
        var txt = ' The time \n is Over😒! \n try again';
        endGame(txt);
    } else {
        elTime.innerHTML = milisFixed;
        gInteravlTime = setTimeout(renderTime, 100);
    }
}

function endGame(txt) {
    openModal(txt);
    renderTimeLabel();
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

function shuffle(nums) {
    for (var i = 0; i < nums.length; i++) {
        var temp = nums[i];
        var randIdx = getRandomInteger(0, nums.length - 1);
        nums[i] = nums[randIdx];
        nums[randIdx] = temp;
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
