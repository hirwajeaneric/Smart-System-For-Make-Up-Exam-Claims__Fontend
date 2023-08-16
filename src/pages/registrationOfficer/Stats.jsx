import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import RegistrationOfficersClaimsTable from '../../components/tables/RegistrationOfficersClaimsTable';

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
        <title>Registration Officer - Dashboard</title>
        <meta name="description" content={`Registration officer's dashboard.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px'}}>
        {isLoading ?  <p>Loading... </p> :
          <>
            <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>{`Welcome ${user.fullName}`}</HeaderTwo>
            <h3 style={{ width: '100%', textAlign: 'left' }}>{`Claims`}</h3>
            <RegistrationOfficersClaimsTable data={examinationOfficerClaims} />
          </>  
        }
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats