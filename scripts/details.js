const url = new URLSearchParams(window.location.search)
const _pokemonService = new PokemonService()
const _domManipulate = new DomManipulate()

const pokemonId = url.get('pokemonId')

if (!pokemonId || !pokemonId.trim().length) {
  window.location.href = '/index.html'
}

function renderPokemon(data) {
  const pokemonInfo = document.createElement('div')
  pokemonInfo.classList.add('generalContainer')
  pokemonInfo.innerHTML = `
    <section class="basicInfo">
      <h1>${data.id}: ${data.name}</h1>
      <ul>
        <li> 
          <img src="${data.sprites.front_default}" width="300" style="image-rendering: pixelated" />
        </li>
      </ul>
    </div>
  `

  const pokemonStats = data.stats
  const pokemonSprites = data.sprites
  const pokemonStatsContainer = document.createElement('section')
  const pokemonStatsTitle = document.createElement('h2')
  const pokemonStatsText = document.createTextNode("Pokemon Stats")
  pokemonStatsContainer.classList.add('stats')
  pokemonStatsTitle.appendChild(pokemonStatsText)
  pokemonStatsContainer.appendChild(pokemonStatsTitle)

  pokemonStats.forEach(element => {
    let pokemonStat = document.createElement('article')
    let statTitle = document.createElement('h3')
    let statContainer = document.createElement('div')
    let statProgressBar = document.createElement('p')

    let textTitle = document.createTextNode(element.stat.name)
    let statValue = document.createTextNode(element.base_stat)

    statTitle.appendChild(textTitle)
    statProgressBar.appendChild(statValue)

    statProgressBar.style.width = `${element.base_stat}%`

    statContainer.appendChild(statProgressBar)
    pokemonStat.appendChild(statTitle)
    pokemonStat.appendChild(statContainer)
    pokemonStatsContainer.appendChild(pokemonStat)
  });

  pokemonInfo.appendChild(pokemonStatsContainer)


  // Code to show sprites
  const spritesContainer = document.createElement('section')
  const sliderContainer = document.createElement('div')
  spritesContainer.classList.add('sprites')
  sliderContainer.classList.add('slider')
  spritesContainer.appendChild(sliderContainer)

  for (const key in pokemonSprites) {

    const llave = pokemonSprites[key];
    
    if (typeof(llave) == "string") {
      let pokemonSprite = document.createElement('img')
      pokemonSprite.setAttribute('src', llave)

      sliderContainer.appendChild(pokemonSprite)
    }
  }

  pokemonInfo.appendChild(spritesContainer)

  // Code to show abilities
  const pokemonAbilities = data.abilities
  const abilitiesContainer = document.createElement('section')
  abilitiesContainer.classList.add('abilities')
  const pokemonAbilitiesTitle = document.createElement('h2')
  const pokemonAbilitiesText = document.createTextNode("Pokemon Abilities")
  pokemonAbilitiesTitle.appendChild(pokemonAbilitiesText)
  abilitiesContainer.appendChild(pokemonAbilitiesTitle)

  pokemonAbilities.forEach(element => {
    let abilitie = document.createElement('p')
    let abilitieName = document.createTextNode(element.ability.name)
    abilitie.appendChild(abilitieName)

    abilitiesContainer.appendChild(abilitie)
  })

  pokemonInfo.appendChild(abilitiesContainer)

    _domManipulate.render(pokemonInfo, 'body')
    // _domManipulate.render(pokemonStats, 'ul')
}
  

function renderEvolution(data) {

  const generalContainer = document.querySelector('.generalContainer');

  // Code to show pokemon evolution
  const pokemonEvolution = data.chain.evolves_to[0].species
  const evolutionContainer = document.createElement('section')
  evolutionContainer.classList.add('evolution')
  const pokemonEvolutionTitle = document.createElement('h2')
  const pokemonEvolutionText = document.createTextNode("Pokemon Evolution")
  pokemonEvolutionTitle.appendChild(pokemonEvolutionText)
  evolutionContainer.appendChild(pokemonEvolutionTitle)

  console.log(pokemonEvolution)
  console.log(typeof(pokemonEvolution))

  let evolutionImg = document.createElement('img')
  let evolutionUrl = pokemonEvolution.url
  let evolutionName = document.createTextNode(pokemonEvolution.name)

  evolutionImg.setAttribute('src', evolutionUrl)

  evolutionContainer.appendChild(evolutionImg)

  generalContainer.appendChild(evolutionContainer)

}

document.addEventListener('DOMContentLoaded', ()=> {

  _pokemonService.getByIdOrName(pokemonId)
  .then(data => {
    renderPokemon(data)
  })
  .catch(error => console.error(error))

  // To get evolutions
  _pokemonService.getEvolutionChainByIdOrName(pokemonId)
  .then(data => {
    renderEvolution(data)
  })
  .catch(error => console.error(error))

  setTimeout(()=> {
    $('.slider').slick({
      infinite: false,
      // fade: true,
      cssEase: 'linear',
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: '3000'
    });
  }, 1000)

  

})

