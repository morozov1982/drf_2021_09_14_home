import React from 'react';
import {Link} from "react-router-dom";

const ProjectData = ({project}) => {
    return (
        <tr>
            <th scope="row">{project.id}</th>
            <td>
                <Link to={`/project/${project.id}`}>{project.title}</Link>
            </td>
            <td>{project.description}</td>
            <td>{project.repo_link}</td>
            <td>{project.users}</td>
            <td>{project.created_at}</td>
            <td>{project.updated_at}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Название</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Ссылка</th>
                    <th scope="col">Пользователи</th>
                    <th scope="col">Создан</th>
                    <th scope="col">Изменён</th>
                </tr>
            </thead>

            <tbody>
                { projects.map( (current_project) => <ProjectData project={current_project} /> )}
            </tbody>
        </table>
    )
}

export default ProjectList