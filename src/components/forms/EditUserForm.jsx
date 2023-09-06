import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from "../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { AUCAFacultiesAndDepartments } from "../../utils/AUCAFacultiesAndDepartments";
import { useParams } from "react-router-dom";

export default function EditUserForm() {
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const params = useParams();
    const [ isProcessing, setIsProcessing ] = useState({
        adding: false,
        removing: false
    });
    const [ formInputs, setFormInputs ] = useState({});
    const [ formInputErrors, setFormInputErrors ] = useState({});

    const handleFormInputs = ({ currentTarget: target}) => {
        setFormInputs({ ...formInputs, [target.name]: target.value });
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsProcessing({
            ...isProcessing, adding: true
        });

        const formData = data;
        formData.role = formInputs.role;

        if (formInputs.role === 'Head of Department') {
            formData.faculty = formInputs.faculty;
            formData.department = formInputs.department;
        }

        console.log(formData);

        axios.post(`${serverUrl}/api/v1/ssmec/user/add`, formData)
        .then(response => {
            if (response.status === 201) {
                setIsProcessing({
                    ...isProcessing, adding: false
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
                    ...isProcessing, adding: false
                });
                setResponseMessage({ message: error.response.data.msg, severity: 'error' });
                setOpen(true);
            }
        })
    };

    return (
        <VerticallyFlexGapContainer style={{ gap: '10px', padding: '15px', borderRadius: '5px', background: 'white' }}>
            <HeaderTwo style={{ width: '100%', fontSize: '100%', textAlign: 'left' }}>Register</HeaderTwo>
            <VerticallyFlexGapForm style={{ gap: '10px' }} onSubmit={handleSubmit(onSubmit)}>
                <HorizontallyFlexGapContainer style={{ gap: '10px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="fullName">Full name</label>
                        <input 
                            type="text" 
                            id="fullName"
                            minLength='3'
                            placeholder="Name" 
                            {...register("fullName", 
                            {required: true})} 
                            aria-invalid={errors.fullName ? "true" : "false"}
                        />
                        {errors.fullName?.type === "required" && (
                            <p role="alert">Full name is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            id="email"
                            minLength='8'
                            placeholder="Email" 
                            {...register("email", 
                            {required: true})} 
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email?.type === "required" && (
                            <p role="alert">Email is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="phone">Phone number</label>
                        <input 
                            type="phone" 
                            id="phone"
                            maxLength='10'
                            placeholder="Phone" 
                            {...register("phone")} 
                        />
                    </FormElement>
                </HorizontallyFlexGapContainer>

                <HorizontallyFlexGapContainer style={{ gap: '10px' }}>  
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="text"
                            id="password" 
                            minLength='8'
                            placeholder="Password" 
                            {...register("password", {required: true})} 
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password?.type === "required" && (
                            <p role="alert">Password is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="role">Role</label>
                        <select name='role' id='role' onChange={handleFormInputs}>
                            <option value="">Choose role</option>
                            <option value="Accountant">Accountant</option>
                            <option value='Dean of Students'>Dean of Students</option>
                            <option value="Examination Officer">Examination Officer</option>
                            <option value="Head of Department">Head of Department</option>
                            <option value='Registration Officer'>Registration Officer</option>
                            <option value='Teacher'>Instructor</option>
                        </select>
                        {formInputErrors.role && (
                            <p role="alert">Required</p>
                        )}
                    </FormElement>
                </HorizontallyFlexGapContainer>
                
                {formInputs.role === 'Head of Department' && <HorizontallyFlexGapContainer style={{ gap: '10px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="faculty">Faculty *</label>
                        <select id='faculty' name='faculty' onChange={handleFormInputs}>
                            <option value="">Select faculty</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Business Administration">Business Administration</option>
                            <option value="Theology">Theology</option>
                            <option value="Education">Education</option>
                            <option value="Health Sciences">Health Sciences</option>
                        </select>
                        {formInputErrors.faculty && <p>Faculty is required</p>}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="department">Department *</label>
                        <select id='department' name='department' onChange={handleFormInputs}>
                            <option value="">Select department</option>
                            { formInputs.faculty === 'Information Technology' && 
                                AUCAFacultiesAndDepartments['Information Technology'].map((element, index) => {
                                return (
                                    <option key={index} value={element}>{element}</option>
                                );
                                })
                            }
                            { formInputs.faculty === 'Business Administration' && 
                                AUCAFacultiesAndDepartments['Business Administration'].map((element, index) => {
                                return (
                                    <option key={index} value={element}>{element}</option>
                                );
                                })
                            }
                            { formInputs.faculty === 'Theology' && <option value={'Theology'}>Theology</option>
                            }
                            { formInputs.faculty === 'Education' && 
                                AUCAFacultiesAndDepartments['Education'].map((element, index) => {
                                return (
                                    <option key={index} value={element}>{element}</option>
                                );
                                })
                            }
                            { formInputs.faculty === 'Health Sciences' && 
                                AUCAFacultiesAndDepartments['Health Sciences'].map((element, index) => {
                                return (
                                    <option key={index} value={element}>{element}</option>
                                );
                                })
                            }
                        </select>
                        {formInputErrors.department && <p>Faculty is required</p>}
                    </FormElement>
                </HorizontallyFlexGapContainer>}

                <HorizontallyFlexSpaceBetweenContainer style={{ gap: '10px' }}>  
                    {isProcessing.adding 
                        ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                        : <Button variant="contained" color="primary" size="small" type="submit">Register</Button>
                    }
                </HorizontallyFlexSpaceBetweenContainer>
            </VerticallyFlexGapForm>
        </VerticallyFlexGapContainer>
    )
}