
import React from 'react'
import Head from 'next/head'
import styleLogin from '../styles/Login.module.css'
import '../styles/Login.module.css'
import { BsArrowLeftSquareFill, BsBoxArrowRight, BsArrowRightSquareFill } from 'react-icons/bs'
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'

const ConfirmCode: React.FC = () => {
    return (
        <div>
            <Head>
                <meta charSet="UTF-8"></meta>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>Tìm lại mật khẩu</title>
            </Head>
            <div style={{ display: 'flex' }}>
                <div className={styleLogin.imgLogin}>
                </div>
                <div className={styleLogin.modalLogin}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className={styleLogin.loginDirection}>
                            <Link href={'/forget-password'} passHref>
                                <BsArrowLeftSquareFill style={{ transform: 'translateY(-6px)', marginRight: '5px' }}></BsArrowLeftSquareFill>
                            </Link>
                            <Link href={'/forget-password'} passHref>
                                <p>Nhập lại email</p>
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
                        <img height='130px' width='200px' src='https://s3-alpha-sig.figma.com/img/e8c8/7924/da09018c99d55ea49bdc6212a1810516?Expires=1649030400&Signature=hlAxB~I0ZrCnSDx2XmwYk1K8Mrco-Hqv-6ATXUP9Yh0LrcBdOSrAFJW29K2fb-~P6gMbMu8JvVqDu2mhAYxkp1wJKQb4eT125VtDKmO3RjasJFZjoLpCPXISE9XsvZg-758zUUpdxWYuZo~VbuirpIV6r1XY8axr~zDHqIqTf5V-tVSSilWk7-PA5xeF24q4E6rvXBxlj16NogG8r770Va-uKP730oTLLai4z8xpRcgiWPTDxTV3sCAKP6m-GRA~yr1GufYmnx8~-bNU3ybx4zml-OCyyz0KQe8oS2AFMDNRUisFHpVa8cZ5PLomdpdKNAx4SUZlaRtb8Q5pCQmc2A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'></img>
                        <div style={{ fontSize: '2.4rem' }}>GOOD BOOK</div>
                        <div style={{ fontSize: '2rem', fontWeight: '500', color: '#2BBCBA' }}>Quên mật khẩu</div>
                        <div style={{ display: 'flex', textDecoration: 'none', justifyContent: 'start', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                            <p>Mã code đã được gửi về email example@gmail.com</p>
                        </div>
                        <div style={{ paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '5px' }}>
                            <TextField
                                id="outlined-required"
                                label="Nhập mã code"
                                fullWidth
                            />
                        </div>
                    </div>
                    <div style={{ color: '#EA230F', display: 'flex', textDecoration: 'none', justifyContent: 'space-between', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '5px' }}>
                        <p>*Mã code không hợp lệ</p>
                        <p style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                            Gửi lại mã
                        </p>
                    </div>
                    <div style={{ display: 'flex', textDecoration: 'none', cursor: 'pointer', justifyContent: 'space-between', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '10px' }}>
                        <Button fullWidth style={{ backgroundColor: '#2BBCBA', color: 'white', height: '50px', fontSize: '1.4rem' }} variant="contained">Xác nhận</Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ConfirmCode

