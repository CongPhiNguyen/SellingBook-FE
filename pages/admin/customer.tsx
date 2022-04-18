import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import Head from 'next/head';
import { Container, Grid, Divider } from '@mui/material';
import { BsReverseLayoutTextWindowReverse, BsBook, BsBookmarkStar } from 'react-icons/bs'
import { AiOutlineDashboard } from 'react-icons/ai'
import style from '../../styles/Admin/Dashboard.module.css'
import Link from 'next/link';

const NavigationMobile = dynamic(() => import('../../component/Admin/NavigationMobile'))
const Navigation = dynamic(() => import('../../component/Admin/Navigation'))
const Layout = dynamic(() => import('../../component/Layout'),
    {
        loading: () => <LinearProgress></LinearProgress>
    }
)

function product(props) {
    const [option, setOption] = useState('Danh sách đơn hàng')
    const handleClickOption = (e) => {
        e.preventDefault()
        setOption(e.target.innerText)
    }

    return (
        <Layout>
            <Head>
                <title>Quản lý khách hàng</title>
            </Head>
            <Container className='relative' maxWidth='lg'>
                <NavigationMobile option='customer'></NavigationMobile>
                <Grid className='mb-16' container spacing={3}>
                    <Grid className='mt-16 min:hidden 900px:block' item md={3}>
                        <Navigation option='customer'></Navigation>
                    </Grid>
                    <Grid className='mt-16' sm={12} item md={9}>
                        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='rounded-lg '>
                            Customer
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default product;