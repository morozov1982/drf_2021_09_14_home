import React from 'react';

const Menu = ({menu}) => {
    return (
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Пункт меню 1</a>
            </li>
            <li class="nav-item">
                <a className="nav-link" href="#">Пункт меню 2</a>
            </li>
            <li class="nav-item">
                <a className="nav-link" href="#">Пункт меню 3</a>
            </li>
            <li class="nav-item">
                <a className="nav-link" href="#">Пункт меню 4</a>
            </li>
        </ul>
    )
}

export default Menu