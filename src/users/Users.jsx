import React, { useEffect, useRef, useState } from 'react';
import style from '../style.module.css'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

const Users = ()=>{

    const navigate = useNavigate()
    const [users ,setUsers] = useState([])
    const warning = useRef()
    const [isSearch , setIsSearch] = useState(false)
    // برای سرچ کاربران =>
    const [mainUsers , setMainUsers] = useState([]);

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users').then( res =>{
            setUsers(res.data);
        // برای سرچ کاربران =>
            setMainUsers(res.data)
        }).catch(err =>{
            console.log(err);
        })
        
    },[])
    

    const handleDelete = (userId)=>{
        // swal(`آیا از حذف آیتم ${userId} اطمینان دارید ؟`)

        swal({
            title: "حذف کاربر !",
            text: `آیا از حذف آیتم ${userId} اطمینان دارید ؟`,
            icon: "warning",
            buttons: ['لغو' , 'تایید'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res =>{

                    if(res.status == 200){
                        const newUsers = users.filter((u)=> u.id != userId);
                        setUsers(newUsers);
                        swal("اکانت کاربر مورد نظر پاک شد !", {
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
                })

            }
            else {
              swal("عملیات لغو شد .");
            }
          });
    }


    // برای سرچ کاربران =>
    const handleSearch = (e)=>{
        // includes : متود جی اس برای پیدا کردن استرینگ در ارایه
        setUsers(mainUsers.filter((u)=> u.name.includes(e.target.value)));
        e.target.value.length ? setIsSearch(true) : setIsSearch(false) ;
        if(!users.length){
            warning.current.innerText=''
        }
    }



    return (
        <div className={`${style.item_content} mt-3 p-4 container-fluid`}>
            <h4 className="text-center mb-4 fw-bold">مدیریت کاربران</h4>
            <div className="row my-2 mb-4 justify-content-between w-100 mx-0">
                <div className="form-group col-10 col-md-6 col-lg-4">
                    {/* برای سرچ کردن => */}
                    <input type="text" onChange={handleSearch} className="form-control pt-2 shadow" placeholder="جستجو"/>
                </div>
                <div className="col-2 text-start px-0">
                    <Link to={'/user/add'} state={'Vue'}>
                    <button className="btn btn-primary pt-2">
                        <i className="fas fa-plus text-light "></i>
                    </button>
                    </Link>
                </div>
            </div>
            {isSearch ?             
                <div className={`resSearch w-100 text-center alert ${users.length > 0 ? 'alert-success' : 'alert-warning '} border border-2 border-dark`}>
                    <h6 className='fw-bold text-center pt-2 fs-5'>{users.length > 0 ? `${users.length} مورد پیدا شد .` : 'هیج موردی پیدا نشد .' } </h6>
                </div> :
                ''
            }
            {users.length ? (
                <div className={`${style.table_scroll} px-1 `}>
                    <table className={`table bg-light w-100 shadow table-striped border border-1 border-dark`}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>نام</th>
                                <th>نام کاربری</th>
                                <th>ایمیل</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                        { users.map((u)=>(
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>
                                    <i className="fas fa-edit text-warning mx-2 pointer" 
                                    onClick={()=>{
                                        return navigate(`/user/add/${u.id}`, {state : 'اکانت'})
                                    }}></i>
                                    <i className="fas fa-trash text-danger mx-2 pointer" onClick={()=>{handleDelete(u.id)}}></i>
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

export default Users;