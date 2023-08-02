import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../App";
import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
    const params = useParams();


    // FETCH USER DATA ****************************************************************************
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('student')));
    },[]);  

    // Fetching courses from the store
    const { listOfCourses, selectedCourse } = useSelector(state => state.course);


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
        if (input.name === 'courseCode') {
            dispatch({ type: 'course/getSelectedCourse', payload: input.value });
        }

        // Getting the index of the most recent added course allocation
        const currentAllocationIndex = selectedCourse.allocations.length-1;
    
        // Check whether the course has an allocation that corresponds to this semester
        if (selectedCourse.allocations[currentAllocationIndex].academicYear === declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
            setResponseMessage({ message: 'Selected course is not being tought in this semester', severity: 'error' });
            setOpen(true);
            return;
        } else if (selectedCourse.allocations[currentAllocationIndex].academicYear !== declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
            setResponseMessage({ message: 'The selected academic year and semester do not correspond to the claiming period.', severity: 'error' });
            setOpen(true);
            return;
        } else if (selectedCourse.allocations[currentAllocationIndex].semester === declarationFormData.semester && selectedCourse.allocations[currentAllocationIndex].academicYear === declarationFormData.academicYear) {
            setCourseOne({
                ...courseOne, 
                courseName: selectedCourse.name,
                credits: selectedCourse.credits,
                semester: selectedCourse.allocations[currentAllocationIndex].semester,
                academicYear: selectedCourse.allocations[currentAllocationIndex].academicYear,
            })
        }
    }

    const handleCourseTwo = ({ target: input}) => {
        setCourseTwo({...courseTwo, [input.name]:input.value});
        if (input.name === 'courseCode') {
            dispatch({ type: 'course/getSelectedCourse', payload: input.value });
        }
        
        // Getting the index of the most recent added course allocation
        const currentAllocationIndex = selectedCourse.allocations.length-1;

        // Check whether the course has an allocation that corresponds to this semester
        if (selectedCourse.allocations[currentAllocationIndex].academicYear === declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
            setResponseMessage({ message: 'Selected course is not being tought in this semester', severity: 'error' });
            setOpen(true);
            return;
        } else if (selectedCourse.allocations[currentAllocationIndex].academicYear !== declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
            setResponseMessage({ message: 'The selected academic year and semester do not correspond to the claiming period.', severity: 'error' });
            setOpen(true);
            return;
        } else if (selectedCourse.allocations[currentAllocationIndex].semester === declarationFormData.semester && selectedCourse.allocations[currentAllocationIndex].academicYear === declarationFormData.academicYear) {
            setCourseTwo({
                ...courseTwo, 
                courseName: selectedCourse.name,
                credits: selectedCourse.credits,
                semester: selectedCourse.allocations[currentAllocationIndex].semester,
                academicYear: selectedCourse.allocations[currentAllocationIndex].academicYear
            })
        }
    }

    const handleCourseThree = ({ target: input}) => {
        setCourseThree({...courseThree, [input.name]:input.value});
        if (input.name === 'courseCode') {
            dispatch({ type: 'course/getSelectedCourse', payload: input.value });
        }

        // Getting the index of the most recent added course allocation
        const currentAllocationIndex = selectedCourse.allocations.length-1;

        // Check whether the course has an allocation that corresponds to this semester
        if (selectedCourse.allocations[currentAllocationIndex].academicYear === declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
            setResponseMessage({ message: 'Selected course is not being tought in this semester', severity: 'error' });
            setOpen(true);
            return;
        } else if (selectedCourse.allocations[currentAllocationIndex].academicYear !== declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
            setResponseMessage({ message: 'The selected academic year and semester do not correspond to the claiming period.', severity: 'error' });
            setOpen(true);
            return;
        } else if (selectedCourse.allocations[currentAllocationIndex].semester === declarationFormData.semester && selectedCourse.allocations[currentAllocationIndex].academicYear === declarationFormData.academicYear) {
            setCourseThree({
                ...courseThree, 
                courseName: selectedCourse.name,
                credits: selectedCourse.credits,
                semester: selectedCourse.allocations[currentAllocationIndex].semester,
                academicYear: selectedCourse.allocations[currentAllocationIndex].academicYear
            })
        }
    }

    const handleFormFileInput = (e) => {
        setProofOfTuitionPayment(e.target.files[0]);
    } 

    const nextStep = () => {
        navigate(`/student/${params.registrationNumber}/declare/step1`);
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
            courseOne.reason = declarationFormData.reason;
            courses.push(courseOne);
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
            }}
        )
    }        
}

    return (
        <VerticallyFlexGapForm onSubmit={submitDeclaration} style={{ gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
            
            <VerticallyFlexGapContainer style={{ gap: '10px', borderBottom: '1px solid #b3d9ff', paddingBottom: '15px', width: '100%', alignItems: 'flex-start'}}>
                <HeaderTwo style={{ fontWeight: '600' }}>Step 2</HeaderTwo>
                <p style={{ textAlign:'left' }}>Courses.</p>
            </VerticallyFlexGapContainer>
            

            <HorizontallyFlexGapContainer style={{ alignItems: 'flex-start', gap: '15px' }}>
                {/* Left side  */}
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
                        <label htmlFor="courseCode">Name *</label>
                        <select id='courseCode' name='courseCode' onChange={handleCourseOne}>
                            <option value="">Select course</option>
                            {listOfCourses.map((course, index) => {
                                return (
                                    <option key={index} value={course.code}>{course.name}</option>     
                                )
                            })}
                        </select>
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
                        <label htmlFor="courseCode">Name *</label>
                        <select id='courseCode' name='courseCode' onChange={handleCourseTwo}>
                            <option value="">Select course</option>
                            {listOfCourses.map((course, index) => {
                                return (
                                    <option key={index} value={course.code}>{course.name}</option>     
                                )
                            })}
                        </select>
                        {declarationFormErrors.courseCode && (<p>Required</p>)}
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
                        {declarationFormErrors.group && <p>{declarationFormErrors.group}</p>}
                    </FormElement>
                </VerticallyFlexGapContainer>}

                {/* Third course  */}
                {(numberOfCourses === '3') && <VerticallyFlexGapContainer style={{ gap: '20px' }}>
                    <h3 style={{ width: '100%', textAlign: 'left', color: 'gray' }}>Course 3</h3>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="courseCode">Name *</label>
                        <select id='courseCode' name='courseCode' onChange={handleCourseThree}>
                            <option value="">Select course</option>
                            {listOfCourses.map((course, index) => {
                                return (
                                    <option key={index} value={course.code}>{course.name}</option>     
                                )
                            })}
                        </select>
                        {declarationFormErrors.courseCode && (<p>Required</p>)}
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
                        {declarationFormErrors.group && <p>{declarationFormErrors.group}</p>}
                    </FormElement>
                </VerticallyFlexGapContainer>}
            </HorizontallyFlexGapContainer>

            <HorizontallyFlexSpaceBetweenContainer style={{ }}> 
                <Button variant="contained" color="primary" size="small" type="button" onClick={() => nextStep()}>Previous</Button>
                {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="success" size="small" type="submit">Submit</Button>
                }
            </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapForm>
    )
}