import React from 'react'
import Slider, { createSliderWithTooltip } from 'rc-slider'

const TooltipSlider = createSliderWithTooltip(Slider)

const SliderCohort = ({
  onChange,
  onAfterChange,
  cohortValue
}) => (
  <div>
    <p className='lead'>
      Top <strong className='text-primary'>{cohortValue}</strong> authors
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
