const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const the_main = document.querySelector('main')

// --------------- EVENT LISTENERS ---------------
  document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers().then(iterateTrainers)
  })

// --------------- DOM MANIPULATION ---------------
  function iterateTrainers(trainers) {
    trainers.forEach(trainer => {
      debugger
      the_main.innerHTML += `
        <div class="card" data-id=${trainer.id}>
        <p>${trainer.name}</p>
        <button data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul class="js-ul">
          ${fetchPokemon(trainer).then(pokemons => {
            pokemons.map(pokemon => {
              return `<li>${pokemon.nickname + `( ${pokemon.species} )`}<button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
            })
          })}
        </ul>
        </div>
      `
      // let ul = the_main.querySelector(".js-ul")
      // pokeList(ul, trainer)
    })
  }


  // function pokeList(ul, trainer) {
  //   fetchPokemon(trainer).then(pokemons =>
  //     pokemons.forEach(pokemon => {
  //       const li = document.createElement('li')
  //       li.innerHTML += `
  //       ${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id=${pokemon.id}>Release</button>
  //       `
  //       ul.appendChild(li)
  //     })
  //   )
  // }

// --------------- FETCH REQUESTS ---------------
  function fetchTrainers() {
    return fetch("http://localhost:3000/trainers")
    .then(resp => resp.json())
  }

  function fetchPokemon(trainer) {
    return fetch(`http://localhost:3000/trainers/${trainer.id}/pokemons`)
    .then(resp => resp.json())
  }
