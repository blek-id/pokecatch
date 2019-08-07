import pokemonapi from '../../api/pokemonapi';

const getters = {
  POKEMONS: (state => state.pokemons),
  POKEMON_COUNT: (state => state.pokemonCount),
};

const actions = {
  GET_POKEMONS: async (context, payload) => {
    const data = await pokemonapi.getPokemons(payload);
    context.commit('SET_POKEMONS', data);
  },
};

const mutations = {
  SET_POKEMONS: (state, payload) => {
    state.pokemons = payload.data.results.map(result => ({
      id: result.url.slice(result.url.lastIndexOf('/', result.url.lastIndexOf('/') - 1) + 1, result.url.lastIndexOf('/')),
      name: result.name,
    }));
    state.pokemonCount = payload.data.count;
  },
};

const state = {
  pokemons: [],
  pokemonCount: 0,
};

export default {
  state, getters, mutations, actions,
};
