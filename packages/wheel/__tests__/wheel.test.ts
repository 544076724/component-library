import { mount } from '@vue/test-utils'
import Element from '../index'

describe('c-dhn-wheel', () => {
    test('wheel-text',() => {
        const wrapper = mount(Element)
        expect(wrapper.html()).toContain('div')
    })
})
