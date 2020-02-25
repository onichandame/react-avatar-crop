import React, { FC, useState } from 'react'
import styled from 'styled-components'

import Cropper from './Cropper'

type Props = {
  image: string;
}

const HBox = styled.div`
  display: flex;
`

const StyledCropper = styled(Cropper)`
`

const Img = styled.img`
  margin-left: 2rem;
  width: auto;
  height: 267px;
  border-radius: 50%;
`

const Example: FC<Props> = ({ image }) => {
  let [croppedImage, setCroppedImage] = useState<string>()
  return (
    <HBox>
      <StyledCropper image={image} onChange={setCroppedImage}/>
      <Img src={croppedImage}/>
    </HBox>
  )
}
export default Example


