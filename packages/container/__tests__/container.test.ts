import { mount } from '@vue/test-utils'
import Element from '../src/container.vue'

describe('c-dhn-container', () => {
    test('container-text',() => {
        const wrapper = mount(Element)
        expect(wrapper.html()).toContain('section')
    })
})
