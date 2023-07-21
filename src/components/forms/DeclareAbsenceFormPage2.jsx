import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../App";
import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStudentClaims } from "../../redux/features/claimSlice";

export default function DeclareAbsenceFormPage2() {
    const { 
        setOpen, 
        setResponseMessage, 
        declarationFormData, 
        setDeclarationFormData, 
        declarationFormErrors, 
        setDeclarationFormErrors, 
        proofOfTuitionPayment, 
        setProofOfTuitionPayment, 
        numberOfCourses, 
        setNumberOfCourses,
        courseOne,
        setCourseOne,
        courseTwo,
        setCourseTwo,
        courseThree,
        setCourseThree
    } = useContext(GeneralContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isProcessing, setIsProcessing] = useState(false);
    const [user, setUser] = useState({});



    // FETCH USER DATA ****************************************************************************
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('student')));
    },[]);  



    // INPUT FORM HANDLES *************************************************************************
    const handleFormInput = ({ target: input}) => {
        setDeclarationFormData({...declarationFormData, [input.name]: input.value });
        setDeclarationFormErrors({});
    }

    const handleNumberOfCourses = ({ target: input}) => {
        setNumberOfCourses(input.value);
    }

    const handleCourseOne = ({ target: input}) => {
        setCourseOne({...courseOne, [input.name]:input.value});
    }

    const handleCourseTwo = ({ target: input}) => {
        setCourseTwo({...courseTwo, [input.name]:input.value});
    }

    const handleCourseThree = ({ target: input}) => {
        setCourseThree({...courseThree, [input.name]:input.value});
    }

    const handleFormFileInput = (e) => {
        setProofOfTuitionPayment(e.target.files[0]);
    } 

    const nextStep = () => {
        navigate(`/student/${user.registrationNumber}/declare/step1`);
    };



    // SUBMITTION OF DECLARATION FORM ****************************************************************
    const submitDeclaration = (e) => {
        e.preventDefault();

        const config = {
            headers: { "Content-Type":"multipart/form-data" }
        }

        if (!proofOfTuitionPayment) {
            setDeclarationFormErrors({...declarationFormErrors, proofOfTuitionPayment: 'Required'});
            return;
        } else {
            var courses = [];
        if (numberOfCourses === '1') {
            courses.push(courseOne);
            courseOne.reason = declarationFormData.reason;
        } else if (numberOfCourses === '2') {
            courseOne.reason = declarationFormData.reason;
            courseTwo.reason = declarationFormData.reason;
            courses.push(courseOne);
            courses.push(courseTwo);
        } else {
            courses.push(courseOne);
            courses.push(courseTwo);
            courses.push(courseThree);
        }

        declarationFormData.courses = courses;
        declarationFormData.proofOfTuitionPayment = proofOfTuitionPayment;

        console.log(declarationFormData);

        setIsProcessing(true);
        axios.post(serverUrl+'/api/v1/ssmec/claim/add', declarationFormData, config)
        .then(response => {
        if (response.status === 201) {
            setIsProcessing(false);
            setResponseMessage({ message: response.data.message, severity:'success' })
            setOpen(true);
            dispatch(getStudentClaims({ registrationNumber: response.data.claim.registrationNumber }));
            setTimeout(() => {
            window.location.replace(`/student/${response.data.claim.registrationNumber}/claims`);
            }, 2000);
        }
        })
        .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setIsProcessing(false);
            setResponseMessage({ message: error.response.data.msg, severity:'error'})
            setOpen(true);
        }
        })
        }        
    }


    return (
        <VerticallyFlexGapForm onSubmit={submitDeclaration} style={{ gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
            
            <VerticallyFlexGapContainer style={{ gap: '10px', borderBottom: '1px solid #b3d9ff', paddingBottom: '15px', width: '100%', alignItems: 'flex-start'}}>
                <HeaderTwo style={{ fontWeight: '600' }}>Step 2</HeaderTwo>
                <p style={{ textAlign:'left' }}>Courses.</p>
            </VerticallyFlexGapContainer>
            

            <HorizontallyFlexGapContainer style={{ alignItems: 'flex-start', gap: '15px' }}>
                <VerticallyFlexGapContainer style={{ gap: '20px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="proofOfTuitionPayment">Registration form *</label>
                        <input 
                            style={{padding: '7px'}}
                            type="file" 
                            id="proofOfTuitionPayment"
                            name='proofOfTuitionPayment'
                            onChange={handleFormFileInput}
                        />
                        {declarationFormErrors.proofOfTuitionPayment && (<p>Required</p>)}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="numberOfCourses">Number of courses *</label>
                        <select 
                            id='numberOfCourses'
                            name='numberOfCourses'
                            onChange={handleNumberOfCourses}
                        >
                            <option value={0}>Choose number</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                        </select>
                        {declarationFormErrors.numberOfCourses && (<p>{declarationFormErrors.numberOfCourses}</p>)}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="reason">Reason of absense *</label>
                        <textarea 
                            type="text" 
                            id="reason"
                            rows={3}
                            placeholder="Reason of absense" 
                            value={declarationFormData.reason || ''}
                            name='reason'
                            onChange={handleFormInput}
                        >
                        </textarea>
                        {declarationFormErrors.reason && (
                            <p>Required</p>
                        )}
                    </FormElement>
                </VerticallyFlexGapContainer>

                {/* First course  */}
                <VerticallyFlexGapContainer style={{ gap: '20px' }}>
                    <h3 style={{ width: '100%', textAlign: 'left', color: 'gray' }}>Course 1</h3>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="fullName">Name *</label>
                        <input 
                            type="text" 
                            id="courseName"
                            placeholder="Course name" 
                            value={courseOne.courseName || ''}
                            name='courseName'
                            onChange={handleCourseOne}
                        />
                        {declarationFormErrors.courseName && (<p>Required</p>)}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="courseCode">Code *</label>
                        <input 
                            type="text" 
                            id="courseCode"
                            placeholder="Course Code" 
                            value={courseOne.courseCode || ''}
                            name='courseCode'
                            onChange={handleCourseOne}
                        />
                        {declarationFormErrors.courseCode && (<p>Required</p>)}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="group">Group *</label>
                        <select id='group' name='group' onChange={handleCourseOne}>
                            <option value="">Select group</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                        </select>
                        {declarationFormErrors.group && <p>{declarationFormErrors.group}</p>}
                    </FormElement>
                </VerticallyFlexGapContainer>

                {/* Second course  */}
                {(numberOfCourses === '2' || numberOfCourses === '3') && <VerticallyFlexGapContainer style={{ gap: '20px' }}>
                <h3 style={{ width: '100%', textAlign: 'left', color: 'gray' }}>Course 2</h3>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="fullName">Name *</label>
                        <input 
                            type="text" 
                            id="courseName"
                            placeholder="Course name" 
                            value={courseTwo.courseName || ''}
                            name='courseName'
                            onChange={handleCourseTwo}
                        />
                        {declarationFormErrors.courseName2 && (<p>Required</p>)}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="courseCode">Code *</label>
                        <input 
                            type="text" 
                            id="courseCode"
                            placeholder="Course Code" 
                            value={courseTwo.courseCode || ''}
                            name='courseCode'
                            onChange={handleCourseTwo}
                        />
                        {declarationFormErrors.courseCode2 && (<p>Required</p>)}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="group">Group *</label>
                        <select id='group' name='group' onChange={handleCourseTwo}>
                            <option value="">Select group</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                        </select>
                        {declarationFormErrors.group2 && <p>{declarationFormErrors.group2}</p>}
                    </FormElement>
                </VerticallyFlexGapContainer>}

                {/* Third course  */}
                {(numberOfCourses === '3') && <VerticallyFlexGapContainer style={{ gap: '20px' }}>
                <h3 style={{ width: '100%', textAlign: 'left', color: 'gray' }}>Course 3</h3>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="fullName">Name *</label>
                        <input 
                            type="text" 
                            id="courseName"
                            placeholder="Course name" 
                            value={courseThree.courseName || ''}
                            name='courseName'
                            onChange={handleCourseThree}
                        />
                        {declarationFormErrors.courseName3 && (<p>Required</p>)}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="courseCode">Code *</label>
                        <input 
                            type="text" 
                            id="courseCode"
                            placeholder="Course Code" 
                            value={courseThree.courseCode || ''}
                            name='courseCode'
                            onChange={handleCourseThree}
                        />
                        {declarationFormErrors.courseCode3 && (<p>Required</p>)}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="group">Group *</label>
                        <select id='group' name='group' onChange={handleCourseThree}>
                            <option value="">Select group</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                        </select>
                        {declarationFormErrors.group3 && <p>{declarationFormErrors.group3}</p>}
                    </FormElement>
                </VerticallyFlexGapContainer>}
            </HorizontallyFlexGapContainer>

            <HorizontallyFlexSpaceBetweenContainer style={{ }}> 
                <Button variant="contained" color="primary" size="medium" type="button" onClick={() => nextStep()}>Previous</Button>
                {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="success" size="medium" type="submit">Submit</Button>
                }
            </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapForm>
    )
}