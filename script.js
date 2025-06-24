const questiondiv =document.querySelector(".question p");
const optionsdiv=document.querySelector(".options")
const timep=document.querySelector(".time-left");
const nextBtn= document.querySelector(".next-btn");
const progressDiv= document.querySelector(".progress")

let currentQ=0
let score=0
let userAns=[];
let timer;
let timeleft=15;

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    quizData = data;
    loadQuestion();
  })
  .catch(error => console.error("Error loading quiz data:", error));

function startQuiz() {
    window.location.href = "quizo.html";
}

function loadQuestion(){
    //clearInterval(timer);
    timeleft = 15;
    timep.textContent = `${timeleft}s`;
    const q = quizData[currentQ];
    optionsdiv.innerHTML ="";
    q.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent=option
        optionsdiv.appendChild(button)

    });
    startTimer();
    questiondiv.textContent = `Q${currentQ + 1}. ${q.question}`;
    progressDiv.textContent = `${currentQ + 1} of ${quizData.length} questions`;
    startTimer();
}

function startTimer(){
    //clearInterval(timer);
    timer= setInterval(() =>{
        timeleft--;
        timep.textContent=`${timeleft}s`;
        if (timeleft<=0){
            clearInterval(timer);
            timep.textContent="Time's up!";
            userAns.push(null);
            currentQ++;
            if (currentQ < quizData.length){
                loadQuestion();
            }
            showFinalResult(); 
        }
    },1000);
}

nextBtn.addEventListener("click",() => {
    currentQ++;
    if(currentQ < quizData.length){
        loadQuestion();
    }  
})

function showFinalResult(){
    document.querySelector(".overlay").style.display="block";
}

function closeOverlay(){
    document.querySelector(".overlay").style.display="none";
}