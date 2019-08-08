import Axios from 'axios';

export default {
  async getPokemons(payload) {
    const data = await Axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        offset: (payload - 1) * 20,
      },
    });
    return data;
  },

  async getPokemonDetail(payload) {
    const data = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${payload}`);
    return data;
  },
};
