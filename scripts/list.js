const _pokemonService = new PokemonService()
const _httpResponse = new HttpResponse()

_pokemonService.getAll()
  .then(data => {
    renderList(data.results)
  }).catch(error => {
    throw new Error(error)
  })

function renderList(list = []) {
  const cardContainer = document.querySelector('.cards-container')

  list.forEach(async element => {
    const pokemonInfo = await _httpResponse.get(element.url)
    // console.log(pokemonInfo)
    const card = document.createElement('div')
    card.classList.add('pokemon-card')
    const image = document.createElement('img')
    image.src=pokemonInfo.sprites.front_default
    card.appendChild(image)
    card.innerHTML = `
      ${card.innerHTML}
      <a href="/pages/pokemon.html?pokemonId=${pokemonInfo.id}">${element.name}</a>
    `
    cardContainer.appendChild(card)
  })
}