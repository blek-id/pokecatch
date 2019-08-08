<template>
  <header class="header">
    <div class="header--logo">
      <img src="@/assets/images/logo.png" alt="Pokeball Logo" class="header--image" />
      <h2>Poke Catch</h2>
    </div>
    <nav class="navigation">
      <transition-group class="navigation--group" name="navigation-toggle" mode="out-in">
        <font-awesome-icon
          v-show="!isToggled"
          icon="bars"
          class="navigation--icon"
          size="2x"
          key="1"
          @click="toggleHamburger()"
        />
        <font-awesome-icon
          v-show="isToggled"
          icon="times"
          class="navigation--icon"
          size="2x"
          key="2"
          @click="toggleHamburger()"
        />
      </transition-group>
    </nav>
    <ul class="navigation--list" :class="this.isToggled ? 'navigation--list__show' : ''">
      <li class="navigation--item">
        <router-link to="/" class="navigation--link">Home</router-link>
      </li>
      <li class="navigation--item">
        <router-link to="/my-pokemon" class="navigation--link">My Pokemon</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    msg: String,
  },
  data: () => ({
    isToggled: false,
  }),
  methods: {
    toggleHamburger() {
      this.isToggled = !this.isToggled;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
