import './App.css';
import data from './data.json'
import TimeTableBox from './TimeTableBox';

function App() {
  return (
    <div className="App">
      <div style={{overflow:"auto", textAlign: "center"}}>
        {data.map((days) => { return (<TimeTableBox data={days} />) })}
      </div>
    </div>
  );
}

export default App;
