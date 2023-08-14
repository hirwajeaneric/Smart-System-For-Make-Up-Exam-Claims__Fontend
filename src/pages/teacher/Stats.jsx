import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import TeacherClaimsTable from '../../components/tables/TeacherClaimsTable';

const Stats = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('teaData'));
    setUser(user);
  },[]);

  const { coursesForSelectedTeacher } = useSelector(state => state.course);
 
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Teacher - Dashboard</title>
        <meta name="description" content={`Teacher dashboard.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px'}}>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>{`Welcome ${user.fullName}`}</HeaderTwo>
        <h3 style={{ width: '100%', textAlign: 'left' }}>Your claims</h3>
        {isLoading ?  <p>Loading... </p> :<TeacherClaimsTable data={teacherClaims} />}
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats