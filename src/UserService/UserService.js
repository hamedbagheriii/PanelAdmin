import swal from 'sweetalert';
import { MyAxios } from '../JpAxios';




// users =>
export const setUserService = async (data)=>{
    if(data.email && data.username && data.name && data.address.city){
        const res = await MyAxios.post('/users' , data);
        if(res){
            console.log(res);
            swal(`کاربر ${res.data.name}  با موفقیت ایجاد شد .`,{
                icon : 'success',
                buttons : 'متوجه شدم'
            })
        }
        else{
            swal('عملیات با خطا مواجه شد' , {
                icon : 'error',
                buttons: 'متوجه شدم'
            })
        }
    }
    else{
        swal('عملیات با خطا مواجه شد' , {
            icon : 'error',
            buttons: 'متوجه شدم'
        })
    }
}


export const updateUserService = async (data , userId)=>{
    if(data.email){
        const res = await MyAxios.put(`/users/${userId}` , data);
        if(res){
            console.log(res);
            swal(`کاربر ${res.data.name}  با موفقیت ویرایش شد .`,{
                icon : 'success',
                buttons : 'متوجه شدم'
            })
        }
        else{
            swal('عملیات با خطا مواجه شد' , {
                icon : 'error',
                buttons: 'متوجه شدم'
            })
        }
    }
    else{
        swal('عملیات با خطا مواجه شد' , {
            icon : 'error',
            buttons: 'متوجه شدم'
        })
    }
}

// posts =>
export const setPostService = async (data)=>{
    if(data.title && data.body){
         const res = MyAxios.post('/posts' , data)
         if(res){
             swal(`پست با موفقیت ایجاد شد .`,{
                 icon : 'success',
                 buttons : 'متوجه شدم'
             })
         }
         else{
             swal('عملیات با خطا مواجه شد' , {
                 icon : 'error',
                 buttons: 'متوجه شدم'
             })
         }
    }
    else{
        swal('عملیات با خطا مواجه شد' , {
            icon : 'error',
            buttons: 'متوجه شدم'
        })
    }
}

export const updatePostService = async (data , userId)=>{
    if(data.title || data.body){
        const res = MyAxios.put(`/posts/${userId}` , data)
        if(res){
            swal(`پست با موفقیت ویرایش شد .`,{
                icon : 'success',
                buttons : 'متوجه شدم'
            })
        }
        else{
            swal('عملیات با خطا مواجه شد' , {
                icon : 'error',
                buttons: 'متوجه شدم'
            })
        }
    }
    else{
        swal('عملیات با خطا مواجه شد' , {
            icon : 'error',
            buttons: 'متوجه شدم'
        })
    }
}

// gallery =>
export const setGalleryService = async (data)=>{
    if(data.title && data.url){
         const res = MyAxios.post('/photos' , data)
         if(res){
             swal(`عکس با موفقیت ایجاد شد .`,{
                 icon : 'success',
                 buttons : 'متوجه شدم'
             })
         }
         else{
             swal('عملیات با خطا مواجه شد' , {
                 icon : 'error',
                 buttons: 'متوجه شدم'
             })
         }
    }
    else{
        swal('عملیات با خطا مواجه شد' , {
            icon : 'error',
            buttons: 'متوجه شدم'
        })
    }
}

export const updateGalleryService = async (data , userId)=>{
    if(data.title || data.url){
        const res = MyAxios.put(`/photos/${userId}` , data)
        if(res){
            swal(`عکس با موفقیت ویرایش شد .`,{
                icon : 'success',
                buttons : 'متوجه شدم'
            })
        }
        else{
            swal('عملیات با خطا مواجه شد' , {
                icon : 'error',
                buttons: 'متوجه شدم'
            })
        }
    }
    else{
        swal('عملیات با خطا مواجه شد' , {
            icon : 'error',
            buttons: 'متوجه شدم'
        })
    }
}

// todos => 
export const setTodoService = async (data)=>{
    if(data.title && data.completed){
         const res = MyAxios.post('/todos' , data)
         if(res){
             swal(`کار با موفقیت ایجاد شد .`,{
                 icon : 'success',
                 buttons : 'متوجه شدم'
             })
         }
         else{
             swal('عملیات با خطا مواجه شد' , {
                 icon : 'error',
                 buttons: 'متوجه شدم'
             })
         }
    }
    else{
        swal('عملیات با خطا مواجه شد' , {
            icon : 'error',
            buttons: 'متوجه شدم'
        })
    }
}

export const updateTodoService = async (data , userId)=>{
    if(data.title || data.completed){
        const res = MyAxios.put(`/todos/${userId}` , data)
        if(res){
            swal(`کار با موفقیت ویرایش شد .`,{
                icon : 'success',
                buttons : 'متوجه شدم'
            })
        }
        else{
            swal('عملیات با خطا مواجه شد' , {
                icon : 'error',
                buttons: 'متوجه شدم'
            })
        }
    }
    else{
        swal('عملیات با خطا مواجه شد' , {
            icon : 'error',
            buttons: 'متوجه شدم'
        })
    }
}