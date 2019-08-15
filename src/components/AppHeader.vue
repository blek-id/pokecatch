<template>
  <header class="header">
    <router-link to="/" class="header__logo">
      <img src="@/assets/images/logo.png" alt="Pokeball Logo" class="header__image" />
      <h1>Poke Catch</h1>
    </router-link>
    <transition-group class="navigation__icon" name="navigation-toggle" mode="out-in">
      <font-awesome-icon
        v-show="!isToggled"
        icon="bars"
        size="2x"
        key="1"
        @click="toggleHamburger()"
      />
      <font-awesome-icon
        v-show="isToggled"
        icon="times"
        size="2x"
        key="2"
        @click="toggleHamburger()"
      />
    </transition-group>
    <nav class="navigation" :class="this.isToggled ? 'navigation--show' : ''">
      <ul class="navigation__list">
        <li class="navigation__item">
          <router-link to="/" class="navigation__link">Home</router-link>
        </li>
        <li class="navigation__item">
          <router-link to="/my-pokemon" class="navigation__link">My Pokemon</router-link>
        </li>
      </ul>
    </nav>
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
