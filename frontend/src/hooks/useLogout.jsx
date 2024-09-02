import { useAuthContext } from "./useAuthContext";
import { useTodoContext } from "./useTodoContext";

export const useLogout = () => {

    const { dispatch } = useAuthContext();
    const { dispatch: todoDispatch } = useTodoContext();

    const logout = () => {
        //remove user from local storage
        localStorage.removeItem('user')

        // Dispatch the log out action
        dispatch({ type: 'LOGOUT' })

        // Set the todo state to null
        todoDispatch({ type: 'SET_TODOS', payload: null })
    }

    return { logout }
}