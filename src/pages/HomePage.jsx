import React from 'react'
import { CenterFlexedContainer, HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from '../components/styles/GenericStyles'
import { Helmet } from 'react-helmet-async'
import { AuthenticationFormContainer } from '../components/styles/AuthenticationPagesStyles'
import { Link } from 'react-router-dom'

const HomePage = () => {
    
    return (
        <CenterFlexedContainer style={{ width: '100vw', height: '100vh', overflowY:'auto', background: "url('/auca-gishushu-campus.jpeg'), rgba(0,0,0,.4)", backgroundBlendMode:'color-dodge', backgroundSize: 'cover', backgroundRepeat:'no-repeat', backgroundOrigin: 'unset' }}>
            <Helmet>
                <title>Welcome to SSMEC</title>
                <meta name="description" content={`Declare absence in exam.`} /> 
            </Helmet>
            <HorizontallyFlexSpaceBetweenContainer style={{ justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                <AuthenticationFormContainer style={{ borderBottom: '6px solid blue', gap: '30px', position: 'relative', boxShadow: 'rgba(0, 0, 0, 0.05) 0 6px 24px, rgba(0, 0, 0, 0.08) 0 5px 12px 1px' }}>
                    <VerticallyFlexGapContainer style={{ gap: '30px' }}>
                        <img style={{ width: '90%' }} src="/ssmec-logo-2.png" alt="" />
                        
                        <HeaderTwo style={{ fontWeight: '600', color: 'black', textAlign: 'center' }}>Welcome to Smart System for Make up Exams Claim </HeaderTwo>
                        
                        <VerticallyFlexGapContainer style={{ gap: '10px' }}>
                            <Link style={{ color: 'blue', textDecoration: 'none', fontSize:'90%' }} target='_blank' to={'/student/auth/signin'}>Student</Link>
                            <Link style={{ color: 'blue', textDecoration: 'none', fontSize:'90%' }} target='_blank' to={'/teacher/auth/signin'}>Teacher</Link>
                            <Link style={{ color: 'blue', textDecoration: 'none', fontSize:'90%' }} target='_blank' to={'/hod/auth/signin'}>Head of Department</Link>
                            <Link style={{ color: 'blue', textDecoration: 'none', fontSize:'90%' }} target='_blank' to={'/accountant/auth/signin'}>Accountant</Link>
                            <Link style={{ color: 'blue', textDecoration: 'none', fontSize:'90%' }} target='_blank' to={'/dos/auth/signin'}>Dean of students</Link>
                            <Link style={{ color: 'blue', textDecoration: 'none', fontSize:'90%' }} target='_blank' to={'/examinationoffice/auth/signin'}>Examination office</Link>
                            <Link style={{ color: 'blue', textDecoration: 'none', fontSize:'90%' }} target='_blank' to={'/registration/auth/signin'}>Registration office</Link>
                        </VerticallyFlexGapContainer>

                    </VerticallyFlexGapContainer>
                </AuthenticationFormContainer>
            </HorizontallyFlexSpaceBetweenContainer>
        </CenterFlexedContainer>
    )
}

export default HomePage