import React from 'react';
import {Link, useParams} from "react-router-dom";

const ToDoItem = ({todo, deleteTodo}) => {
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
            <td>
                <button type='button' onClick={() => deleteTodo(todo.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({todos, deleteTodo}) => {
    let {id} = useParams();
    let filtered_todos = todos.filter((todo) => todo.project === parseInt(id));

    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Название</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Проект</th>
                    <th scope="col">Пользователь</th>
                    <th scope="col">Закрыто</th>
                    <th scope="col">&nbsp;</th>
                </tr>
                </thead>

                <tbody>
                {filtered_todos.map((current_todo) => <ToDoItem todo={current_todo} deleteTodo={deleteTodo}/>)}
                </tbody>
            </table>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link className="btn btn-primary" to='/todo/create'>Создать Todo</Link>
            </div>
        </div>
    )
}

export default ToDoList