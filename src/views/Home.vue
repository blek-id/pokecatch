<template>
  <div>
    <AppHeader />
    <PokemonList />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import PokemonList from '@/components/PokemonList.vue';

export default {
  name: 'home',
  components: {
    AppHeader,
    PokemonList,
  },
};
</script>
