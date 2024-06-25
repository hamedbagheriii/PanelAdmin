import React, { useEffect, useRef, useState } from 'react';
import style from '../style.module.css';
import { Link, useParams , useOutlet, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { setPostService, updateGalleryService, setGalleryService } from '../UserService/UserService';


const AddGallery = ()=>{

    const navigate = useNavigate()
    const {userId} = useParams()
    const [addGallery , setAddGallery] = useState({
        id : '' ,
        title : '' ,
        url : '' ,
    })

    useEffect(() => {
        if(userId){
            axios.get(`https://jsonplaceholder.typicode.com/photos/${userId}`).then(res =>{
                setAddGallery({
                    id : res.data.id ,
                    title : res.data.title ,
                    url : res.data.url ,
                })
            })
        }        
    }, []);

    
    const handleSetGallery = (e)=>{
        e.preventDefault()
        if(!userId){
            setGalleryService(addGallery);
        }
        else{
            updateGalleryService(addGallery , userId);
        }
    }




    return(
        <div className="container d-flex align-items-center flex-column justify-content-center w-100 vh-100">

            <form  className={`${style.userForm} w-100 bg-white py-3 px-2`}>
                <div className={`${style.userForm_title} mx-auto py-1 pt-2 bg-primary`}>
                    <h5 className='text-white text-center'>
                        {userId ? 'ویرایش عکس' : "افزودن عکس"}
                    </h5>
                </div>

                <div className={`${style.content} w-100 mt-4 px-2`}>
                    <div className="mb-4">
                        <label htmlFor="name_family" className="form-label fw-bold fs-6">سرتیتر</label>
                        <input type="text" value={addGallery.title} onChange={(e)=>{setAddGallery({...addGallery , title : e.target.value})}} style={{resize:'vertical' , height:50}} className={`${style.inputUser} form-control`} id="name_family" placeholder="هوای امروز چطور بود ؟" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="user_email" className="form-label fw-bold fs-6">عکس</label>
                        <input type="text"value={addGallery.url} onChange={(e)=>{setAddGallery({...addGallery , url : e.target.value})}} style={{resize:'vertical' , height:50}} className={`${style.inputUser} form-control`} id="user_email" placeholder="https://via.placeholder.com/600/d32776" />
                    </div>
   
                    <div className='w-100 d-flex align-items-center justify-content-around'>
                        <button type='submit' className="btn btn-primary px-4" onClick={handleSetGallery}>
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


export default AddGallery;