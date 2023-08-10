import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../App";
import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentClaims } from "../../redux/features/claimSlice";
import { getAllCourses } from "../../redux/features/courseSlice";

// FUNCTION TO CHECK IF A STUDENT CLAIMED INSIDE THE DESIGNATED CLAIMING PERIOD. *************************************
function isWithinTimeRange(givenDate, designatedDate) {
    // Parse the given dates into JavaScript Date objects
    const givenDateTime = new Date(givenDate);
    const designatedDateTime = new Date(designatedDate);
  
    // Check if the given date is after the designated date
    if (givenDateTime > designatedDateTime) {
      return false;
    }
  
    // Calculate the time difference in milliseconds
    const timeDifferenceMs = designatedDateTime - givenDateTime;
  
    // Calculate the time difference in hours
    const timeDifferenceHours = timeDifferenceMs / (1000 * 60 * 60);
  
    // Check if the time difference is within the specified range (24 hours to 20 minutes)
    return timeDifferenceHours >= 20 / 60 && timeDifferenceHours <= 24;
}




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

    const handleNumberOfCourses = ({ target: input}) => {
        setNumberOfCourses(input.value);
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

        // Checking the period of claiming to see if it near the examination date.
        if (declarationFormData.period === 'mid-semester') {
            let designatedDate = new Date(selectedCourse.allocations[currentAllocationIndex].midSemesterExams);
            if (!selectedCourse.allocations[currentAllocationIndex].midSemesterExams) {
                setResponseMessage({ message: `Sory, The date of mid-semester exam for this course is not yet set.`, severity: 'error' });
                setOpen(true);
                setClaimBlocked(true);
                return;
            }
            var rightClaimingPeriod = isWithinTimeRange(new Date(), designatedDate);
            if (!rightClaimingPeriod) {
                setResponseMessage({ message: 'Trying to declare absence out of the claining period range. The declaration range is between 24 hours and 20 minutes before the scheduled examination time.', severity: 'error' });
                setOpen(true);
                setClaimBlocked(true);
                return;
            }
        } 
        
        if (declarationFormData.period === 'final') {
            let designatedDate = new Date(selectedCourse.allocations[currentAllocationIndex].finalExams);
            if (!selectedCourse.allocations[currentAllocationIndex].finalExams) {
                setResponseMessage({ message: `Sory, The date of final exam of this course is not yet set.`, severity: 'error' });
                setOpen(true);
                setClaimBlocked(true);
                return;
            }

            var rightClaimingPeriod = isWithinTimeRange(new Date(), designatedDate);
            if (!rightClaimingPeriod) {
                setResponseMessage({ message: `Trying to declare absence out of the claining period range. The declaration range is between 24 hours and 20 minutes before the scheduled examination time. The final exam is scheduled on ${selectedCourse.allocations[currentAllocationIndex].finalExams}`, severity: 'error' });
                setOpen(true);
                setClaimBlocked(true);
                return;
            }
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
        axios.post(serverUrl+'/api/v1/ssmec/claim/add', declarationFormData, config)
        .then(response => {
            if (response.status === 201) {
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
                <p style={{ textAlign:'left' }}>More details and course.</p>
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




// const handleCourseTwo = ({ target: input}) => {

//     if (input.name === 'courseCode') {
//         dispatch({ type: 'course/getSelectedCourse', payload: input.value });
        
//         // Getting the index of the most recent added course allocation
//         const currentAllocationIndex = selectedCourse.allocations.length-1;

//         // Check whether the course has an allocation that corresponds to this semester
//         if (selectedCourse.allocations[currentAllocationIndex].academicYear === declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
//             setResponseMessage({ message: 'Selected course is not being tought in this semester', severity: 'error' });
//             setOpen(true);
//             setClaimBlocked(true);
//             return;
//         } 
        
//         if (selectedCourse.allocations[currentAllocationIndex].academicYear !== declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
//             setResponseMessage({ message: 'The selected academic year and semester do not correspond to the claiming period.', severity: 'error' });
//             setOpen(true);
//             setClaimBlocked(true);
//             return;
//         }
        
//         // Checking the period of claiming to see if it near the examination date.
//         if (declarationFormData.period === 'mid-semester') {
//             let designatedDate = new Date(selectedCourse.allocations[currentAllocationIndex].midSemesterExams);
//             var rightClaimingPeriod = isWithinTimeRange(new Date(), designatedDate);
//             if (!rightClaimingPeriod) {
//                 setResponseMessage({ message: 'Trying to declare absence out of the claining period range. The declaration range is between 24 hours and 20 minutes before the scheduled examination time.', severity: 'error' });
//                 setOpen(true);
//                 setClaimBlocked(true);
//                 return;
//             }
//         } 
        
//         if (declarationFormData.period === 'final') {
//             let designatedDate = new Date(selectedCourse.allocations[currentAllocationIndex].finalExams);
//             var rightClaimingPeriod = isWithinTimeRange(new Date(), designatedDate);
//             if (!rightClaimingPeriod) {
//                 setResponseMessage({ message: 'Trying to declare absence out of the claining period range. The declaration range is between 24 hours and 20 minutes before the scheduled examination time.', severity: 'error' });
//                 setOpen(true);
//                 setClaimBlocked(true);
//                 return;
//             }
//         }

//         if (selectedCourse.allocations[currentAllocationIndex].semester === declarationFormData.semester && selectedCourse.allocations[currentAllocationIndex].academicYear === declarationFormData.academicYear) {
//             setClaimBlocked(false);
//             setCourseTwo({
//                 ...courseTwo, 
//                 courseName: selectedCourse.name,
//                 courseCode: selectedCourse.code,
//                 credits: selectedCourse.credits,
//                 semester: selectedCourse.allocations[currentAllocationIndex].semester,
//                 academicYear: selectedCourse.allocations[currentAllocationIndex].academicYear
//             })
//         }
//     }

//     if (input.name === 'group') {
//         setCourseTwo({ ...courseTwo, group: input.value })
//     }
// }

// const handleCourseThree = ({ target: input}) => {
//     setCourseThree({...courseThree, [input.name]:input.value});
//     if (input.name === 'courseCode') {
//         dispatch({ type: 'course/getSelectedCourse', payload: input.value });
     
//         // Getting the index of the most recent added course allocation
//         const currentAllocationIndex = selectedCourse.allocations.length-1;

//         // Check whether the course has an allocation that corresponds to this semester
//         if (selectedCourse.allocations[currentAllocationIndex].academicYear === declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
//             setResponseMessage({ message: 'Selected course is not being tought in this semester', severity: 'error' });
//             setOpen(true);
//             setClaimBlocked(true);
//             return;
//         }
        
//         if (selectedCourse.allocations[currentAllocationIndex].academicYear !== declarationFormData.academicYear && selectedCourse.allocations[currentAllocationIndex].semester !== declarationFormData.semester) {
//             setResponseMessage({ message: 'The selected academic year and semester do not correspond to the claiming period.', severity: 'error' });
//             setOpen(true);
//             setClaimBlocked(true);
//             return;
//         } 
        
//         // Checking the period of claiming to see if it near the examination date.
//         if (declarationFormData.period === 'mid-semester') {
//             let designatedDate = new Date(selectedCourse.allocations[currentAllocationIndex].midSemesterExams);
//             var rightClaimingPeriod = isWithinTimeRange(new Date(), designatedDate);
//             if (!rightClaimingPeriod) {
//                 setResponseMessage({ message: 'Trying to declare absence out of the claining period range. The declaration range is between 24 hours and 20 minutes before the scheduled examination time.', severity: 'error' });
//                 setOpen(true);
//                 setClaimBlocked(true);
//                 return;
//             }
//         } 
        
//         if (declarationFormData.period === 'final') {
//             let designatedDate = new Date(selectedCourse.allocations[currentAllocationIndex].finalExams);
//             var rightClaimingPeriod = isWithinTimeRange(new Date(), designatedDate);
//             if (!rightClaimingPeriod) {
//                 setResponseMessage({ message: 'Trying to declare absence out of the claining period range. The declaration range is between 24 hours and 20 minutes before the scheduled examination time.', severity: 'error' });
//                 setOpen(true);
//                 setClaimBlocked(true);
//                 return;
//             }
//         }

//         if (selectedCourse.allocations[currentAllocationIndex].semester === declarationFormData.semester && selectedCourse.allocations[currentAllocationIndex].academicYear === declarationFormData.academicYear) {
//             setClaimBlocked(true);
//             setCourseThree({
//                 ...courseThree, 
//                 courseName: selectedCourse.name,
//                 courseCode: selectedCourse.code,
//                 credits: selectedCourse.credits,
//                 semester: selectedCourse.allocations[currentAllocationIndex].semester,
//                 academicYear: selectedCourse.allocations[currentAllocationIndex].academicYear
//             })
//         }
//     }

//     if (input.name === 'group') {
//         setCourseThree({ ...courseThree, group: input.value })
//     }
// }


{/* <h3 style={{ width: '100%', textAlign: 'left', color: 'gray' }}>Course 1</h3> */}

// THIS WILL BE USED IN CASE WE HAVE MANY COURSES TO SELECT FROM 
// if (numberOfCourses === '1') {
//     courseOne.reason = declarationFormData.reason;
//     courses.push(courseOne);
// } else if (numberOfCourses === '2') {
//     courseOne.reason = declarationFormData.reason;
//     courseTwo.reason = declarationFormData.reason;
//     courses.push(courseOne);
//     courses.push(courseTwo);
// } else {
//     courses.push(courseOne);
//     courses.push(courseTwo);
//     courses.push(courseThree);
// }
{/* <FormElement style={{ color: 'gray' }}>
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
</FormElement> */}


{/* Second course  */}
// {(numberOfCourses === '2' || numberOfCourses === '3') && <VerticallyFlexGapContainer style={{ gap: '20px' }}>
// <h3 style={{ width: '100%', textAlign: 'left', color: 'gray' }}>Course 2</h3>
// <FormElement style={{ color: 'gray' }}>
//     <label htmlFor="courseCode">Name *</label>
//     <select id='courseCode' name='courseCode' onChange={handleCourseTwo}>
//         <option value="">Select course</option>
//         {listOfCourses.map((course, index) => {
//             return (
//                 <option key={index} value={course.code}>{course.name}</option>     
//             )
//         })}
//     </select>
//     {declarationFormErrors.courseCode && (<p>Required</p>)}
// </FormElement>
// <FormElement style={{ color: 'gray' }}>
//     <label htmlFor="group">Group *</label>
//     <select id='group' name='group' onChange={handleCourseTwo}>
//         <option value="">Select group</option>
//         <option value="A">A</option>
//         <option value="B">B</option>
//         <option value="C">C</option>
//         <option value="D">D</option>
//         <option value="E">E</option>
//     </select>
//     {declarationFormErrors.group && <p>{declarationFormErrors.group}</p>}
// </FormElement>
// </VerticallyFlexGapContainer>}

// {/* Third course  */}
// {(numberOfCourses === '3') && <VerticallyFlexGapContainer style={{ gap: '20px' }}>
// <h3 style={{ width: '100%', textAlign: 'left', color: 'gray' }}>Course 3</h3>
// <FormElement style={{ color: 'gray' }}>
//     <label htmlFor="courseCode">Name *</label>
//     <select id='courseCode' name='courseCode' onChange={handleCourseThree}>
//         <option value="">Select course</option>
//         {listOfCourses.map((course, index) => {
//             return (
//                 <option key={index} value={course.code}>{course.name}</option>     
//             )
//         })}
//     </select>
//     {declarationFormErrors.courseCode && (<p>Required</p>)}
// </FormElement>
// <FormElement style={{ color: 'gray' }}>
//     <label htmlFor="group">Group *</label>
//     <select id='group' name='group' onChange={handleCourseThree}>
//         <option value="">Select group</option>
//         <option value="A">A</option>
//         <option value="B">B</option>
//         <option value="C">C</option>
//         <option value="D">D</option>
//         <option value="E">E</option>
//     </select>
//     {declarationFormErrors.group && <p>{declarationFormErrors.group}</p>}
// </FormElement>
// </VerticallyFlexGapContainer>}