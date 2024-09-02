import { useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext.jsx';
import { useAuthContext } from '../hooks/useAuthContext.jsx';

function EditTodoModal({ todo }) {


    const { dispatch } = useTodoContext();
    const { user } = useAuthContext();

    const [updatedTitle, setUpdatedTitle] = useState(todo.title);
    const [updatedDescription, setUpdatedDescription] = useState(todo.description);
    const [updatedDeadline, setUpdatedDeadline] = useState(todo.deadline);

    const [errMsg, setErrMsg] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setErrMsg('You must be logged in.')
            return;
        }

        const updatedTodo = { title: updatedTitle, description: updatedDescription, deadline: updatedDeadline };

        const response = await fetch(`http://localhost:5002/api/todo/update/${todo._id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTodo),
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
            setErrMsg(null);
            setEmptyFields([])
            setUpdatedTitle('')
            setUpdatedDescription('')
            setUpdatedDeadline('');
            dispatch({ type: 'UPDATE_TODO', payload: data })
        }
    };


    return (
        <>
            {/* Button to trigger modal open */}
            <button type="button" className="todo-btn edit-todo" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-3" id="staticBackdropLabel">Update your task</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='add-todo-form'>
                                {errMsg && <div className="error">{errMsg}</div>}
                                {/* <h3>Update your task</h3> */}

                                <label> Title:</label>
                                <input
                                    type="text"
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                    value={updatedTitle}
                                    className={emptyFields.includes('title') ? 'error' : ''}
                                />

                                <label>Description:</label>
                                <textarea
                                    onChange={(e) => setUpdatedDescription(e.target.value)}
                                    value={updatedDescription}
                                    className={emptyFields.includes('description') ? 'error' : ''}
                                />

                                <label>Deadline:</label>
                                <input
                                    type="datetime-local"
                                    onChange={(e) => setUpdatedDeadline(e.target.value)}
                                    value={updatedDeadline}
                                    className={emptyFields.includes('deadline') ? 'error' : ''}
                                />

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditTodoModal;