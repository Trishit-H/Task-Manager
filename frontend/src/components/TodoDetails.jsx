import { useTodoContext } from "../hooks/useTodoContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

// Components
import EditTodoModal from "./EditTodoModal";

import { parseISO, format } from "date-fns";
import DeleteTodoModal from "./DeleteTodoModal";

function TodoDetails({ todo, handleEditShow }) {

    const { dispatch } = useTodoContext();
    const { user } = useAuthContext();

    const [buttonText, setButtonText] = useState(
        todo.status ? "Mark as Incomplete" : "Mark as Complete"
    );

    const handleStatus = async () => {
        if (!user) {
            return
        }

        const dataToUpdate = { status: todo.status ? false : true };

        const response = await fetch(`http://localhost:5002/api/todo/update/${todo._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(dataToUpdate)
        });
        const data = await response.json();

        if (response.ok) {
            dispatch({ type: 'UPDATE_TODO', payload: data });
        }
    }

    const handleDelete = async () => {

        if (!user) {
            return;
        }

        const response = await fetch(`http://localhost:5002/api/todo/delete/${todo._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const data = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_TODO', payload: data })
            // setButtonText((prevButtonText) => data.status ? "Mark as Incomplete" : "Mark as Complete"); 
        }
    }

    // Parse and format the deadline
    const parsedDeadline = parseISO(todo.deadline);
    const formattedDeadline = format(parsedDeadline, 'dd/MM/yyyy, hh:mm a');

    const parsedCreatedAt = parseISO(todo.createdAt);
    const formattedCreatedAt = format(parsedCreatedAt, 'dd/MM/yyyy, hh:mm a');

    return (
        <div className="todo-details">
            <h3>{todo.title}</h3>
            <p className='description'>{todo.description}</p>
            <p className='status'>
                Status: <span style={{ color: todo.status ? "green" : "red" }}>{todo.status ? 'Complete' : 'Incomplete'}</span>
            </p>
            <p className='deadline'>
                Deadline: <span style={{ color: todo.status ? "green" : "red", textDecoration: todo.status ? "line-through" : "none" }}>
                    {formattedDeadline}
                </span>
            </p>
            <p className='added-on'>Added on: {formattedCreatedAt}</p>
            <button className="todo-btn mark-todo" onClick={handleStatus}>Mark as <span style={{ display: todo.status ? 'none' : 'inline' }}>Complete</span><span style={{ display: todo.status ? 'inline' : 'none' }}>Incomplete</span></button>
            {/* <button className="todo-btn edit-todo">Edit</button> */}
            <EditTodoModal todo={todo} />
            {/* <button className="todo-btn delete-todo" onClick={handleDelete}>Delete</button> */}
            <DeleteTodoModal todo={todo}></DeleteTodoModal>
        </div>
    )
}

export default TodoDetails;