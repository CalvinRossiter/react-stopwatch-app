import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [lap, setLap] = useState(0);
  const [lapTime, setLapTime] = useState("");
  const [laps, setLaps] = useState([]);
  const [startBtnColor, setStartButtonColor] = useState('#51c26f');

  // toggles if the timer is running
  function toggleActive() {
    setIsActive(!isActive);
  }

  // resets the entire app
  function resetTimer() {
    setTime(0);
    setIsActive(false);
    setLap(0);
    setLaps([]);
    setLapTime("");
  }

  // sets the lap number and time of the lap
  function lapInfo() {
    if (isActive) {
      setLapTime(hours.toString().padStart(2, "0") + ':' +
                 minutes.toString().padStart(2, "0") + ':' +
                 seconds.toString().padStart(2, "0") + ':' +
                 milliseconds.toString().padStart(2, "0")
      );
      setLap(lap + 1);
    }
  }

  // what posts the laps each time the lap button is pressed
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isActive && lap >= 1) {
      setLaps((laps) => [
        ...laps,
        {
          lap: lap,
          lapTime: lapTime,
        }
      ])
    }
  },[lap, lapTime])
  /* eslint-enable react-hooks/exhaustive-deps */

  // what updates the timer every second
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() =>
        setTime(time + 1), 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  // updates the color of the Start/Pause button depending on if the timer is active
  useEffect(() => {
    if (isActive){
      setStartButtonColor('#edce45');
    } else {
      setStartButtonColor('#51c26f');
    }
  }, [isActive]);

  // formatting to make the timer as 00:00:00:00
  let hours = Math.floor(time / 360000);
  let minutes = Math.floor((time % 360000) / 6000);
  let seconds = Math.floor((time % 6000) / 100);
  let milliseconds = time % 100;

  return(
    <div className='app'>
      <div className='timer'>
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
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
          className='lapButton'
          onClick={lapInfo}
        >
          Lap
        </button>
        <button
          className='resetButton'
          onClick={resetTimer}
          style={{backgroundColor: '#5280d1'}}
        >
          Reset
        </button>
      </div>
      <div>
        <h3 className='lapHeader'>Lap Times</h3>
        <ul>
          {
            laps.map(l => 
              <li key={l.lap}>
                {`Lap ${l.lap}: ${l.lapTime}`}
              </li>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default Timer;
