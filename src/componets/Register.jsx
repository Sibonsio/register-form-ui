import './Register.css'
import { useRef, useState, useEffect } from 'react'
import { Check, X } from 'lucide-react';
import instance from '../api/axios.jsx';




const Register = () => {
    const USER_REGEX = /^[a-zA-Z0-9_]{3,16}$/ // start of string, allow letters, digits, underscore, length must be 3–16
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ //must contain lowercase,must contain uppercase,must contain a number,must contain special character,minimum length 8
    const [userName, setUserName] = useState('')
    const [validUserName, setValidUserName] = useState(false)
    const [userNameFocus, setUserNameFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatchPassword, setValidMatchPassword] = useState(false)
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    const userRef = useRef()
    const errRef = useRef()

    useEffect(() => {
        userRef.current.focus()
    }, [])
    useEffect(() => {
        const result = USER_REGEX.test(userName)
        setValidUserName(result)
    }, [userName])
    useEffect(() => {
        const result = PASSWORD_REGEX.test(password)
        setValidPassword(result)
        const match = matchPassword === password
        setValidMatchPassword(match)
    }, [password, matchPassword])
    useEffect(() => {
        setErrMsg('')
    }, [userName, password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validUserName || !validPassword || !validMatchPassword) {
            setSuccess(false)
            setErrMsg('Invalid details')
            return
        }
        try {
            const response = await instance.post('/create', JSON.stringify({ userName, password }), {
                headers: { "Content-Type": "application/json" }
            })
            setSuccess(true)
            setUserName('')
            setPassword('')
            setMatchPassword('')
            console.log(response.data)
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response')
            }
            else if (error.response?.status === 409) {
                setErrMsg('Username Taken')
            }
            else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
        }

    }

    return (
        <section className='register'>
            {errMsg !== '' && <p className={`errMsg`}>{errMsg}</p>}
            <h1 className='heading'>Register</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    Username: <span>{userName && validUserName && <Check color='green' className='icon' /> || userName && !validUserName && <X color='red' className='icon' />}</span>
                </label>
                <input id='username' type='text' ref={userRef} autoComplete='off' required onChange={(e) => { setUserName(e.target.value) }} aria-invalid={validUserName ? false : true}
                    onFocus={() => { setUserNameFocus(true) }} onBlur={() => { setUserNameFocus(false) }} aria-describedby='usernamenote' value={userName} />
                <p className={`${userName && userNameFocus && !validUserName ? 'instructions' : 'hidden'}`} id='usernamenote'>allow letters, digits, underscore, length must be 3–16</p>
                <label htmlFor='password'>
                    Password: <span>{password && validPassword && <Check color='green' className='icon' /> || password && !validPassword && <X color='red' className='icon' />}</span>
                </label>
                <input id='password' type='password' required onChange={(e) => { setPassword(e.target.value) }} aria-invalid={validPassword ? false : true}
                    onFocus={() => { setPasswordFocus(true) }} onBlur={() => { setPasswordFocus(false) }} aria-describedby='passwordnote' value={password} />
                <p className={`${passwordFocus && !validPassword ? 'instructions' : 'hidden'}`} id='passwordnote'>must contain lowercase,must contain uppercase,must contain a number,must contain special character,minimum length 8</p>
                <label htmlFor='confirmpassword'>
                    Confirm Password: <span>{password && validPassword && validMatchPassword && matchPassword && < Check color='green' className='icon' /> || password && validPassword && !validMatchPassword && matchPassword && <X color='red' className='icon' />}</span>
                </label>
                <input id='confirmpassword' type='password' required onChange={(e) => { setMatchPassword(e.target.value) }} aria-invalid={validMatchPassword ? false : true}
                    onFocus={() => { setMatchPasswordFocus(true) }} onBlur={() => { setMatchPasswordFocus(false) }} aria-describedby='confirmnote' value={matchPassword} />
                <p className={`${matchPassword && matchPasswordFocus && !validMatchPassword ? 'instructions' : 'hidden'}`} id='confirmnote'>password don't match</p>
                <button className='signup' disabled={!validUserName || !validPassword || !validMatchPassword || !userName || !password || !matchPassword} >Sign up</button>
            </form>
            <div className='login'>
                <p className='already'>Already have an account?</p>
                <a href='#'>Sign in</a>
            </div>

        </section>
    )
}
export default Register