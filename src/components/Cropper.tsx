import React, { FC, useState } from "react";
import EasyCrop from 'react-easy-crop'
import styled from 'styled-components'

import Slider from './Slider'

interface Props {
  image: string;
  result?: string;
  aspect?: number;
}

const StyledSlider = styled.div`
  position: absolute;
  transform: rotate(270deg) translate(-190%, 100%);
  transform-origin: left;
  z-index: 1000;
`

const Cropper: FC<Props> = ({ image, aspect = 1 }) => {
  const [crop, setCrop] = useState<EasyCrop['props']['crop']>({x:0, y:0})
  const [zoom, setZoom] = useState<EasyCrop['props']['zoom']>(1)
  const [rotation, setRotation] = useState<EasyCrop['props']['rotation']>(0)
  return (
    <div style={{position: 'relative', width: '400px', height: '267px'}}>
      <EasyCrop
        image={image}
        crop={crop}
        onCropChange={c => setCrop(c)}
        zoom={zoom}
        onZoomChange={z => setZoom(z)}
        rotation={rotation}
        onRotationChange={r => setRotation(r)}
        aspect={aspect}
        showGrid={true}
        cropShape={'round'}
      />
      <StyledSlider>
        <Slider  min={0} max={360} value={rotation} onChange={e => setRotation(parseInt(e.currentTarget.value))}/>
      </StyledSlider>
    </div>
  );
}
export default Cropper
