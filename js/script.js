const questiondiv =document.querySelector(".question p");
const optionsdiv=document.querySelector(".options div")
const timeLeft=document.querySelector(".time-left");
const nextBtn= document.querySelector(".next-btn");
const progressDiv= document.querySelector(".progress")

let currentQuestion=0
let score=0
let userAnswer=[];
let timer=0;
let timeleft=15;

function loadQuestion(){
    resetTimer();
    const data =quizData[currentQuestion];
    questiondiv.textContent=`Q${currentQuestion+1}.${data.question}`;
    optionsdiv.forEach((el,inx)=>{
        el.textContent=data.optionsdiv
    })
}

function startQuiz() {
    window.location.href = "quizo.html";
}

