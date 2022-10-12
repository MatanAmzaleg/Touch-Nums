var gNums
var gShuffledNums
var numsCount = 0
var counterPress = 0
var myInterval
var totalMilSeconds = 0
var lvlChanger = 16


function onInit() {
    gNums = createNums()
    gShuffledNums = shuffle(gNums)
    renderBoard(gNums)
}

function playAgain() {
    var elNums = document.querySelectorAll('.right')
    for (var i = 0; i < elNums.length; i++) {
        elNums[i].classList.remove('right')
    }
    numsCount = 0
    counterPress = 0
    gNums = createNums()
    gShuffledNums = shuffle(gNums)
    renderBoard(gNums)
    document.querySelector('.play-again').style.visibility = 'hidden'
}

function lvlPressed(elLvl) {
    if (elLvl.innerHTML === 'extreme👾') {
        lvlChanger = 36
        playAgain()
    }
    if (elLvl.innerHTML === 'hard🤞') {
        lvlChanger = 25
        playAgain()
    }
    if (elLvl.innerHTML === 'easy👍') {
        lvlChanger = 16
        playAgain()
    }
    console.log(lvlChanger);
}

function setTime() {
    ++totalMilSeconds
    var elSecSpan = document.querySelector('.sec-span')
    var elMsSpan = document.querySelector('.ms-span')
    elMsSpan.textContent = pad(totalMilSeconds % 60)
    elSecSpan.textContent = pad(parseInt(totalMilSeconds / 100)) + ':'
}

function pad(val) {
    var valString = val + ""
    if (valString.length < 2) {
        return "0" + valString
    } else {
        return valString
    }
}

function numberClicked(elNum) {
    if (+elNum.innerHTML === 0) myInterval = setInterval(setTime, 10)
    if (+elNum.innerHTML === counterPress) {
        counterPress++
        console.log(counterPress);
        elNum.classList.add('right')
        if (counterPress === lvlChanger) {
            totalMilSeconds = 0
            clearInterval(myInterval)
            alert('congrats! you won')
            document.querySelector('.play-again').style.visibility = 'visible'
        }
    }

}

function shuffle(gNums) {
    for (var i = gNums.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = gNums[i];
        gNums[i] = gNums[j];
        gNums[j] = temp;
    }
    return (gNums)
}

function createNums() {
    var nums = []
    for (var i = 0; i < lvlChanger; i++) {
        nums.push(i)
    }
    return nums
}

function renderBoard(gNums) {
    // console.table(board);
    var strHTML = '';
    for (var i = 0; i < Math.sqrt(gNums.length); i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < Math.sqrt(gNums.length); j++) {
            strHTML += `<td onclick="numberClicked(this)">${gShuffledNums[numsCount]}</td>`
            numsCount++
        }
        strHTML += `</tr>\n`
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

