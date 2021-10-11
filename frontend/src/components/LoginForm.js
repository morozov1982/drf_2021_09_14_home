import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'username': '',
            'password': ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.loginToken(this.state.username, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="row mb-3">
                    <label htmlFor="username" className="col-sm-1 col-form-label">Логин:</label>
                    <input type="text" className="col-sm-3" id="username" name="username" placeholder="username"
                           value={this.state.username} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-1 col-form-label">Пароль:</label>
                    <input type="password" className="col-sm-3" id="password" name="password" placeholder="password"
                           value={this.state.password} onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Войти"/>
            </form>
        )
    }
}

export default LoginForm