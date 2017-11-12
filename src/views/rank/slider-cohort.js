import React from 'react'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css';

const TooltipSlider = createSliderWithTooltip(Slider)

const SliderCohort = ({
  resource,
  onChange,
  onAfterChange,
  cohortValue
}) => (
  <div>
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
  </div>
)

export default SliderCohort
