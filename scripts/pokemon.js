const API_URL = 'https://pokeapi.co/api/v2/'

class PokemonService {
  url = API_URL

  _domManipulate = new DomManipulate()
  _httpResponse = new HttpResponse()

  async getByIdOrName(value) {
    try {
      const response = await this._httpResponse.get(`${this.url}pokemon/${value}`)
      return response
    } catch (error) {
      console.error('[PokemonService - getByIdOrName]:', error)
    }
  }

  async getAll() {
    try {
      const response = await this._httpResponse.get(`${this.url}pokemon`)
      return response
    } catch (error) {
      console.error('[PokemonService - getAll]:', error)
    }
  }

  // to get evolutions
  async getEvolutionChainByIdOrName(value) {
    try {
      const response = await this._httpResponse.get(`${this.url}evolution-chain/${value}`)
      return response
    } catch (error) {
      console.error('[PokemonService - getEvolutionChainByIdOrName]:', error)
    }
  }

}