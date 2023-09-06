import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexGapForm, HorizontallyFlexSpaceBetweenContainer, InformationDetails, VerticallyFlexGapContainer } from "../styles/GenericStyles"
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from "../../App";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserAccountDataForm(props) {
    const { userInfo } = props;

    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const params = useParams();
    const [ user, setUser ] = useState({});
    const [ isProcessing, setIsProcessing ] = useState({
        updating: false,
        passwordReset: false
    });

    useEffect(() => {
        setUser(userInfo);
    },[])

    const handleFormUpdates = ({ currentTarget: target }) => {
        setUser({...user, [target.name]:target.value})
    }

    const updatePersonalInfo = (e) => {
        e.preventDefault();

        setIsProcessing({
            ...isProcessing, updating: true
        });

        axios.put(`${serverUrl}/api/v1/ssmec/user/update?id=${params.id}`, user)
        .then(response => {
            if (response.status === 200) {
                setIsProcessing({
                    ...isProcessing, updating: false
                });
                
                setResponseMessage({ message: response.data.message, severity: 'success' });
                setOpen(true);

                setTimeout(() => {
                    window.location.replace(`/examinationoffice/${params.name}/user`);
                }, 1500)
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setIsProcessing({
                    ...isProcessing, updating: false
                });
                setResponseMessage({ message: error.response.data.msg, severity: 'error' });
                setOpen(true);
            }
        })
    };

    const changePassword = (e) => {
        e.preventDefault();

        setIsProcessing({
            ...isProcessing, passwordReset: true
        });

        axios.post(serverUrl+'/api/v1/ssmec/user/requestPasswordReset', { email: user.email })
        .then(response => {
            if (response.status === 200) {
                setIsProcessing({
                    ...isProcessing, passwordReset: true
                });
            
                setResponseMessage({message: response.data.message, severity:'success'});
            setOpen(true);
            
            setTimeout(()=> {
                window.location.replace('/examinationoffice/auth/signin');
            },1500)
            }
        })
        .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setIsProcessing({
                ...isProcessing, passwordReset: true
            });
            setResponseMessage({ message: error.response.data.msg, severity:'error'})
            setOpen(true);
        }
        })
    } 

    return (
        <VerticallyFlexGapContainer style={{ gap: '10px', padding: '15px', borderRadius: '5px', background: 'white' }}>
            <HorizontallyFlexGapForm style={{ gap: '10px', alignItems: 'flex-start' }} onSubmit={updatePersonalInfo}>
                <VerticallyFlexGapContainer style={{ gap: '10px' }}>
                    {userInfo.registrationNumber && 
                        <InformationDetails>
                            <p className='left'>Registration number:</p>
                            <p className='right'>{userInfo.registrationNumber}</p>
                        </InformationDetails>
                    }
                    <InformationDetails>
                        <p className='left'>Name:</p>
                        <p className='right'>{userInfo.fullName}</p>
                    </InformationDetails>
                    <InformationDetails>
                        <p className='left'>Email:</p>
                        <p className='right'>{userInfo.email}</p>
                    </InformationDetails>
                    <InformationDetails>
                        <p className='left'>Phone number:</p>
                        <p className='right'>{userInfo.phone}</p>
                    </InformationDetails>
                    <InformationDetails>
                        <p className='left'>Account status:</p>
                        <p className='right'>{userInfo.status}</p>
                    </InformationDetails>
                    {userInfo.faculty && 
                        <InformationDetails>
                            <p className='left'>Faculty:</p>
                            <p className='right'>{userInfo.faculty}</p>
                        </InformationDetails>
                    }
                    {userInfo.department && 
                        <InformationDetails>
                            <p className='left'>Department:</p>
                            <p className='right'>{userInfo.department}</p>
                        </InformationDetails>
                    }
                </VerticallyFlexGapContainer>

                <VerticallyFlexGapContainer style={{ gap: '10px' }}> 
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <HeaderTwo>Edit</HeaderTwo>
                        <Button variant='text' color='secondary' size='small' type="button" onClick={changePassword}>Request password change</Button>
                    </div> 
                    
                    <HorizontallyFlexGapContainer style={{ gap: '10px' }}>
                        <FormElement style={{ color: 'gray' }}>
                            <label htmlFor="fullName">Full name</label>
                            <input 
                                style={inputStyles}
                                type="text" 
                                id="fullName"
                                minLength='3'
                                placeholder="Name" 
                                name='fullName'
                                value={user.fullName || ""} 
                                onChange={handleFormUpdates}
                            />
                        </FormElement>
                        <FormElement style={{ color: 'gray' }}>
                            <label htmlFor="phone">Phone number</label>
                            <input 
                                type="text" 
                                id="phone" 
                                name='phone'
                                maxLength='10'
                                minLength='10'
                                value={user.phone || ""} 
                                onChange={handleFormUpdates}
                            />
                        </FormElement>
                    </HorizontallyFlexGapContainer>
                    
                    <HorizontallyFlexGapContainer style={{ gap: '10px' }}>
                        <FormElement style={{ color: 'gray' }}>
                            <label htmlFor="email">Email address</label>
                            <input 
                                type="text" 
                                id="email" 
                                name='email'
                                value={user.email || ""} 
                                onChange={handleFormUpdates}
                            />
                        </FormElement>
                    </HorizontallyFlexGapContainer>

                    <HorizontallyFlexGapContainer style={{ gap: '10px' }}>
                    
                    </HorizontallyFlexGapContainer>
                    
                    <HorizontallyFlexSpaceBetweenContainer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>  
                        {isProcessing.adding 
                            ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                            : <Button variant="contained" color="primary" size="small" type="submit">Update</Button>
                        }
                    </HorizontallyFlexSpaceBetweenContainer>
                </VerticallyFlexGapContainer>
            </HorizontallyFlexGapForm>
        </VerticallyFlexGapContainer>
    )
}