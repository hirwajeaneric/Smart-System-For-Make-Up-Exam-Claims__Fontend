import { Link, useNavigate } from "react-router-dom"
import { FormElement, HeaderOne, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm, VerticallyFlexSpaceBetweenContainer } from "../../../components/styles/GenericStyles"
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

      data.userRole = 'rab-admin';
      setIsProcessing(true);

      axios.post(serverUrl+'/api/v1/mmpas/user/signup', data)
      .then(response => {
        setTimeout(() => {
          if (response.status === 201) {
            setIsProcessing(false);
            setCookie('AuthToken', response.data.user.token);
            setCookie('UserData', JSON.stringify(response.data.user));
            
            console.log(response.data.user);

            window.location.replace('/accountant/complete-account/');
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
        <title>Accountant - Create account</title>
        <meta name="description" content={`Create an account as a accountant.`} /> 
      </Helmet>
      <AuthenticationFormContainer style={{ borderBottom: '6px solid cyan',gap: '30px', position: 'relative', boxShadow: 'rgba(0, 0, 0, 0.05) 0 6px 24px, rgba(0, 0, 0, 0.08) 0 5px 12px 1px' }}>
        <VerticallyFlexGapContainer style={{ gap: '10px' }}>
          <img style={{ width: '90%', marginBottom: '20px' }} src="/ssmec-logo-2.png" alt=""/>
          <span style={{ color: 'black', fontWeight: '600' }}>Accountant</span>
          <HeaderTwo style={{ fontWeight: '600', color: '#476b6b' }}>Sign Up to the Platform </HeaderTwo>
        </VerticallyFlexGapContainer>

        <VerticallyFlexGapForm style={{ gap: '20px'}} onSubmit={handleSubmit(onSubmit)}>
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

          <HorizontallyFlexSpaceBetweenContainer>
            <p>Already has an account?</p>
            <Link style={{ color: 'blue', fontSize:'90%', textDecoration: 'none' }} to={'/accountant/auth/signin'}>Sign in</Link>
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapForm>
        
      </AuthenticationFormContainer>
    </HorizontallyFlexSpaceBetweenContainer>
  )
}

export default Signup