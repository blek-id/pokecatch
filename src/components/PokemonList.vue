<template>
  <div class="container">
    <section class="status">
      <h3>Owned Pokemons: x</h3>
    </section>
    <section v-for="pokemon in POKEMONS" :key="pokemon.id">
      <PokemonCard :pokemon="pokemon" />
    </section>
    <PaginationItem :totalCount="POKEMON_COUNT" :dataPerPage="20" :interval="5" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PokemonCard from '@/components/PokemonCard.vue';
import PaginationItem from '@/components/PaginationItem.vue';

export default {
  name: 'PokemonList',
  data() {
    return {};
  },
  components: {
    PokemonCard,
    PaginationItem,
  },
  created() {
    this.$store.dispatch('GET_POKEMONS', this.currentPage);
  },
  computed: {
    ...mapGetters(['POKEMONS']),
    ...mapGetters(['POKEMON_COUNT']),
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>
