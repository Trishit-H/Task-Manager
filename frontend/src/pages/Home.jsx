import { useEffect, useState } from 'react';

// context
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import { useTodoContext } from '../hooks/useTodoContext.jsx';

//components
import TodoDetails from '../components/TodoDetails.jsx';
import TodoForm from '../components/TodoForm.jsx';

const Home = () => {

    const { todos, dispatch } = useTodoContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('http://localhost:5002/api/todo', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_TODOS', payload: data })
            };
        };

        if (user) {
            fetchTodos();
        }

    }, [dispatch, user]);



    return (
        <>
            <div className="Home">
                <div className="todos">
                    {todos && todos.map((todo) => (
                        <TodoDetails key={todo._id} todo={todo} />
                    ))}
                </div>
                <TodoForm />
            </div>
        </>
    )
};

export default Home;