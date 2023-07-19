import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import DeclareAbsenceForm from '../../components/forms/DeclareAbsenceFormPage1'
import { HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'

const DeclareAbsence = () => {
  const [page, setPage] = useState(1);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Declare Absence</title>
        <meta name="description" content={`Declare absence in exam.`} /> 
      </Helmet>
      <HorizontallyFlexSpaceBetweenContainer>
        <HeaderTwo>Declare absense</HeaderTwo>
      </HorizontallyFlexSpaceBetweenContainer>
      {page===1 && <DeclareAbsenceForm />}
      {page===2 && <DeclareAbsenceForm />}
    </VerticallyFlexGapContainer>
  )
}

export default DeclareAbsence