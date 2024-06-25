import React, { useEffect, useRef, useState } from 'react';
import style from '../style.module.css';
import { Link, useParams , useOutlet, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { MyAxios } from '../JpAxios';
import { setUserService, updateUserService } from '../UserService/UserService';


const AddUser = ()=>{

    const {userId} = useParams();  
    const navigate = useNavigate()
    const [data , setData] = useState({
        name : '' ,
        username : '' ,
        email : '' ,
        address : {
            street : '' ,
            city : '' ,
            suite : '' ,
            zipcode : ''
        }

    })




    
    const handleAddUser = (e)=>{
        e.preventDefault();
        // شرط برای ویرایش و افزودن =>
        if(!userId){
            setUserService(data)
        }
        else{
            updateUserService(data , userId)
        }
    }


    //برای ویرایش اطلاعات => 
    useEffect(() => {
        if(userId){
            axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res =>{
            setData({
                name : res.data.name ,
                username : res.data.username ,
                email : res.data.email ,
                address : {
                    street : res.data.address.street ,
                    city : res.data.address.city ,
                    suite : res.data.address.suite ,
                    zipcode : res.data.address.zipcode
                }  
            })
            }).catch(err => console.log(err))   
        }    
    }, []);



    return(
        <div className="container d-flex align-items-center flex-column justify-content-center w-100 vh-100">

            <form onSubmit={handleAddUser} className={`${style.userForm} w-100 bg-white py-3 px-2`}>
                <div className={`${style.userForm_title} mx-auto py-1 pt-2 bg-primary`}>
                    <h5 className='text-white text-center'>
                        {userId ? 'ویرایش کاربر' : "افزودن کاربر"}
                    </h5>
                </div>

                <div className={`${style.content} w-100 mt-4 px-2`}>
                    <div className="mb-4">
                        <label htmlFor="name_family" className="form-label fw-bold fs-6">نام و نام خانوادگی</label>
                        <input type="text" value={data.name} onChange={(e)=>setData({...data , name : e.target.value})} className={`${style.inputUser} form-control`} id="name_family" placeholder="رضا عباسی" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="userName" className="form-label fw-bold fs-6">نام کاربری</label>
                        <input type="text" value={data.username} onChange={(e)=>setData({...data , username : e.target.value})} className={`${style.inputUser} form-control`} id="name_family" placeholder="reza572" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="user_email" className="form-label fw-bold fs-6">ایمیل</label>
                        <input type="text" value={data.email} onChange={(e)=>setData({...data , email : e.target.value})} className={`${style.inputUser} form-control`} id="user_email" placeholder="rezaabasizadeh@gmail.com" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="user_address" className="form-label fw-bold fs-6">آدرس</label>
                        <div className="row w-100 mt-1">
                            <div className="col-6">
                                <input type="text" value={data.address.city} onChange={(e)=>setData({...data , address : {...data.address , city : e.target.value} })}
                                 className={`${style.inputUser} form-control w-100`} id="user_address" placeholder="شهر" />
                            </div>
                            <div className="col-6">
                                <input type="text" value={data.address.street} onChange={(e)=>setData({...data , address : {...data.address , street : e.target.value} })}
                                 className={`${style.inputUser} form-control w-100`} id="user_address" placeholder="خیابان" />
                            </div>
                            <div className="col-6 mt-3">
                                <input type="text" value={data.address.suite} onChange={(e)=>setData({...data , address : {...data.address , suite : e.target.value} })}
                                 className={`${style.inputUser} form-control w-100`} id="user_address" placeholder="ادامه آدرس" />
                            </div>
                            <div className="col-6 mt-3">
                                <input type="text" value={data.address.zipcode} onChange={(e)=>setData({...data , address : {...data.address , zipcode : e.target.value} })}
                                 className={`${style.inputUser} form-control w-100`} id="user_address" placeholder="کد پستی" />
                            </div>
                        </div>
                    </div>
                    <div className='w-100 d-flex align-items-center justify-content-around'>
                        <button type='submit' className="btn btn-primary px-4">
                            {userId ? 'ویرایش' : 'افزودن' }
                        </button>
                        <button type='button' className="btn btn-danger px-4" 
                         onClick={()=>navigate(-1)} >بازگشت</button>
                    </div>
                </div>
            </form>
            <Outlet/>
        </div>
    )
}


export default AddUser;