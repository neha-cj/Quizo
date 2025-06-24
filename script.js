const questiondiv =document.querySelector(".question p");
const optionsdiv=document.querySelector(".options div")
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
    nextBtn.disabled = true;
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
    console.log(q)
    
    questiondiv.textContent = `Q${currentQ + 1}. ${q.question}`;
    progressDiv.textContent = `${currentQ + 1} of ${quizData.length} questions`;
    nextBtn.disabled = true;
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
            while (currentQ <= quizData.length){
                loadQuestion();
            }
            //showFinalResult(); 
        }
    },1000);
}

function showFinalResult(){

}

