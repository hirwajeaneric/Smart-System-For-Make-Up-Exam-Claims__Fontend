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
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
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
                    
                </div>

            </div>
            <p style={{ fontSize: '90%' }}>Copyright {new Date().getFullYear()} &copy; Adventist University of Central Africa. All Rights Reserved. </p>
        </ReportPaperContainer>
    )
})