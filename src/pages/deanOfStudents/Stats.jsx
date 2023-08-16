import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import DosClaimsTable from '../../components/tables/DosClaimsTable';

const Stats = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('dosData'));
    setUser(user);
  },[]);

  const { isLoading, deanOfStudentsClaims } = useSelector(state => state.claim);
 
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Dean of Students - Dashboard</title>
        <meta name="description" content={`Dean of Students' dashboard.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px'}}>
        {isLoading ?  <p>Loading... </p> :
          <>
            <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>{`Welcome ${user.fullName}`}</HeaderTwo>
            <h3 style={{ width: '100%', textAlign: 'left' }}>{`Claims`}</h3>
            <DosClaimsTable data={deanOfStudentsClaims} />
          </>  
        }
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats