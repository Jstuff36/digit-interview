import { useState } from 'react';

let id = 0;

export const GoalsForm = ({ setLocalGoals }) => {

    const [newGoal, setNewGoal] = useState('');

    const handleClick = () => {
        setLocalGoals(prevGoals => [{id: id++, icon: Math.random(), name: newGoal}, ...prevGoals])
        setNewGoal('');
    }

    const onGoalChange = (event) => setNewGoal(event.target.value);

    return (
        <div>
            <button onClick={handleClick}>
                Add Goal
            </button>
            <input type={'text'} value={newGoal} onChange={onGoalChange}/>
        </div>
    )
};
