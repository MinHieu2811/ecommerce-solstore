import React, { useEffect } from 'react';
import './orderList.scss'
import Loader from "../../components/Loader/Loader";
import Helmet from "../../components/Helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { listOrders } from '../../actions/orderActions';

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders} = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo} = userLogin;

    // const orderDetails = useSelector((state) => state.orderDetails);
//   const { loading: loadingDetails, error: errorDetails, order } = orderDetails;

    useEffect(() => {
      if(userInfo && userInfo.isAdmin) {
        dispatch(listOrders());
      } else {
          navigate('/login')
      }
    }, [dispatch, navigate, userInfo]);
    
  return (
    loading ? (<Loader />) : error ? (<div>{error}</div>) : (
        <Helmet title="Order List">
            <div className='orderlist-wrapper'>
                <h1>Order List</h1>
                <table className='orderlist-table'>
                <thead>
                    <tr>
                        <th>
                            NAME
                        </th>
                        <th>
                            USER
                        </th>
                        <th>
                            DATE
                        </th>
                        <th>
                            TOTAL
                        </th>
                        <th>
                            PAID
                        </th>
                        <th>
                            DELIVERED
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name }</td>
                            <td>
                                {order.createdAt.substring(0, 10)}
                            </td>
                            <td>
                                ${order.totalPrice}
                            </td>
                            <td>
                                {order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (
                                    <i className='bx bx-x' style={{color: 'red'}}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    order.deliveredAt.substring(0, 10)
                                ) : (
                                    <i className='bx bx-x' style={{color: 'red'}}></i>
                                )}
                            </td>
                            <td>
                                <Link to={`/admin/order/${order._id}/edit`}>
                                        Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Helmet>
    )
  )
}

export default OrderList