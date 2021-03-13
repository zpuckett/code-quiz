//set time to zero
var timer = 80;
var timeCount;

// the timer funtion 
function setupTimer() {
    timeCount = setInterval(function () {
        timer--;
        var timeReset = timeElement.textContent = "Time Left:" + " " + timer;
        timer = timer;
        if (timer <= 0) {
            clearInterval(timeCount);

            timeElement.textContent = timeReset;

        }
    }, 1000)
}

document.addEventListener("click", function (event) {
    if (event.target === btnElement) {
        wrapperElement.style.display = "none";
        setupTimer()
        displayQuestions();
    }

})


var i = 0;

//
function onclickHandler(event) {

    if (timer <= 0) {
        clearInterval(timeCount);
        divContEL.style.display = "none";
        displayResult();
    }
    var answerText = event.target.textContent
    if (answerText === questions[i].answer) {
        timer = timer;
        responsDiv.setAttribute("style", "color: green")
        responsDiv.textContent = "CORRECT";
    } else {

        responsDiv.setAttribute("style", "color: red")
        responsDiv.textContent = "INCORRECT";
        timer = timer - 8;
    }



    if (i < questions.length - 1) {

        i++;

        setTimeout(function () {
            displayQuestions();
            responsDiv.textContent = "";
        }, 1000)
    } else {
        setTimeout(function () {
            responsDiv.textContent = "";
            displayResult();
            clearInterval(timeCount);

        }, 500)


        divContEL.innerHTML = '';
    }

    //Function to display final score 


    function displayResult() {
        finishDiv.style.visibility = "visible";
        timeElement.textContent = "Time Left:" + " " + timer;
        var HighScores = timer;
        localStorage.getItem(HighScores)
        finalScore.textContent = "Your final score is: " + HighScores;
        localStorage.setItem("HighScores", HighScores)
    

    }

}

//function to show last page 
function renderLastItem() {
    var yourScore = localStorage.getItem("HighScores");
    var yourInitial = localStorage.getItem("Initial");
    if (yourScore && yourInitial === "") {
        return
    }
    finishDiv.textContent = "";
    var finaPageEl = document.querySelector(".final-page");
    finaPageEl.style.visibility = "visible";
    var initialAndScore = document.querySelector("#staticEmail");
    initialAndScore.value = yourInitial + ":" + " " + yourScore;

}

//submit the initial and final score to the local storage
document.addEventListener("submit", function (event) {
    event.preventDefault();
    var initialInput = document.querySelector("#inputInitial").value;
    if (initialInput === "") {
        errMsg.setAttribute("style", "color: orange")
        errMsg.textContent = "Input field cannot be empty"
    } else {
        errMsg.textContent = "";
        localStorage.getItem(initialInput)
        localStorage.setItem("Initial", initialInput)
        renderLastItem()
    }

})
// go back function
function init() {
    location.reload();

}
// clear score
function clearScore() {
    initialAndScore.value = "";
}