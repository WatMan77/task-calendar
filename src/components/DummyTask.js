import React, { useContext, useEffect } from 'react'
import { CalendarContext } from '../context/CalendarContext';

function DummyTask({task, style}) {
    console.log(style)
    
    return(
        <p style={style}>{task.name}</p>
    );
}

export default DummyTask;