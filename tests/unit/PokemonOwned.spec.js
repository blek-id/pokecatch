import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import PokemonOwned from '@/components/PokemonOwned.vue';
import store from '@/store/index';

const localVue = createLocalVue();

localVue.use(Vuex);

const factory = () => {
  return mount(PokemonOwned, {
    propsData: {},
    localVue,
    store,
    stubs: ['font-awesome-icon'],
  });
};

describe('Pokemon Owned Component', () => {
  test('removes pokemon with button', () => {
    const wrapper = factory();

    const pokemon = {
      id: 0,
      nickname: 'Bubla',
      name: 'bulbasaur',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    };

    wrapper.vm.$store.commit('SAVE_POKEMON', pokemon);
    pokemon.id += 1;
    wrapper.vm.$store.commit('SAVE_POKEMON', pokemon);
    pokemon.id += 1;
    wrapper.vm.$store.commit('SAVE_POKEMON', pokemon);
    pokemon.id += 1;
    wrapper.vm.$store.commit('SAVE_POKEMON', pokemon);
    pokemon.id += 1;
    wrapper.vm.$store.commit('SAVE_POKEMON', pokemon);

    expect(wrapper.findAll('.card__owned-pokemon').length).toBe(5);
    const removeButtons = wrapper.findAll('.card__owned-pokemon-button');
    removeButtons.at(3).trigger('click');

    expect(wrapper.findAll('.card__owned-pokemon').length).toBe(4);
  });
});
