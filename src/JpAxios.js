import axios from 'axios';
import React from 'react';

export const MyAxios = axios.create({
    baseURL : `https://jsonplaceholder.typicode.com` ,
    headers : {
        // Authorization : توکن ارسالی ای پی آی برای دریافت اطلاعات =>
        Authorization : 'bearer jrfkelwh4378urfh34fuierhfh89f34' ,
    //     تایپ اطلاعات بازگشتی =>
        "Content-Type" : 'application/json'
    } ,
    // تایم اوت برای اینکه تا 5 ثانیه درخواست رو ارسال کن اگر نشد بهم ارور بده =>
    timeout : 5000 ,
    // ارور بازگشتی در صورت ارور خوردن =>
    timeoutErrorMessage : 'یک مشکل در ارسال درخواست پیش آمد .'
})