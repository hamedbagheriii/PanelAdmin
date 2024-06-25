import React, { useEffect, useRef, useState } from 'react';
import style from '../style.module.css';
import { Link, useParams , useOutlet, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { setPostService, updatePostService } from '../UserService/UserService';


const AddPost = ()=>{

    const navigate = useNavigate()
    const {userId} = useParams()
    const [addPost , setAddPost] = useState({
        id : '' ,
        title : '' ,
        body : '' ,
    })

    useEffect(() => {
        if(userId){
            axios.get(`https://jsonplaceholder.typicode.com/posts/${userId}`).then(res =>{
                setAddPost({
                    id : res.data.id ,
                    title : res.data.title ,
                    body : res.data.body ,
                })
            })
        }        
    }, []);

    
    const handleSetPost = (e)=>{
        e.preventDefault()
        if(!userId){
            setPostService(addPost);
        }
        else{
            updatePostService(addPost , userId);
        }
    }




    return(
        <div className="container d-flex align-items-center flex-column justify-content-center w-100 vh-100">

            <form  className={`${style.userForm} w-100 bg-white py-3 px-2`}>
                <div className={`${style.userForm_title} mx-auto py-1 pt-2 bg-primary`}>
                    <h5 className='text-white text-center'>
                        {userId ? 'ویرایش پست' : "افزودن پست"}
                    </h5>
                </div>

                <div className={`${style.content} w-100 mt-4 px-2`}>
                    <div className="mb-4">
                        <label htmlFor="name_family" className="form-label fw-bold fs-6">سرتیتر</label>
                        <textarea type="text" value={addPost.title} onChange={(e)=>{setAddPost({...addPost , title : e.target.value})}} style={{resize:'vertical' , height:50}} className={`${style.inputUser} form-control`} id="name_family" placeholder="هوای امروز چطور بود ؟" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="user_email" className="form-label fw-bold fs-6">متن</label>
                        <textarea type="text"value={addPost.body} onChange={(e)=>{setAddPost({...addPost , body : e.target.value})}} style={{resize:'vertical' , height:180}} className={`${style.inputUser} form-control`} id="user_email" placeholder="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است ." />
                    </div>
   
                    <div className='w-100 d-flex align-items-center justify-content-around'>
                        <button type='submit' className="btn btn-primary px-4" onClick={handleSetPost}>
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


export default AddPost;