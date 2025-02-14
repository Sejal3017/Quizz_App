const questions = {
    easy: [
        { question: "What is Harry Potter's middle name?", options: ["James", "John", "Lily", "Arthur"], answer: "James" },
        { question: "Who is the headmaster of Hogwarts?", options: ["Dumbledore", "Snape", "Voldemort", "Hagrid"], answer: "Dumbledore" },
        { question: "What is Harry's pet owl called?", options: ["Hedwig", "Fang", "Crookshanks", "Scabbers"], answer: "Hedwig" },
        { question: "Who teaches Potions at Hogwarts?", options: ["Snape", "Hagrid", "Flitwick", "Dumbledore"], answer: "Snape" },
        { question: "What house is Harry sorted into?", options: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"], answer: "Gryffindor" },
        { question: "What is the name of Hagrid's giant dog?", options: ["Fang", "Fluffy", "Aragog", "Norbert"], answer: "Fang" },
        { question: "What position does Harry play in Quidditch?", options: ["Seeker", "Keeper", "Beater", "Chaser"], answer: "Seeker" },
        { question: "What is Voldemort's real name?", options: ["Tom Riddle", "Salazar Slytherin", "Draco Malfoy", "Lucius Malfoy"], answer: "Tom Riddle" },
        { question: "What platform does the Hogwarts Express leave from?", options: ["9¾", "10", "7½", "5"], answer: "9¾" },
        { question: "What is Ron's rat's name?", options: ["Scabbers", "Crookshanks", "Fang", "Aragog"], answer: "Scabbers" }
    ],
    medium: [
        { question: "Who is the Half-Blood Prince?", options: ["Snape", "Harry", "Voldemort", "Draco"], answer: "Snape" },
        { question: "What is Hermione's Patronus?", options: ["Otter", "Stag", "Rabbit", "Doe"], answer: "Otter" },
        { question: "Who is Harry's godfather?", options: ["Sirius Black", "Remus Lupin", "James Potter", "Alastor Moody"], answer: "Sirius Black" },
        { question: "What does the Imperius Curse do?", options: ["Control", "Kill", "Torture", "Heal"], answer: "Control" },
        { question: "What shape does Harry's scar take?", options: ["Lightning Bolt", "Star", "Circle", "Cross"], answer: "Lightning Bolt" },
        { question: "Who founded Gryffindor house?", options: ["Godric Gryffindor", "Helga Hufflepuff", "Rowena Ravenclaw", "Salazar Slytherin"], answer: "Godric Gryffindor" },
        { question: "Who was Harry's first kiss?", options: ["Cho Chang", "Ginny Weasley", "Hermione Granger", "Luna Lovegood"], answer: "Cho Chang" },
        { question: "What spell is used to disarm?", options: ["Expelliarmus", "Avada Kedavra", "Crucio", "Stupefy"], answer: "Expelliarmus" },
        { question: "Who was NOT in the Triwizard Tournament?", options: ["Harry", "Cedric", "Hermione", "Fleur"], answer: "Hermione" },
        { question: "What form does Harry's Patronus take?", options: ["Stag", "Doe", "Otter", "Phoenix"], answer: "Stag" }
    ],
    hard: [
        { question: "What Horcrux does Hermione destroy?", options: ["Hufflepuff Cup", "Diadem", "Locket", "Nagini"], answer: "Hufflepuff Cup" },
        { question: "What is the name of Voldemort's snake?", options: ["Nagini", "Norbert", "Fluffy", "Aragog"], answer: "Nagini" },
        { question: "What is the name of Dumbledore's brother?", options: ["Aberforth", "Percival", "Gellert", "Brian"], answer: "Aberforth" },
        { question: "Who created the Marauder's Map?", options: ["Moony, Wormtail, Padfoot, and Prongs", "Harry and Ron", "Fred and George", "Snape"], answer: "Moony, Wormtail, Padfoot, and Prongs" },
        { question: "Who was the first person to escape Azkaban?", options: ["Sirius Black", "Bellatrix Lestrange", "Barty Crouch Jr.", "Grindelwald"], answer: "Sirius Black" }
    ]
};

let currentCategory = 'random';
let questionPool = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 5;

function startQuiz(category) {
    document.getElementById('category-selector').classList.add('hidden');
    currentCategory = category;
    questionPool = buildQuestionPool(category);
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz-container').classList.remove('hidden');
    displayQuestion();
}

function buildQuestionPool(category) {
    if (category == 'random') {
        return [...questions.medium, ...questions.hard].sort(() => Math.random() - 0.5);
    }
    return questions[category].sort(() => Math.random() - 0.5);
}


function displayQuestion() {
    const currentQuestion = questionPool[currentQuestionIndex];
    document.getElementById('progress-indicator').textContent = `Question ${currentQuestionIndex + 1}/${totalQuestions}`;
    document.getElementById('question-text').textContent = currentQuestion.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    let shuffledOptions = [...currentQuestion.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.onclick = () => handleOptionClick(button, option);
        optionsContainer.appendChild(button);
    });
}

function handleOptionClick(button, selectedOption) {
    const currentQuestion = questionPool[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

    if (isCorrect) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            displayQuestion();
        } else {
            displayResults();
        }
    }, 1500);
}

function displayResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');

    document.getElementById('score-display').textContent = `You scored ${score} out of ${totalQuestions}`;
    document.getElementById('quote-display').textContent = getQuoteBasedOnScore(score);

    const resultGif = document.getElementById('result-gif');
    resultGif.innerHTML = ''; // Clear previous image

    const img = document.createElement('img');

    if (score === totalQuestions) {
        img.src = "/assets/12s6.gif"; // Image for perfect score
    } else {
        img.src = "/assets/voldy.jpg"; 
    }
    

    resultGif.appendChild(img);
}

function getQuoteBasedOnScore(score) {
    return score === totalQuestions ? "You're a true wizard!" : "Not bad for a muggle!";
}

function restartQuiz() {
    document.getElementById('category-selector').classList.remove('hidden');
    document.getElementById('result-container').classList.add('hidden');
}


