import Vue from 'vue'
import ListItem from '@/components/ListItem'

describe('ListItem.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ListItem)
    const propsData = {
      item: {
        title: 'Item 1'
      },
      icons: ['fa-plus-square-o', 'fa-minus-square-o']
    }
    const vm = new Constructor({ propsData }).$mount()

    expect(vm.$el.textContent).to.equal('Item 1')
  })
})
