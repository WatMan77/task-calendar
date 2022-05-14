import React, { useContext, useEffect } from 'react'
import { CalendarContext } from '../context/CalendarContext';

function DummyTask() {
    
    const {dummy_task, getDummy} = useContext(CalendarContext)
    let name = "";

    return(
        <p>{dummy_task}</p>
    );
}

export default DummyTask;