import React, { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import HODClaimsTable from '../../components/tables/HODClaimsTable';
import NoticationContainer from '../../components/NoticationContainer';

const Stats = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('hodData'));
    setUser(user);
  },[]);

  const { isLoading, hodClaims } = useSelector(state => state.claim);
  const { numberOfNotificationsForUser, notificationsForUser } = useSelector(state => state.notification);
 
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Hod - Dashboard</title>
        <meta name="description" content={`HOD dashboard.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px'}}>
        {isLoading ?  <p>Loading... </p> :
          <>
            {numberOfNotificationsForUser > 0 && notificationsForUser.map((notification, index) => {
              if (notification.status === 'Seen') {
                return (<Fragment key={index}></Fragment>)
              }
              return (
                <NoticationContainer key={index} notification={notification}/>
              )
            })}
            <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>{`Welcome ${user.fullName}`}</HeaderTwo>

            <h3 style={{ width: '100%', textAlign: 'left' }}>{`Claims in ${user.department}`}</h3>
                  
            <HODClaimsTable data={hodClaims} />

            {/* Report preview container */}
            

          </>  
        }
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats