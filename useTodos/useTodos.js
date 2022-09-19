import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer';



const init = () =>{
    return JSON.parse( localStorage.getItem('todos')) || [];
}

export const useTodos = () => {
  

    const [ todos, dispatch ] = useReducer( todoReducer, [], init );

    useEffect(() => {
      
        localStorage.setItem('todos', JSON.stringify( todos ))

    }, [todos])
    

    const handlerNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action );
    }

    const handlerDeletedTodo = (id) => {
       
        dispatch({
            type: '[TODO] remove Todo',
            payload: id
        })
    }

    const handlerToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }

    

    return{
        todos,
        handlerNewTodo,
        handlerDeletedTodo,
        handlerToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
    }

}
