const questiondiv =document.querySelector(".question p");
const optionsdiv=document.querySelector(".options")
const timep=document.querySelector(".time-left");
const nextBtn= document.querySelector(".next-btn");
const progressDiv= document.querySelector(".progress");
const reviewCard=document.querySelector(".review-section");

let currentQ=0
let score=0
let userAns=[];
let timer;
let timeleft=15;
let selectedOp=null;

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
    clearInterval(timer);
    timeleft = 15;
    timep.textContent = `${timeleft}s`;
    selectedOp=null;
    const q = quizData[currentQ];
    optionsdiv.innerHTML ="";
    questiondiv.textContent = `Q${currentQ + 1}. ${q.question}`;
    progressDiv.textContent = `${currentQ + 1} of ${quizData.length} questions`;


    q.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent=option
        button.classList.add("option-button");

        button.addEventListener("click",() =>{
            selectedOp=option;
            document.querySelectorAll(".option-button").forEach(btn => {
                btn.classList.remove("selected");
            });
            button.classList.add("selected");   
        })
        optionsdiv.appendChild(button)
    });
    startTimer();
}

function startTimer(){
    clearInterval(timer);
    timer= setInterval(() =>{
        timeleft--;
        timep.textContent=`${timeleft}s`;
        if (timeleft<=0){
            clearInterval(timer);
            timep.textContent="Time's up!";
            //userAns.push(null);
            currentQ++;
            if (currentQ < quizData.length) {
                loadQuestion();
            }
        }
    },1000);
}

nextBtn.addEventListener("click",() => {
    const q = quizData[currentQ];
    if (selectedOp!==null){
        if (selectedOp==q.correct){
            score++;
        }
        userAns.push(selectedOp)      
    }
    else{
        userAns.push(null);
    }
    currentQ++;
    if(currentQ < quizData.length){
        loadQuestion();
    }  
    else{
        showFinalResult();
    }
})

function showFinalResult(){
   
    console.log(userAns)
    document.querySelector(".overlay").style.display="block";
    document.querySelector(".overlay-body p").textContent =
        `You attempted ${userAns.filter(ans => ans !== null).length} out of ${quizData.length} questions.`;
    document.getElementById("score").textContent=
        `you scored: ${score} out of ${quizData.length}`;
    
    quizData.forEach((q,index)=>{
        const userAnswer = userAns[index];
        const isCorrect = userAnswer === q.correct;

        const p = document.createElement("p");
        p.innerHTML = `
            <strong>Q${index + 1}.</strong> ${q.question}<br>
            <strong>Options:</strong> <br>${q.options.join("<br>")}<br><br>
            <strong>Correct Answer:</strong> ${q.correct}<br>
            <strong>Your Answer:</strong> ${userAnswer === null ? "Not Answered" : userAnswer}
            <br><span style="color:${isCorrect ? 'green' : 'red'};">${isCorrect ? " Correct" : " Incorrect"}</span><br><br>`;
        reviewCard.appendChild(p);
    })
}

function closeOverlay(){
    document.querySelector(".overlay").style.display="none";
} 