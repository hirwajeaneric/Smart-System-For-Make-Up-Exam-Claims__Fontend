import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from '../../App'
import { AuthenticationFormContainer } from '../../components/styles/AuthenticationPagesStyles'
import { CenterFlexedContainer, FormElement, HeaderOne, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from '../../components/styles/GenericStyles'
import { AUCAFacultiesAndDepartments } from '../../utils/AUCAFacultiesAndDepartments'

const CompleteAccount = () => {
  const { setOpen, setResponseMessage } = useContext(GeneralContext);
  const [isProcessing, setIsProcessing] = useState(false);
  var [formData, setFormData] = useState({});  
  const [errors, setErrors] = useState({});

  const handleFormInput = ({ target: input}) => {
    setFormData({...formData, [input.name]: input.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const hodInfo = JSON.parse(localStorage.getItem('incompleteHODAccount'));

    if (!hodInfo) {
      setResponseMessage({ message: "Session expired", severity:'error'})
      setOpen(true);
      return;
    }

    formData.fullName = hodInfo.fullName;
    formData.email = hodInfo.email;
    formData.password = hodInfo.password;
    formData.role = hodInfo.role;

    setIsProcessing(true);
    axios.post(`${serverUrl}/api/v1/ssmec/user/signup`, formData)
    .then(response => {
      if (response.status === 201) {
        setIsProcessing(false);
        ('hodToken', response.data.user.token);
        localStorage.setItem('hodData', JSON.stringify(response.data.user));
        setResponseMessage({ message: 'Account created', severity:'success'})
        setOpen(true);
        setTimeout(() => {
          window.location.replace(`/hod/${(response.data.user.department).split(' ').join('')}`);
        }, 3000)
      }
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
    <CenterFlexedContainer style={{ width: '100vw', height: '100vh', overflowY:'auto', background: "white" }}>
      <HorizontallyFlexSpaceBetweenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Helmet>
          <title>Complete your registration - Head of department</title>
          <meta name="description" content={`Create an account as a hod.`} /> 
        </Helmet>

        <AuthenticationFormContainer style={{ gap: '30px', position: 'relative' }}>
          <VerticallyFlexGapContainer style={{ gap: '10px' }}>
            <HeaderOne style={{ textAlign: 'center' }}>Complete account registration</HeaderOne>
            <p style={{ textAlign: 'center', lineHeight: '25px' }}>To continue, complete your registration by providing required information.</p>
          </VerticallyFlexGapContainer>
          <VerticallyFlexGapForm style={{ gap: '20px'}} onSubmit={handleSubmit}>
            <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
              {/* <FormElement style={{ color: 'gray' }}>
                <label htmlFor="registrationNumber">Registration number *</label>
                <input type="text" name="registrationNumber" id="registrationNumber" value={formData.registrationNumber || ''} onChange={handleFormInput} />
                {errors.registrationNumber && <p>Your registration number is required</p>}
              </FormElement> */}
              <FormElement style={{ color: 'gray' }}>
                <label htmlFor="phone">Phone number *</label>
                <input type="text" name="phone" id="phone" value={formData.phone || ''} onChange={handleFormInput} />
                {errors.phone && <p>Your phone number is required</p>}
              </FormElement>
            </HorizontallyFlexGapContainer>
            <FormElement style={{ color: 'gray' }}>
              <label htmlFor="faculty">Faculty *</label>
              <select id='faculty' name='faculty' onChange={handleFormInput}>
                  <option value="">Select faculty</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Theology">Theology</option>
                  <option value="Education">Education</option>
                  <option value="Health Sciences">Health Sciences</option>
              </select>
              {errors.faculty && <p>Faculty is required</p>}
            </FormElement>
            <FormElement style={{ color: 'gray' }}>
              <label htmlFor="department">Department *</label>
              <select id='department' name='department' onChange={handleFormInput}>
                  <option value="">Select department</option>
                  { formData.faculty === 'Information Technology' && 
                    AUCAFacultiesAndDepartments['Information Technology'].map((element, index) => {
                      return (
                        <option key={index} value={element}>{element}</option>
                      );
                    })
                  }
                  { formData.faculty === 'Business Administration' && 
                    AUCAFacultiesAndDepartments['Business Administration'].map((element, index) => {
                      return (
                        <option key={index} value={element}>{element}</option>
                      );
                    })
                  }
                  { formData.faculty === 'Theology' && <option value={'Theology'}>Theology</option>
                  }
                  { formData.faculty === 'Education' && 
                    AUCAFacultiesAndDepartments['Education'].map((element, index) => {
                      return (
                        <option key={index} value={element}>{element}</option>
                      );
                    })
                  }
                  { formData.faculty === 'Health Sciences' && 
                    AUCAFacultiesAndDepartments['Health Sciences'].map((element, index) => {
                      return (
                        <option key={index} value={element}>{element}</option>
                      );
                    })
                  }
              </select>
              {errors.department && <p>Faculty is required</p>}
            </FormElement>
            <FormElement>
              {isProcessing 
                ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                : <Button variant="contained" color="primary" size="medium" type="submit">CREATE ACCOUNT</Button>
              }
            </FormElement>
          </VerticallyFlexGapForm>
          <HorizontallyFlexSpaceBetweenContainer>
            <Link style={{ color: 'blue', fontSize:'90%', textDecoration: 'none', display: 'flex', flexDirection: 'row', gap: '10px', alignItems:'center' }} to={'/hod/auth/signup'}><ArrowBack />Go Back</Link>
          </HorizontallyFlexSpaceBetweenContainer>

        </AuthenticationFormContainer>
      </HorizontallyFlexSpaceBetweenContainer>
    </CenterFlexedContainer>
  )
}

export default CompleteAccount