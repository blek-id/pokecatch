<template>
  <div class="container">
    <section class="page-info">
      <h3>My Pokemon</h3>
      <h3>Owned Pokemons: {{OWNED_POKEMONS_COUNT}}</h3>
    </section>
    <div class="list--item" v-for="pokemon in OWNED_POKEMONS" :key="pokemon.id">
      <OwnedPokemonCard :pokemon="pokemon" />
    </div>
    <section class="list"></section>
    <BasePagination
      v-if="OWNED_POKEMONS_COUNT > dataPerPage"
      :totalCount="OWNED_POKEMONS_COUNT"
      :dataPerPage="dataPerPage"
      :interval="interval"
      @gotoPage="changePageHandle"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OwnedPokemonCard from '@/components/OwnedPokemonCard.vue';
import BasePagination from '@/components/BasePagination.vue';

export default {
  name: 'PokemonOwned',
  data() {
    return {
      dataPerPage: 20,
      interval: 5,
    };
  },
  components: {
    OwnedPokemonCard,
    BasePagination,
  },
  computed: {
    ...mapGetters(['OWNED_POKEMONS']),
    ...mapGetters(['OWNED_POKEMONS_COUNT']),
  },
  methods: {
    changePageHandle(value) {
      let payload = {
        startIndex: (value - 1) * this.dataPerPage,
        endIndex: (value - 1) * this.dataPerPage + this.dataPerPage,
      };
      this.$store.commit('SET_OWNED_POKEMONS_OFFSET', payload);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
