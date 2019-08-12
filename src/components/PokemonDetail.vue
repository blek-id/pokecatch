<template>
  <div class="container" v-if="IS_LOADING === false">
    <section class="page-info">
      <h3>Pokemon Detail</h3>
    </section>
    <div class="card">
      <section class="card--general">
        <h3>{{POKEMON_DETAIL.name}}</h3>
        <img :src="POKEMON_DETAIL.imageUrl" alt="Pokemon Image" />
        <p>{{POKEMON_DETAIL.weight}} kg, {{POKEMON_DETAIL.height}} m</p>
        <section class="card--items card--types">
          <div class="card" v-for="(type) in POKEMON_DETAIL.types" :key="type">{{type}}</div>
        </section>
      </section>
      <section class="card--items">
        <h4 class="card--header">Abilities</h4>
        <div
          class="card card--ability"
          v-for="(ability) in POKEMON_DETAIL.abilities"
          :key="ability"
        >{{ability}}</div>
      </section>
      <section class="card--stat" v-for="(stat) in POKEMON_DETAIL.stats" :key="stat.name">
        <p>{{stat.name}}</p>
        <p>{{stat.baseStat}}</p>
      </section>
    </div>
    <div class="catch-pokemon">
      <a
        v-if="!isCatchAttempted"
        href
        class="button button_success"
        @click.prevent="catchPokemon"
      >Catch Pokemon</a>
      <h4 v-if="isPokemonCatched && isCatchAttempted" class="text__success">Catch Success!</h4>
      <h4 v-else-if="!isPokemonCatched && isCatchAttempted" class="text__danger">Catch Fail!</h4>
      <form method="post" v-if="isPokemonCatched" class="catch-pokemon--form">
        <input type="text" placeholder="Nickname" class="input" v-model="pokemonNickname" />
        <a href class="button button_success" @click.prevent="savePokemon">Save</a>
      </form>
    </div>
  </div>
  <BaseLoader v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import BaseLoader from '@/components/BaseLoader.vue';

export default {
  name: 'PokemonDetail',
  components: {
    BaseLoader,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      isPokemonCatched: false,
      isCatchAttempted: false,
      pokemonNickname: '',
    };
  },
  async created() {
    this.$store.commit('SET_IS_LOADING', true);
    await this.$store.dispatch('GET_POKEMON_DETAIL', this.$route.params.id);
    this.pokemonNickname = this.POKEMON_DETAIL.name;
    this.$store.commit('SET_IS_LOADING', false);
  },
  computed: {
    ...mapGetters(['POKEMON_DETAIL']),
    ...mapGetters(['IS_LOADING']),
  },
  methods: {
    catchPokemon() {
      this.isPokemonCatched = Math.random() >= 0.5;
      this.isCatchAttempted = true;
      if (this.isPokemonCatched) {
        console.log('Pokemon Catched! Choose nickname');
      } else {
        console.log('Pokemon Escaped! :(');
      }
    },
    savePokemon() {
      let payload = {
        id: 0,
        nickname: this.pokemonNickname,
        name: this.POKEMON_DETAIL.name,
        imageUrl: this.POKEMON_DETAIL.imageUrl,
      };
      this.$store.commit('SAVE_POKEMON', payload);
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
