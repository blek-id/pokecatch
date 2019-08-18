export default {
  loadifcomplete(el, binding) {
    if (el.value === '') {
      // eslint-disable-next-line no-param-reassign
      binding.value.loaded = true;
    }
    if (el.complete) {
      // eslint-disable-next-line no-param-reassign
      binding.value.loaded = true;
    }
  },
};
