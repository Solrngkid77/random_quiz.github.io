    // string - ""
    // list - {}  
    // dictinary - {} a dictionary has key-value pair  
    
    
const quizData = [ 
    {
        question:"How do u do kyotot combo?",
        options: ["flowing+lethal","flowing+hunter","lethal+flowing"],
        answer: "flowing+lethal"
    },   
    
    {
        question:"How can u have a mic in rblx?",
        options: ["be 13+","be 17+","be 18+"],
        answer: "be 13+"
    },  

    {
        question:"How rare is i'm peached[limted]?",
        options: ["400m","200m", "100m"],
        answer: "400m"
    },  

    {
        question:"How hard is makuku combo?",
        options: ["easy","mid","hard"],
        answer: "hard"
    }, 

    {
        question:"How rare is glitch?",
        options: ["2m","3.6t","10t"],
        answer: "3.6t"
    }
];


const questionElement = document.getElementById('question');
const startButton = document.getElementById("start-btn");
const timeElement = document.getElementById('timer');
const timerText = document.getElementById('countdown');
const progressbar = document.getElementById('progress-bar');
const progressbarcontainer = document.getElementById('progress-bar-container');
const optionsElement = document.getElementById('option-container');
const resultElement = document.getElementById('result');


progressbar.style.width = '0%';

let currentQuestion = 0;
let score = 0;
let timer = 0;

startButton.addEventListener('click', startQuiz);

function startQuiz()
{

    startButton.style.display = 'none';
    progressbarcontainer.style.display = 'block';
    resultElement.textContent = `You scored ${score} points`;
    loadquestion();
}

function loadquestion()
{
    clearInterval(timer);

    if(currentQuestion < quizData.length)
    {
        //update the progress bar
        progressbar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;    

        const currentquizdata = quizData[currentQuestion ];
        questionElement.textContent = currentquizdata.question;


        //set inital countdown value
        timerText.textContent = 15;

        //clone 4 option button
        optionsElement.innerHTML = ''; // clear previous options

        currentquizdata.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            optionsElement.appendChild(button);

            button.addEventListener('click', () => {
                checkAnswer(option);
            });
        });


        //kickstart the timer for the vurrent question
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
        
            // check if time is up 
            if(parseInt(timerText.textContent)===0)
            {
                //reset the timer
                clearInterval(timer);

                currentQuestion = currentQuestion + 1;

                loadquestion();
            }
        }, 1000);
    }else
    {
        endquiz()
    }
}


function checkAnswer(option) 
{ 
    const currentquizdata = quizData[currentQuestion];

    if(option === currentquizdata.answer) 
    {
        score++;
    }
           
    resultElement.textContent = `You scored ${score} points`;
    currentQuestion++
    loadquestion();
}

function endquiz()
{
    progressbarcontainer.computedStyleMap.display = 'none';
    questionElement.textContent = "Quiz had ended!Good job!";
    optionsElement.style.display = 'none';
    timeElement.style.display = 'none';
}