<template>
  <section class="pagination">
    <div
      class="pagination__item pagination__arrow"
      :class="startPage === 1 ? 'pagination__arrow--disabled' : ''"
      v-if="totalCount > interval * dataPerPage"
    >
      <a id="prevPage" href="#" @click.prevent="prevPage(interval)">
        <font-awesome-icon icon="angle-double-left" />
      </a>
    </div>
    <div v-for="index in pageInterval" :key="index" class="pagination__item pagination__page">
      <a
        href="#"
        @click.prevent="gotoPage(startPage + index - 1)"
        :class="currentPage === (startPage + index - 1) ? 'pagination__page--active' : ''"
      >{{startPage + index - 1}}</a>
    </div>
    <div
      class="pagination__item pagination__arrow"
      :class="startPage === 45 ? 'pagination__arrow--disabled' : ''"
      v-if="totalCount > interval * dataPerPage"
    >
      <a id="nextPage" href="#" @click.prevent="nextPage(interval)">
        <font-awesome-icon icon="angle-double-right" />
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BasePagination',
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
    pageInterval: function() {
      if (this.maxPages < this.interval) {
        return this.maxPages;
      } else {
        return this.interval;
      }
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
      this.$emit('gotoPage', this.currentPage);

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
