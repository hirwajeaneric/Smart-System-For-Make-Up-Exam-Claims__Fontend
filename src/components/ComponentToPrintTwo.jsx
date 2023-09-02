import React, { useEffect, useState } from 'react'
import { ReportPaperContainer, TableList } from './styles/ReportStyledComponents';
import { useSelector } from 'react-redux';

export const ComponentToPrintTwo = React.forwardRef((props, ref) => {
    const [user, setUser] = useState({});

    // FETCHING CLAIMS INFORMATION.
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('stdData')));
    },[])

    const { 
        selectedClaim, 
        selectedClaimCourse, 
        selectedClaimCourseLecturer,
        selectedClaimHodSignature,
        selectedClaimRegistrationOfficerSignature,
        selectedClaimDeanOfStudentsSignature,
        selectedClaimAccountantSignature,
        selectedClaimExaminationOfficerSignature,
    } = useSelector(state => state.claim)

    return (
        <ReportPaperContainer ref={ref}>
            {/* GENERAL DETAILS ****************************************************************************************************************************** */}
            <img src='/AUCA-Header.png' alt='' style={{ width: '100%' }} />
            <div style={{ display: 'flex', flexDirection:'column', gap: '20px', marginBottom: '20px', alignItems:'flex-start', width:'100%'}}>
                <h2 style={{ width: '100%', fontSize: '120%', paddingBottom: '10px', textDecoration: 'underline', textAlign: 'center', borderTop: '20px' }}>
                    REQUEST FOR MAKE-UP EXAM
                </h2>
            
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '90%' }}>
                    <div style={{ marginBottom: '20px', width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <p>Student name: <strong>{selectedClaim.fullName}</strong></p>
                            <p>Faculty: <strong>{selectedClaim.faculty}</strong></p>
                            <p>Academic year: <strong>{selectedClaim.academicYear}</strong></p>
                        </div>
                        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <p>Registration number: <strong>{selectedClaim.registrationNumber}</strong></p>
                            <p>Department: <strong>{selectedClaim.department}</strong></p>
                            <p>Date: <strong>{selectedClaim.submitDate}</strong></p>
                        </div>
                    </div>

                    <p>I am applying for make up exam for the course listed bellow whose exam was done during<br/>
                        {selectedClaimCourse.period} period, semester {selectedClaim.semester}, academic year of {selectedClaim.academicYear}.
                    </p>
                    <p>Reason: <strong>{selectedClaimCourse.reason}</strong></p>
                    
                    <TableList style={{ margin: '20px 0', }}>
                        <thead>
                            <tr>
                                <th>Course code</th>
                                <th>Course name</th>
                                <th>Instructor Signature</th>
                                <th>Credits</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedClaimCourse.courseCode}</td>
                                <td>{selectedClaimCourse.courseName}</td>
                                <td>{selectedClaimCourseLecturer.signature}</td>
                                <td>{selectedClaimCourse.credits}</td>
                                <td>{selectedClaim.totalClaimCost}</td>
                            </tr>
                        </tbody>
                    </TableList>
                    
                    <p>Student signature: <strong>{selectedClaim.studentSignature}</strong>&nbsp;&nbsp;&nbsp;Date: <strong>{selectedClaim.submitDate}</strong></p>
                    <p>HOD/Dean signature: <strong>{selectedClaimHodSignature.signature}</strong>&nbsp;&nbsp;&nbsp;Date: <strong>{new Date(selectedClaimHodSignature.dateOfSignature).toUTCString()}</strong></p>
                    <p>Dean of students' signature: <strong>{selectedClaimDeanOfStudentsSignature.signature}</strong>&nbsp;&nbsp;&nbsp;Date: <strong>{new Date(selectedClaimDeanOfStudentsSignature.dateOfSignature).toUTCString()}</strong></p>
                    <p>Accountant's signature: <strong>{selectedClaimAccountantSignature.signature}</strong>&nbsp;&nbsp;&nbsp;Date: <strong>{new Date(selectedClaimAccountantSignature.dateOfSignature).toUTCString()}</strong></p>
                    <p>Examination officer's signature: <strong>{selectedClaimExaminationOfficerSignature.signature}</strong>&nbsp;&nbsp;&nbsp;Date: <strong>{new Date(selectedClaimExaminationOfficerSignature.dateOfSignature).toUTCString()}</strong></p>
                    <p>Registrar's signature: <strong>{selectedClaimRegistrationOfficerSignature.signature}</strong>&nbsp;&nbsp;&nbsp;Date: <strong>{new Date(selectedClaimRegistrationOfficerSignature.dateOfSignature).toUTCString()}</strong></p>
                </div>

            </div>
            <p style={{ fontSize: '90%' }}>Copyright {new Date().getFullYear()} &copy; Adventist University of Central Africa. All Rights Reserved. </p>
        </ReportPaperContainer>
    )
})