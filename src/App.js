import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {SavingsItems} from './SavingsItem';
import {GoalsForm} from './GoalsForm';

function App() {

  const [savings, setSavings] = useState([]);
  const [localGoals, setLocalGoals] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const getSavings = async () => {
      const response = await axios.get('http://www.mocky.io/v2/5eb421880e00005000081991');
      setSavings(response.data);
    }
    getSavings();
  }, [setSavings])
  
  const renderOffsetButtons = () => {
    return (
      <div>
        <button onClick={() => setOffset(prev => prev + 1)}>
          Rotate Up
        </button>
        <button onClick={() => setOffset(prev => prev - 1)}>
          Rotate Down
        </button>
      </div>
    )
  }

  const getGoalsWithOffset = () => {
    const combinedGoals = [...(savings.goals || []), ...localGoals];
    const firstHalf = combinedGoals.slice(0, offset % combinedGoals.length);
    const secondHalf = combinedGoals.slice(offset % combinedGoals.length);
    return [...secondHalf, ...firstHalf];
  }

  return (
    <div className="App">
      {renderOffsetButtons()}
      <GoalsForm setLocalGoals={setLocalGoals}/>
      {
        getGoalsWithOffset().map(goal => <SavingsItems key={goal.id} goal={goal}/>)
      }
    </div>
  );
}

export default App;
