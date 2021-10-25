import React from "react";
import {withRouter} from "react-router-dom";

class TodoForm extends React.Component {
    constructor(props) {
        const default_project = 1;
        const default_user = 1;
        super(props);
        this.state = {
            'title': '',
            'description': '',
            'project': default_project,
            'user': default_user,
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let project = parseInt(event.target.selectedOptions.item(0).value)

        this.setState({
            ['project']: project
        });
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let user = parseInt(event.target.selectedOptions.item(0).value)

        this.setState({
            ['user']: user
        });
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.title, this.state.description, this.state.project, this.state.user)
        event.preventDefault()
        this.props.history.push(`/project/${this.state.project}`)
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="row mb-3">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Заголовок:</label>
                    <input type="text" className="col-sm-3" id="title" name="title" placeholder="Заголовок"
                           value={this.state.title} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="row mb-3">
                    <label htmlFor="description" className="col-sm-2 col-form-label">Описание:</label>
                    <textarea rows="5" className="col-sm-3" id="description" name="description" placeholder="Описание"
                              value={this.state.description} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="row mb-3">
                    <label htmlFor="project" className="col-sm-2 col-form-label">Проект:</label>
                    <select className="col-sm-3" id="project" name="project" onChange={(event) => this.handleProjectChange(event)}>
                        {this.props.projects.map((proj) => <option
                            value={proj.id}>{proj.title}</option>)}
                    </select>
                </div>
                <div className="row mb-3">
                    <label htmlFor="user" className="col-sm-2 col-form-label">Пользователь:</label>
                    <select className="col-sm-3" id="user" name="user" onChange={(event) => this.handleUserChange(event)}>
                        {this.props.users.map((user) => <option
                            value={user.id}>{user.first_name} {user.last_name} ({user.username})</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Создать"/>
            </form>
        )
    }
}

export default withRouter(TodoForm)