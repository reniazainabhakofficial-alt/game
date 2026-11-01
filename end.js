const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const scoreForm = document.querySelector('#scoreForm')

const mostRecentScore = Number(localStorage.getItem('mostRecentScore')) || 0

let highScores = []
try {
    highScores = JSON.parse(localStorage.getItem('highScores')) || []
} catch (err) {
    highScores = []
}

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('input', () => {
    saveScoreBtn.disabled = !username.value.trim()
})

scoreForm.addEventListener('submit', e => {
    e.preventDefault()

    const name = username.value.trim()
    if (!name) return

    highScores.push({ score: mostRecentScore, name })
    highScores.sort((a, b) => b.score - a.score)
    highScores.splice(MAX_HIGH_SCORES)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('index.html')
})
