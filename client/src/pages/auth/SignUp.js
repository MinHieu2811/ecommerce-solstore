import React, { useState, useEffect } from 'react'
import './signIn.scss';
import bg from '../../assets/images/banner/banner8.png'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Helmet from '../../components/Helmet'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('123abc@')
    const [email, setEmail] = useState('123abc@gmail.com')
    const [passValidate, setPassValidate] = useState('')
    const [visiblePass, setVisiblePass] = useState('password')
    const [visiblePassValidate, setVisiblePassValidate] = useState('password')

    const dispatch = useDispatch();
    const handlerRegister = () => {
        dispatch(register(name, email, password))
    }

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const navigate = useNavigate();

    useEffect(() => {
      if(userInfo) {
        toast.success('Đăng ký thành công');
        navigate('/')
      }
    }, [navigate, userInfo])
    

  return (
    <Helmet title='Register'>
        <ToastContainer />
        <div className='sign-wrapper' style={{backgroundImage: "url(" + bg + ")"}}>
        <div className="sign-container col-5 col-md-9 col-sm-10">
            <h1 className="title">Sign Up</h1>
            <div className="sign-container_form">
                <Formik
                    initialValues={{email: '', password: '', confirmPassword: '', username: ''}}
                    validate={values => {
                        const errors = {};
                        if(!values.email){
                            errors.email = 'Required';
                        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
                            errors.email= 'Invalid email address';
                        } 

                        if(values.password !== values.confirmPassword){
                            errors.password = 'Check your password';
                        }
                        return errors
                    }}
                >
                    <Form>
                        <div className="sign-container_form_field">
                            <Field type='text' value={name} name="username" className='field' placeholder="Username" onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="sign-container_form_field">
                            <Field type='email' name="email" value={email} className='field' placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="sign-container_form_error">
                            <ErrorMessage component="div" name="email" className='error'/>
                        </div>
                        <div className="sign-container_form_field password">
                            <div className="btn">
                                <i className={`bx bxs-show btn_item ${visiblePass.match('password') ? 'active' : ''}`} onClick={() => setVisiblePass('text')}></i>
                                <i className={`bx bxs-hide btn_item ${visiblePass.match('text') ? 'active' : ''}`} onClick={() => setVisiblePass('password')}></i>
                            </div>
                            <Field type={`${visiblePass}`} name="password" value={password} className='field' placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="sign-container_form_error">
                            <ErrorMessage component="div" name="password" className='error'/>
                        </div>
                        <div className="sign-container_form_field password">
                            <div className="btn">
                                <i className={`bx bxs-show btn_item ${visiblePassValidate.match('password') ? 'active' : ''}`} onClick={() => setVisiblePassValidate('text')}></i>
                                <i className={`bx bxs-hide btn_item ${visiblePassValidate.match('text') ? 'active' : ''}`} onClick={() => setVisiblePassValidate('password')}></i>
                            </div>
                            <Field type={`${visiblePassValidate}`} name="confirmPassword" value={passValidate} className='field' placeholder="Confirm password" onChange={(e) => setPassValidate(e.target.value)}/>
                        </div>
                        <div className="sign-container_form_span">
                            <span><Link to='/login'>Đăng nhập</Link></span>
                        </div>
                        <div className="sign-container_form_btn">
                            <button type='submit' className='form-btn' onClick={handlerRegister}>
                                Sign up
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    </div>
    </Helmet>
  )
}

export default SignUp