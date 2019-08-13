<template>
  <section class="card card__pokemon-list">
    <p>{{pokemon.name}}</p>
    <router-link :to="{ name: 'detail', params: {id: pokemon.id}}" class="button">Detail</router-link>
  </section>
</template>

<script>
import store from '../store/index';

export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      id: '1',
      name: '',
      url: '',
      imageUrl: '',
    },
  },
};
</script>

<style scoped lang="scss">
</style>
