import { shallowMount } from '@vue/test-utils';
import BasePagination from '@/components/BasePagination.vue';

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(BasePagination, {
    propsData: {
      totalCount: 200,
      dataPerPage: 5,
      interval: 5,
    },
    stubs: ['font-awesome-icon'],
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe('Pagination Component', () => {
  test('has 5 page numbers', () => {
    expect(wrapper.findAll('.pagination__page').length).toBe(5);
  });

  test('goes to next 3 pages and back to previous page', () => {

    wrapper.find('#nextPage').trigger('click');
    wrapper.find('#nextPage').trigger('click');
    wrapper.find('#nextPage').trigger('click');

    wrapper.find('#prevPage').trigger('click');
    expect(wrapper.vm.startPage).toBe(11);
  });

  test('goes to page 5 when number 5 is clicked', () => {
    const pages = wrapper.findAll('.pagination__page > a');
    const thirdPage = pages.at(4);
    thirdPage.trigger('click');

    expect(wrapper.emitted().gotoPage.length).toBe(1);
    expect(wrapper.vm.currentPage).toBe(5);
  });
});
