// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {isTimerStarted: false, seconds: 0, minutes: 25}

  startOrPauseTimer = async () => {
    await this.setState(preVState => ({
      isTimerStarted: !preVState.isTimerStarted,
    }))
    this.startTimer()
  }

  startTimer = () => {
    const {isTimerStarted} = this.state
    if (isTimerStarted === true) {
      this.uniqueId = setInterval(() => {
        this.setState(preVState => ({seconds: preVState.seconds + 1}))
      }, 1000)
    } else {
      clearInterval(this.uniqueId)
    }
  }

  onReset = () => {
    this.setState({isTimerStarted: false, seconds: 0})
    clearInterval(this.uniqueId)
  }

  onClickPlus = () => {
    this.setState(preVState => ({minutes: preVState.minutes + 1}))
  }

  onClickMinus = () => {
    const {minutes} = this.state
    if (minutes > 25) {
      this.setState(preVState => ({minutes: preVState.minutes - 1}))
    }
  }

  onRenderSeconds = () => {
    const {seconds} = this.state
    const second = Math.floor(seconds % 60)
    if (second < 9) {
      return `0${second}`
    }
    return second
  }

  onRenderMinutes = () => {
    const {seconds, minutes} = this.state
    const minute = Math.floor(seconds / 60)
    if (minute > 0) {
      const elapsedTime = minutes - minute
      return elapsedTime
    }
    return minutes
  }

  render() {
    const {isTimerStarted, seconds, minutes} = this.state
    const isButtonDisabled = seconds > 0
    const time = `${this.onRenderMinutes()}:${this.onRenderSeconds()}`

    const imageUrl = isTimerStarted ? (
      <div className="timer-specifications">
        <button
          type="button"
          className="button"
          id="play-button"
          onClick={this.startOrPauseTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
            alt="pause icon"
            className="play-icon"
          />
        </button>
        <label htmlFor="play-button" className="time-status">
          Pause
        </label>
      </div>
    ) : (
      <div className="timer-specifications">
        <button
          type="button"
          className="button"
          id="play-button"
          onClick={this.startOrPauseTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
            alt="play icon"
            className="play-icon"
          />
        </button>
        <label htmlFor="play-button" className="time-status">
          Start
        </label>
      </div>
    )

    const status = isTimerStarted ? 'Running' : 'Paused'

    return (
      <div className="bg-container">
        <h1 className="digital-timer-heading">Digital Timer</h1>
        <div className="bottom-section-container">
          <div className="timer-container">
            <div className="card-container">
              <h1 className="time-heading">{time}</h1>
              <p className="time-status">{status}</p>
            </div>
          </div>
          <div className="main-container">
            <div className="flex-row">
              {imageUrl}
              <div className="timer-specifications">
                <button
                  type="button"
                  className="button"
                  id="reset-button"
                  onClick={this.onReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="play-icon"
                  />
                </button>
                <label htmlFor="reset-button" className="time-status">
                  Reset
                </label>
              </div>
            </div>
            <p className="set-timer-heading">Set Timer Limit</p>
            <div className="timer-limit-container">
              <button
                type="button"
                className="plus-minus-buttons"
                onClick={this.onClickMinus}
                disabled={isButtonDisabled}
              >
                <p>-</p>
              </button>
              <p className=" timer-limit">{minutes}</p>
              <button
                type="button"
                className="plus-minus-buttons"
                onClick={this.onClickPlus}
                disabled={isButtonDisabled}
              >
                <p>+</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
