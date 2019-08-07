<template>
  <div>
    <AppHeader />
    <PokemonDetail />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import PokemonDetail from '@/components/PokemonDetail.vue';

export default {
  name: 'detail',
  components: {
    AppHeader,
    PokemonDetail,
  },
};
</script>
