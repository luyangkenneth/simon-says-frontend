import React from 'react'
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import SearchAuthors from './search-authors'
import SliderYear from '../rank/slider-year'

/**
 * Non-linear steppers allow users to enter a multi-step flow at any point.
 *
 * This example is similar to the regular horizontal stepper, except steps are no longer
 * automatically set to `disabled={true}` based on the `activeStep` prop.
 *
 * We've used the `<StepButton>` here to demonstrate clickable step labels.
 */
class Setup extends React.Component {

  state = {
    stepIndex: 0
  }

  handleNext = () => {
    const {stepIndex} = this.state
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1})
    } else {
      const { selectedAuthors, fetchData, completeSetup } = this.props

      selectedAuthors.forEach(author => {
        fetchData(author)
      })
      completeSetup()
    }
  }

  handlePrev = () => {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.authorTable()
      case 1:
        return this.yearSelection()
      case 2:
        return 'Click next and off I go to fetch you some trends!'
      default:
        return 'You\'re a long way from home sonny jim!'
    }
  }

  render() {
    const {stepIndex} = this.state
    const contentStyle = {margin: '0 16px'}

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper linear={false} activeStep={stepIndex}>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>
              Authors
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 1})}>
              Year range
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>
              Confirmation
            </StepButton>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {this.getStepContent(stepIndex)}
          <div style={{marginTop: 12}}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label="Next"
              disabled={this.props.selectedAuthors.length === 0}
              primary={true}
              onClick={this.handleNext}
            />
          </div>
        </div>
      </div>
    )
  }

  authorTable = () => {
    const { authors, setAuthors, selectedAuthors } = this.props
    return (
      <div>
        <p>Which authors would you like to see?</p>
        <SearchAuthors
          selectedAuthors={selectedAuthors}
          authors={authors}
          setAuthors={setAuthors}
        />
      </div>
    )
  }

  yearSelection = () => {
    const { years, setYearRange } = this.props
    return (
      <div>
        <p>What year range are you interested in?</p>
        <SliderYear
          yearRange={years}
          min={1990}
          max={2017}
          onChange={val => setYearRange(val[0], val[1])}
        />
      </div>
    )
  }
}

export default Setup
