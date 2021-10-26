import { mount } from '@vue/test-utils'
import Element from '../src/col.vue'

describe('c-dhn-col', () => {
    test('col-text',() => {
        const wrapper = mount(Element)
        expect(wrapper.html()).toContain('div')
    })
})
