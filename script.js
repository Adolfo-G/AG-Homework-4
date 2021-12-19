var count=5

var questionList={
    q1:"What is a variable",
    q2:"What is a function",
    q3:"what is HTML"
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