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
    <!-- <PaginationItem :totalCount="POKEMON_COUNT" :dataPerPage="20" :interval="5" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OwnedPokemonCard from '@/components/OwnedPokemonCard.vue';
import PaginationItem from '@/components/PaginationItem.vue';

export default {
  name: 'PokemonOwned',
  data() {
    return {};
  },
  components: {
    OwnedPokemonCard,
    PaginationItem,
  },
  computed: {
    ...mapGetters(['OWNED_POKEMONS']),
    ...mapGetters(['OWNED_POKEMONS_COUNT']),
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>
