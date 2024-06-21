import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, setFilter, undo, redo } from './action/Action';
import { Filters } from './reducers/filterReducer';

const App = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.present);
  const filter = useSelector(state => state.filter);
  const canUndo = useSelector(state => state.todos.past.length > 0);
  const canRedo = useSelector(state => state.todos.future.length > 0);

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === Filters.ACTIVE) return !todo.completed;
    if (filter === Filters.COMPLETED) return todo.completed;
    return true;
  });

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTodo}>Add to Todo List</button>
      <div>
        <button onClick={() => dispatch(setFilter(Filters.ALL))}>All</button>
        <button onClick={() => dispatch(setFilter(Filters.ACTIVE))}>Active</button>
        <button onClick={() => dispatch(setFilter(Filters.COMPLETED))}>Completed</button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => dispatch(undo())} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={() => dispatch(redo())} disabled={!canRedo}>
          Redo
        </button>
      </div>
    </div>
  );
};

export default App;