import { useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext.jsx';
import { useAuthContext } from '../hooks/useAuthContext.jsx';

function TodoForm() {

    const { dispatch } = useTodoContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const [errMsg, setErrMsg] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setErrMsg('You must be logged in.')
            return;
        }

        const todo = { title, description, deadline };

        const response = await fetch(`http://localhost:5002/api/todo/addTodo`, {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const data = await response.json();

        if (!response.ok) {
            setErrMsg(data.error);
            setEmptyFields(data.emptyFields)
        }

        if (response.ok) {
            console.log('Todo added', todo)
            setErrMsg(null);
            setEmptyFields([])
            setTitle('')
            setDescription('');
            setDeadline('');
            dispatch({ type: 'CREATE_TODO', payload: data })
        }
    };

    return (
        <>
            <form className='add-todo-form' onSubmit={handleSubmit}>
                {errMsg && <div className="error">{errMsg}</div>}
                <h3>Add a New Task</h3>

                <label> Title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label>Description:</label>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className={emptyFields.includes('description') ? 'error' : ''}
                />

                <label>Deadline:</label>
                <input
                    type="datetime-local"
                    onChange={(e) => setDeadline(e.target.value)}
                    value={deadline}
                    className={emptyFields.includes('deadline') ? 'error' : ''}
                />

                <button>Add Task</button>
            </form>
        </>
    );
}

export default TodoForm;