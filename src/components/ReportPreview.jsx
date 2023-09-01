import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../components/ComponentToPrint';

const ReportPreview = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current
  });

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Report preview </strong></HeaderTwo>
        <Button variant='contained' size='small' color='secondary' onClick={handlePrint}>Print</Button>
      </div>

      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start', alignItems: 'center' }}>
        <ComponentToPrint ref={componentRef} />      
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ReportPreview