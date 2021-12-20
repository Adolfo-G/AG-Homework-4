var startBtn= document.querySelector("#start-btn")
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

var count=26
var questionIndex=0
var correctCount=0
var userResults=[]
var retrievedData= JSON.parse(localStorage.getItem("userResults"))

var questionList=[
    {
        question:"Which of the following is an example of a function?",
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
    question:"For the array ['apple','bananna','peach','pear'], \n What index position is peach in?",
    answers:[
        {answerChoice:"0",isRight:false},
        {answerChoice:"1",isRight:false},
        {answerChoice:"2",isRight:true},
        {answerChoice:"3",isRight:false}
    ]
},{
    question:"Which of the following evaluate to true?",
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


function quizStart(){
    reset()
    if(retrievedData!=null && retrievedData.length>0){
        for(var i=0;i<retrievedData.length;i++){
            userResults.push(retrievedData[i])
        }
    }
    
    startBtn.classList.add("hide")
    quizContainer.classList.remove("hide")
    timer()
    displayQuestion()
    
}

function displayQuestion(){
    questionText.textContent=questionList[questionIndex].question
    ansBtn1.textContent=questionList[questionIndex].answers[0].answerChoice
    ansBtn2.textContent=questionList[questionIndex].answers[1].answerChoice
    ansBtn3.textContent=questionList[questionIndex].answers[2].answerChoice
    ansBtn4.textContent=questionList[questionIndex].answers[3].answerChoice
}


//checks if answer is correct and determines if next question can be displayed
function compareAnswer(index){
    if(questionList[questionIndex].answers[index].isRight){
        correctCount++
        console.log("correct")
    }else{
        count-=3
        console.log("false")
    }
    questionIndex++
    if(questionIndex<questionList.length){
        displayQuestion()
    }else{
        quizContainer.classList.add("hide")
        formBox.classList.remove("hide")
    }
    
}

function formPage(event){
    event.preventDefault()
    
    if(formEntry.value.trim()!=="")
        userResults.push({
            UserInitials:formEntry.value.trim(),
            userScore:count
            })
    console.log(userResults)
    localStorage.setItem("userResults",JSON.stringify(userResults))
    formEntry.value=""
    scorePage()
}

function scorePage(){
    formBox.classList.add("hide")
    retryBtn.classList.remove("hide")
    clearBtn.classList.remove("hide")
    scoreInfo.classList.remove("hide")

    // for loop to make lists with content being indexes from userResults
    for(var i = 0;i<userResults.length;i++){
        var li=document.createElement("li")
        li.textContent=userResults[i].UserInitials+"~"+userResults[i].userScore
        listContent.appendChild(li)
    }

}


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
    count=26
    questionIndex=0
    correctCount=0
    userResults=[]
    // if(retryBtn.classList.contains("hide") && clearBtn.classList.contains("hide") && scoreInfo.classList.contains("hide")){
    retryBtn.classList.add("hide")
    clearBtn.classList.add("hide")
    scoreInfo.classList.add("hide")
    console.log("hello")
   
    //}
}

retryBtn.addEventListener("click",quizStart)
clearBtn.addEventListener("click",function(){
    localStorage.clear()
    while(listContent.firstChild){
        listContent.removeChild(listContent.firstChild)
    }
})
startBtn.addEventListener("click",quizStart)
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
formBtn.addEventListener("click", formPage)