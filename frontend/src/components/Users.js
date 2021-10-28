import React from 'react';

const UserData = ({user}) => {
    return (
        <tr>
            <th scope="row">{user.id}</th>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Логин</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">email</th>
                </tr>
            </thead>

            <tbody>
                { users.map( (current_user) => <UserData user={current_user} /> )}
            </tbody>
        </table>
    )
}

export default UserList