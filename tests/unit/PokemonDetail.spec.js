import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import PokemonDetail from '@/components/PokemonDetail.vue';
import Detail from '@/views/Detail.vue';
import Home from '@/views/Home.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

let store;
let mutations;
let getters;
let actions;

const routes = [
  { path: '/detail/:id', name: 'detail', component: Detail },
  { path: '/', name: 'home', component: Home },
];

const router = new VueRouter({
  routes,
});

const bulbasaur = {
  name: 'bulbasaur',
  weight: 6.9,
  height: 0.7,
  types: ['poison', 'grass'],
  abilities: ['chlorophyll', 'overgrow'],
  imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  stats: [
    { name: 'attack', baseStat: 49 },
    { name: 'defense', baseStat: 49 },
    { name: 'hp', baseStat: 45 },
    { name: 'special attack', baseStat: 65 },
    { name: 'special defense', baseStat: 65 },
    { name: 'speed', baseStat: 45 },
  ],
};

beforeEach(() => {
  getters = {
    IS_LOADING: () => false,
  };

  mutations = {
    SET_IS_LOADING: jest.fn(),
    SAVE_POKEMON: jest.fn(),
  };

  actions = {
    GET_POKEMON_DETAIL: jest.fn(),
  };

  store = new Vuex.Store({
    modules: {
      pokemon: {
        getters: {
          POKEMON_DETAIL: () => bulbasaur,
        },
      },
    },
    getters,
    mutations,
    actions,
  });
});

const factory = () => {
  return shallowMount(PokemonDetail, {
    propsData: {},
    store,
    localVue,
    router,
  });
};

describe('Pokemon Detail Component', () => {
  test('shows success/fail button when catching pokemon', () => {
    const wrapper = factory();

    const catchButton = wrapper.find('#catchPokemon');
    catchButton.trigger('click');

    const responseButton = wrapper.find('#catchResponse');
    expect(responseButton.isVisible()).toBe(true);
  });

  test('shows catch pokemon button when clicking retry', () => {
    const wrapper = factory();

    wrapper.vm.$data.isCatchAttempted = true;
    wrapper.vm.$data.isPokemonCatched = false;
    const responseButton = wrapper.find('#catchResponse');

    responseButton.trigger('click');

    const catchButton = wrapper.find('#catchPokemon');

    expect(catchButton.isVisible()).toBe(true);
  });

  test('pokemon saved to state when clicking save button', () => {
    const wrapper = factory();

    wrapper.vm.$data.isCatchAttempted = true;
    wrapper.vm.$data.isPokemonCatched = true;

    wrapper.find('#pokemonNickname').setValue('Bublas');
    wrapper.find('#catchResponse').trigger('click');

    expect(mutations.SAVE_POKEMON.mock.calls).toHaveLength(1);
    expect(mutations.SAVE_POKEMON.mock.calls[0][1]).toEqual({
      id: 0,
      nickname: 'Bublas',
      name: 'bulbasaur',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    });
  });
});
