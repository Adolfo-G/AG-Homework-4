var startBtn= document.querySelector("#start-btn")
var startText=document.querySelector(".start-text")
var questionText=document.querySelector("#question")
var ansBtn1=document.querySelector(".answer-btn1")
var ansBtn2=document.querySelector(".answer-btn2")
var ansBtn3=document.querySelector(".answer-btn3")
var ansBtn4=document.querySelector(".answer-btn4")
var retryBtn=document.querySelector("#retry")
var clearBtn=document.querySelector("#clear-hs")
var quizContainer=document.querySelector("#container")
var formBox=document.querySelector("#form")
var formBtn=document.querySelector("#submit")
var formEntry=document.querySelector("#initial-input")
var timerDisplay=document.querySelector("#timer-txt")
var scoreInfo=document.querySelector("#highscores")
var listContent=document.querySelector("#list")
var retrievedData;
var count=51
var questionIndex=0
var userResults;


var questionList=[
    {
        question:"Which of the following is an example of a function call?",
        answers:[
            {answerChoice:"example()",isRight:true},
            {answerChoice:"#example",isRight:false},
            {answerChoice:".example",isRight:false},
            {answerChoice:"var example",isRight:false}
        ]
},{
    question:"Which selector is used to access an h1 tag without a class or id?",
    answers:[
        {answerChoice:"getElementById('h1')",isRight:false},
        {answerChoice:"querySelectorAll(h1)",isRight:false},
        {answerChoice:"querySelector('h1')",isRight:true},
        {answerChoice:"getElementByClass('h1')",isRight:false}
    ]
},{
    question:"For the array ['apple','bananna','peach','pear'], \n What index position is 'peach' in?",
    answers:[
        {answerChoice:"0",isRight:false},
        {answerChoice:"1",isRight:false},
        {answerChoice:"2",isRight:true},
        {answerChoice:"3",isRight:false}
    ]
},{
    question:"Which of the following will evaluate to true?",
    answers:[
        {answerChoice:"'10'===10",isRight:false},
        {answerChoice:"7!=7",isRight:false},
        {answerChoice:"'five'==5",isRight:false},
        {answerChoice:"0=='0'",isRight:true}
    ]
},{
    question:"Which of the following is not a JavaScript data type?",
    answers:[
        {answerChoice:"Number",isRight:false},
        {answerChoice:"String",isRight:false},
        {answerChoice:"Boolean",isRight:false},
        {answerChoice:"Methods",isRight:true}
    ]
}
]

//starts the quiz and pulls local storage data, starts the timer and displays the questions 
function quizStart(){
    reset()
    userResults=[]
    retrievedData= JSON.parse(localStorage.getItem("userResults"))
    if(retrievedData!=null && retrievedData.length>0){
        for(var i=0;i<retrievedData.length;i++){
            userResults.push(retrievedData[i])
        }
    }
    startBtn.classList.add("hide")
    startText.classList.add("hide")
    quizContainer.classList.remove("hide")
    timer()
    displayQuestion()
    
}
//assign buttons answers from the question list
function displayQuestion(){
    questionText.textContent=questionList[questionIndex].question
    ansBtn1.textContent=questionList[questionIndex].answers[0].answerChoice
    ansBtn2.textContent=questionList[questionIndex].answers[1].answerChoice
    ansBtn3.textContent=questionList[questionIndex].answers[2].answerChoice
    ansBtn4.textContent=questionList[questionIndex].answers[3].answerChoice
}


//checks if answer is correct and determines if next question can be displayed, increases question index to ready next set of questions
function compareAnswer(index){
    if(questionList[questionIndex].answers[index].isRight===false){
        count-=10 
    }
    questionIndex++
    if(questionIndex<questionList.length){
        displayQuestion()
    }else{
        quizContainer.classList.add("hide")
        formBox.classList.remove("hide")
    }
}

// enters user input and sends it to local storage, also calls the score page
function formPage(event){
    event.preventDefault()
    if(formEntry.value.trim()!==""){
        userResults.push({
            UserInitials:formEntry.value.trim(),
            userScore:count
            })
        localStorage.setItem("userResults",JSON.stringify(userResults))
        formEntry.value=""
        scorePage()
        }else{
            alert("No input was detected. Please try again.")
        }
    
}
// display last page
function scorePage(){
    formBox.classList.add("hide")
    retryBtn.classList.remove("hide")
    clearBtn.classList.remove("hide")
    scoreInfo.classList.remove("hide")

    // for loop to make lists with content being indexes from userResults
    for(var i = 0;i<userResults.length;i++){
        var li=document.createElement("li")
        li.textContent="User:"+userResults[i].UserInitials+"  Score:"+userResults[i].userScore
        listContent.appendChild(li)
    }

}

//countdown timer
function timer(){
    var intervalCount=setInterval(countdown,1000)
    function countdown(){
        count--
        timerDisplay.textContent=count
        if(count<=0||questionList.length===questionIndex){
            clearInterval(intervalCount)
            quizContainer.classList.add("hide")
            formBox.classList.remove("hide")
        } 
    }
}

function reset(){
    count=51
    questionIndex=0
    correctCount=0
    userResults=[]
    retrievedData=null
    retryBtn.classList.add("hide")
    clearBtn.classList.add("hide")
    scoreInfo.classList.add("hide")
}
//retry and remove all child li created
retryBtn.addEventListener("click",function(){
    while(listContent.firstChild){
        listContent.removeChild(listContent.firstChild)
    }
    quizStart()
})
// clear local storage and remove all child li created
clearBtn.addEventListener("click",function(){
    localStorage.clear()
    while(listContent.firstChild){
        listContent.removeChild(listContent.firstChild)
    }
})
//starts the quiz
startBtn.addEventListener("click",quizStart)
//quiz answer buttons passing their index value to be assigned an answer prompt
ansBtn1.addEventListener("click",function(){
    compareAnswer(0)
})
ansBtn2.addEventListener("click",function(){
    compareAnswer(1)
})
ansBtn3.addEventListener("click",function(){
    compareAnswer(2)
})
ansBtn4.addEventListener("click",function(){
    compareAnswer(3)
})

// form submit button that leads to score page
formBtn.addEventListener("click", formPage)

