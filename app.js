const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#008B8B', '#DAA520','#F08080','#87CEFA','#F5FFFA', '#C0C0C0']
const curentTime = document.querySelector('#currentTime')
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event =>{
  if (event.target.classList.contains('time-btn')){
     time = parseInt(event.target.getAttribute('data-time'))
     screens[1].classList.add('up') 
    startGame()
  }  
})

board.addEventListener('click', event =>{
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})



function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
    setcurentTime()
    curentTime = Date.now()
}

function decreaseTime(){
     //curentTime++
    if (time === 0){
        finishGame()
    } else {
        let curent = --time
        if (curent <10) {
            curent = `0${curent}`
        }
        setTime(curent)
    }
    setcurentTime(curentTime)
}

function setTime (value) {
    timeEl.innerHTML = `00:${value}`
}

function setcurentTime (curTime){
   curentTime.innerHTML = curTime

    console.log(curTime)
}

function finishGame() {
    timeEl.parentElement.classList.add('hide')
   board.innerHTML = `<h1>Cчет: <span class="primary"> ${score}<span><h1>`

}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10,60)
    const {width,height} = board.getBoundingClientRect()

    const x = getRandomNumber(0, width-size)
    const y = getRandomNumber(0, height- size)
    const color = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `${color}`

    board.append(circle)

}

function getRandomNumber(min,max){
   return Math.round(Math.random() * (max - min) + min)
}




function getRandomColor(){
    const index = Math.floor(Math.random()* colors.length)
    return colors[index]
}

