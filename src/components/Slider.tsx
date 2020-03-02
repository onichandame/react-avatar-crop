import React, { FC, ComponentProps, useRef, useEffect } from "react";
import styled from 'styled-components'

type Props = {
  min: number;
  max: number;
  value: number;
  onChange: ComponentProps<'input'>['onChange'];
}

type RangedInput = {
  orient: 'vertical' | 'horizontal';
} & HTMLInputElement

const StyledSlider = styled.input`
  -webkit-appearance: none;
  height: 5px;
  width: auto;
  margin: 0;
  padding: 0;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  &:hover {
    opacity: 1;
	 }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }
`

const Slider: FC<Props> = ({min, max, value, onChange}) => {
  const slider = useRef<RangedInput>(null)
  useEffect(() => {
    slider.current && (slider.current.orient = 'vertical')
  })

  return (
    <StyledSlider
      ref={slider}
      type="range"
      {...{min, max, value, onChange}}
    />
  )
}
export default Slider
