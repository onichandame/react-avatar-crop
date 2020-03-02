import React, { isValidElement } from 'react'
import { mount, shallow } from 'enzyme'

import Subject from './Cropper'
import Slider from './Slider'

const pixelImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

describe('cropper', () => {
  test('can be imported', () => {
    expect(isValidElement(<Subject image={''} onChange={() => {}}/>)).toBeTruthy()
  })

  test('can render image', () => {
    const wrapper = mount(<Subject image={pixelImage} onChange={() => {}} />)
    expect(wrapper.find('img').get(0).props.src).toBe(pixelImage)
  })

  test('can render rotation slider', () => {
    const wrapper = shallow(<Subject image={pixelImage} onChange={() => {}} />)
    expect(wrapper.find(Slider)).toHaveLength(1)
  })
})
