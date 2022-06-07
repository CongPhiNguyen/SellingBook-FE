import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import { Container, Grid } from '@mui/material'
import Head from 'next/head';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { showAlertSuccess, showAlertError } from '../../redux/actions/alertAction';
import { useRouter } from 'next/router';
const Layout = dynamic(() =>
  import('../../component/Layout'),
  {
    loading: () => <LinearProgress></LinearProgress>
  }
);
import * as URL from '../../services/api/config'
import axios from 'axios';
const InfoUserToPay = dynamic(() => import('../../component/Cart/InfoUserToPay'))
const CartItem = dynamic(() => import('../../component/Cart/CartItem'))

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const cart = useSelector((state: RootStateOrAny) => state.cart)
  const User = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
  const isLogin = useSelector((state: RootStateOrAny) => state.userReducer.isLogin)
  const handleClickPayment = async (infoUser) => {
    if (isLogin) {
      let a = {
        ...infoUser,
        total: 2000000,
        totalFinal: 1500000,
        deliveryMoney: 30000,
        user: User._id
      }
      if (a.name == '') {
        a.name = User.name
      }
      if (a.phone == '') {
        a.phone = User.phone
      }

      console.log(a)


      if (a.district == '' || a.province == '' || a.commune == '' || a.address == '' || a.note == '' || a.paymentMethod == '' ) {
        dispatch(showAlertError("Nhập đầy đủ thông tin!"))
      } else {
        await axios.post(URL.URL_CREATE_RECEIPT, { ...a })
          .then(res => {
            console.log(res)
            if (res.data.success) {
              dispatch(showAlertSuccess('Đặt hàng thành công'))
            }
          })
          .catch(err => {
            dispatch(showAlertError("Lỗi hệ thống!"))
          })
      }
    } else {
      router.push('/login')
    }

  }
  const [price, setPrice] = useState({

  })
  return (
    <Layout>
      <Head>
        <title>Cart</title>
      </Head>
      <Container>
        <Grid container spacing={2}>
          <Grid sm={6}>
            <InfoUserToPay handleClickPayment={handleClickPayment}></InfoUserToPay>
          </Grid>
          <Grid sm={6}>
            <div className={'p-4 relative'}>
              <div className='pt-10'>
                <div className='text-3xl font-bold mb-10'>Giỏ hàng</div>
                {/* Giỏ hàng */}
                <div>
                  <div>
                    {
                      cart.cart.length !== 0 ? cart.cart.map(cart => {
                        return (
                          <CartItem></CartItem>
                        )
                      }) : (
                        <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>Giỏ hàng trống</h4>
                      )
                    }
                  </div>
                  <div style={{ display: 'flex', height: '50px', border: '1px solid black', borderRadius: '20px', backgroundColor: '#D9d9d9', overflow: 'hidden' }}>
                    <input placeholder='Mã giảm giá' style={{ fontWeight: '500', paddingBottom: '5px', paddingLeft: '20px', width: '70%', height: '50px', borderRight: '1px solid black', outline: 'none', borderRadius: '20px' }} type='text'></input>
                    <div style={{ cursor: 'not-allowed', width: '30%', fontWeight: '600', height: '50px', textAlign: 'center', lineHeight: '45px' }}>Áp dụng</div>
                  </div>
                  <div style={{ borderTop: '1px solid #00000021', borderBottom: '1px solid #00000021', marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', fontSize: '14px', fontWeight: '500' }}>
                      <div>Tạm tính</div>
                      <div>149000đ</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', fontSize: '14px', fontWeight: '500' }}>
                      <div>Giảm giá</div>
                      <div>149000đ</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', fontSize: '14px', fontWeight: '500' }}>
                      <div>Phí giao hàng</div>
                      <div>+25000đ</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', fontSize: '18px', fontWeight: '600' }}>
                    <div>TỔNG</div>
                    <div>149000đ</div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Cart



