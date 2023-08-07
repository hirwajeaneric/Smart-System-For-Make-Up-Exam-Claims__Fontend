import React, { useState, useEffect } from 'react'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import StudentClaimTable from '../../components/tables/StudentClaimTable'
import { StudentDashboardInformationContainer } from '../../components/styles/PagesStyles';

const Stats = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('stdData')));
  }, [])

  const { isLoading, studentClaims } = useSelector(state => state.claim);

  if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Declare Absence</title>
        <meta name="description" content={`Declare absence in exam.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <HeaderTwo style={{ width: '100%', textAlign: 'left', fontSize: '200%' }}>{`Welcome ${JSON.parse(localStorage.getItem('stdData')).fullName}`}</HeaderTwo>
        <StudentDashboardInformationContainer>
          <div className='left'>
            <p>Registration Number: <strong>{user.registrationNumber}</strong></p>
            <p>Faculty: <strong>{user.faculty}</strong></p>
            <p>Department: <strong>{user.department}</strong></p>
          </div>
          <div className='right'>
            <p>Phone Number: <strong>{user.phone}</strong></p>
            <p>Email: <strong>{user.email}</strong></p>
          </div>
        </StudentDashboardInformationContainer>
        <p>Bellow is a list of your claims</p>
      
        {studentClaims.length === 0 && 
          <VerticallyFlexGapContainer>
            <p>No claims available</p>
          </VerticallyFlexGapContainer>
        }

        {studentClaims.length > 0 && 
          // <VerticallyFlexGapContainer style={{ padding: '10px', background: 'white', borderRadius: '5px', width: '100%'  }}>
            <StudentClaimTable data={studentClaims}/>
          // </VerticallyFlexGapContainer>
        }
      
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats