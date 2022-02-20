import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startBtnColor, setStartButtonColor] = useState('#51c26f');

  // toggles if the timer is running
  function toggleActive() {
    setIsActive(!isActive);
  }

  // resets the entire app
  function resetTimer() {
    setSeconds(0);
    setIsActive(false);
  }

  // what updates the timer every second
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // updates the color of the Start/Pause button depending on if the timer is active
  useEffect(() => {
    if (isActive){
      setStartButtonColor('#edce45');
    } else {
      setStartButtonColor('#51c26f');
    }
  }, [isActive]);

  // formatting to make the timer as 00:00:00:00
  // let centiseconds = ("0" + (Math.floor(seconds / 10) % 100)).slice(-2);
  // let secs = ("0" + (Math.floor(seconds / 1000) % 60)).slice(-2);
  // let minutes = ("0" + (Math.floor(seconds / 60000) % 60)).slice(-2);
  // let hours = ("0" + Math.floor(seconds / 3600000)).slice(-2);

  return(
    <div className='app'>
      <div className='timer'>
        {seconds}s
        {/*{hours}:{minutes}:{secs}:{centiseconds}*/}
      </div>
      <div className='row'>
        <button
          className='startPauseButton'
          onClick={toggleActive}
          style={{backgroundColor: `${startBtnColor}`}}
        >
          { isActive ? 'Pause' : 'Start'}
        </button>
        <button
          className='resetButton'
          onClick={resetTimer}
          style={{backgroundColor: '#5280d1'}}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
