let que_count = 0;
let que_numb = 1;
let score = 0;

const option_list = document.querySelector(".option_list");
const scoreText = document.querySelector("#score");
const next_btn = document.querySelector(".next_btn");
let finalScore = document.querySelector("#finalScore");


const scorePoints = 50;


function showQuestions(game){
    const que_text = document.querySelector(".que_text");   
    let que_tag =  '<span>'+ questions[game].question +'</span>';
    let option_tag = '<div class="option">'+ questions[game].options[0] +'<span></span></div>'
                    + '<div class="option">'+ questions[game].options[1] +'<span></span></div>'
                    + '<div class="option">'+ questions[game].options[2] +'<span></span></div>'
                    + '<div class="option">'+ questions[game].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;  
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++){

        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    
}

incrementScore = num =>{

    score +=num;
    scoreText.innerText = score;
    localStorage.setItem('scoreResult', score);
}


function optionSelected(answer){
    
    let userAnswer = answer.textContent;
    let correctAnswer = questions[que_count].answer;
    let allOptions = option_list.children.length;

    if(userAnswer == correctAnswer){

        answer.classList.add("correct");
        incrementScore(scorePoints);
        
    }else{

        answer.classList.add("incorrect");


        for(let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAnswer){
                option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }

    for(let i = 0; i < allOptions; i++){

        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";   
}

function queCounter(game){

    const que_counter = document.querySelector(".total_que");
    const totalQueCount = '<span><p>'+ game +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    que_counter.innerHTML = totalQueCount;
    
}

function nextBtn(){
    
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        next_btn.style.display = "none";
    
    }else{
        
        window.location.assign('result.html');
    }
}
function getResult(){
    
	var sendPhp = finalScore.innerHTML = localStorage.getItem("scoreResult");

	jQuery.ajax({
  	type: "GET",
  	data:  $(sendPhp).serialize(),
  	success: function(data) {
    	console.log(data); } });
}