<template>
  <section class="pagination">
    <div class="pagination--item pagination--item-arrow">
      <a href="#" @click.prevent="prevPage(5)">
        <font-awesome-icon icon="angle-double-left" />
      </a>
    </div>
    <div v-for="index in interval" :key="index" class="pagination--item pagination--item-page">
      <a
        href="#"
        @click.prevent="gotoPage(startPage + index - 1)"
        :class="currentPage === (startPage + index - 1) ? 'pagination--item-page__active' : ''"
      >{{startPage + index - 1}}</a>
    </div>
    <div class="pagination--item pagination--item-arrow">
      <a href="#" @click.prevent="nextPage(5)">
        <font-awesome-icon icon="angle-double-right" />
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PaginationItem',
  data() {
    return {
      currentPage: 1,
      startPage: 1,
    };
  },
  computed: {
    maxPages: function() {
      return Math.ceil(this.totalCount / this.dataPerPage);
    },
  },
  props: {
    totalCount: {
      type: Number,
      required: true,
    },
    dataPerPage: {
      type: Number,
      required: true,
    },
    interval: {
      type: Number,
      required: true,
      default: 5,
    },
  },
  methods: {
    gotoPage(clickedPage) {
      let lastPage = this.currentPage;
      this.currentPage = clickedPage;
      this.$store.dispatch('GET_POKEMONS', this.currentPage);

      if (this.currentPage > this.maxPages - Math.floor(this.interval / 2)) {
        if (
          this.startPage >= this.maxPages - this.interval ||
          this.lastPage > clickedPage
        ) {
          this.startPage = this.maxPages - this.interval + 1;
        }
        this.startPage = this.startPage;
      } else {
        this.startPage = this.currentPage - Math.floor(this.interval / 2);
      }

      if (this.startPage < 1) {
        this.startPage = 1;
      }
    },
    nextPage(pageAmount) {
      this.startPage += pageAmount;

      if (this.startPage >= this.maxPages - this.interval) {
        this.startPage = this.maxPages - this.interval + 1;
      }
    },
    prevPage(pageAmount) {
      this.startPage -= pageAmount;

      if (this.startPage <= pageAmount) {
        this.startPage = 1;
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
