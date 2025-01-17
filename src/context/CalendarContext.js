import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import dummy_tasks from "../utils/dummy_tasks";

const SET_DATE = "SET_DATE";
const SET_TASK = "SET_TASK";
const SAVE_TASK = "SAVE_TASK";
const DELETE_TASK = "DELETE_TASK";
const DAILY_TASKS = "DAILY_TASKS";
const GET_DUMMY = "GET_DUMMY";
const OPEN_DUMMY = "OPEN_DUMMY";

const getDatabase = () => {
  let db = localStorage.getItem("$calendar_db");
  if (!db) {
    db = [];
    setDatabase(db);
  } else {
    db = JSON.parse(db);
    db.map(task => task.date = new Date(task.date));
  }
  return db;
}

const setDatabase = (db) => {
  localStorage.setItem("$calendar_db", JSON.stringify(db));
}

export const CalendarContext = createContext();

export const sameDay = (a, b) => {
  return a.getDate() === b.getDate()
    && a.getMonth() === b.getMonth()
    && a.getFullYear() === b.getFullYear();
}

function CalendarState(props) {

  const initialState = {
    date: new Date(),
    days: [],
    task: null,
    dummy_task: null,
    dummy_open: false,
  };

  // Dispatch 
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case GET_DUMMY:
        let index = Math.floor(Math.random() * dummy_tasks.length)
        let chosen_dummy = dummy_tasks[index];
        return {
          ...state,
          dummy_task: chosen_dummy,
        }
      case DAILY_TASKS:
        const today = state.date
        let dateCopy = state.date



        // Set task for tomorrow
        let tomorrow = new Date(dateCopy)
        tomorrow.setDate(dateCopy.getDate() + 1)

        //THIS WORKS I DONT KNOW WHY!!
        let dayBefore = new Date(dateCopy)
        dayBefore.setDate(dateCopy.getDate() - 1)

        //Database
        let database = getDatabase();

        console.log(database.map(x => x.time))

        let dummies = []
        let daily_tasks = database.filter((task) => sameDay(today, new Date(task.date)));
        database = database.filter((task) => !sameDay(new Date(task.date), today));

        daily_tasks.forEach(task => {
          if (!task.isDummy) {
            task.date = tomorrow;
          }
          
          if (sameDay(dayBefore, new Date(task.original_date))) {
            // Return task to original date
            // and remove the dummy tasks from that date
            task.date = dayBefore
            database = database.filter(x => !(x.isDummy && sameDay(dayBefore, x.date)))
          } else {
            if (!task.isDummy) {
              let index = Math.floor(Math.random() * dummy_tasks.length)
              let chosen_dummy = dummy_tasks[index];
              let dummy = {
                ...task,
                name: chosen_dummy.name,
                id: uuidv4(),
                isDummy: true,
                date: state.date,
                color: chosen_dummy.color
              }
              dummies.push(dummy)

            }
          }
        });

        if (daily_tasks.length) {
          database.push(...daily_tasks);
        }

        database = database.concat(dummies)
        setDatabase(database);

        //let new_days = state.days.map( day => sameDay(today, day.date) ? {date: today, tasks: []} : day);
        return {
          ...state,
        }
      case SET_DATE: // Set current date

        const date = action.payload;
        // Calendar Start Day
        const d1 = new Date(date.getFullYear(), date.getMonth(), 1);
        d1.setDate(d1.getDate() - (d1.getDay() === 0 ? 7 : d1.getDay()));
        // Calendart End Day
        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if (d2.getDay() !== 0) d2.setDate(d2.getDate() + (7 - d2.getDay()));

        const db = getDatabase();

        const days = [];
        do { // Obtain tasks
          d1.setDate(d1.getDate() + 1); // iterate            
          days.push({
            date: new Date(d1.getTime()),
            tasks: db.filter((task) => sameDay(d1, task.date))
          });
        } while (!sameDay(d1, d2));

        return { // Update state
          ...state,
          date: date,
          days: days
        }
      case SET_TASK:
        return {
          ...state,
          task: action.payload
        }
      case OPEN_DUMMY:
        return {
          ...state,
          dummy_open: action.payload
        }
      case SAVE_TASK: {
        let db = getDatabase();
        const task = action.payload;
        if (!task.id) { // new Task
          task.id = uuidv4();
          db.push(task);
          task.isDummy = false
        } else {
          db = db.map(t => {
            return t.id === task.id ? task : t;
          })
        }
        setDatabase(db);
        return {
          ...state
        }
      }
      case DELETE_TASK: {
        let db = getDatabase();
        db = db.filter((task) => {
          return task.id !== action.payload;
        });
        setDatabase(db);
        return {
          ...state,
        }
      }
      default:
        break;
    }
  }, initialState);

  // CRUD
  const openDummy = (value) => {
    dispatch({
      type: OPEN_DUMMY,
      payload: value
    })
  }
  const getDummy = () => {
    dispatch({
      type: GET_DUMMY
    });
  }
  const updateDaily = () => {
    dispatch({
      type: DAILY_TASKS
    });
  }

  const setDate = (date) => {
    dispatch({
      type: SET_DATE,
      payload: date
    });
  }

  const setTask = (task) => {
    dispatch({
      type: SET_TASK,
      payload: task
    });
  }

  const saveTask = (task) => {
    dispatch({
      type: SAVE_TASK,
      payload: task
    })
  }

  const deleteTask = (taskId) => {
    dispatch({
      type: DELETE_TASK,
      payload: taskId
    })
  }

  return (
    <CalendarContext.Provider
      value={{

        date: state.date,
        days: state.days,
        task: state.task,
        dummy_task: state.dummy_task,
        dummy_open: state.dummy_open,

        setDate,
        setTask,
        saveTask,
        deleteTask,
        updateDaily,
        getDummy,
        openDummy
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
}

export default CalendarState;