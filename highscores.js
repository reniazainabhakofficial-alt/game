const highScoresList = document.querySelector('#highScoresList')

let highScores = []
try {
    highScores = JSON.parse(localStorage.getItem('highScores')) || []
} catch (err) {
    highScores = []
}

highScoresList.innerHTML = ''
highScores.forEach(entry => {
    const li = document.createElement('li')
    li.className = 'high-score'
    li.textContent = `${entry.name} - ${entry.score}` // textContent prevents XSS
    highScoresList.appendChild(li)
})
