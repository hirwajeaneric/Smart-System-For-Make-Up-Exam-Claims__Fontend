import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import HODClaimsTable from '../../components/tables/HODClaimsTable';

const Stats = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('hodData'));
    setUser(user);
  },[]);

  const { isLoading, hodClaims } = useSelector(state => state.claim);
 
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Hod - Dashboard</title>
        <meta name="description" content={`HOD dashboard.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px'}}>
        {isLoading ?  <p>Loading... </p> :
          <>
            <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>{`Welcome ${user.fullName}`}</HeaderTwo>
            <h3 style={{ width: '100%', textAlign: 'left' }}>{`Claims in ${user.department}`}</h3>
            <HODClaimsTable data={hodClaims} />
          </>  
        }
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats