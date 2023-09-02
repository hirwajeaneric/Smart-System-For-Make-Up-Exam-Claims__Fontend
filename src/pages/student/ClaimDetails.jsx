import React, { useState, useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { FormElement, HeaderTwo, TopPageTitle, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { Helmet } from 'react-helmet-async'
import { AttachmentFile, ClaimDetailsContainer, ClaimDetailsItem } from '../../components/styles/PagesStyles';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { GeneralContext } from '../../App';
import { GrAttachment } from 'react-icons/gr';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrintTwo } from '../../components/ComponentToPrintTwo';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const ClaimDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const { setOpen, setResponseMessage} = useContext(GeneralContext);
  const [user, setUser] = useState({});
  const [claim, setClaim] = useState({});

  const [studentSignature, setStudentSignature] = useState('');
  const [examPermit, setExamPermit] = useState('');
  const [proofOfClaimPayment, setProofOfClaimPayment] = useState('');

  useEffect(() => {
    var currentUser = JSON.parse(localStorage.getItem('stdData'));
    setUser(currentUser);

    axios.get(`${serverUrl}/api/v1/ssmec/claim/findById?id=${params.claimId}`)
    .then(response => {
      response.data.claim.submitDate = new Date(response.data.claim.submitDate).toUTCString();
      setClaim(response.data.claim);
      dispatch({type: 'claim/setSelectedClaim', payload: response.data.claim});
    })
    .catch(error => console.error(error))
  }, [params.claimId]);

  const handleFormInput = (event) => {
    setStudentSignature(event.target.value);
  };

  const handleExamPermitCard = (e) => {
    setExamPermit(e.target.files[0]);
  } 

  const handleProofOfClaimPayment = (e) => {
    setProofOfClaimPayment(e.target.files[0]);
  } 


  // Submit claim updates
  const handleClaimUpdates = (e) => {
    e.preventDefault();

    if (!studentSignature && !examPermit && !proofOfClaimPayment) {
      setResponseMessage({ message: 'No modifications to update', severity:'warning'})
      setOpen(true);
    }

    var claimUpdates = {};
    var url = '';
    var config = {};

    if (studentSignature === 'Signed') {
      claimUpdates.status = 'In Progress';
    } else if (studentSignature === 'Rejected') {
      claimUpdates.status = 'Pending';
    }

    if (studentSignature) {
      claimUpdates.studentSignature = studentSignature;
      url = `${serverUrl}/api/v1/ssmec/claim/update?id=${params.claimId}`
    }
    if (examPermit || (examPermit && studentSignature)) {
      claimUpdates.examPermit = examPermit;
      url = `${serverUrl}/api/v1/ssmec/claim/updateWithExamPermit?id=${params.claimId}`
    }
    if (proofOfClaimPayment || (proofOfClaimPayment && studentSignature)) {
      claimUpdates.proofOfClaimPayment = proofOfClaimPayment;
      url = `${serverUrl}/api/v1/ssmec/claim/updateWithProofOfClaimPayment?id=${params.claimId}`
    }

    if (!examPermit && !proofOfClaimPayment) {
      config = {}
    } else {
      config = {
        headers: { "Content-Type":"multipart/form-data" }
      } 
    }

    setIsProcessing(true);
    axios.put(url, claimUpdates, config)
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

  // Delete functionality 
  const deleteClaim = (e) => {
    e.preventDefault();

    console.log(`${serverUrl}/api/v1/ssmec/claim/delete?id=${params.claimId}`)

    setIsProcessing2(true);
    axios.delete(`${serverUrl}/api/v1/ssmec/claim/delete?id=${params.claimId}`)
    .then(response => {
      window.location.replace(`/student/${params.registrationNumber}`);
      console.log(`/student/${params.registrationNumber}`);
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing2(false);
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
        <title>Claim details</title>
        <meta name="description" content={`More claim details.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <TopPageTitle>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <HeaderTwo style={{ width: '100%', fontWeight: '700', textAlign: 'left', fontSize: '150%' }}>Claim</HeaderTwo>
            <Button variant='text' color='inherit' onClick={handlePrint}>Print</Button>
          </div>
          {selectedClaim.status === 'Pending' && 
            <>{isProcessing2 
              ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
              : <Button variant="contained" color="error" size="small" type="button" onClick={deleteClaim}>DELETE</Button>}
            </>
          }
        </TopPageTitle>
        
        
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
            {selectedClaim.proofOfClaimPayment && <ClaimDetailsItem>
              <label>Proof of payment for claim:</label>
              <AttachmentFile>
                <GrAttachment />
                <a href={`${serverUrl}/api/v1/ssmec/uploads/${selectedClaim.proofOfClaimPayment}`}>Claim payment</a>
              </AttachmentFile>
            </ClaimDetailsItem>}
            {selectedClaim.attachment && <ClaimDetailsItem>
              <label>Attendance list:</label>
              <AttachmentFile>
                <GrAttachment />
                <a href={`${serverUrl}/api/v1/ssmec/uploads/${selectedClaim.attachment}`}>Attendance list</a>
              </AttachmentFile>
            </ClaimDetailsItem>}
          </div>
          
          
          <form className='last' onSubmit={handleClaimUpdates}>
            {selectedClaimHodSignature.signature !== 'None' && <ClaimDetailsItem>
              <label>Head of department's signature</label>
              <p>{selectedClaimHodSignature.signature}</p>  
            </ClaimDetailsItem>}
            {selectedClaimHodSignature.comment && <ClaimDetailsItem>
              <label>Head of department's Comment:</label>
              <p>{selectedClaimHodSignature.comment}</p>  
            </ClaimDetailsItem>}

            {selectedClaimAccountantSignature.signature !== 'None' && <ClaimDetailsItem>
              <label>Accountant's signature</label>
              <p>{selectedClaimAccountantSignature.signature}</p>  
            </ClaimDetailsItem>}
            {selectedClaimAccountantSignature.comment && <ClaimDetailsItem>
              <label>Accountant's Comment:</label>
              <p>{selectedClaimAccountantSignature.comment}</p>  
            </ClaimDetailsItem>}

            {selectedClaimDeanOfStudentsSignature.signature !== 'None' && <ClaimDetailsItem>
              <label>Dean of Student's signature</label>
              <p>{selectedClaimDeanOfStudentsSignature.signature}</p>  
            </ClaimDetailsItem>}
            {selectedClaimDeanOfStudentsSignature.comment && <ClaimDetailsItem>
              <label>Dean of Student's Comment:</label>
              <p>{selectedClaimDeanOfStudentsSignature.comment}</p>  
            </ClaimDetailsItem>}

            {selectedClaimRegistrationOfficerSignature.signature !== 'None' && <ClaimDetailsItem>
              <label>Registration office signature</label>
              <p>{selectedClaimRegistrationOfficerSignature.signature}</p>  
            </ClaimDetailsItem>}
            {selectedClaimRegistrationOfficerSignature.comment && <ClaimDetailsItem>
              <label>Registration office Comment:</label>
              <p>{selectedClaimRegistrationOfficerSignature.comment}</p>  
            </ClaimDetailsItem>}

            {selectedClaimExaminationOfficerSignature.signature !== 'None' && <ClaimDetailsItem>
              <label>Examination officer's signature</label>
              <p>{selectedClaimExaminationOfficerSignature.signature}</p>  
            </ClaimDetailsItem>}
            {selectedClaimExaminationOfficerSignature.comment && <ClaimDetailsItem>
              <label>Examination officer's Comment:</label>
              <p>{selectedClaimExaminationOfficerSignature.comment}</p>  
            </ClaimDetailsItem>}

            <h3>Update</h3>
            <FormElement>
              <label htmlFor="examPermit">Upload exam permit card</label>
              <input type="file" name="examPermit" id="examPermit" onChange={handleExamPermitCard}/>
            </FormElement>
            <FormElement>
              <label htmlFor="proofOfClaimPayment">Upload proof of payment for claim</label>
              <input type="file" name="proofOfClaimPayment" id="proofOfClaimPayment" onChange={handleProofOfClaimPayment}/>
            </FormElement>
            <ClaimDetailsItem>
              <p>I acccept terms and conditions regarding the claiming process and hereby confirm that the provided information and documents are correct.</p>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="studentSignature"
                  name="studentSignature"
                  value={studentSignature}
                  onChange={handleFormInput}
                >
                  <FormControlLabel value="Signed" control={<Radio />} size="small" label="Agree to continue" />
                  <FormControlLabel value="Rejected" control={<Radio />} size="small" label="Abandon claim" />
                </RadioGroup>
              </FormControl>
            </ClaimDetailsItem>
            {isProcessing 
              ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
              : <Button variant="contained" color="success" size="small" type="submit">Submit</Button>
            }
          </form>
        </ClaimDetailsContainer>
            
        {/* Report preview container */}
        <VerticallyFlexGapContainer style={{ display: 'none', gap: '20px', alignItems: 'flex-start', alignItems: 'center' }}>
          <ComponentToPrintTwo ref={componentRef} />      
        </VerticallyFlexGapContainer>

      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ClaimDetails