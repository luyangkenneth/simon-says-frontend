import React from 'react'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css';

const Range = createSliderWithTooltip(Slider.Range)

const SliderYear = ({
  onChange,
  onAfterChange,
  yearRange
}) => (
  <div>
    <p className='lead'>
      From year <strong className='text-primary'>{yearRange[0]}</strong> to
      year <strong className='text-primary'>{yearRange[1]}</strong>
    </p>
    <Range
      onChange={onChange}
      onAfterChange={onAfterChange}
      defaultValue={yearRange}
      min={yearRange[0]}
      max={yearRange[1]}
    />
  </div>
)

export default SliderYear
