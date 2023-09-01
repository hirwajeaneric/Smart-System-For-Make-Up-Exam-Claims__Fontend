import React, { useEffect, useState } from 'react'
import { HorizontallyFlexSpaceBetweenContainer } from './styles/GenericStyles';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useContext } from "react";
import { useDispatch } from 'react-redux';
import { GeneralContext } from "../App";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { getNotificationsForUser } from "../redux/features/notificationSlice";

const NoticationContainer = (props) => {
    const params = useParams();
    const { notification } = props;
    const [user, setUser] = useState({});
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const dispatch = useDispatch();

    useEffect(() => {
        var user = JSON.parse(localStorage.getItem('hodData'));
        setUser(user);
    },[]);

    const closeNotification = (e) => {
        e.preventDefault();

        axios.put(`${serverUrl}/api/v1/ssmec/notification/update?id=${notification.id}`, { status: 'Seen' })
        .then(response => {
            if (response.status === 200) {
                console.log(response.data.message);
                dispatch(getNotificationsForUser({ role: user.role, department: user.department }))
                // window.location.reload();
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setResponseMessage({ message: error.response.data.msg, severity:'error'})
                setOpen(true);
            }}
        )    
    }

    return (
        <HorizontallyFlexSpaceBetweenContainer style={{ background: '#cce6ff', border: '1px solid #004d99', color: '#004d99', padding: '10px' }}>
            <div className='left' style={{ gap: '20px' }}>
                {notification.text}
                <Link to={`/hod/${params.department}/claims/${notification.claimId}`}>More details</Link>
            </div>
            <div className='right'>
                <AiOutlineCloseCircle style={{ cursor: 'pointer' }} onClick={closeNotification}/>
            </div>
        </HorizontallyFlexSpaceBetweenContainer>
    )
}

export default NoticationContainer