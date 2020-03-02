import React, { isValidElement } from 'react'
import { mount } from 'enzyme'

import Subject from './Slider'

describe('slider', () => {
  const Slider = <Subject min={0} max={1} value={0} onChange={() => {}}/>

  test('can be imported', () => {
    expect(isValidElement(Slider)).toBeTruthy()
  })

  test('renders a range input', () => {
    const wrapper = mount(Slider)
    expect(wrapper.find('input[type="range"]')).toHaveLength(1)
  })
})
