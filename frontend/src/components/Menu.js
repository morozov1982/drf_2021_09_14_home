import React from 'react';
import {Link} from "react-router-dom";

const Menu = ({menu}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Пользователи</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to="/projects">Проекты</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Menu