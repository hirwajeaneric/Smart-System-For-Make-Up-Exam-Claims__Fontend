import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import UserTable from '../../components/tables/UserTable';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const Stats = () => {
  const [user, setUser] = useState({});
  const params = useParams();
  
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('exoData'));
    setUser(user);
  },[]);

  const { isLoading, allUsers } = useSelector(state => state.user);
 
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Users</title>
        <meta name="description" content={`All system users.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px'}}>
        {isLoading ?  <p>Loading... </p> :
          <>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ width: '100%', textAlign: 'left' }}>Users</h3>
                <Button variant='contained' color='primary' size='small' onClick={() => window.location.replace(`/examinationoffice/${params.name}/user/new`)}>Add</Button>
            </div>
            <UserTable data={allUsers} />
          </>  
        }
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats