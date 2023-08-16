import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import AccountantClaimsTable from '../../components/tables/AccountantClaimsTable';

const Stats = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('accData'));
    setUser(user);
  },[]);

  const { isLoading, accountantClaims } = useSelector(state => state.claim);
 
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Accountant - Dashboard</title>
        <meta name="description" content={`Accountant dashboard.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px'}}>
        {isLoading ?  <p>Loading... </p> :
          <>
            <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>{`Welcome ${user.fullName}`}</HeaderTwo>
            <h3 style={{ width: '100%', textAlign: 'left' }}>{`Claims`}</h3>
            <AccountantClaimsTable data={accountantClaims} />
          </>  
        }
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats