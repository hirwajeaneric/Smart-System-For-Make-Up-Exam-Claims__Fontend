import React from 'react'
import { Helmet } from 'react-helmet-async'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'

const Claims = () => {
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Claims</title>
        <meta name="description" content={`List of Claims.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px' }}>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>Claims</HeaderTwo>
        
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Claims