<template>
  <div class="container" v-if="IS_LOADING === false">
    <section class="page-info">
      <h2>Pokemon Detail</h2>
    </section>
    <div class="card card--pokemon-detail">
      <section class="card__section">
        <h3 class="card__header">{{POKEMON_DETAIL.name}}</h3>
        <div v-if="POKEMON_DETAIL.imageUrl !== null">
          <img
            :src="POKEMON_DETAIL.imageUrl"
            v-show="isImageLoaded"
            v-load-if-complete="POKEMON_DETAIL.imageUrl"
            @load="isImageLoaded = true"
            alt="Pokemon Image"
            class="image__pokemon"
          />
          <div class="image__empty" v-show="!isImageLoaded">
            <font-awesome-icon icon="spinner" spin size="3x" />
          </div>
        </div>
        <div class="image__empty" v-else>
          <font-awesome-icon icon="times" size="3x" />
        </div>
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
        id="catchPokemon"
        v-if="!isCatchAttempted"
        href
        class="button button--success"
        @click.prevent="catchPokemon"
      >Catch Pokemon</a>
      <div v-if="isPokemonCatched && isCatchAttempted">
        <h4 class="catch-pokemon__text catch-pokemon__text--success">Catch Success!</h4>
        <form method="post" class="catch-pokemon__form">
          <input
            id="pokemonNickname"
            type="text"
            placeholder="Nickname"
            class="input"
            v-model="pokemonNickname"
          />
          <a id="catchResponse" class="button button--success" @click.prevent="savePokemon">Save</a>
        </form>
      </div>
      <div v-else-if="!isPokemonCatched && isCatchAttempted">
        <h4 class="catch-pokemon__text catch-pokemon__text--danger">Catch Fail!</h4>
        <a id="catchResponse" class="button button--danger" @click.prevent="retryCatch">Retry</a>
      </div>
    </div>
  </div>
  <BaseLoader v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import BaseLoader from '@/components/BaseLoader.vue';
import LoadIfComplete from '@/directives/LoadIfCompleteDirective';

export default {
  name: 'PokemonDetail',
  components: {
    BaseLoader,
  },
  directives: {
    LoadIfComplete,
  },
  data() {
    return {
      isPokemonCatched: false,
      isCatchAttempted: false,
      pokemonNickname: '',
      isImageLoaded: false,
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
    },
    savePokemon() {
      const payload = {
        id: 0,
        nickname: this.pokemonNickname,
        name: this.POKEMON_DETAIL.name,
        imageUrl: this.POKEMON_DETAIL.imageUrl,
      };
      this.$store.commit('SAVE_POKEMON', payload);
      this.$router.push({ name: 'home' });
    },
    retryCatch() {
      this.isCatchAttempted = false;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
