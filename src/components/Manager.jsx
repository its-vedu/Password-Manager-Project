import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ToasterUi from 'toaster-ui';
import { useRef } from 'react';



function Manager() {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordList, setpasswordList] = useState([])

    const options = {
        duration: 5000,
        styles: {
          backgroundColor: '#ffffff',
          color: '#ff0000',
          border: '1px solid #ffff00',
        },
      };

      const getPasswords = async ()=>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)       
        setpasswordList(passwords)
      }

    useEffect(() => {
        getPasswords()
    }, [])

    const toaster = new ToasterUi();

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("src/images/eyeCross2.jpg")) {
            ref.current.src = "src/images/eye3.jpg"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "src/images/eyeCross2.jpg"
            passwordRef.current.type = "password"
        }

    }
    const savePassword = async () => {
        if(form.site.length>3 && form.username.length>3 && form.username.length>3){  

            //if any such id exists in db delete it

            setpasswordList([...passwordList, {...form, id: uuidv4()}])

            let req = await fetch("http://localhost:3000/", {method: "DELETE", headers:{"Content-Type": "application/json"},
            body: JSON.stringify({id:form.id})})

            await fetch("http://localhost:3000/", {method: "POST", headers:{"Content-Type": "application/json"},
            body: JSON.stringify({...form, id:uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...passwordList, {...form, id: uuidv4()}]))
            // console.log([...passwordList, {...form, id: uuidv4()}])
            setform(({ site: "", username: "", password: "" }))
            toaster.addToast("Details Saved Successfully", "success",options);
        }
        else{
            toaster.addToast("Details Not Saved", "success",options);
        }
    }
    const deletePassword = async(id) => {
        console.log("Deleting password with id", id)
        let c = confirm("Do You Really Want To Delete This Password?")
        if(c){
            setpasswordList(passwordList.filter(item=>item.id!==id))
            let res = await fetch("http://localhost:3000/", {method: "DELETE", headers:{"Content-Type": "application/json"},
                body: JSON.stringify({id})})
            // localStorage.setItem("passwords", JSON.stringify(passwordList.filter(item=>item.id!==id)))
            toaster.addToast("Deletion Successful", "success",options);
            // console.log([...passwordList, form])
        }
    }
    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setform({...passwordList.filter(i=>i.id===id)[0], id:id})
        setpasswordList(passwordList.filter(item=>item.id!==id))
       
        
        //localStorage.setItem("passwords", JSON.stringify([...passwordList, form]))
        // console.log([...passwordList, form])
    }



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value },)

    }

    const copyText = (text) => {
        toaster.addToast("Copied Successfully", "success",options);
        navigator.clipboard.writeText(text)
    }

    return (

        <>
            
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>

            <div className='bg-inherit p-2 md:p-0 md:mycontainer min-h-[79vh] w-full'>
                <h1 className='text-4xl font-bold text-center pt-10'>
                    <span className='text-red-500'> &lt;</span>
                    <span className='text-blue-500'>Safe</span><span className='text-red-500'>Password/&gt;</span>
                </h1>

                <p className='text-red-600 text-lg font-bold text-center flex justify-center items-center'>Your Own Password Manager</p>

                <div className='text-black flex flex-col p-4 gap-6 w-full'>
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-red-500 w-full px-4 py-1' type='text' name='site' id='site' placeholder='Enter Website URL'></input>
                    <div className="flex flex-col md:flex-row w-full gap-3 justify-between">
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-red-500 w-full px-4 py-1' type='text' name='username' id='username' placeholder='Enter Username'></input>

                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full border border-red-500 w-full px-4 py-1' type='password' name='password' id='password' placeholder='Enter Password'></input>
                            <span className='absolute right-[3px] top-[6px] cursor-pointer ' onClick={showPassword}>
                                <img ref={ref} className='p-1 m-auto' width={26} src="src/images/eye3.jpg" alt='eye'></img>
                            </span>
                        </div>

                    </div>


                    <button className='flex justify-center items-center
                     bg-blue-300 hover:bg-blue-400 m-auto w-fit
                      rounded-full p-2 gap-2 px-2 ' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/zrkkrrpl.json"
                            trigger="hover"
                        >
                        </lord-icon>Add Password</button>


                </div>
                <div className='passwords text-center'>
                    <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
                    {passwordList.length === 0 && <div>No Passwords To Show</div>}
                    {passwordList.length !== 0 &&
                        <table className='w-full'>
                            <table className="table-auto w-full mb-5">
                                <thead className='bg-blue-400 '>
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Passwords</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-blue-100'>
                                    {passwordList.map((item, index) => {
                                        return <tr key={index}>
                                            <td className='text-center w-60 py-2 border border-white '>
                                                <div className='flex justify-center items-center'>
                                                    <a href={item.site} target='_blank'>{item.site}</a>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                        <img style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }} src='/src/images/copy.png' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center w-60 py-2 border border-white '>
                                                <div className='flex justify-center items-center'>
                                                    <span>{item.username}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                        <img style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }} src='/src/images/copy.png' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center w-60 py-2 border border-white '>
                                                <div className='flex justify-center items-center'>
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                        <img style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }} src='/src/images/copy.png' />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-center w-60 py-2 border border-white '>
                                                <span className='cursor-pointer mx-3' onClick={()=>{editPassword(item.id)}}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wuvorxbv.json"
                                                        trigger="hover"
                                                        style={{"width":"25px" ,"height":"25px"}}
                                                        >
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer mx-3' onClick={()=>{deletePassword(item.id)}}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/drxwpfop.json"
                                                        trigger="hover"
                                                        style={{"width":"25px" ,"height":"25px"}}
                                                         >
                                                    </lord-icon>
                                                </span>
                                            </td>
                                            
                                               
                                            
                                        </tr>

                                    })}


                                </tbody>
                            </table>
                        </table>}
                </div>
            </div>
        </>
    );
}

export default Manager;
