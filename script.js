let quoteDisplayEl = document.getElementById('quoteDisplay');
let timerEl = document.getElementById('timer');
let spinnerEl = document.getElementById('spinner');
let userInput = document.getElementById('quoteInput');
let submitBtnEl = document.getElementById('submitBtn');
let resultEl = document.getElementById('result');


let timer = 0;
let intervalId;

function startTimer() {
    timer = 0;
    clearInterval(intervalId);
    timerEl.textContent = "";

    intervalId = setInterval(() => {
        timer += 1;
        timerEl.textContent = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
}

function fetchQuote() {

    spinnerEl.classList.remove('d-none');
    quoteDisplayEl.textContent = "";

    //api fetch karna
    fetch("https://apis.ccbp.in/random-quote")
        .then(response => response.json())
        .then(jsonData => {
            spinnerEl.classList.add('d-none');
            quoteDisplayEl.textContent = jsonData.content;
        })
        .catch(error => {
            console.log("Error:", error);
            spinnerEl.classList.add('d-none');
            quoteDisplayEl.textContent = "Failed to load quote!";
        });
    startTimer();

}


submitBtnEl.addEventListener('click', function() {
    let quote = quoteDisplayEl.textContent;

    if (userInput.value === quote) {
        stopTimer();
        resultEl.style.fontSize = "30px";
        resultEl.textContent = `You typed in ${timer} seconds`;
        resultEl.style.color = "#323f4b";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
        resultEl.style.color = "#323f4b";
    }
});

let resetBtnEl = document.getElementById('resetBtn');
resetBtnEl.addEventListener('click', function() {
    fetchQuote();
    startTimer();
    userInput.textContent = "";
    resultEl.textContent = "";
});

window.onload = fetchQuote;