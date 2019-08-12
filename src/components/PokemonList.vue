<template>
  <div class="container" v-if="IS_LOADING === false">
    <section class="page-info">
      <h3>My Pokemon</h3>
      <h4>Owned Pokemons: {{OWNED_POKEMONS_COUNT}}</h4>
    </section>
    <section class="list">
      <div class="list--item" v-for="pokemon in POKEMONS" :key="pokemon.id">
        <PokemonCard :pokemon="pokemon" />
      </div>
    </section>
    <BasePagination
      :totalCount="POKEMON_COUNT"
      :dataPerPage="20"
      :interval="5"
      @gotoPage="changePageHandle"
    />
  </div>
  <BaseLoader v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import PokemonCard from '@/components/PokemonCard.vue';
import BasePagination from '@/components/BasePagination.vue';
import BaseLoader from '@/components/BaseLoader.vue';

export default {
  name: 'PokemonList',
  data() {
    return {};
  },
  components: {
    PokemonCard,
    BasePagination,
    BaseLoader,
  },
  async created() {
    this.$store.commit('SET_IS_LOADING', true);
    await this.$store.dispatch('GET_POKEMONS', this.currentPage);
    this.$store.commit('SET_IS_LOADING', false);
  },
  computed: {
    ...mapGetters(['POKEMONS']),
    ...mapGetters(['POKEMON_COUNT']),
    ...mapGetters(['OWNED_POKEMONS_COUNT']),
    ...mapGetters(['IS_LOADING']),
  },
  methods: {
    async changePageHandle(value) {
      this.$store.commit('SET_IS_LOADING', true);
      await this.$store.dispatch('GET_POKEMONS', value);
      this.$store.commit('SET_IS_LOADING', false);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
