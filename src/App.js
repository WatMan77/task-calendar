
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import CalendarState from "./context/CalendarContext";
import TaskForm from "./components/TaskForm";
import DummyForm from "./components/DummyForm";

function App() {
  
  return (
    <div className="container">
      <CalendarState>
        <Header />
        <Calendar />
        <TaskForm/>
        <DummyForm />
      </CalendarState>
      <a href="https://github.com/sergiss/task-calendar" target="_blank"><i className="fa">&#xf09b;</i> Source Code </a>
    </div>
  );
}

export default App;
