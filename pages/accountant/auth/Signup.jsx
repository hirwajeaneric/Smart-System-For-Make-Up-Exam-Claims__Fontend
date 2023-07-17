import { Link, useNavigate } from "react-router-dom"
import { FormElement, HeaderOne, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm, VerticallyFlexSpaceBetweenContainer } from "../../../components/styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { useCookies } from 'react-cookie';
import { GeneralContext } from "../../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { AuthenticationFormContainer } from "../../../components/styles/AuthenticationPagesStyles";
import { Helmet } from "react-helmet-async";

const Signup = () => {
  const navigate = useNavigate();
  const [ cookies, setCookie, removeCookie ] = useCookies(null);
  const { setOpen, setResponseMessage } = useContext(GeneralContext);
    
  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {

    if (data.password !== data.confirmPassword) {
      setResponseMessage({message:'Passwords do not match', severity: 'warning'});
      setOpen(true);
      return;
    } else {

      data.role = 'Consultant';
      setIsProcessing(true);

      axios.post(serverUrl+'/api/v1/mmpas/user/signup', data)
      .then(response => {
        setTimeout(() => {
          if (response.status === 201) {
            setIsProcessing(false);
            setCookie('AuthToken', response.data.user.token);
            setCookie('UserData', JSON.stringify(response.data.user));
            window.location.replace('/rab/');
          }
        }, 3000)
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setIsProcessing(false);
          setResponseMessage({ message: error.response.data.msg, severity:'error'})
          setOpen(true);
        }
      })
    }
  };

  return (
    <HorizontallyFlexSpaceBetweenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Helmet>
        <title>Create account</title>
        <meta name="description" content={`Create an account.`} /> 
      </Helmet>
      <AuthenticationFormContainer style={{ position: 'relative', boxShadow: 'rgba(0, 0, 0, 0.05) 0 6px 24px, rgba(0, 0, 0, 0.08) 0 5px 12px 1px' }}>

      <VerticallyFlexSpaceBetweenContainer className="left" style={{ position: 'absolute', left: '0', top: '0', bottom: '0', background: "#339966", height: '100%', gap: '50px', color: 'white' }}>
          <VerticallyFlexGapContainer style={{ gap: '30px', textAlign:'center', color:'white' }}>
            <img src="/RAB_Logo2.png" alt="RAB Rwanda logo" style={{ width: '40%', border: '2px solid white', borderRadius: '50%', background:'white' }}/>
            <h1 style={{ fontWeight: '900' }}>Welcome to MMPAS</h1>
          </VerticallyFlexGapContainer>
          <VerticallyFlexGapContainer style={{ gap: '30px',color:'white' }}>
            <div style={{ textAlign:'center' }}>
              <p style={{ lineHeight:'2rem' }}>Don you already have an account?</p>
              <Button variant='outlined' size='small' color='inherit' onClick={() => navigate('/rab/auth/signin')}>Login</Button>
            </div>
            <p>&copy; All rights reserved. MMPAS 2023</p>
          </VerticallyFlexGapContainer>
        </VerticallyFlexSpaceBetweenContainer>

        <VerticallyFlexGapForm className="right" style={{ position: 'absolute', right: '0', top: '0', bottom: '0' }} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span>RAB&nbsp;Admin</span>
            <HeaderOne>Register</HeaderOne>
          </div>
          <FormElement style={{ color: 'gray' }}>
            <label htmlFor="fullName">Full name</label>
            <input 
              type="text" 
              id="fullName"
              placeholder="name" 
              {...register("fullName", 
              {required: true})} 
              aria-invalid={errors.fullName ? "true" : "false"}
            />
            {errors.fullName?.type === "required" && (
              <p role="alert">Full name is required</p>
            )}
          </FormElement>
          <FormElement style={{ color: 'gray' }}>
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email"
              placeholder="email" 
              {...register("email", 
              {required: true})} 
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.type === "required" && (
              <p role="alert">Email is required</p>
            )}
          </FormElement>  
          <HorizontallyFlexGapContainer style={{ gap: '10px' }}>
            <FormElement style={{ color: 'gray' }}>
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                id="password" 
                placeholder="password" 
                {...register("password", {required: true})} 
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password?.type === "required" && (
                <p role="alert">Password is required</p>
              )}
            </FormElement>
            <FormElement style={{ color: 'gray' }}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password"
                id="confirmPassword" 
                placeholder="confirmPassword" 
                {...register("confirmPassword", {required: true})} 
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.confirmPassword?.type === "required" && (
                <p role="alert">Confirm your password</p>
              )}
            </FormElement>
          </HorizontallyFlexGapContainer>
          <FormElement>
            {isProcessing 
              ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
              : <Button variant="contained" color="primary" size="medium" type="submit">Register</Button>
            }
          </FormElement>
        </VerticallyFlexGapForm>
        
      </AuthenticationFormContainer>
    </HorizontallyFlexSpaceBetweenContainer>
  )
}

export default Signup