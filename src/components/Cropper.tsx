import React, { FC, useState, useCallback } from "react";
import EasyCrop from 'react-easy-crop'
import { Area } from 'react-easy-crop/types'
import styled from 'styled-components'

import Slider from './Slider'

interface Props {
  image: string;
  aspect?: number;
  onChange(arg: string): any;
}

const StyledSlider = styled.div`
  position: absolute;
  transform: rotate(270deg) translate(-190%, 100%);
  transform-origin: left;
  z-index: 1000;
`

const Cropper: FC<Props> = ({ image, aspect = 1, onChange }) => {
  const [crop, setCrop] = useState<EasyCrop['props']['crop']>({x:0, y:0})
  const [zoom, setZoom] = useState<EasyCrop['props']['zoom']>(1)
  const [rotation, setRotation] = useState<EasyCrop['props']['rotation']>(0)

  const handleCrop = useCallback(async ({} = {}, croppedAreaPixels: Area) => {
    onChange(await getCroppedImage(image, croppedAreaPixels, rotation))
  }, [image, rotation, crop, zoom])

  const getCroppedImage = async (src: string, area: Area, rot: typeof rotation) => {
    let img = await createImage(src)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const canvasSide = Math.sqrt(img.width**2 + img.height**2)
    canvas.width = canvasSide
    canvas.height = canvasSide

    let result = ''
    return result
  }

  const createImage = (url: string): Promise<HTMLImageElement> => new Promise((r, j) => {
    const img = new Image()
    img.addEventListener('load', () => r(img))
    img.addEventListener('error', e => j(e))
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = url
  })

  return (
    <div style={{position: 'relative', width: '400px', height: '267px'}}>
      <EasyCrop
        image={image}
        crop={crop}
        onCropChange={c => setCrop(c)}
        onCropComplete={handleCrop}
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
