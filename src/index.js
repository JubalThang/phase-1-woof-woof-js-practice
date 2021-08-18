
let pupsContainer
let pupContainer
let filterOn = false 
document.addEventListener('DOMContentLoaded', event => {
    pupsContainer = document.getElementById('dog-bar')
    pupContainer = document.getElementById('dog-info')
    document.getElementById('good-dog-filter').addEventListener('click',event => {
        filterContextToggle(event)
        filterOn = filterOn ? false : true
        document.getElementById('dog-bar').innerHTML = ''
        fetchPups(filterOn)
    })
    
   fetchPups(filterOn)
})

function filterContextToggle(e) {
    if (e.target.textContent === 'Filter good dogs: OFF') {
        document.getElementById('good-dog-filter').textContent = 'Filter good dogs: ON'
    } else {
        document.getElementById('good-dog-filter').textContent = 'Filter good dogs: OFF'
    }
}

function fetchPups(filterOn) {
    // console.log(filterOn)
    fetch('http://localhost:3000/pups')
        .then(res => res.json())
        .then(pups => {
            if (filterOn) {
                pups.filter(pup => pup.isGoodDog).forEach(pup => displayPup(pup))  
            } else {
                pups.forEach(pup => displayPup(pup))
            }
        })
}

function displayPup(pup) {
  
    const span = document.createElement('span')
    span.textContent = pup.name

    span.addEventListener('click', e => displayDog(pup))
    pupsContainer.appendChild(span)
    // console.log('pupContainer:',pupContainer)
}

function displayDog(pup) {
    pupContainer.innerHTML = ''
    const img = document.createElement('img')
    const nameH2 = document.createElement('h2')
    const btn = document.createElement('button')
    btn.id = 'dog'
    img.src = pup.image
    nameH2.textContent = pup.name

    btn.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"

    btn.addEventListener('click', () => {
        if (btn.textContent === 'Good Dog!') {
            btn.textContent = 'Bad Dog!'
        } else {
            btn.textContent = 'Good Dog!'
        }
        pup.isGoodDog = pup.isGoodDog ? false : true 
        updateDatabase(pup)
    })

    pupContainer.append(img, nameH2, btn)
}

function updateDatabase(pup) {
   fetch(`http://localhost:3000/pups/${pup.id}`, {
       method : 'PATCH',
       headers : {
           'Content-Type' : 'application/json',
           Accept : 'application/json'
       },
       body : JSON.stringify(pup)
   })
   .then(res => res.json())
   .then(pup => displayDog(pup))
    console.log(pup)
}