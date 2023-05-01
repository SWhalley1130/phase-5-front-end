import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Login({handleLogin})
{

    const [formData, setFormData]=useState({
        email: '',
        password:'',
        username: '',
        type:'user'
    });

    const [pageDisplayed, setPageDisplayed]=useState('Login');
    const nav=useNavigate()


    function handleChange(e){
        if (e.target.name=='email'){
            setFormData({...formData, email:e.target.value});
        }
        else if (e.target.name=="username"){
            setFormData({...formData, username:e.target.value})
        }
        else{
            setFormData({...formData, password:e.target.value});
        };
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        if (pageDisplayed=="Login"){
            if (formData.email=='' || formData.password==''){
                return alert("Email and password required.")
            }
            fetch(`/api/login`,
            {
                method:'POST',
                headers:
                {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            .then(r=>r.json())
            .then(data=>{
                try{
                    handleLogin(data.username, data.type)
                }
                catch{
                   alert(data.message)
                }
            })
        }
        else {
            if (formData.email=='' || formData.password=='' || formData.username==''){
                return alert("Email, password, and username required.")
            }
            fetch(`/api/users`,{
                method:'POST', 
                headers:
                {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            .then(r=>r.json())
            .then(data=>{
                try{
                    handleLogin(data.username, data.type)
                }
                catch{
                   alert(data.message)
                }
            })
        }

    }

    return (
        <>
        <h1 className="text-xxl font-bold">Chicken Tinders</h1><br/>
            {pageDisplayed=="Login" ? 
                <>
                    <h2 style={{textAlign:'center', fontSize:'1.5em' }} className="block mb-2 font-bold text-gray-900">Sign in to your account</h2>
                    <form>
                        <br/>
                        <h3 className="block mb-2 text-sm font-medium text-gray-900">Your email</h3>
                        <input value={formData.email} onChange={e=>handleChange(e)} name='email' type='email' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                        <br/>
                        <h3 className="block mb-2 text-sm font-medium text-gray-900">Password</h3>
                        <input value={formData.password} onChange={e=>handleChange(e)} name='password' placeholder="password" type='password' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        <br/>
                        <button type='submit' onClick={e=>handleSubmit(e)} className="w-full text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:focus:ring-primary-800">Login</button>
                    </form>
                    <h2 className="block mb-2 text-lg font-bold text-gray-900">Don't have an account? <span className="text-blue-600" onClick={e=>setPageDisplayed("Sign Up")} >Sign up.</span></h2>
                </>

            :

            <>
                <form>
                <br/>
                        <h3 className="block mb-2 text-sm font-medium text-gray-900">Your email</h3>
                        <input value={formData.email} onChange={e=>handleChange(e)} name='email' type='email' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                        <br/>
                        <h3 className="block mb-2 text-sm font-medium text-gray-900">Username</h3>
                        <input value={formData.username} onChange={e=>handleChange(e)} name='username' type='text' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example123"/>
                        <br/>
                        <h3 className="block mb-2 text-sm font-medium text-gray-900">Password</h3>
                        <input value={formData.password} onChange={e=>handleChange(e)} name='password' placeholder="password" type='password' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        <br/>
                        <button type='submit' onClick={e=>handleSubmit(e)} className="w-full text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:focus:ring-primary-800">Create Account</button>
                </form>
                <h2 className="block mb-2 text-lg font-bold text-gray-900">Return to <span className="text-blue-600" onClick={e=>setPageDisplayed("Login")} >log in page.</span></h2>
            </>
            }
        </>
    )

}

export default Login;