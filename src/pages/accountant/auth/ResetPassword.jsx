import { Link, useParams } from "react-router-dom"
import { FormElement, HeaderOne, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm, VerticallyFlexSpaceBetweenContainer } from "../../../components/styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { useCookies } from 'react-cookie';
import { GeneralContext } from "../../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { AuthenticationFormContainer } from "../../../components/styles/AuthenticationPagesStyles";
import { Helmet } from "react-helmet-async";

const ResetPassword = () => {
  const params = useParams();
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
      const config = {
        headers: {
          'Authorization' : `Bearer ${params.token}`
        }
      }

      setIsProcessing(true);
      axios.put(serverUrl+'/api/v1/mmpas/user/resetPassword?id='+params.userId, {password: data.password}, config)
      .then(response => {
        setTimeout(() => {
          if (response.status === 200) {
            setIsProcessing(false);
            setResponseMessage({message: 'Password changed' , severity: 'success'});
            setOpen(true);
            setTimeout(() => {
              window.location.replace('/rab/auth/signin');
            },2000);
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
        <title>Forgot password</title>
        <meta name="description" content={`Forgot password.`} /> 
      </Helmet>
      <AuthenticationFormContainer style={{ position: 'relative', boxShadow: 'rgba(0, 0, 0, 0.05) 0 6px 24px, rgba(0, 0, 0, 0.08) 0 5px 12px 1px' }}>

        <VerticallyFlexSpaceBetweenContainer className="left" style={{ position: 'absolute', left: '0', top: '0', bottom: '0', background: "#339966", height: '100%', gap: '50px', color: 'white' }}>
          <VerticallyFlexGapContainer style={{ gap: '30px', textAlign:'center', color:'white' }}>
            <img src="/RAB_Logo2.png" alt="RAB Rwanda logo" style={{ width: '40%', border: '2px solid white', borderRadius: '50%', background:'white' }}/>
            <h1 style={{ fontWeight: '900' }}>Welcome to MMPAS</h1>
          </VerticallyFlexGapContainer>
          <VerticallyFlexGapContainer style={{ gap: '30px',color:'white' }}>
            <p>&copy; All rights reserved. MMPAS 2023</p>
          </VerticallyFlexGapContainer>
        </VerticallyFlexSpaceBetweenContainer>

        <VerticallyFlexGapForm className="right" style={{ position: 'absolute', right: '0', top: '0', bottom: '0' }} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span>RAB&nbsp;Admin</span>
            <HeaderOne>Reset password</HeaderOne>
          </div>
          <FormElement style={{ color: 'gray' }}>
            <label htmlFor="password">New Password</label>
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
              placeholder="Confirm password" 
              {...register("confirmPassword", {required: true})} 
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword?.type === "required" && (
              <p role="alert">Please confirm your password</p>
            )}
          </FormElement>  
          <FormElement>
            {isProcessing 
              ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
              : <Button variant="contained" color="primary" size="medium" type="submit">Set password</Button>
            }
          </FormElement>
          <Link style={{ color: 'gray', fontSize:'90%', textAlign: 'center', textDecoration: 'none' }} to={'/rab/auth/signin'}>I can't recover my account using this page</Link>
        </VerticallyFlexGapForm>
        
      </AuthenticationFormContainer>
    </HorizontallyFlexSpaceBetweenContainer>
  )
}

export default ResetPassword