import React from "react";
import {withRouter} from "react-router-dom";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'title': '',
            'description': '',
            'repo_link': '',
            'users': [],
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            ['users']: users
        });
    }

    handleSubmit(event) {
        this.props.createProject(this.state.title, this.state.description, this.state.repo_link, this.state.users)
        event.preventDefault()
        this.props.history.push('/projects/')
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="row mb-3">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Заголовок:</label>
                    <input type="text" className="col-sm-4" id="title" name="title" placeholder="Заголовок"
                           value={this.state.title} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="row mb-3">
                    <label htmlFor="description" className="col-sm-2 col-form-label">Описание:</label>
                    <textarea rows="5" className="col-sm-4" id="description" name="description" placeholder="Описание"
                              value={this.state.description} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="row mb-3">
                    <label htmlFor="repo_link" className="col-sm-2 col-form-label">Ссылка:</label>
                    <input type="url" className="col-sm-4" id="repo_link" name="repo_link" placeholder="Ссылка на репозиторий"
                           value={this.state.repo_link} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="row mb-3">
                    <label htmlFor="users" className="col-sm-2 col-form-label">Пользователи:</label>
                    <select multiple className="col-sm-4" id="users" name="users" onChange={(event) => this.handleUserChange(event)}>
                        {this.props.users.map((user) => <option
                            value={user.id}>{user.first_name} {user.last_name} ({user.username})</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Создать"/>
            </form>
        )
    }
}

export default withRouter(ProjectForm)