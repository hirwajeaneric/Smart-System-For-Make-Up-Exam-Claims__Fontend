import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { FormElement, HeaderTwo, TopPageTitle, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { Helmet } from 'react-helmet-async'
import { AttachmentFile, ClaimDetailsContainer, ClaimDetailsItem } from '../../components/styles/PagesStyles';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { GeneralContext } from '../../App';
import { GrAttachment } from 'react-icons/gr';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import lodash from 'lodash';

const ClaimDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [isProcessing, setIsProcessing] = useState(false);
  const { setOpen, setResponseMessage} = useContext(GeneralContext);
  const [user, setUser] = useState({});
  const [claim, setClaim] = useState({});

  // Manageable states
  const [signature, setSignature] = useState('');
  const [comment, setComment] = useState('');

  // Data fetching 
  useEffect(() => {
    var currentUser = JSON.parse(localStorage.getItem('accData'));
    setUser(currentUser);

    axios.get(`${serverUrl}/api/v1/ssmec/claim/findById?id=${params.claimId}`)
    .then(response => {
      response.data.claim.submitDate = new Date(response.data.claim.submitDate).toUTCString();
      delete response.data.claim.__v;
      setClaim(response.data.claim);
      dispatch({type: 'claim/setSelectedClaim', payload: response.data.claim});
    })
    .catch(error => console.error(error))
  }, [params.claimId]);


  const handleSignature = (event) => {
    setSignature(event.target.value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };
 

  // Submit claim updates ***************************************************************************************
  const handleClaimUpdates = (e) => {
    e.preventDefault();

    var updatedClaim = lodash.cloneDeep(claim); // Create a deep copy of claim

    if (!signature && !comment) {
      setResponseMessage({ message: 'No modifications to update', severity:'warning'})
      setOpen(true);
    }

    let accountant = {};

    if (signature === 'Signed') {
      accountant.signature = 'Signed';
    } else if (signature === 'Rejected') {
      accountant.signature = 'Rejected';
    }

    if (comment) {
      accountant.comment = comment;
    }

    if (signature) {
      accountant.dateOfSignature = new Date().toUTCString();
    }

    updatedClaim.accountantSignature = accountant;
    delete updatedClaim._id;
    delete updatedClaim.__v;
    
    console.log(updatedClaim.accountantSignature);

    setIsProcessing(true);

    // Executing the claim update
    axios.put(`${serverUrl}/api/v1/ssmec/claim/update?id=${params.claimId}`, updatedClaim)
    .then(response => {
      if (response.status === 200) {
        setIsProcessing(false);
        setResponseMessage({ message: response.data.message, severity: 'success'});
        setOpen(true);
        window.location.reload();
      }
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing(false);
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }}
    )
  }

  const { 
    isLoading, 
    selectedClaim, 
    selectedClaimCourse, 
    selectedClaimCourseLecturer,
    selectedClaimHodSignature,
    selectedClaimRegistrationOfficerSignature,
    selectedClaimDeanOfStudentsSignature,
    selectedClaimAccountantSignature,
    selectedClaimExaminationOfficerSignature,
  } = useSelector(state => state.claim)

  if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }


  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Accountant - Claim details</title>
        <meta name="description" content={`More claim details.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <TopPageTitle>
          <HeaderTwo style={{ width: '100%', fontWeight: '700', textAlign: 'left', fontSize: '150%' }}>Claim</HeaderTwo>
        </TopPageTitle>
        
        
        <ClaimDetailsContainer>
          <div className='first'>
            <ClaimDetailsItem>
              <label>Name of student</label>
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
            <ClaimDetailsItem>
              <label>Reason for absence:</label>
              <p>{selectedClaimCourse.reason}</p> 
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Student signature:</label>
              <p>{selectedClaim.studentSignature}</p> 
            </ClaimDetailsItem>
          </div>


          <div className='middle'>
            <ClaimDetailsItem>
              <label>Course name</label>
              <p>{selectedClaimCourse.courseName}</p>  
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Course code:</label>
              <p>{selectedClaimCourse.courseCode}</p> 
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Semester:</label>
              <p>{selectedClaimCourse.semester}</p> 
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Period:</label>
              <p>{selectedClaim.period}</p> 
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Number of credits:</label>
              <p>{selectedClaimCourse.credits}</p> 
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Claim cost:</label>
              <p>{Math.round(selectedClaim.totalClaimCost * 10) / 10}</p> 
            </ClaimDetailsItem>
            <ClaimDetailsItem>
              <label>Group:</label>
              <p>{selectedClaimCourse.group}</p> 
            </ClaimDetailsItem>
            {selectedClaimCourseLecturer.signature && <ClaimDetailsItem>
              <label>Lecturer signature:</label>
              <p>{selectedClaimCourseLecturer.signature}</p> 
            </ClaimDetailsItem>}
            {selectedClaimCourseLecturer.comment && <ClaimDetailsItem>
              <label>Lecturer comment:</label>
              <p>{selectedClaimCourse.lecturer.comment}</p> 
            </ClaimDetailsItem>}
            {selectedClaim.examPermit && <ClaimDetailsItem>
                <label>Exam permit card:</label>
                <AttachmentFile>
                  <GrAttachment />
                  <a href={`${serverUrl}/api/v1/ssmec/uploads/${selectedClaim.examPermit}`}>Examination permit card</a>
                </AttachmentFile>
            </ClaimDetailsItem>}
            {selectedClaim.absenceJustification && <ClaimDetailsItem>
              <label>Absence justification:</label>
              <AttachmentFile>
                <GrAttachment />
                <a href={`${serverUrl}/api/v1/ssmec/uploads/${selectedClaim.absenceJustification}`}>Absence justification</a>
              </AttachmentFile>
            </ClaimDetailsItem>}
            {selectedClaim.proofOfTuitionPayment && <ClaimDetailsItem>
              <label>Registration form:</label>
              <AttachmentFile>
                <GrAttachment />
                <a href={`${serverUrl}/api/v1/ssmec/uploads/${selectedClaim.proofOfTuitionPayment}`}>Registration form</a>
              </AttachmentFile>
            </ClaimDetailsItem>}
            {selectedClaim.attachment && <ClaimDetailsItem>
              <label>Attendance list:</label>
              <AttachmentFile>
                <GrAttachment />
                <a href={`${serverUrl}/api/v1/ssmec/uploads/${selectedClaim.attachment}`}>Attendance list</a>
              </AttachmentFile>
            </ClaimDetailsItem>}
            {selectedClaim.proofOfClaimPayment && <ClaimDetailsItem>
              <label>Proof of payment for claim:</label>
              <AttachmentFile>
                <GrAttachment />
                <a href={`${serverUrl}/api/v1/ssmec/uploads/${selectedClaim.proofOfClaimPayment}`}>Claim payment</a>
              </AttachmentFile>
            </ClaimDetailsItem>}
          </div>
          
          
          <form className='last' onSubmit={handleClaimUpdates}>
            <ClaimDetailsItem>
              <label>Head of department's signature</label>
              <p>{selectedClaimHodSignature.signature}</p>  
            </ClaimDetailsItem>
            {selectedClaimHodSignature.comment && <ClaimDetailsItem>
              <label>Head of department's Comment:</label>
              <p>{selectedClaimHodSignature.comment}</p>  
            </ClaimDetailsItem>}

            <ClaimDetailsItem>
              <label>Accountant's signature</label>
              <p>{selectedClaimAccountantSignature.signature}</p>  
            </ClaimDetailsItem>
            {selectedClaimAccountantSignature.comment && <ClaimDetailsItem>
              <label>Accountant's Comment:</label>
              <p>{selectedClaimAccountantSignature.comment}</p>  
            </ClaimDetailsItem>}

            <ClaimDetailsItem>
              <label>Dean of Student's signature</label>
              <p>{selectedClaimDeanOfStudentsSignature.signature}</p>  
            </ClaimDetailsItem>
            {selectedClaimDeanOfStudentsSignature.comment && <ClaimDetailsItem>
              <label>Dean of Student's Comment:</label>
              <p>{selectedClaimDeanOfStudentsSignature.comment}</p>  
            </ClaimDetailsItem>}

            <ClaimDetailsItem>
              <label>Registration office signature</label>
              <p>{selectedClaimRegistrationOfficerSignature.signature}</p>  
            </ClaimDetailsItem>
            {selectedClaimRegistrationOfficerSignature.comment && <ClaimDetailsItem>
              <label>Registration office Comment:</label>
              <p>{selectedClaimRegistrationOfficerSignature.comment}</p>  
            </ClaimDetailsItem>}

            <ClaimDetailsItem>
              <label>Examination officer's signature</label>
              <p>{selectedClaimExaminationOfficerSignature.signature}</p>  
            </ClaimDetailsItem>
            {selectedClaimExaminationOfficerSignature.comment && <ClaimDetailsItem>
              <label>Examination officer's Comment:</label>
              <p>{selectedClaimExaminationOfficerSignature.comment}</p>  
            </ClaimDetailsItem>}

            <h3>Update</h3>
            <ClaimDetailsItem>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="signature"
                  name="signature"
                  value={signature}
                  onChange={handleSignature}
                >
                  <FormControlLabel value="Signed" control={<Radio />} size="small" label="Approve claim" />
                  <FormControlLabel value="Rejected" control={<Radio />} size="small" label="Reject claim" />
                </RadioGroup>
              </FormControl>
            </ClaimDetailsItem>
            <FormElement>
              <label htmlFor="comment">Comment</label>
              <textarea id='comment' name='comment' placeholder='Add comment' value={comment} onChange={handleComment}></textarea>
            </FormElement>
            {isProcessing 
              ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
              : <Button variant="contained" color="success" size="small" type="submit">Submit</Button>
            }
          </form>
        </ClaimDetailsContainer>
      

      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ClaimDetails