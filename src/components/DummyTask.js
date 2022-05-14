import React, { useContext} from 'react'
import { CalendarContext } from '../context/CalendarContext';

function DummyTask({task, style}) {
    const {openDummy} = useContext(CalendarContext);
    
    return(
        <p style={style} onClick={()=> {openDummy(true)} }>{task.name}</p>
    );
}

export default DummyTask;