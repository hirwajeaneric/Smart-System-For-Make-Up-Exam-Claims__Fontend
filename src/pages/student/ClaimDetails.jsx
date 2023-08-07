import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { Helmet } from 'react-helmet-async'
import { ClaimDetailsContainer, ClaimDetailsItem } from '../../components/styles/PagesStyles';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const ClaimDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    var currentUser = JSON.parse(localStorage.getItem('stdData'));
    setUser(currentUser);

    axios.get(`${serverUrl}/api/v1/ssmec/claim/findById?id=${params.claimId}`)
    .then(response => {
      response.data.claim.submitDate = new Date(response.data.claim.submitDate).toUTCString();
      dispatch({type: 'claim/setSelectedClaim', payload: response.data.claim});
    })
    .catch(error => console.error(error))
  }, [params.claimId]);


  const { isLoading, selectedClaim } = useSelector(state => state.claim)


  if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }


  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Claim details</title>
        <meta name="description" content={`More claim details.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <HeaderTwo style={{ width: '100%', fontWeight: '700', textAlign: 'left', fontSize: '150%' }}>Claim</HeaderTwo>
        
        <ClaimDetailsContainer>
          <div className='first'>
            <ClaimDetailsItem>
              <label>Name</label>
              <p>{selectedClaim.fullName}</p>  
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Registration number</label>
              <p>{selectedClaim.registrationNumber}</p>  
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Faculty</label>
              <p>{selectedClaim.faculty}</p>  
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Department</label>
              <p>{selectedClaim.department}</p>  
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Phone number</label>
              <p>{selectedClaim.phone}</p>  
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Email</label>
              <p>{selectedClaim.email}</p>  
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Academic year</label>
              <p>{selectedClaim.academicYear}</p>  
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Semester:</label>
              <p>{selectedClaim.semester}</p>  
            </ClaimDetailsItem>
          </div>



          <div className='middle'>
            <ClaimDetailsItem>
              <label>Academic year</label>
              <p>{selectedClaim.academicYear}</p>  
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Semester:</label>
              <p>{selectedClaim.semester}</p>  
            </ClaimDetailsItem>
          </div>
          
          
          <form className='last'>
            <ClaimDetailsItem>
              <label>Academic year</label>
              <p>{selectedClaim.academicYear}</p>  
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Semester:</label>
              <p>{selectedClaim.semester}</p>  
            </ClaimDetailsItem>
          </form>
        </ClaimDetailsContainer>
      
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ClaimDetails