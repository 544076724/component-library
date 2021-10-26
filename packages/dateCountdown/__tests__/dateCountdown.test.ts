import { mount } from '@vue/test-utils'
import Element from '../src/dateCountdown.vue'

describe('c-dhn-dateCountdown', () => {
    test('dateCountdown-text',() => {
        const wrapper = mount(Element)
        expect(wrapper.html()).toContain('div')
    })
})
