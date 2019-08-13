<template>
  <div class="container" v-if="IS_LOADING === false">
    <section class="page-info">
      <h3>Pokemon Detail</h3>
    </section>
    <div class="card card--pokemon-detail">
      <section class="card__section">
        <h3 class="card__header">{{POKEMON_DETAIL.name}}</h3>
        <img :src="POKEMON_DETAIL.imageUrl" alt="Pokemon Image" />
        <p>{{POKEMON_DETAIL.weight}} kilograms, {{POKEMON_DETAIL.height}} meters</p>
        <section class="card__items">
          <div class="card card--small" v-for="(type) in POKEMON_DETAIL.types" :key="type">
            <p>{{type}}</p>
          </div>
        </section>
      </section>
      <section class="card__section">
        <h4 class="card__header">Abilities</h4>
        <div class="card__items">
          <div
            class="card card--small"
            v-for="(ability) in POKEMON_DETAIL.abilities"
            :key="ability"
          >
            <p>{{ability}}</p>
          </div>
        </div>
      </section>
      <section class="card__section">
        <div class="card__stat" v-for="(stat) in POKEMON_DETAIL.stats" :key="stat.name">
          <p>{{stat.name}}</p>
          <p>{{stat.baseStat}}</p>
        </div>
      </section>
    </div>
    <div class="catch-pokemon">
      <a
        v-if="!isCatchAttempted"
        href
        class="button button__success"
        @click.prevent="catchPokemon"
      >Catch Pokemon</a>
      <h4
        v-if="isPokemonCatched && isCatchAttempted"
        class="catch-pokemon__text catch-pokemon__text--success"
      >Catch Success!</h4>
      <h4
        v-else-if="!isPokemonCatched && isCatchAttempted"
        class="catch-pokemon__text catch-pokemon__text--danger"
      >Catch Fail!</h4>
      <form method="post" v-if="isPokemonCatched" class="catch-pokemon__form">
        <input type="text" placeholder="Nickname" class="input" v-model="pokemonNickname" />
        <a href class="button button__success" @click.prevent="savePokemon">Save</a>
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
