import { Link } from "react-router-dom"
import { FormElement, HeaderOne, HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm, VerticallyFlexSpaceBetweenContainer } from "../../../components/styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from "../../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { AuthenticationFormContainer } from "../../../components/styles/AuthenticationPagesStyles";
import { Helmet } from "react-helmet-async";

const ForgotPassword = () => {
  const { setOpen, setResponseMessage } = useContext(GeneralContext);
    
  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    
    
    setIsProcessing(true);
    axios.post(serverUrl+'/api/v1/ssmec/user/requestPasswordReset', data)
    .then(response => {
      setTimeout(() => {
        if (response.status === 200) {
          setIsProcessing(false);
          setResponseMessage({message: response.data.message, severity:'success'});
          setOpen(true);
          setTimeout(()=> {
            window.location.reload();
          },2000)
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
    <HorizontallyFlexSpaceBetweenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Helmet>
        <title>Student - Forgot password</title>
        <meta name="description" content={`Forgot password.`} /> 
      </Helmet>
      <AuthenticationFormContainer style={{ borderBottom: '6px solid blue',gap: '30px', position: 'relative', boxShadow: 'rgba(0, 0, 0, 0.05) 0 6px 24px, rgba(0, 0, 0, 0.08) 0 5px 12px 1px' }}>
        <VerticallyFlexGapContainer style={{ gap: '10px' }}>
          <img style={{ width: '90%', marginBottom: '20px' }} src="/ssmec-logo-2.png" alt=""/>
          <span style={{ color: 'black', fontWeight: '600' }}>Student</span>
          <HeaderTwo style={{ fontWeight: '600', color: '#476b6b' }}>Forgot your password? </HeaderTwo>
        </VerticallyFlexGapContainer>

        <VerticallyFlexGapForm style={{ gap: '20px'}} onSubmit={handleSubmit(onSubmit)}>
          <p style={{ width: '100%', textAlign: 'center', lineHeight: '25px' }}>Enter the email you used to create an account, and we shall send you a password reset link.</p>
          <FormElement style={{ color: 'gray' }}>
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
          <FormElement>
            {isProcessing 
              ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
              : <Button variant="contained" color="primary" size="medium" type="submit">Send reset link</Button>
            }
          </FormElement>

          <HorizontallyFlexSpaceBetweenContainer>
            <Link style={{ color: 'gray', fontSize:'90%', textAlign: 'center', textDecoration: 'none' }} to={'/student/auth/signin'}>I can't recover my account using this page</Link>
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapForm>
        
      </AuthenticationFormContainer>
    </HorizontallyFlexSpaceBetweenContainer>
  )
}

export default ForgotPassword