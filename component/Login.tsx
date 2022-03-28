import React, { useState, useEffect } from 'react'
import styleLogin from '../styles/Login.module.css'
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material'
import { Button } from '@mui/material'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { limitText } from '../helper/limitText'
import { CheckSpecialCharacters } from '../helper/checkSpecialCharaters'
import { userLogin } from '../redux/actions/userAction';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import GoogleLogin from 'react-google-login';
import { useRouter } from 'next/router'
import { showAlertSuccess, showAlertError } from '../redux/actions/alertAction'

function Login(props) {
    const dispatch = useDispatch()
    const isLogin = useSelector((state: RootStateOrAny) => state.userReducer.isLogin)
    const router = useRouter()

    const [accountName, setAccountName] = useState({
        value: '',
        isError: false,
        helperText: ''
    })

    const [pass, setPass] = useState({
        value: '',
        isError: false,
        helperText: ''
    })

    useEffect(() => {
        if (isLogin) {
            router.push('/')
        }
    }, [isLogin])

    const HandleClickLogin = (e) => {
        if (accountName.value == '' || pass.value == '') {
            console.log('Nhập đầy đủ các  trường')
            dispatch(showAlertError('Nhập đầy đủ các trường!'))
            e.preventDefault()
        } else if (accountName.isError || pass.isError) {
            dispatch(showAlertError('Không đúng định dạng'))
            console.log('Lỗi')
            e.preventDefault()
        } else {
            dispatch(showAlertSuccess('Đăng nhập thành công'))
            dispatch(userLogin())
            console.log('Đăng ký thành công')
        }
    }

    const handleChangeAccount = (e) => {
        limitText(e, 20);
        if (!CheckSpecialCharacters(e.target.value) || e.target.value.length === 0) {
            setAccountName({
                value: e.target.value,
                isError: false,
                helperText: null,
            })
        } else {
            setAccountName({
                ...accountName,
                isError: true,
                helperText: 'Tên tài khoản chứa kí tự đặc biệt'
            })
        }
    }

    const handleChangePass = (e) => {
        limitText(e, 20);
        if (e.target.value.length >= 6 || e.target.value.length === 0) {
            if (!CheckSpecialCharacters(e.target.value)) {
                setPass({
                    value: e.target.value,
                    isError: false,
                    helperText: null,
                })
            } else {
                setPass({
                    ...pass,
                    isError: true,
                    helperText: 'Mật khẩu chứa kí tự đặc biệt'
                })
            }
        } else {
            setPass({
                ...pass,
                isError: true,
                helperText: 'Mất khẩu phải từ 6 kí tự trở lên'
            })
        }
    }

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            let elenmentLinkToSearch: HTMLElement = document.querySelector('.btn-login')
            elenmentLinkToSearch.click()
        }
    }

    const responseGoogle = async (response) => {
        console.log(response);
        console.log('click');
        dispatch(userLogin())
    }


    return (
        <div className={styleLogin.modalLogin + ' ' + styleLogin.formLogin}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className={styleLogin.loginDirection}>
                    <Link href={'/'} passHref>
                        <BsArrowLeftSquareFill style={{ transform: 'translateY(-6px)', marginRight: '5px' }}></BsArrowLeftSquareFill>
                    </Link>
                    <Link href={'/'} passHref>
                        <p>Trang chủ</p>
                    </Link>
                </div>
                <div className={styleLogin.loginDirection}>
                    <Link href={'/register'} passHref>
                        <p>Đăng ký</p>
                    </Link>
                    <Link href={'/register'} passHref>
                        <BsArrowRightSquareFill style={{ transform: 'translateY(-6px)', marginLeft: '5px' }}></BsArrowRightSquareFill>
                    </Link>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img height='130px' width='200px' src='/img/logo.png'></img>
                <div style={{ fontSize: '2.4rem' }}>GOOD BOOK</div>
                <div style={{ fontSize: '2rem', fontWeight: '500', color: '#2BBCBA' }}>Đăng nhập</div>
                <div style={{ paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                    <TextField
                        id="outlined-required"
                        label="Tên tài khoản"
                        fullWidth
                        error={accountName.isError}
                        helperText={accountName.helperText}
                        onChange={(e) => handleChangeAccount(e)}
                        onKeyUp={(e) => handleKeyUp(e)}
                    />
                </div>
                <div style={{ paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                    <TextField
                        id="outlined-password-input"
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        error={pass.isError}
                        helperText={pass.helperText}
                        autoComplete="current-password"
                        onChange={(e) => handleChangePass(e)}
                        onKeyUp={(e) => handleKeyUp(e)}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', textDecoration: 'none', cursor: 'pointer', justifyContent: 'space-between', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                <p>Xem hướng dẫn</p>
                <Link href={'/forget-password'} passHref>
                    <p className={styleLogin.forgetPassHover} style={{ color: '#2BBCBA', fontWeight: '500' }}>
                        Quên mật khẩu
                    </p>
                </Link>
            </div>
            <div style={{ display: 'flex', textDecoration: 'none', cursor: 'pointer', justifyContent: 'space-between', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                <Link href={'/'} passHref>
                    <Button onClick={(e) => HandleClickLogin(e)} className='btn-login' fullWidth style={{ backgroundColor: '#2BBCBA', color: 'white', height: '50px', fontSize: '1.4rem' }} variant="contained">ĐĂNG NHẬP</Button>
                </Link>
            </div>
            <div style={{ color: 'rgba(0, 0, 0, 0.4)', marginBottom: '35px', paddingLeft: '60px', paddingRight: '60px', width: '100%', height: '1px', marginTop: '20px' }}>
                <Divider orientation='horizontal' flexItem>
                    Hoặc
                </Divider>
            </div>
            <div style={{ display: 'flex', textDecoration: 'none', cursor: 'pointer', justifyContent: 'space-evenly', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                <div style={{ cursor: 'pointer', fontSize: '2rem', height: '50px', width: '50px', color: '#36589D', borderRadius: '50%', padding: '5px', border: '1px solid #36589D', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <BsFacebook ></BsFacebook>
                </div>
                <div style={{ cursor: 'pointer', fontSize: '2rem', height: '50px', width: '50px', color: '#EA230F', borderRadius: '50%', padding: '5px', border: '1px solid #EA230F', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <GoogleLogin
                        clientId="826925109796-mi95l41fi57bdlolpvnfdg5bpt9oc81h.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <AiFillGoogleCircle onClick={renderProps.onClick}></AiFillGoogleCircle>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;