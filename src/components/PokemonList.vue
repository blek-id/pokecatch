<template>
  <div class="container">
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
</template>

<script>
import { mapGetters } from 'vuex';
import PokemonCard from '@/components/PokemonCard.vue';
import BasePagination from '@/components/BasePagination.vue';

export default {
  name: 'PokemonList',
  data() {
    return {};
  },
  components: {
    PokemonCard,
    BasePagination,
  },
  created() {
    this.$store.dispatch('GET_POKEMONS', this.currentPage);
  },
  computed: {
    ...mapGetters(['POKEMONS']),
    ...mapGetters(['POKEMON_COUNT']),
    ...mapGetters(['OWNED_POKEMONS_COUNT']),
  },
  methods: {
    async changePageHandle(value) {
      await this.$store.dispatch('GET_POKEMONS', value);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
