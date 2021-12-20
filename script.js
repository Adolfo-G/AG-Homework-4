var startBtn= document.querySelector("#start-btn")
var questionText=document.querySelector("#question")
var ansBtn1=document.querySelector(".answer-btn1")
var ansBtn2=document.querySelector(".answer-btn2")
var ansBtn3=document.querySelector(".answer-btn3")
var ansBtn4=document.querySelector(".answer-btn4")
var quizContainer=document.querySelector("#container")
var count=5
var questionIndex=0
var correctCount=0

var questionList=[
    {
        question:"What is an example of a function",
        answers:[
            {answerChoice:"example()",isRight:true},
            {answerChoice:"#example",isRight:false},
            {answerChoice:".example",isRight:false},
            {answerChoice:"var example",isRight:false}
        ]
},{
    question:"Which selector is used to access an h1 tag without a class or id",
    answers:[
        {answerChoice:"getElementById('h1')",isRight:false},
        {answerChoice:"querySelectorAll(h1)",isRight:false},
        {answerChoice:"querySelector('h1')",isRight:true},
        {answerChoice:"getElementByClass('h1')",isRight:false}
    ]}//remember to delete
// },{
//     question:"",
//     answers:[
//         {answerChoice:"example()",isRight:true},
//         {answerChoice:"#example",isRight:false},
//         {answerChoice:".example",isRight:false},
//         {answerChoice:"var example",isRight:false}
//     ]
// },{
//     question:"What is an example of a function",
//     answers:[
//         {answerChoice:"example()",isRight:true},
//         {answerChoice:"#example",isRight:false},
//         {answerChoice:".example",isRight:false},
//         {answerChoice:"var example",isRight:false}
//     ]
// },{
//     question:"What is an example of a function",
//     answers:[
//         {answerChoice:"example()",isRight:true},
//         {answerChoice:"#example",isRight:false},
//         {answerChoice:".example",isRight:false},
//         {answerChoice:"var example",isRight:false}
//     ]
// },{
//     question:"What is an example of a function",
//     answers:[
//         {answerChoice:"example()",isRight:true},
//         {answerChoice:"#example",isRight:false},
//         {answerChoice:".example",isRight:false},
//         {answerChoice:"var example",isRight:false}
//     ]
// },
]
console.log(questionList[0].answers[0].answerChoice)
console.log(questionList.length)

startBtn.addEventListener("click",quizStart)
function quizStart(){
    startBtn.classList.add("hide")
    quizContainer.classList.remove("hide")
    displayQuestion()
    
}

function displayQuestion(){
    questionText.textContent=questionList[questionIndex].question
    ansBtn1.textContent=questionList[questionIndex].answers[0].answerChoice
    ansBtn2.textContent=questionList[questionIndex].answers[1].answerChoice
    ansBtn3.textContent=questionList[questionIndex].answers[2].answerChoice
    ansBtn4.textContent=questionList[questionIndex].answers[3].answerChoice
}

function compareAnswer(index){
    if(questionList[questionIndex].answers[index].isRight){
        correctCount++
        console.log("correct")
    }else{
        console.log("false")
    }
    questionIndex++
    if(questionIndex<questionList.length){
        displayQuestion()
    }
    
}

function formPage(){

}

function scorePage(){
    
}













function timer(){
    var intervalCount=setInterval(countdown,1000)
    function countdown(){
        count--
        //console.log(count)
        if(count===0){
            clearInterval(intervalCount)
        } 
    }
}