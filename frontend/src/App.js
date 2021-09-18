import React from 'react';
import axios from 'axios';
import UserList from './components/Users';
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'menu': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState({
                    'users': users
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <Menu menu = {this.state.menu} />
                </nav>

                <content>
                    <UserList users = {this.state.users} />
                </content>

                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }
}

export default App;
