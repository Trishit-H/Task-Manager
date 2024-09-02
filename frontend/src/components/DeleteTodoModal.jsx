import { useTodoContext } from "../hooks/useTodoContext";
import { useAuthContext } from "../hooks/useAuthContext";

function DeleteTodoModal({ todo }) {

    const { user } = useAuthContext();
    const { dispatch } = useTodoContext();

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
        }
    }

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button
                className="todo-btn delete-todo"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop2" >
                Delete
            </button>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>Are you sure you want to delete this task?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-primary" onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteTodoModal;