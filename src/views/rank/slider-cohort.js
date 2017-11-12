import React from 'react'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css';

import HoverPaper from '../../components/hover-paper'

const TooltipSlider = createSliderWithTooltip(Slider)

const SliderCohort = ({
  resource,
  onChange,
  onAfterChange,
  cohortValue
}) => (
  <div>
    <HoverPaper className='p-4'>
      <p className='lead'>
        Top <strong className='text-primary'>{cohortValue}</strong> {resource}
      </p>
      <TooltipSlider
        min={5}
        max={30}
        defaultValue={cohortValue}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
    </HoverPaper>
  </div>
)

export default SliderCohort
