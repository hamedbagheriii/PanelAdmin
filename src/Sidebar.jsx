import React, { useContext, useEffect, useRef, useState } from 'react';
import { MainContext } from './contexts/MainContext';
import style from './style.module.css';
import { Link, NavLink } from 'react-router-dom';


const Sidebar = ()=>{

    const {showMenu , setShowMenu} = useContext(MainContext)

    return (
        <div className={`${style.sidebar_section}  `} style={showMenu ? {right:0} : {} }>
            <ul className={`${style.sidebar_list} m-0 p-0`}>
                <li className={`${style.sidebar_avatar} d-flex flex-column align-items-center justify-content-center`}>
                    <Link to='/'>
                        <img src="/assets/images/hamedb.jpg" alt="" />
                    </Link>
                    <small className='mt-3 fs-6'>حامد باقری</small>
                </li>
                <NavLink className={({isActive})=>{return isActive ? `${style.active_nav}` : '' }} to="/user">
                    <li>
                    کاربران
                    </li>
                </NavLink>
                <NavLink className={ ({isActive}) => {return isActive ? `${style.active_nav}` : "" } } to="/Post">
                    <li>
                        پست ها
                    </li>
                </NavLink>
                <NavLink className={ ({isActive}) => {return isActive ? `${style.active_nav}` :  "" } } to="/Gallery">
                    <li>
                        گالری
                    </li>
                </NavLink>
                <NavLink className={ ({isActive}) => {return isActive ? `${style.active_nav}` : "" } } to="/Todos">
                    <li>    
                        کارها
                    </li>
                </NavLink>
            </ul>
        </div>
    )

}

export default Sidebar;