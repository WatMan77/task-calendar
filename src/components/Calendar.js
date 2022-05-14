import React, { useContext, useEffect } from "react";
import { CalendarContext } from "../context/CalendarContext";
import Day from "./Day";

function Calendar() {

  const { date, days, setDate, updateDaily, getDummy } = useContext(CalendarContext);

  const decreaseDate = () => {
    const dateCopy = date
    let previous = new Date(date)
    previous.setDate(dateCopy.getDate() - 1)

    setDate(previous)

    return previous
  }

  const increaseDate = () => {
    const dateCopy = date
    let previous = new Date(date)
    previous.setDate(dateCopy.getDate() + 1)

    setDate(previous)

    return previous
  }

  useEffect(() => {
    setDate(date);
    //updateDaily();
    //setDate(new Date());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateDaily()
    getDummy()
  }, [date])

  if (days.length < 1) return null;

  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div>
      <div>
        <button className="button button-red" onClick={() => decreaseDate()}>
          Decrease
        </button>
      </div>
      <div>
        <button className="button button-green" onClick={() => increaseDate()}>
          Increase
        </button>
      </div>
      <div className="calendar borderless day-names">
        {names.map(name => <h5 key={name}>{name}</h5>)}
      </div>
      <div className="calendar">
        {days.map(day => <Day key={day.date} day={day} date={date} setDate={setDate} />)}
      </div>
    </div>
  );
}

export default Calendar;