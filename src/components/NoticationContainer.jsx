import React, { useState } from 'react'
import { HorizontallyFlexSpaceBetweenContainer } from './styles/GenericStyles';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

const NoticationContainer = (props) => {
    const params = useParams();
    // const { notification } = props;
    const [notification, setNotication] = useState({ text: 'New claim by Mukarugwiro Anges', createdOn: new Date().toDateString(), claimId: 'asdfa9343nseh343d3q43qrr4' })
    return (
    <HorizontallyFlexSpaceBetweenContainer style={{ background: '#cce6ff', border: '1px solid #004d99', color: '#004d99', padding: '10px' }}>
        <div className='left' style={{ gap: '20px' }}>
            {notification.text}
            <Link to={`/hod/${params.department}/claims/${notification.claimId}`}>More details</Link>
        </div>
        <div className='right'>
            <AiOutlineCloseCircle />
        </div>
    </HorizontallyFlexSpaceBetweenContainer>
  )
}

export default NoticationContainer