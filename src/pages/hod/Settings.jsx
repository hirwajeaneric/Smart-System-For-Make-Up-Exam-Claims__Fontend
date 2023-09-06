import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { getSelectedUser } from '../../redux/features/userSlice';
import UserAccountDataForm from '../../components/forms/UserAccountDataForm';

export default function Settings() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectedUser({ userId: JSON.parse(localStorage.getItem('hodData')).id }))
  }, [dispatch])

  const { isLoading, selectedUser } = useSelector(state => state.user);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>My account</title>
        <meta name="description" content={`My account.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px'}}>
      {isLoading ?  <p>Loading... </p> :
        <>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ width: '100%', textAlign: 'left' }}>User info</h3>
              <Button variant='contained' color='secondary' size='small' onClick={() => window.location.replace(`/examinationoffice/${params.name}/user/list`)}>Back</Button>
          </div>
          <UserAccountDataForm userInfo={selectedUser} />
        </>
      }
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}