import { useState, useEffect, useRef } from "react"



const Login = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])
    useEffect(() => {
        setErrMsg('')
    }, [userName, password])
    const handleSubmit = () => {
        e.preventDefault()
    }
    return (
        <section className='register'>
            {errMsg !== '' && <p ref={errRef} className={`errMsg`}>{errMsg}</p>}
            <h1 className='heading'>Login</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    Username:
                </label>
                <input id='username' type='text' ref={userRef} autoComplete='off' required onChange={(e) => { setUserName(e.target.value) }}
                    value={userName} />
                <label htmlFor='username'>
                    Password:
                </label>
                <input id='password' type='password' required onChange={(e) => { setPassword(e.target.value) }}
                    value={password} />
                <button className='signup' disabled={!userName || !password} >Sign up</button>
            </form>
            <div className='login'>
                <p className='already'>Don't have an account?</p>
                <a href='#'>Sign up</a>
            </div>

        </section>
    )
}
export default Login