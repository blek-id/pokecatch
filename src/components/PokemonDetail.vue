<template>
  <div class="container">
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
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PokemonDetail',
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
    await this.$store.dispatch('GET_POKEMON_DETAIL', this.$route.params.id);
    this.pokemonNickname = this.POKEMON_DETAIL.name;
  },
  computed: {
    ...mapGetters(['POKEMON_DETAIL']),
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
        id: this.$route.params.id,
        name: this.pokemonNickname,
        image: this.POKEMON_DETAIL.imageUrl,
      };
      this.$store.commit('SAVE_POKEMON', payload);
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
