import React, { useState } from 'react'
import styleLogin from '../styles/Login.module.css'
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import { limitText } from '../helper/limitText'
import { CheckMail } from '../helper/checkMail'
import { makeCode } from '../helper/makeCode'
import { sendCode } from '../services/sendMail'
import { getCode } from '../redux/actions/codeAction'
import { useDispatch } from 'react-redux'
function ForgetPassword(props) {
    const dispatch = useDispatch()

    const [email, setEmail] = useState({
        value: '',
        isError: false,
        helperText: ''
    })

    const HandleClickButton = (e) => {
        if (email.value == '') {
            console.log('Nhập đầy đủ các  trường')
            e.preventDefault()
        } else if (email.isError) {
            console.log('Lỗi')
            e.preventDefault()
        } else {
            let code: String = makeCode(6);
            if (sendCode(code, email.value)) {
                dispatch(getCode(code, email.value))
            }
        }
    }

    const HandleChangeEmail = (e) => {
        limitText(e, 30);
        if (CheckMail(e.target.value) || e.target.value.length === 0) {
            setEmail({
                value: e.target.value,
                isError: false,
                helperText: null,
            })
        } else {
            setEmail({
                ...email,
                isError: true,
                helperText: 'Email không đúng định dạng'
            })
        }
    }

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            let elenmentConfirmCode: HTMLElement = document.querySelector('.confirm-code')
            elenmentConfirmCode.click()
        }
    }

    return (
        <div style={props.isMobile ? { width: '400px', height: '80%', borderRadius:'10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'} : null} className={styleLogin.modalLogin + ' ' + styleLogin.formForgetPass}>
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
                    <Link href={'/login'} passHref>
                        <p>Đăng nhập</p>
                    </Link>
                    <Link href={'/login'} passHref>
                        <BsArrowRightSquareFill style={{ transform: 'translateY(-6px)', marginLeft: '5px' }}></BsArrowRightSquareFill>
                    </Link>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img height={props.isMobile?'80px':'130px'} width={props.isMobile?'130px':'200pxpx'} src='/img/logo.png'></img>
                <div style={props.isMobile?{ fontSize: '1.6rem' } : {fontSize:'2.4rem'}}>GOOD BOOK</div>
                <div style={{ fontSize: props.isMobile?'1.4rem':'2rem', fontWeight: '500', color: '#2BBCBA' }}>Quên mật khẩu</div>
                <div style={{ paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                    <TextField
                        id="outlined-required"
                        label="Email"
                        onChange={(e) => HandleChangeEmail(e)}
                        fullWidth
                        error={email.isError}
                        size={props.isMobile ? 'small' : 'medium'}
                        helperText={email.helperText}
                        onKeyUp={(e) => handleKeyUp(e)}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', textDecoration: 'none', cursor: 'pointer', justifyContent: 'space-between', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                <Link href='confirm-code' passHref>
                    <Button onClick={(e) => HandleClickButton(e)} className='confirm-code' fullWidth style={{ backgroundColor: '#2BBCBA', color: 'white', height: props.isMobile?'40px':'50px', fontSize:  props.isMobile?'1.2rem':'1.4rem' }} variant="contained">GỬI MÃ CODE</Button>
                </Link>
            </div>
        </div>
    );
}

export default ForgetPassword;