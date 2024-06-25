import React, { useEffect, useRef, useState } from 'react';
import style from '../style.module.css';
import { Link, useParams , useOutlet, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {  setTodoService, updateTodoService } from '../UserService/UserService';


const AddTodos = ()=>{

    const navigate = useNavigate()
    const {userId} = useParams()
    const [addTodos , setAddTodos] = useState({
        id : '' ,
        title : '' ,
        completed : false ,
    })

    useEffect(() => {
        if(userId){
            axios.get(`https://jsonplaceholder.typicode.com/todos/${userId}`).then(res =>{
                setAddTodos({
                    id : res.data.id ,
                    title : res.data.title ,
                    completed : res.data.completed ,
                })
            })
        }        
    }, []);
    
    
    const handleSetTodos = (e)=>{
        e.preventDefault()
        if(!userId){
            setTodoService(addTodos);
        }
        else{
            updateTodoService(addTodos , userId);
        }
    }



    return(
        <div className="container d-flex align-items-center flex-column justify-content-center w-100 vh-100">

            <form  className={`${style.userForm} w-100 bg-white py-3 px-2`}>
                <div className={`${style.userForm_title} mx-auto py-1 pt-2 bg-primary`}>
                    <h5 className='text-white text-center'>
                        {userId ? 'ویرایش کار' : "افزودن کار"}
                    </h5>
                </div>

                <div className={`${style.content} w-100 mt-4 px-2`}>
                    <div className="mb-4">
                        <label htmlFor="name_family" className="form-label fw-bold fs-6">سرتیتر</label>
                        <input type="text" value={addTodos.title} onChange={(e)=>{setAddTodos({...addTodos , title : e.target.value})}} style={{resize:'vertical' , height:50}} className={`${style.inputUser} form-control`} id="name_family" placeholder="هوای امروز چطور بود ؟" />
                    </div>
                    <div className="mb-4 form-check form-switch d-flex w-75 align-items-center ">
                        <label htmlFor="user_email" className="form-label fw-bold fs-6 ms-2">وضعیت :</label>
                        <select value={addTodos.completed} onChange={(e)=>{setAddTodos({...addTodos , completed : e.target.value})}} className='form-select w-50'>
                            <option value="false">انجام نشده</option>
                            <option value="true">انجام شده</option>
                        </select>
                    </div>
   
                    <div className='w-100 d-flex align-items-center justify-content-around'>
                        <button type='submit' className="btn btn-primary px-4" onClick={handleSetTodos}>
                            {userId ? 'ویرایش' : 'افزودن' }
                        </button>
                        <button type='button' className="btn btn-danger px-4" onClick={()=>{navigate(-1)}}>بازگشت</button>
                    </div>
                </div>
            </form>
            <Outlet/>
        </div>
    )
}


export default AddTodos;