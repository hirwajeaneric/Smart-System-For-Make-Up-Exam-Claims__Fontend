import React from 'react'
import { HeaderOne, HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { Helmet } from 'react-helmet-async'
import { TiTick } from 'react-icons/ti'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const SuccessPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Success - Claim declared successfully</title>
        <meta name="description" content={`Declare absence in exam.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'center' }}>
        <TiTick style={{ fontSize: '600%', marginTop: '50px', borderRadius: '50%', background: 'green', color: 'white', }}/>
        <HeaderOne style={{ width: '100%', textAlign: 'center' }}>Thank you for submitting!</HeaderOne>
        <Button type='button' variant='outlined' size='small'sx={{ mt: 2 }} onClick={() => navigate(`/student/${params.registrationNumber}/home`)} color='primary'>Go to your account</Button>
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default SuccessPage