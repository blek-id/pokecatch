<template>
  <div class="container">
    <section class="page-info">
      <h2>My Pokemon</h2>
      <h3>Owned Pokemons: {{OWNED_POKEMONS_COUNT}}</h3>
    </section>
    <section class="list">
      <div class="list__item" v-for="pokemon in OWNED_POKEMONS" :key="pokemon.id">
        <OwnedPokemonCard :pokemon="pokemon" @removePokemon="removePokemon" />
      </div>
    </section>
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
      currentPage: 1,
    };
  },
  components: {
    OwnedPokemonCard,
    BasePagination,
  },
  created() {
    this.changePageHandle(1);
  },
  computed: {
    ...mapGetters(['OWNED_POKEMONS']),
    ...mapGetters(['OWNED_POKEMONS_COUNT']),
  },
  methods: {
    changePageHandle(value) {
      this.currentPage = value;
      let payload = {
        startIndex: (value - 1) * this.dataPerPage,
        endIndex: (value - 1) * this.dataPerPage + this.dataPerPage,
      };
      this.$store.commit('SET_OWNED_POKEMONS_OFFSET', payload);
    },
    removePokemon(value) {
      this.$store.commit('DELETE_POKEMON', value);
      if (this.OWNED_POKEMONS.length === 0) {
        this.changePageHandle(this.currentPage - 1);
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
