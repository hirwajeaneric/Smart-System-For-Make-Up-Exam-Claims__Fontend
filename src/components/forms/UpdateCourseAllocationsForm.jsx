import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { GeneralContext } from "../../App";
import { FormElement, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/features/courseSlice";
import { AUCAFacultiesAndDepartments } from "../../utils/AUCAFacultiesAndDepartments";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/features/userSlice";

export default function UpdateCourseAllocationsForm(props) {
    const { course } = props;
    const [isProcessing, setIsProcessing] = useState(false);
    const { setOpen, setResponseMessage, selectedCourseAllocation, setSelectedCourseAllocation, handleOpenModal, setFormType, selectedCourse, setSelectedCourse, setCourseToBeDeleted } = useContext(GeneralContext);
    const {teacher, setTeacher} = useState({});
    const dispatch = useDispatch();

    const { isLoading, teachers } = useSelector(state => state.user)

    useEffect(() => {
      dispatch(getAllUsers());
    }, [])

    const handleTeacher = ({ target: input}) => {
      setTeacher(input.value);
      console.log(input.value);
    }

    const handleFormInput = ({ target: input}) => {
      setSelectedCourseAllocation({...selectedCourseAllocation, [input.name]: input.value });
    }

    const displayConfirmationModal = (courseId) => {
        setFormType('confirmDelete');
        handleOpenModal();
        setCourseToBeDeleted(courseId);
    }

    const updateCourseAllocationData = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        if (course.allocations.length === 0) {
          course.allocations = [{
            academicYear: selectedCourseAllocation.academicYear,
            semester: selectedCourseAllocation.semester,
            midSemesterExams: selectedCourseAllocation.midSemesterExams,
            finalExams: selectedCourseAllocation.finalExams,
            lecturers: [teacher]
          }]; 
        } else {
          if (course.allocations.lecturers.length === 0) {
            course.allocations = [{
              academicYear: selectedCourseAllocation.academicYear,
              semester: selectedCourseAllocation.semester,
              midSemesterExams: selectedCourseAllocation.midSemesterExams,
              finalExams: selectedCourseAllocation.finalExams,
              lecturers: [teacher]
            }];
          } else {
            var listOflecturers = course.allocations.lecturers;
            listOflecturers.push(teacher);

            course.allocations = [{
              academicYear: selectedCourseAllocation.academicYear,
              semester: selectedCourseAllocation.semester,
              midSemesterExams: selectedCourseAllocation.midSemesterExams,
              finalExams: selectedCourseAllocation.finalExams,
              lecturers: listOflecturers
            }];
          }
        }

        console.log(course);

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('hodToken')}`
            }
        }

        // axios.put(`${serverUrl}/api/v1/ssmec/course/update?id=${selectedCourse.id}`, selectedCourse, config)
        // .then(response => {
        //     if (response.status === 200) {
        //         setIsProcessing(false);
        //         setResponseMessage({ message: response.data.message, severity: 'success' });
        //         setOpen(true);
        //         dispatch(getAllCourses());
        //     }
        // })
        // .catch(error => {
        //     if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        //         setIsProcessing(false);
        //         setResponseMessage({ message: error.response.data.msg, severity:'error'})
        //         setOpen(true);
        //     }
        // })
    };

    return (
        <VerticallyFlexGapForm onSubmit={updateCourseAllocationData} style={{ gap: '20px', backgroundColor: 'white', padding: '0 10px 10px' }}>
            <HorizontallyFlexSpaceBetweenContainer>
              <p style={{ fontWeight: '600', textAlign:'left' }}>Update Allocation Data</p>
            </HorizontallyFlexSpaceBetweenContainer>
            <VerticallyFlexGapContainer style={{ gap: '15px' }}>
              <HorizontallyFlexGapContainer style={{ gap: '20px' }}>    
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor="academicYear">Academic year</label>
                  <input 
                    type="text" 
                    id="academicYear"
                    name="academicYear"
                    placeholder="Academic year" 
                    value={selectedCourseAllocation.academicYear || ''}
                    onChange={handleFormInput}
                  />
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor="semester">Semester</label>
                  <input 
                    type="text" 
                    id="semester"
                    name="semester"
                    placeholder="Semester" 
                    value={selectedCourseAllocation.semester || ''}
                    onChange={handleFormInput}
                  />
                </FormElement>
              </HorizontallyFlexGapContainer>
              <HorizontallyFlexGapContainer style={{ gap: '20px' }}>    
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor="midSemesterExams">Mid semester exams </label>
                  <input 
                    type="datetime-local" 
                    id="midSemesterExams"
                    name="midSemesterExams"
                    value={selectedCourseAllocation.midSemesterExams || ''}
                    onChange={handleFormInput}
                  />
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor="finalExams">Final exams</label>
                  <input 
                    type="datetime-local" 
                    id="finalExams"
                    name="finalExams"
                    value={selectedCourseAllocation.finalExams || ''}
                    onChange={handleFormInput}
                  />
                </FormElement>
              </HorizontallyFlexGapContainer>
              <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor="teachers">Teachers:</label>
                  <select id='teacher' name='teacher' onChange={handleTeacher}>
                      <option value="">Choose or change teacher</option>
                      {teachers.map((teacher, index) => {
                        return(
                          <option key={index} value={
                            {
                              lectureId: teacher.id,
                              name: teacher.fullName
                            }
                          }>{teacher.fullName}</option>
                        )
                      })}
                  </select>
                </FormElement>
                <FormElement>
                  {/* <ul>
                    {selectedCourseAllocation.lecturers.map((lecturer, index) => {
                      return(<li key={index}>{lecturer.name}</li>)
                    })}
                  </ul> */}
                </FormElement>

              </HorizontallyFlexGapContainer>

              {selectedCourseAllocation.academicYear && <FormElement style={{ flexDirection: 'row' }}>
                {isProcessing 
                ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                : <Button variant="contained" color="primary" size="small" type="submit">Confirm changes</Button>
                }
                <Button variant="contained" color="secondary" size="small" type="button" onClick={() => {window.location.reload()}}>Cancel</Button>
                <Button variant="contained" color="error" size="small" type="button" onClick={() => { displayConfirmationModal(selectedCourse.id);}}>DELETE</Button>
              </FormElement>}
            </VerticallyFlexGapContainer>
        </VerticallyFlexGapForm>
    )
}