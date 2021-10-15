import React from 'react';
import axios from 'axios';
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";

import Menu from "./components/Menu";
import Footer from "./components/Footer";
import UserList from './components/Users';
import ProjectList from "./components/Projects";
import ToDoList from "./components/ToDo";
import LoginForm from "./components/LoginForm";

import './style.css';

const NotFound = ({location}) => {
    return (
        <div className="alert alert-primary d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                 className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img"
                 aria-label="Warning:">
                <path
                    d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <div>Неверный адрес: {location.pathname}, нет такой страницы!</div>
        </div>

    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'menu': [],
            'token': '',
            'username': ''
        }
    }

    loginToken(username, password) {
        localStorage.setItem('username', username)
        axios.post('http://127.0.0.1:8000/api-token-auth/', {"username": username, "password": password})
            .then(response  => {
                localStorage.setItem('token', response.data.token)
                let token = localStorage.getItem('token')
                let username = localStorage.getItem('username')
                this.setState({'token': token, 'username': username}, this.loadData)
            })
            .catch(error => alert("Неверные логин и/или пароль"))
    }

    logout() {
        localStorage.setItem('token', '')
        localStorage.setItem('username', '')
        this.setState({'token': '', 'username': ''}, this.loadData)
    }

    isAuthenticated() {
        return !!this.state.token
    }

    getHeaders() {
        if (this.isAuthenticated()) {
            return {'Authorization': 'Token ' + this.state.token}
        }
        return {}
    }

    loadData() {
        const headers = this.getHeaders()

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data.results
                this.setState({
                    'users': users
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'users': []
                })
            })
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'projects': []
                })
            })
        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                const todos = response.data.results
                this.setState({
                    'todos': todos
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'todos': []
                })
            })
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')
        this.setState({'token': token, 'username': username}, this.loadData)
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Menu menu={this.state.menu} />
                        { this.isAuthenticated() ?
                            <span>{this.state.username} <button onClick={() => this.logout()}>Выйти</button></span> :
                            <Link className="nav-link" to="/login">Войти</Link>
                        }
                    </nav>

                    <content>
                        <Switch>
                            <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}/>}/>

                            {this.isAuthenticated() ?
                                <Redirect from='/login' to='/'/> :
                                <Route exact path='/login' component={() => <LoginForm
                                    loginToken={(username, password) => this.loginToken(username, password)}/>}/>
                            }

                            <Route path='/project/:id' component={() => <ToDoList todos={this.state.todos}/>}/>

                            <Redirect from='/users' to='/'/>

                            <Route component={NotFound}/>
                        </Switch>
                    </content>

                    <footer>
                        <Footer/>
                    </footer>

                </BrowserRouter>
            </div>
        )
    }
}

export default App;
