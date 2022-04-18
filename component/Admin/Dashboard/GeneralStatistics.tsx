import React from 'react';
import { Container, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { AiOutlineUser, AiOutlineDollarCircle } from 'react-icons/ai'
import { BsBoxSeam,BsReceipt } from 'react-icons/bs'

function GeneralStatistics(props) {
    return (
        <Container className='mt-3'>
            <Grid container spacing={2}>
                <Grid item lg={3} md={6} xs={12}>
                    <div className='h-[130px] rounded-md text-white py-[10px] px-[21px] ' style={{ backgroundColor: '#1F1498'}}>
                        <p className=' h-[24px] font-bold text-2xl pt-2 flex items-center'>
                            <AiOutlineUser className='mr-3'></AiOutlineUser>
                            <div>9480</div>
                        </p>
                        <p className='text-base pt-2'>Tài khoản người dùng</p>
                    </div>
                </Grid>
                <Grid item lg={3} md={6} xs={12}>
                    <div className='h-[130px] rounded-md text-white py-[10px] px-[21px] ' style={{ backgroundColor: '#0060B9' }}>
                        <p className=' h-[24px] font-bold text-xl pt-2 flex items-center'>
                            <AiOutlineDollarCircle className='mr-3'></AiOutlineDollarCircle>
                            <div>15.322.000</div>
                        </p>
                        <p className='text-base pt-2'>Tổng doanh thu</p>
                    </div>
                </Grid>
                <Grid item lg={3} md={6} xs={12}>
                    <div className='h-[130px] rounded-md text-white py-[10px] px-[21px]' style={{ backgroundColor: '#DE9A27' }}>
                        <p className=' h-[24px] font-bold text-2xl pt-2 flex items-center'>
                            <BsBoxSeam className='mr-3'></BsBoxSeam>
                            <div>300</div>
                        </p>
                        <p className='text-base pt-2'>Số sản phẩm</p>
                    </div>
                </Grid>
                <Grid item lg={3} md={6} xs={12}>
                    <div className='h-[130px] rounded-md text-white py-[10px] px-[21px]' style={{ backgroundColor: '#7B68EE' }}>
                        <p className=' h-[24px] font-bold text-2xl pt-2 flex items-center'>
                            <BsReceipt className='mr-3'></BsReceipt>
                            <div>32</div>
                        </p>
                        <p className='text-base pt-2'>Số đơn hàng</p>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default GeneralStatistics;