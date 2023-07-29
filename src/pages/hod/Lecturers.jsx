import React from 'react'
import { Helmet } from 'react-helmet-async'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'

const Lecturers = () => {
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>List of lecturers</title>
        <meta name="description" content={`List of lecturers.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px' }}>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>List of lecturers</HeaderTwo>
        
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Lecturers