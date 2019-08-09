import pokemonapi from '../../api/pokemonapi';

const getters = {
  POKEMONS: (state => state.pokemons),
  POKEMON_COUNT: (state => state.pokemonCount),
  POKEMON_DETAIL: (state => state.pokemonDetail),
  OWNED_POKEMONS_COUNT: (state => state.savedPokemons.length),
  OWNED_POKEMONS: (state => state.savedPokemons.slice(state.pokemonOffsetIndexes.startIndex, state.pokemonOffsetIndexes.endIndex)),
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
    state.pokemonIdCounter += 1;
    const data = {
      id: state.pokemonIdCounter,
      name: payload.name,
      nickname: payload.nickname,
      imageUrl: payload.imageUrl,
    };
    state.savedPokemons.push(data);
  },
  DELETE_POKEMON: (state, payload) => {
    const filtered = state.savedPokemons.filter(savedPokemon => savedPokemon.id !== payload);
    state.savedPokemons = filtered;
  },
  SET_OWNED_POKEMONS_OFFSET: (state, payload) => {
    state.pokemonOffsetIndexes = payload;
  }
};

const state = {
  pokemons: [],
  pokemonCount: 0,
  pokemonDetail: {},
  savedPokemons: [{ "id": 99, "name": "geodude", "nickname": "first", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png" }, { "id": 1, "name": "geodude", "nickname": "geodude", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png" }, { "id": 2, "name": "venusaur", "nickname": "venusaur", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" }, { "id": 3, "name": "charmander", "nickname": "charmander", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" }, { "id": 4, "name": "charizard", "nickname": "charizard", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" }, { "id": 5, "name": "ivysaur", "nickname": "ivysaur", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" }, { "id": 6, "name": "golem", "nickname": "golem", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png" }, { "id": 7, "name": "butterfree", "nickname": "butterfree", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png" }, { "id": 8, "name": "blastoise", "nickname": "blastoise", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png" }, { "id": 9, "name": "ivysaur", "nickname": "ivysaur", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" }, { "id": 10, "name": "charmander", "nickname": "charmander", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" }, { "id": 11, "name": "bulbasaur", "nickname": "bulbasaur", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" }, { "id": 12, "name": "weedle", "nickname": "Bob", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png" }, { "id": 13, "name": "flareon", "nickname": "Vegana", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png" }, { "id": 14, "name": "pidgeot", "nickname": "Birdy", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png" }, { "id": 15, "name": "rattata", "nickname": "TIKUS", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png" }, { "id": 16, "name": "raticate", "nickname": "gede bat tikus", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png" }, { "id": 17, "name": "ivysaur", "nickname": "ivysaur", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" }, { "id": 18, "name": "ivysaur", "nickname": "ASW", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png" }, { "id": 19, "name": "charizard", "nickname": "imut", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" }, { "id": 20, "name": "charmander", "nickname": "kyut", "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" }],
  pokemonIdCounter: 0,
  pokemonOffsetIndexes: 0,
};

export default {
  state, getters, mutations, actions,
};
