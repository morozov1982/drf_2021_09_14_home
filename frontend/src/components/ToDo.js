import React from 'react';
import {useParams} from "react-router-dom";

const ToDoItem = ({todo}) => {
    let is_closed;
    if (todo.is_closed) {
        is_closed = 'Закрыто';
    } else {
        is_closed = 'Открыто';
    }
    return (
        <tr>
            <th scope="row">{todo.id}</th>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.project}</td>
            <td>{todo.user}</td>
            <td>{is_closed}</td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
    let { id } = useParams();
    let filtered_todos = todos.filter( (todo) => todo.project === parseInt(id) );

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Название</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Проект</th>
                    <th scope="col">Пользователь</th>
                    <th scope="col">Закрыто</th>
                </tr>
            </thead>

            <tbody>
                { filtered_todos.map( (current_todo) => <ToDoItem todo={current_todo} /> )}
            </tbody>
        </table>
    )
}

export default ToDoList