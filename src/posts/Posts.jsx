import React, { useEffect, useRef, useState } from 'react';
import style from '../style.module.css'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

const Posts = ()=>{

    const navigate = useNavigate()
    const [post ,setPost] = useState([])
    const searchInp = useRef();
    const warning = useRef()
    // برای سرچ کاربران =>
    const [mainPost , setMainPost] = useState([]);
    const [isSearch , setIsSearch] = useState(false)

    // get data for show =>
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(res =>{
            setPost(res.data)
            setMainPost(res.data)
        }).catch(err => console.log(err))
    }, []);


    const handleShowSearch = (e)=>{
        setPost(mainPost.filter((p)=> p.title.includes(e.target.value)));
        e.target.value.length ? setIsSearch(true) : setIsSearch(false) ;
        if(!post.length){
            warning.current.innerText=''
        }
    }   


    const handleDeletePost = (u)=>{
        swal({
            title: "حذف پست !",
            text: `آیا از حذف آیتم ${u.id} اطمینان دارید ؟`,
            icon: "warning",
            buttons: ['لغو' , 'تایید'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://jsonplaceholder.typicode.com/posts/${u.id}`).then(res =>{
                    if(res.status == 200){
                        const newPost = post.filter((e)=>e.id != u.id)
                        setPost(newPost)
                        swal(" پست مورد نظر پاک شد !", {
                            icon: "success",
                            buttons:'متوجه شدم'
                        });
                    }
                    else{
                        swal('عملیات با خطا مواجه شد' , {
                            icon : 'error',
                            buttons: 'متوجه شدم'
                        })
                    }
                });

            }
            else {
              swal("عملیات لغو شد .");
            }
          });
    }



    return (
        <div className={`${style.item_content} mt-3 p-4 container-fluid`}>
            <h4 className="text-center mb-4 fw-bold">مدیریت پست ها</h4>
            <div className="row my-2 mb-4 justify-content-between w-100 mx-0">
                <div className="form-group col-10 col-md-6 col-lg-4">
                    <input type="text" ref={searchInp} onChange={handleShowSearch} className="form-control pt-2 shadow" placeholder="جستجو"/>
                </div>
                <div className="col-2 text-start px-0">
                    <Link to={'/post/add'}>
                    <button className="btn btn-primary pt-2">
                        <i className="fas fa-plus text-light "></i>
                    </button>
                    </Link>
                </div>
            </div>
            {isSearch ?             
                <div className='resSearch w-100 text-center alert alert-warning'>
                    <h6 className='fw-bold text-center pt-2 fs-5'>{post.length > 0 ? `${post.length} مورد پیدا شد .` : 'هیج موردی پیدا نشد .' } </h6>
                </div> :
                ''
            }
            {post.length ? (
                <div className={`${style.table_scroll} px-1 `}>
                    <table className={`table bg-light w-100 shadow table-striped border border-1 border-dark`}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>سرتیتر</th>
                                <th>متن</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                        { post.map((u)=>(
                            <tr  key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.title}</td>
                                <td>{u.body}</td>
                                <td className=''>
                                    <i className="fas fa-edit text-warning mx-2 pointer" onClick={()=>{
                                        return navigate(`/Post/add/${u.id}` , {state : 'پست'})
                                    }} ></i>
                                    <i className="fas fa-trash text-danger mx-2 pointer" onClick={()=>{handleDeletePost(u)}} ></i>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h4 ref={warning} className='text-center text-dark mt-5'>لطفا صبر کنید ...</h4>
            )}
        </div>
    )

}

export default Posts;