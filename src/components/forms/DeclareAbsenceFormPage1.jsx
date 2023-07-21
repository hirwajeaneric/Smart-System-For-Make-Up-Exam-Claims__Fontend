import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../App";
import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
import { AUCAFacultiesAndDepartments } from "../../utils/AUCAFacultiesAndDepartments";
import { useNavigate } from "react-router-dom";

export default function DeclareAbsenceFormPage1() {
    const { declarationFormData, setDeclarationFormData, declarationFormErrors, setDeclarationFormErrors } = useContext(GeneralContext);
    const navigate = useNavigate();
    
    const [user, setUser] = useState({});

    useEffect(() => {
        var localUser = JSON.parse(localStorage.getItem('stdData'));
        setUser(localUser);
        setDeclarationFormData({
            ...declarationFormData, 
            fullName: localUser.fullName,
            registrationNumber: localUser.registrationNumber,
            email: localUser.email,
            phone: localUser.phone
        })
    },[]);  

    const handleFormInput = ({ target: input}) => {
        setDeclarationFormData({...declarationFormData, [input.name]: input.value });
        setDeclarationFormErrors({});
    }

    const nextStep = () => {
        if (!declarationFormData.fullName) {
            setDeclarationFormErrors({...declarationFormErrors, fullName: 'Required'});
            return;
        }
        if (!declarationFormData.registrationNumber) {
            setDeclarationFormErrors({...declarationFormErrors, registrationNumber: 'Required'})
            return;
        }
        if (!declarationFormData.email) {
            setDeclarationFormErrors({...declarationFormErrors, email: 'Required'})
            return;
        } 
        if (!declarationFormData.phone) {
            setDeclarationFormErrors({...declarationFormErrors, phone: 'Required'})
            return;
        }
        if (!declarationFormData.faculty) {
            setDeclarationFormErrors({...declarationFormErrors, faculty: 'Required'});
            return;
        }
        if (!declarationFormData.department) {
            setDeclarationFormErrors({...declarationFormErrors, department: 'Required'})
            return;
        }
        if (!declarationFormData.academicYear) {
            setDeclarationFormErrors({...declarationFormErrors, academicYear: 'Required'})
            return;
        } 
        if (!declarationFormData.semester) {
            setDeclarationFormErrors({...declarationFormErrors, semester: 'Required'})
            return;
        }
        navigate(`/student/${user.registrationNumber}/declare/step2`);
    };

    return (
        <VerticallyFlexGapForm style={{ gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
            
            <VerticallyFlexGapContainer style={{ gap: '10px', borderBottom: '1px solid #b3d9ff', paddingBottom: '15px', width: '100%', alignItems: 'flex-start'}}>
                <HeaderTwo style={{ fontWeight: '600' }}>Step 1</HeaderTwo>
                <p style={{ textAlign:'left' }}>Basic information.</p>
            </VerticallyFlexGapContainer>
            

            <VerticallyFlexGapContainer style={{ gap: '15px' }}>
                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="fullName">Name *</label>
                        <input 
                            type="text" 
                            id="name"
                            placeholder="Full name" 
                            value={declarationFormData.fullName || ''}
                            name='fullName'
                            onChange={handleFormInput}
                        />
                        {declarationFormErrors.fullName && (<p>{declarationFormErrors.fullName}</p>)}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="registrationNumber">Registration Number *</label>
                        <input 
                            type="number" 
                            id="registrationNumber"
                            placeholder="Registration number" 
                            value={declarationFormData.registrationNumber || ''}
                            name='registrationNumber'
                            onChange={handleFormInput}
                        />
                        {declarationFormErrors.registrationNumber && (<p>{declarationFormErrors.registrationNumber}</p>)}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="email">Email address *</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="email" 
                            value={declarationFormData.email || ''}
                            name='email'
                            onChange={handleFormInput}
                        />
                        {declarationFormErrors.email && <p>{declarationFormErrors.email}</p>}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="phone">Phone number *</label>
                        <input 
                            type="text" 
                            id="phone"
                            placeholder="Phone number" 
                            value={declarationFormData.phone || ''}
                            name='phone'
                            onChange={handleFormInput}
                        />
                        {declarationFormErrors.phone && (<p>{declarationFormErrors.phone}</p>)}
                    </FormElement>
                </HorizontallyFlexGapContainer>

                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="faculty">Faculty *</label>
                        <select id='faculty' name='faculty' onChange={handleFormInput}>
                            <option value="">Select faculty</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Business Administration">Business Administration</option>
                            <option value="Theology">Theology</option>
                            <option value="Education">Education</option>
                            <option value="Health Sciences">Health Sciences</option>
                        </select>
                        {declarationFormErrors.faculty && <p>{declarationFormErrors.faculty}</p>}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="department">Department *</label>
                        <select id='department' name='department' onChange={handleFormInput}>
                            <option value="">Select department</option>
                            { declarationFormData.faculty === 'Information Technology' && 
                                AUCAFacultiesAndDepartments['Information Technology'].map((element, index) => {
                                return (
                                    <option key={index} value={element}>{element}</option>
                                );
                                })
                            }
                            { declarationFormData.faculty === 'Business Administration' && 
                                AUCAFacultiesAndDepartments['Business Administration'].map((element, index) => {
                                return (
                                    <option key={index} value={element}>{element}</option>
                                );
                                })
                            }
                            { declarationFormData.faculty === 'Theology' && <option value={'Theology'}>Theology</option>
                            }
                            { declarationFormData.faculty === 'Education' && 
                                AUCAFacultiesAndDepartments['Education'].map((element, index) => {
                                return (
                                    <option key={index} value={element}>{element}</option>
                                );
                                })
                            }
                            { declarationFormData.faculty === 'Health Sciences' && 
                                AUCAFacultiesAndDepartments['Health Sciences'].map((element, index) => {
                                return (
                                    <option key={index} value={element}>{element}</option>
                                );
                                })
                            }
                        </select>
                        {declarationFormErrors.department && <p>{declarationFormErrors.department}</p>}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="academicYear">Academic year *</label>
                        <input 
                            type="text" 
                            id="academicYear"
                            placeholder="Academic year" 
                            value={declarationFormData.academicYear || ''}
                            name='academicYear'
                            onChange={handleFormInput}
                        />
                        {declarationFormErrors.academicYear && (
                            <p>{declarationFormErrors.academicYear}</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="semester">Semester *</label>
                        <select 
                            id='semester'
                            name='semester'
                            onChange={handleFormInput}
                        >
                            <option value="">Choose semester</option>
                            <option value={'1'}>One</option>
                            <option value={'2'}>Two</option>
                            <option value={'3'}>Three</option>
                        </select>
                        {declarationFormErrors.semester && (
                            <p>{declarationFormErrors.semester}</p>
                        )}
                    </FormElement>
                </HorizontallyFlexGapContainer>

                <HorizontallyFlexGapContainer style={{ justifyContent: 'flex-end' }}> 
                    <Button variant="contained" color="primary" size="medium" type="button" onClick={() => nextStep()}>Next</Button>
                </HorizontallyFlexGapContainer>
            </VerticallyFlexGapContainer>
        </VerticallyFlexGapForm>
    )
}