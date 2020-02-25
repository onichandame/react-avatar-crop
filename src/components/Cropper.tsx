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

const StyledBox = styled.div`
  position: relative;
  width: 400px;
  height: 267px;
`

const Cropper: FC<Props> = ({ image, aspect = 1, onChange }) => {
  const [crop, setCrop] = useState<EasyCrop['props']['crop']>({x:0, y:0})
  const [zoom, setZoom] = useState<EasyCrop['props']['zoom']>(1)
  const [rotation, setRotation] = useState<EasyCrop['props']['rotation']>(0)

  const handleCrop = useCallback(async ({} = {}, croppedAreaPixels: Area) => {
    onChange(await getCroppedImage(croppedAreaPixels))
  }, [image, rotation, crop, zoom])

  const getCroppedImage = async (area: Area): Promise<string> => {
    let img = await createImage(image)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const canvasSide = Math.sqrt(img.width**2 + img.height**2)
    canvas.width = canvasSide
    canvas.height = canvasSide

    ctx!.translate(canvasSide/2, canvasSide/2)
    ctx!.rotate(degToRad(rotation))
    ctx!.translate(-canvasSide/2, -canvasSide/2)

    ctx!.drawImage(img, canvasSide/2 - img.width/2, canvasSide/2 - img.height/2)
    const data = ctx!.getImageData(0, 0, canvasSide, canvasSide)
    canvas.width = area.width
    canvas.height = area.height
    ctx!.putImageData(data,
                      0 - canvasSide/2 + img.width/2 - area.x,
                      0 - canvasSide/2 + img.height/2 - area.y
                     )
  return new Promise(r => canvas.toBlob(f => r(URL.createObjectURL(f)), 'image/jpeg'))
  }

  const createImage = (url: string): Promise<HTMLImageElement> => new Promise((r, j) => {
    const img = new Image()
    img.addEventListener('load', () => r(img))
    img.addEventListener('error', e => j(e))
    img.setAttribute('crossOrigin', 'anonymous')
    img.src = url
  })

  const degToRad = (deg: number): number => deg / 180 * Math.PI

  return (
    <StyledBox>
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
        restrictPosition={true}
      />
      <StyledSlider>
        <Slider  min={0} max={360} value={rotation} onChange={e => setRotation(parseInt(e.currentTarget.value))}/>
      </StyledSlider>
    </StyledBox>
  );
}
export default Cropper
