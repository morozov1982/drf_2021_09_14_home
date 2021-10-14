import React from 'react';
import {Link} from "react-router-dom";

const Menu = ({menu}) => {
    return (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Пользователи</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/projects">Проекты</Link>
                </li>
            </ul>
    )
}

export default Menu