import React from 'react'
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles';

const DeclareAbsence = () => {
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Declare Absence</title>
        <meta name="description" content={`Declare absence in exam.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px' }}>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>Declare absense</HeaderTwo>
        <Outlet />
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default DeclareAbsence