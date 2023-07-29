import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { GeneralContext } from "../../App";
import { FormElement, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../../redux/features/userSlice";

export default function UpdateCourseAllocationsForm() {
  const params = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const { setOpen, setResponseMessage, selectedCourseAllocation, setSelectedCourseAllocation, handleOpenModal, setFormType,setCourseToBeDeleted } = useContext(GeneralContext);
  const dispatch = useDispatch();
  const [course, setCourse] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());
    setSelectedCourseAllocation({});
  }, []);

  // Fetch course by code 
  useEffect(() => {
    axios.get(`${serverUrl}/api/v1/ssmec/course/findByCode?code=${params.courseCode}`)
    .then(response => {
      setCourse(response.data.course);
    })
    .catch(err => console.error(err))
  },[])

  const handleFormInput = ({ target: input}) => {
    setSelectedCourseAllocation({...selectedCourseAllocation, [input.name]: input.value });
  }

  const displayConfirmationModal = (courseId) => {
      setFormType('confirmDelete');
      handleOpenModal();
      setCourseToBeDeleted(courseId);
  }

  // UPDATING COURSE ALLOCAITON DATA 
  const updateCourseAllocationData = (e) => {
      e.preventDefault();
      setIsProcessing(true);
      
      course.allocations.forEach((element) => {
        if (selectedCourseAllocation.id === element._id){
          element.academicYear = selectedCourseAllocation.academicYear;
          element.semester = selectedCourseAllocation.semester;
          element.midSemesterExams = selectedCourseAllocation.midSemesterExams;
          element.finalExams = selectedCourseAllocation.finalExams;  
        }  
      })

      const config = {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('hodToken')}`
          }
      }

      axios.put(`${serverUrl}/api/v1/ssmec/course/update?id=${course._id}`, course, config)
      .then(response => {
        if (response.status === 200) {
          setIsProcessing(false);
          setResponseMessage({ message: response.data.message, severity: 'success' });
          setOpen(true);
          setTimeout(() => {
            window.location.reload();
          },2000)
        }
      })
      .catch(error => {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          setIsProcessing(false);
          setResponseMessage({ message: error.response.data.msg, severity:'error'})
          setOpen(true);
        }
      })
  };

  return (
      <VerticallyFlexGapForm onSubmit={updateCourseAllocationData} style={{ gap: '20px', backgroundColor: 'white', padding: '0 10px 10px' }}>
          {selectedCourseAllocation.lecturers && 
            <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
              <div className="left" style={{ flexDirection: 'column' }}>
                <p style={{ fontWeight: '600', textAlign:'left' }}>Lecturers</p>
                <ul style={{ listStyleType: 'none' }}>
                  {selectedCourseAllocation.lecturers && selectedCourseAllocation.lecturers.map((lecturer, index) => {
                    return(<li style={{ fontSize: '90%' }} key={index}>{lecturer.name}</li>)
                  })}
                </ul>
              </div>
            </HorizontallyFlexGapContainer>
          }
          {(selectedCourseAllocation.midSemesterExams || selectedCourseAllocation.finalExams) && <VerticallyFlexGapContainer style={{ alignItems: 'flex-start' }}>
            {selectedCourseAllocation.midSemesterExams &&
              <>
                <p style={{ fontWeight: '600', textAlign:'left' }}>Mid semester exam:</p>
                <p style={{ color: 'gray', textAlign:'left', fontSize: '90%', marginBottom: '10px' }}>{new Date(selectedCourseAllocation.midSemesterExams).toUTCString()}</p>
              </>
            }  
            {selectedCourseAllocation.finalExams && 
              <>
                <p style={{ fontWeight: '600', textAlign:'left'}}>Final exams:</p>
                <p style={{ color: 'gray',textAlign:'left', fontSize: '90%' }}>{new Date(selectedCourseAllocation.finalExams).toUTCString()}</p>
              </>
            }
          </VerticallyFlexGapContainer>}

          <VerticallyFlexGapContainer style={{ gap: '10px' }}>
            <HorizontallyFlexSpaceBetweenContainer>
              <p style={{ fontWeight: '600', textAlign:'left' }}>Update Allocation Data</p>
            </HorizontallyFlexSpaceBetweenContainer>
            <HorizontallyFlexGapContainer style={{ gap: '20px' }}>    
              <FormElement style={{ color: 'gray' }}>
                <label htmlFor="academicYear">Academic year</label>
                <input 
                  type="text" 
                  id="academicYear"
                  maxLength={4}
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
                  maxLength={1}
                  placeholder="Semester" 
                  value={selectedCourseAllocation.semester || ''}
                  onChange={handleFormInput}
                />
              </FormElement>
            </HorizontallyFlexGapContainer>
            <HorizontallyFlexGapContainer style={{ gap: '20px' }}>    
              <FormElement style={{ color: 'gray' }}>
                <label htmlFor="midSemesterExams">Change mid semester exams date</label>
                <input 
                  type="datetime-local" 
                  id="midSemesterExams"
                  name="midSemesterExams"
                  value={selectedCourseAllocation.midSemesterExams || ''}
                  onChange={handleFormInput}
                />
              </FormElement>
              <FormElement style={{ color: 'gray' }}>
                <label htmlFor="finalExams">Change final exams date</label>
                <input 
                  type="datetime-local" 
                  id="finalExams"
                  name="finalExams"
                  value={selectedCourseAllocation.finalExams || ''}
                  onChange={handleFormInput}
                />
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