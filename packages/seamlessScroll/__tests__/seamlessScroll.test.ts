import { mount } from '@vue/test-utils'
import Element from '../src/seamlessScroll.vue'

describe('c-dhn-seamlessScroll', () => {
    test('seamlessScroll-text',() => {
        const wrapper = mount(Element)
        expect(wrapper.html()).toContain('div')
    })
})
