import React, { useContext, useState } from 'react';
import {  Navigate, Route, Routes } from 'react-router-dom';
import { MainContext } from './contexts/MainContext';
import Gallery from './gallery/Gallery';
import Posts from './posts/Posts';
import style from './style.module.css'
import Todos from './todos/Todos';
import Users from './users/Users';
import AddUser from './users/AddUser';
import EditUser from './editUser';
import AddPost from './posts/AddPost';
import AddGallery from './gallery/AddGallery';
import AddTodos from './todos/AddTodos';

const Content = ()=>{
    const {showMenu,setShowMenu} = useContext(MainContext)
    const [isUser , setIsUser] = useState(false);

    const handleShowMenu = (event)=>{
        event.stopPropagation();
        setShowMenu(!showMenu);
    }

    return (
        <div className={style.content_section} onClick={()=>{setShowMenu(false)}}>
            <i className={`${style.menu_button} fas fa-bars text-withe fs-4 m-2 pointer`} 
            onClick={handleShowMenu}
            ></i>
                <Routes>
                    <Route path='/user' element={<Users/>} /> 
                    <Route path='/user/add' element={<AddUser/>} >
                        <Route path=':userId' element={<EditUser/>} />
                    </Route>

                    <Route path='/Post' element={<Posts/>} />
                    <Route path='/Post/add' element={<AddPost/>}>
                        <Route path=':userId' element={<EditUser/>}/>
                    </Route>

                    <Route path='/Gallery' element={<Gallery/>} />
                    <Route path='/Gallery/add' element={<AddGallery/>}>
                        <Route path=':userId' element={<EditUser/>} />
                    </Route>

                    <Route path='/Todos' element={<Todos/>} />
                    <Route path='/Todos/add' element={<AddTodos/>}>
                        <Route path=':userId' element={<EditUser/>} />
                    </Route>

                    <Route path='*' element={<Users/>} />
                </Routes>
        </div>
    )

}

export default Content;
