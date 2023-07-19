import { Link } from "react-router-dom"
import { FormElement, HeaderOne, HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm, VerticallyFlexSpaceBetweenContainer } from "../../../components/styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { useCookies } from 'react-cookie';
import { GeneralContext } from "../../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { AuthenticationFormContainer } from "../../../components/styles/AuthenticationPagesStyles";
import { Helmet } from "react-helmet-async";

const Signin = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(null);
  const { setOpen, setResponseMessage } = useContext(GeneralContext);
    
  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    
    setIsProcessing(true);
    axios.post(serverUrl+'/api/v1/mmpas/user/signin', data)
    .then(response => {
      setTimeout(() => {
        if (response.status === 200) {
          setIsProcessing(false);
          setCookie('AuthToken', response.data.user.token);
          setCookie('UserData', JSON.stringify(response.data.user));
          window.location.replace(`/examinationoffice/${response.data.user.fullName.split('').join('')}`);
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
  };

  return (
    <HorizontallyFlexSpaceBetweenContainer style={{ justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
      <Helmet>
        <title>Examination Office - Login</title>
        <meta name="description" content={`Login as an examination officer.`} /> 
      </Helmet>

      <AuthenticationFormContainer style={{ borderBottom: '6px solid gray', gap: '30px', position: 'relative', boxShadow: 'rgba(0, 0, 0, 0.05) 0 6px 24px, rgba(0, 0, 0, 0.08) 0 5px 12px 1px' }}>
        <VerticallyFlexGapContainer style={{ gap: '10px' }}>
          <img style={{ width: '90%' }} src="/ssmec-logo-2.png" alt="" />
          <span style={{ color: 'black', fontWeight: '600' }}>Examination Office</span>
          <HeaderTwo style={{ fontWeight: '600', color: '#476b6b' }}>Sign In to the Platform </HeaderTwo>
        </VerticallyFlexGapContainer>

        <VerticallyFlexGapForm style={{ gap: '20px'}} onSubmit={handleSubmit(onSubmit)}>
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
          <FormElement>
            {isProcessing 
              ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
              : <Button variant="contained" color="primary" size="small" type="submit">Log in</Button>
            }
          </FormElement>
          <HorizontallyFlexSpaceBetweenContainer>
            <Link style={{ color: 'blue', textDecoration: 'none', fontSize:'90%', }} to={'/examinationoffice/auth/signup'}>Create account</Link>
            <Link style={{ textDecoration: 'none', fontSize:'90%', color: 'gray' }} to={'/examinationoffice/auth/forgot-password'}>Forgot Password?</Link>
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapForm>
      </AuthenticationFormContainer>
    </HorizontallyFlexSpaceBetweenContainer>
  )
}

export default Signin