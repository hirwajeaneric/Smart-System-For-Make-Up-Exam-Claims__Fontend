import React from 'react'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import StudentClaimTable from '../../components/tables/StudentClaimTable'

const Stats = () => {
  
  const { studentClaims } = useSelector(state => state.claim);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Declare Absence</title>
        <meta name="description" content={`Declare absence in exam.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <HeaderTwo style={{ width: '100%', textAlign: 'left', fontSize: '200%' }}>{`Welcome ${JSON.parse(localStorage.getItem('stdData')).fullName}`}</HeaderTwo>
        <p>Bellow is a list of your claims</p>
        {/* {studentClaims.length > 0 && <StudentClaimTable data={studentClaims}/>} */}
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats