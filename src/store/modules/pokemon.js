import pokemonapi from '../../api/pokemonapi';

const getters = {
  POKEMONS: (state => state.pokemons),
  POKEMON_COUNT: (state => state.pokemonCount),
  POKEMON_DETAIL: (state => state.pokemonDetail),
  OWNED_POKEMONS: (state => state.savedPokemon.length),
};

const actions = {
  GET_POKEMONS: async (context, payload) => {
    const data = await pokemonapi.getPokemons(payload);
    context.commit('SET_POKEMONS', data);
  },
  GET_POKEMON_DETAIL: async (context, payload) => {
    const data = await pokemonapi.getPokemonDetail(payload);
    context.commit('SET_POKEMON_DETAIL', data);
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
  SET_POKEMON_DETAIL: (state, payload) => {
    state.pokemonDetail = {
      name: payload.data.name,
      height: payload.data.height / 10, // Height is in decimeter, converting to meter
      weight: payload.data.weight / 10, // Weight is 10x of a kilogram, converting to kilogram
      imageUrl: payload.data.sprites.front_default,
      types: payload.data.types.map(t => t.type.name),
      abilities: payload.data.abilities.map(a => a.ability.name.replace('-', ' ')),
      stats: payload.data.stats.map(s => ({
        name: s.stat.name.replace('-', ' '),
        baseStat: s.base_stat,
      })),
    };
  },
  SAVE_POKEMON: (state, payload) => {
    state.savedPokemon.push(payload);
  },
};

const state = {
  pokemons: [],
  pokemonCount: 0,
  pokemonDetail: {},
  savedPokemon: [],
};

export default {
  state, getters, mutations, actions,
};
