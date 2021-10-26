import { mount } from '@vue/test-utils'
import Element from '../src/text.vue'

describe('c-dhn-text', () => {
    test('text-text',() => {
        const wrapper = mount(Element)
        expect(wrapper.html()).toContain('div')
    })
})
