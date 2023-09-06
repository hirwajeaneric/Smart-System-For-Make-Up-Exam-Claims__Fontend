import { FormElement, HeaderTwo, HorizontallyFlexGapForm, HorizontallyFlexSpaceBetweenContainer, InformationDetails, VerticallyFlexGapContainer } from "../styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from "../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateUserForm(props) {
    const { user } = props;

    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const params = useParams();
    const [ isProcessing, setIsProcessing ] = useState({
        updating: false,
        removing: false
    });

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsProcessing({
            ...isProcessing, updating: true
        });

        axios.put(`${serverUrl}/api/v1/ssmec/user/update?id=${params.id}`, data)
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

    const deleteUser = (e) => {
        e.preventDefault();

        setIsProcessing({
            ...isProcessing, removing: true
        });

        axios.delete(`${serverUrl}/api/v1/ssmec/user/delete?id=${params.id}`)
        .then(response => {
            if (response.status === 200) {
                setIsProcessing({
                    ...isProcessing, removing: false
                });
                
                setResponseMessage({ message: response.data.message, severity: 'success' });
                setOpen(true);

                setTimeout(() => {
                    window.location.replace(`/examinationoffice/${params.name}/user/list`);
                }, 1500)
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setIsProcessing({
                    ...isProcessing, removing: false
                });
                setResponseMessage({ message: error.response.data.msg, severity: 'error' });
                setOpen(true);
            }
        })
    } 

    return (
        <VerticallyFlexGapContainer style={{ gap: '10px', padding: '15px', borderRadius: '5px', background: 'white' }}>
            <HorizontallyFlexGapForm style={{ gap: '10px', alignItems: 'flex-start' }} onSubmit={handleSubmit(onSubmit)}>
                <VerticallyFlexGapContainer style={{ gap: '10px' }}>
                    <InformationDetails>
                        <p className='left'>Name:</p>
                        <p className='right'>{user.fullName}</p>
                    </InformationDetails>
                    <InformationDetails>
                        <p className='left'>Email:</p>
                        <p className='right'>{user.email}</p>
                    </InformationDetails>
                    <InformationDetails>
                        <p className='left'>Phone number:</p>
                        <p className='right'>{user.phone}</p>
                    </InformationDetails>
                    <InformationDetails>
                        <p className='left'>Account status:</p>
                        <p className='right'>{user.status}</p>
                    </InformationDetails>
                </VerticallyFlexGapContainer>

                <VerticallyFlexGapContainer style={{ gap: '10px' }}>  
                    <FormElement>
                        <label htmlFor="status">Change account status</label>
                        <select {...register("status", { required: true })}>
                            <option value="">Choose status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </FormElement>
                    <HorizontallyFlexSpaceBetweenContainer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>  
                        {isProcessing.adding 
                            ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                            : <Button variant="contained" color="primary" size="small" type="submit">Update</Button>
                        }

                        {isProcessing.removing 
                            ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                            : <Button variant="contained" color="error" size="small" type="button" onClick={deleteUser}>Delete</Button>
                        }
                    </HorizontallyFlexSpaceBetweenContainer>
                </VerticallyFlexGapContainer>
            </HorizontallyFlexGapForm>
        </VerticallyFlexGapContainer>
    )
}