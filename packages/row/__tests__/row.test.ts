import { mount } from '@vue/test-utils'
import Element from '../src/row.vue'

describe('c-dhn-row', () => {
    test('row-text',() => {
        const wrapper = mount(Element)
        expect(wrapper.html()).toContain('div')
    })
})
