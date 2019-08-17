<template>
  <section class="card card__owned-pokemon">
    <img :src="pokemon.imageUrl" alt="Pokemon Image" class="image__pokemon" />
    <div class="card__owned-pokemon-text">
      <p>{{pokemon.name}}</p>
      <p v-if="pokemon.nickname !== ''">{{pokemon.nickname}}</p>
    </div>
    <a class="card__owned-pokemon-button" @click.prevent="removePokemon">
      <font-awesome-icon icon="times" />
    </a>
  </section>
</template>

<script>
import store from '../store/index';

export default {
  name: 'OwnedPokemonCard',
  props: {
    pokemon: {
      id: '',
      name: '',
      nickname: '',
      imageUrl: '',
    },
  },
  methods: {
    removePokemon() {
      this.$emit('removePokemon', this.pokemon.id);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
