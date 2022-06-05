let selectionButtons = document.querySelectorAll('[data-selection]')
let computerScoreSpan = document.querySelector('[data-computer-score]')
let yourScoreSpan = document.querySelector('[data-your-score]')
let tieScoreSpan = document.querySelector('[data-tie-score]')
let winner = document.querySelector('.winner')
let finalResult = document.querySelector('.finalResult')
let restart = document.querySelector('#restart')
let ss = document.querySelector('#ss')
let m = true

restart.addEventListener('click', (e) => {
  m = true
  ss.textContent = ''
  computerScoreSpan.innerText = 0
  yourScoreSpan.innerText = 0
  tieScoreSpan.innerText = 0
  finalResult.innerText = ''
  winner.innerText = ''
})

let SELECTIONS = [
  {
    name: 'rock',
    beats: 'scissor',
  },
  {
    name: 'paper',
    beats: 'rock',
  },
  {
    name: 'scissor',
    beats: 'paper',
  },
]

selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener('click', (e) => {
    if (m) {
      const selectionName = selectionButton.dataset.selection
      const selection = SELECTIONS.find(
        (selection) => selection.name === selectionName,
      )
      makeSelection(selection)
      m = false
    } else {
      ss.textContent = 'Press the restart button'
    }
  })
})

function makeSelection(selection) {
  const computerSelection = randomSelection()
  const yourWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)

  if (yourWinner === computerWinner) {
    incrementScore(tieScoreSpan)
    winner.innerText = 'Tie'
    finalResult.innerText =
      'Player Choice : ' +
      selection.name +
      ' while , Computer Choice : ' +
      computerSelection.name
  }
  if (yourWinner) {
    incrementScore(yourScoreSpan)
    winner.innerText = 'Player Won'
    finalResult.innerText =
      'Player Choice : ' +
      selection.name +
      ' while , Computer Choice : ' +
      computerSelection.name
  }
  if (computerWinner) {
    incrementScore(computerScoreSpan)
    winner.innerText = 'Computer Won'
    finalResult.innerText =
      'Computer Choice : ' +
      computerSelection.name +
      ' while , Player Choice : ' +
      selection.name
  }
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[randomIndex]
}
