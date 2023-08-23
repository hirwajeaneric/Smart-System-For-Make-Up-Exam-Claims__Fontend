import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../App";
import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentClaims } from "../../redux/features/claimSlice";
import { getAllCourses } from "../../redux/features/courseSlice";


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
        absenceJustification,
        setAbsenceJustification, 
        courseOne,
        setCourseOne,
    } = useContext(GeneralContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [user, setUser] = useState({});
    const params = useParams();
    const [claimBlocked, setClaimBlocked] = useState(false)


    // FETCH USER DATA ****************************************************************************
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('student')));
        dispatch(getAllCourses())
    },[]);  

    // Fetching courses from the store
    const { listOfCourses, selectedCourse } = useSelector(state => state.course);


    // INPUT FORM HANDLES *************************************************************************
    const handleFormInput = ({ target: input}) => {
        setDeclarationFormData({...declarationFormData, [input.name]: input.value });
        setDeclarationFormErrors({});
    }

    // COURSE DATA HANDLERS //////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleCourseOne = ({ target: input}) => {
        if (input.name === 'courseCode') {
            dispatch({ type: 'course/getSelectedCourse', payload: input.value });
        }

        if (input.name === 'group') {
            setCourseOne({ ...courseOne, group: input.value })
        }
    }

    // File upload handlers
    const handleFormFileInput = (e) => {
        setProofOfTuitionPayment(e.target.files[0]);
        console.log(e.target.files)
    }

    const handleFormJustificationFileInput = (e) => {
        setAbsenceJustification(e.target.files[0])
        console.log(e.target.files)
    } 

    const nextStep = () => {
        navigate(`/student/${params.registrationNumber}/declare/step1`);
    };



    // SUBMITTION OF DECLARATION FORM ****************************************************************
    const submitDeclaration = (e) => {
        e.preventDefault();

        console.log(proofOfTuitionPayment);
        console.log(absenceJustification);

        const config = {
            headers: { "Content-Type":"multipart/form-data" }
        }

        // check if the selected course has allocations.
        if (selectedCourse.allocations.length === 0) {
            setResponseMessage({ message: 'Selected course is not being tought in this semester', severity: 'error' });
            setOpen(true);
            setClaimBlocked(true);
            return;
        }
 
        // Getting the index of the most recent added course allocation
        const currentAllocationIndex = selectedCourse.allocations.length-1;

        // Check if the registration form was provided
        if (!proofOfTuitionPayment) {
            setDeclarationFormErrors({...declarationFormErrors, proofOfTuitionPayment: 'Required'});
            setClaimBlocked(true);
            return;
        }

        // Check if the absene justification document was provided
        
        console.log(declarationFormData.reason === 'Sick / Hospitalized' || declarationFormData.reason === 'Work mission' && !absenceJustification);
        if (declarationFormData.reason === 'Sick / Hospitalized' || declarationFormData.reason === 'Work mission' && !absenceJustification) {
            setDeclarationFormErrors({...declarationFormErrors, absenceJustification: 'Required'});
            setClaimBlocked(true);
            return;
        }

        // Check whether the course has an allocation that corresponds to this semester
        if (selectedCourse.allocations[currentAllocationIndex].academicYear === declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
            setResponseMessage({ message: 'Selected course is not being tought in this semester', severity: 'error' });
            setOpen(true);
            setClaimBlocked(true);
            return;
        } 

        if (selectedCourse.allocations[currentAllocationIndex].academicYear !== declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
            setResponseMessage({ message: 'The selected academic year and semester do not correspond to the claiming period.', severity: 'error' });
            setOpen(true);
            setClaimBlocked(true);
            return;
        } 

        setClaimBlocked(false);
            
        courseOne.courseName = selectedCourse.name;
        courseOne.courseCode = selectedCourse.code;
        courseOne.credits = selectedCourse.credits;
        courseOne.semester = selectedCourse.allocations[currentAllocationIndex].semester;
        courseOne.academicYear = selectedCourse.allocations[currentAllocationIndex].academicYear;
        
        var courses = [];
        courseOne.reason = declarationFormData.reason;
        courses.push(courseOne);

        declarationFormData.courses = courses;
        declarationFormData.proofOfTuitionPayment = proofOfTuitionPayment;
 
        console.log(declarationFormData);

        setIsProcessing(true);
        
        axios.post(
            `${serverUrl}/api/v1/ssmec/claim/add`, 
            declarationFormData, 
            config
        )
        .then(response => {
            if (response.status === 201) {
                if (absenceJustification) {
                    axios.put(
                        `${serverUrl}/api/v1/ssmec/claim/updateWithAbsenceJustification?id=${response.data.claim._id}`, 
                        { absenceJustification: absenceJustification },
                        config
                    )
                    .then(response => {
                        console.log(response.data.message);
                    })
                    .catch(error => {
                        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                            setIsProcessing(false);
                            setResponseMessage({ message: error.response.data.msg, severity:'error'})
                            setOpen(true);
                        }}
                    )
                }

                setIsProcessing(false);
                dispatch(getStudentClaims({ registrationNumber: response.data.claim.registrationNumber }));
                setTimeout(() => {
                    window.location.replace(`/student/${response.data.claim.registrationNumber}/success`);
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

    return (
        <VerticallyFlexGapForm onSubmit={submitDeclaration} style={{ gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
            
            <VerticallyFlexGapContainer style={{ gap: '10px', borderBottom: '1px solid #b3d9ff', paddingBottom: '15px', width: '100%', alignItems: 'flex-start'}}>
                <HeaderTwo style={{ fontWeight: '600' }}>Step 2</HeaderTwo>
                <p style={{ textAlign:'left' }}>Reason for absence and course info.</p>
            </VerticallyFlexGapContainer>
            

            <HorizontallyFlexGapContainer style={{ alignItems: 'flex-start', gap: '15px' }}>
                {/* Left side  */}
                <VerticallyFlexGapContainer style={{ gap: '20px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="period">Examination period *</label>
                        <select id='period' name='period' onChange={handleFormInput}>
                            <option value="">Choose exam period</option>
                            <option value="mid-semester">Mid-semester</option>
                            <option value="final">Final</option>
                        </select>
                        {declarationFormErrors.period && <p>{declarationFormErrors.period}</p>}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="reason">Reason of absense *</label>
                        <select id='reason' name='reason' onChange={handleFormInput}>
                            <option value="">Choose reason</option>
                            <option value="Sick / Hospitalized">Sick / Hospitalized</option>
                            <option value="Death of relative">Death of relative</option>
                            <option value="Work mission">Work mission</option>
                        </select>
                        {declarationFormErrors.reason && (
                            <p>Required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="absenceJustification">Justification for absence attachment *</label>
                        <input 
                            style={{padding: '7px'}}
                            type="file" 
                            id="absenceJustification"
                            name='absenceJustification'
                            onChange={handleFormJustificationFileInput}
                        />
                        {declarationFormErrors.absenceJustification && (<p>Required</p>)}
                    </FormElement>
                    
                </VerticallyFlexGapContainer>

                <VerticallyFlexGapContainer style={{ gap: '20px' }}>
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
                    
                </VerticallyFlexGapContainer>
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