import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import PokemonOwned from '@/components/PokemonOwned.vue';
import store from '@/store/index.js';

const localVue = createLocalVue();

localVue.use(Vuex);

let getters;
let mutations;

const ownedPokemons = [
  {
    id: 0,
    nickname: 'Bubla',
    name: 'bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    id: 1,
    nickname: 'Hubla',
    name: 'bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    id: 2,
    nickname: 'Jubla',
    name: 'bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
];

// beforeEach(() => {
//   getters = {
//     OWNED_POKEMONS: () => ownedPokemons,
//     OWNED_POKEMONS_COUNT: () => 3,
//   };

//   mutations = {
//     SET_OWNED_POKEMONS_OFFSET: jest.fn(1),
//   };

//   store = new Vuex.Store({
//     getters,
//     mutations,
//   });
// });


const factory = () => {
  return shallowMount(PokemonOwned, {
    propsData: {},
    localVue,
    store,
  });
};

describe('Pokemon Owned Component', () => {
  test('has list of owned pokemons', () => {
    const wrapper = factory();

    expect(wrapper.findAll('.list__item').length).toBe(5);
  });
});
