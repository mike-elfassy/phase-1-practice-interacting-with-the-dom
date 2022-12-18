// Add event listeners
document.querySelector('button#minus').addEventListener('click', handleMinus)
document.querySelector('button#plus').addEventListener('click', handlePlus)
document.querySelector('button#heart').addEventListener('click', handleHeart)
document.querySelector('button#pause').addEventListener('click', handlePause)

// Start Counter
const counterNode = document.querySelector('#counter')
let counterVal  = 0

let intervalId = startCounter()

function startCounter() {
    return setInterval(() => {counterNode.textContent = ++counterVal}, 1000)
}

// Declare HTML Nodes
const likeList = document.querySelector('ul.likes')
const commentList = document.querySelector('div#list.comments')
const buttonList = [
    document.querySelector('button#minus'),
    document.querySelector('button#plus'),
    document.querySelector('button#heart'),
    document.querySelector('form button#submit'),
]
const likeDatabase = {}

// Declare & Handle Form
const commentForm = document.querySelector('form#comment-form')
commentForm.addEventListener('submit', submitEvent => {
    submitEvent.preventDefault()
    const commentItem = document.createElement('p') 
    commentItem.textContent = submitEvent.target['comment-input'].value
    commentList.appendChild(commentItem)
    commentForm.reset()
})

// Click Handlers
function handleMinus() {
    counterNode.textContent = --counterVal
}

function handlePlus() {
    counterNode.textContent = ++counterVal
}

function handleHeart() {
    likeDatabase[counterVal] = ++likeDatabase[counterVal] || 1

    if (likeDatabase[counterVal] === 1) {
        const likeItem = document.createElement('li')
        likeItem.setAttribute('data-num', counterVal)
        likeItem.innerHTML = `${counterVal} has been liked <span>${likeDatabase[counterVal]}</span> time`
        likeList.appendChild(likeItem)
    }
    else {
        const likeItem = document.querySelector(`ul li[data-num='${counterVal}']`)
        likeItem.innerHTML = `${counterVal} has been liked <span>${likeDatabase[counterVal]}</span> times`
    }
}

function handlePause() {
    const pauseButton = document.querySelector('button#pause')
    if (intervalId) {
        // Click Pause
        clearInterval(intervalId)
        intervalId = null
        for (const button of buttonList) {
            button.disabled = true
        }
        pauseButton.textContent = 'play'
    }
    else {
        // Click Resume
        intervalId = startCounter()
        for (const button of buttonList) {
            button.disabled = false
        }
        pauseButton.textContent = 'resume'
    }
}