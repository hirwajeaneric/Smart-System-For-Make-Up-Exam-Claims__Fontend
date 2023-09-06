import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import AddUserForm from '../../components/forms/AddUserForm';

export default function AddUser() {
  const params = useParams();

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Add user</title>
        <meta name="description" content={`Add new user.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px'}}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ width: '100%', textAlign: 'left' }}>Add new user</h3>
            <Button variant='contained' color='secondary' size='small' onClick={() => window.location.replace(`/examinationoffice/${params.name}/user/list`)}>Back</Button>
        </div>
        <AddUserForm />
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}