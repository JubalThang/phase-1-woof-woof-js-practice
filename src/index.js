
let pupsContainer
let pupContainer
document.addEventListener('DOMContentLoaded', event => {
    pupsContainer = document.getElementById('dog-bar')
    pupContainer = document.getElementById('dog-info')
    // document.getElementById('good-dog-filter').addEventListener(event => {
    //     event.target.textContent = 
    //     fetchPups(filterOn = true)
    // })
    fetchPups()
})

function fetchPups(filterOn = false) {

    fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(pups => {
            if (filterOn) {
                const filtered = pups.filter(pup => pup.isGoodDog)
            } else {
                pups.forEach(pup => displayPup(pup))
            }
        })
}

function displayPup(pup) {
    const span = document.createElement('span')
    span.textContent = pup.name

    span.addEventListener('click', e => displayClickDog(pup))
    pupsContainer.appendChild(span)
}


function displayClickDog(pup) {
    const img = document.createElement('img')
    const nameH2 = document.createElement('h2')
    const btn = document.createElement('button')
    btn.id = 'dog'
    img.src = pup.image
    nameH2.textContent = pup.name
    btn.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'

    btn.addEventListener('click', () => {
        if (btn.textContent === 'Good Dog!') {
            btn.textContent = 'Bad Dog!'
        } else {
            btn.textContent = 'Good Dog!'
        }
        pup.isGoodDog = pup.isGoodDog ? false : true
        // update the backupend data
        toggleDogBehaive(pup)
    })

    pupContainer.append(img, nameH2, btn)
}
    

function pupHandler(pup) {
    pupContainer.innerHTML = ''
     pup.isGoodDog = pup.isGoodDog ? false : true
    toggleDogBehaive(pup)
    console.log('call')
}

function displayDOg(pup) {
    const img = document.createElement('img')
    const nameH2 = document.createElement('h2')
    const btn = document.createElement('button')
    btn.id = 'dog'
    img.src = pup.image
    nameH2.textContent = pup.name
    btn.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'

    btn.addEventListener('click', () => {
        if (btn.textContent === 'Good Dog!') {
            btn.textContent = 'Bad Dog!'
        } else {
            btn.textContent = 'Good Dog!'
        }
    })

    pupContainer.append(img, nameH2, btn)

    console.log(pupContainer)
}

function toggleDogBehaive(pup) {
    // console.log(`http://localhost:3000/pups/${pup.id}`)
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(pup)
    })
        .then(res => res.json())
        .then(pup => displayDOg(pup))

    // .catch(error => console.error('Error PATCH:', error))
    // e.target.textContent = pup.isGoodDog ? 'Goood Dog!' : 'Bad Dog!'
}