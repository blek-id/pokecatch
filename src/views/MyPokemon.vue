<template>
  <div>
    <AppHeader />
    <PokemonOwned />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import PokemonOwned from '@/components/PokemonOwned.vue';

export default {
  name: 'my-pokemon',
  components: {
    AppHeader,
    PokemonOwned,
  },
};
</script>
