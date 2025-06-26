const questiondiv =document.querySelector(".question p");
const optionsdiv=document.querySelector(".options")
const timep=document.querySelector(".time-left");
const nextBtn= document.querySelector(".next-btn");
const progressDiv= document.querySelector(".progress");
const reviewCard=document.querySelector(".review-section");

let currentQ=0
let score=0
let len;
let timer;
let timeleft=15;
let selectedOp=null;

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    quizData = data;
    len= quizData.length;
    loadQuestion();
  })
  .catch(error => console.error("Error loading quiz data:", error));


let userAns=new Array(len).fill(null);
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
        button.textContent=option;
        button.classList.add("option-button", "px-2", "py-3","ml-2","mr-2", "mt-2", "rounded-md","text-left", "bg-[#bbbcef]", "border", "border-[#b57c7c]");
        button.addEventListener("click",() =>{
            selectedOp=option;
            document.querySelectorAll(".option-button").forEach(btn => {
                btn.classList.remove("px-2", "py-4", "mt-2", "text-left", "rounded-md", "bg-green-300" ,"border" ,"border-green-500");
                btn.classList.add("px-2", "py-4", "mt-2", "text-left", "rounded-md","bg-[#bbbcef]","border","border-[#b57c7c]", "text-black");

            });
            button.classList.remove("px-2", "py-4", "mt-2", "text-left", "rounded-md","bg-[#bbbcef]", "border-[#b57c7c]", "text-black");
            button.classList.add("px-2", "py-4", "mt-2","rounded-md","text-left","bg-green-300","border", "border-green-500");
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
            currentQ++;
            if (currentQ < quizData.length) {
                loadQuestion();
            }
            if(currentQ==quizData.length){
                showFinalResult();
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
        userAns[currentQ]=selectedOp;    
    }
    else{
        userAns[currentQ]= null;
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
    document.querySelector(".overlay").classList.remove("hidden");
    document.querySelector(".overlay-body p").textContent =
        `You attempted ${userAns.filter(ans => ans !== null).length} out of ${quizData.length} questions.`;
    document.getElementById("score").textContent=
        `You scored: ${score} out of ${quizData.length}`;
    
    quizData.forEach((q,index)=>{
        const userAnswer = userAns[index];
        const isCorrect = userAnswer === q.correct;

        const reviewblock = document.createElement("div");
        reviewblock.className = "p-4 mb-4 rounded-lg bg-gray-100";
        reviewblock.innerHTML = `
            <h3 class="text-lg text-purple-800">Q${index + 1}. ${q.question}</h3>
            <div class="text-sm text-gray-700 mt-2">
                <p><strong>Options:</strong></p>
                <ul>${q.options.map(opt => `<li>${opt}</li>`).join("")}</ul>
                <p class="mt-2"><strong>Correct Answer:</strong> <span class="text-green-700">${q.correct}</span></p>
                <p><strong>Your Answer:</strong> 
                    <span>${userAnswer === null ? "Not Answered" : userAnswer}</span>
                </p>
                <p class="mt-1 font-semibold ${isCorrect ? 'text-green-700': 'text-red-600'}">
                    ${isCorrect ? "Correct" : "Incorrect"}
                </p>
            </div>
        `;
        reviewCard.appendChild(reviewblock);
    })
}

function closeOverlay() {
  document.querySelector(".overlay").classList.add("hidden");
  document.querySelector(".quiz-section").classList.add("hidden");
  document.querySelector(".ResultPage").classList.remove("hidden");
}

function goBackHome(){
    window.location.href = "index.html";
}
