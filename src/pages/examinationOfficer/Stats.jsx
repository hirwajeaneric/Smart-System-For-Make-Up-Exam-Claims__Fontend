import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import ExaminationOfficersClaimsTable from '../../components/tables/ExaminationOfficersClaimsTable';

const Stats = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('regData'));
    setUser(user);
  },[]);

  const { isLoading, examinationOfficerClaims } = useSelector(state => state.claim);
 
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Examination Officer - Dashboard</title>
        <meta name="description" content={`Examination officer's dashboard.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px'}}>
        {isLoading ?  <p>Loading... </p> :
          <>
            <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>{`Welcome ${user.fullName}`}</HeaderTwo>
            <h3 style={{ width: '100%', textAlign: 'left' }}>{`Claims`}</h3>
            <ExaminationOfficersClaimsTable data={examinationOfficerClaims} />
          </>  
        }
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats