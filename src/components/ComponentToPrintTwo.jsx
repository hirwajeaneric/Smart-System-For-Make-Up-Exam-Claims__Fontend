import React, { useEffect, useState } from 'react'
import { ReportPaperContainer, TableList } from './styles/ReportStyledComponents';
import { useSelector } from 'react-redux';

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const [user, setUser] = useState({});

    // FETCHING CLAIMS INFORMATION.
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('hodData')));
    },[])

    const { hodClaims, filterPeriod } = useSelector(state => state.claim);

    return (
        <ReportPaperContainer ref={ref}>
            {/* GENERAL DETAILS ****************************************************************************************************************************** */}
            <img src='/AUCA-Header.png' alt='' style={{ width: '100%' }} />
            <div style={{ display: 'flex', flexDirection:'column', gap: '20px', marginBottom: '20px', alignItems:'flex-start', width:'100%'}}>
                <h2 style={{ width: '100%', fontSize: '120%', paddingBottom: '10px', textDecoration: 'underline', textAlign: 'center', borderTop: '20px' }}>
                    Faculy of {user.faculty}
                </h2>
                <h3 style={{ width: '100%', textAlign: 'center'}}>
                    MAKE UP CLAIMS &nbsp;
                    {filterPeriod.academicYear && <>FOR SEMESTER {filterPeriod.semester}, ACADEMIC YEAR {filterPeriod.academicYear}</>}
                </h3>
                <TableList>
                    <thead>
                        <tr>
                            <th>Semester</th>
                            <th>Academic Year</th>
                            <th>Student</th>
                            <th>Course</th>
                            <th>Submitted on</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hodClaims.map((claim, index) => {
                            return (
                                <tr key={index}>
                                    <td>{claim.semester}</td>
                                    <td>{claim.academicYear}</td>
                                    <td>{claim.fullName}</td>
                                    <td>{claim.course}</td>
                                    <td>{claim.submitDate}</td>
                                    <td>{claim.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TableList>
            </div>
            <p style={{ fontSize: '90%' }}>Copyright {new Date().getFullYear()} &copy; Adventist University of Central Africa. All Rights Reserved. </p>
        </ReportPaperContainer>
    )
})