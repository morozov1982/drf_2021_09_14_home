import React from 'react';
import {Link} from "react-router-dom";
import ProjectFilterForm from "./ProjectFilterForm";

const ProjectData = ({project, deleteProject}) => {
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
            <td>
                <button type='button' onClick={() => deleteProject(project.id)}>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject, filter}) => {
    return (
        <div>
            <ProjectFilterForm filter={filter}/>
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
                    <th scope="col">&nbsp;</th>
                </tr>
                </thead>

                <tbody>
                {projects.map((current_project) => <ProjectData project={current_project}
                                                                deleteProject={deleteProject}/>)}
                </tbody>
            </table>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link className="btn btn-primary" to='/projects/create'>Создать проект</Link>
            </div>
        </div>
    )
}

export default ProjectList