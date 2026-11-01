const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

const questions = [
    {
        question: 'What is 2 + 2?',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',
        answer: 2,
    },
    {
        question: 'The tallest building in the world is located in which city?',
        choice1: 'Dubai',
        choice2: 'New York',
        choice3: 'Shanghai',
        choice4: 'None of the above',
        answer: 1,
    },
    {
        question: 'What percent of American adults believe that chocolate milk comes from brown cows?',
        choice1: '20%',
        choice2: '18%',
        choice3: '7%',
        choice4: '33%',
        answer: 3,
    },
    {
        question: 'Approximately what percent of U.S. power outages are caused by squirrels?',
        choice1: '10-20%',
        choice2: '1-5%',
        choice3: '25-30%',
        choice4: '30-40%',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = Math.min(4, questions.length)

const startGame = () => {
    questionCounter = 0
    score = 0
    scoreText.innerText = score
    availableQuestions = [...questions]
    getNewQuestion()
}

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset.number
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}

const incrementScore = num => {
    score += num
    scoreText.innerText = score
}

// Listen on the whole container so clicking the letter or padding works too
choices.forEach(choice => {
    const container = choice.parentElement
    container.addEventListener('click', () => {
        if (!acceptingAnswers) return
        acceptingAnswers = false

        const selectedAnswer = Number(choice.dataset.number)
        const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') incrementScore(SCORE_POINTS)

        container.classList.add(classToApply)

        setTimeout(() => {
            container.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

startGame()
