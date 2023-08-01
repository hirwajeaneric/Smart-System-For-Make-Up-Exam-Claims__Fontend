import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GeneralContext } from "../../App";
import { FormElement, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/features/courseSlice";

export default function AssignCoursesToTeachersForm() {
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setOpen, setResponseMessage, handleCloseModal, selectedCourse:courseInfo, setSelectedCourse } = useContext(GeneralContext);
    const dispatch = useDispatch();

    const { teachers } = useSelector(state => state.user);

    const onSubmit = data => {
      var addedLecturer = {
        lecturerId: data.lecturerId,
        groups: data.groups.split(',')
      };

      teachers.forEach(teacher => {
        if (teacher.id === data.lecturerId) {
          addedLecturer.name = teacher.fullName;
        }
      })

      const selectedAllocation = courseInfo.allocation;
      var lecturers = [];

      if (selectedAllocation.lecturers.length > 0) {
        lecturers = selectedAllocation.lecturers;
        const existingLecturer = selectedAllocation.lecturers.find(element => element.lecturerId === addedLecturer.lecturerId);
        console.log(existingLecturer);
        if (existingLecturer) {
          setResponseMessage({ message: 'Teacher already assigned to course', severity: 'error'});
          setOpen(true);
          return;
        } else {
          lecturers.push(addedLecturer);
        }
      } else if (selectedAllocation.lecturers.length === 0) {
        lecturers.push(addedLecturer);
      }

      selectedAllocation.lecturers = lecturers;
      
      var indexOfUpdatedAllocation = 0;

      courseInfo.course.allocations.forEach((allocation, index) => {
        if (selectedAllocation._id === allocation._id) {
          indexOfUpdatedAllocation = index;
        }
      });

      courseInfo.course.allocations[indexOfUpdatedAllocation] = selectedAllocation;

      console.log(courseInfo.course.allocations);

      const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('hodToken')}`
        }
      }

      setIsProcessing(true);
      
      axios.put(`${serverUrl}/api/v1/ssmec/course/update?id=${courseInfo.course._id}`, courseInfo.course, config)
      .then(response => {
        if (response.status === 200) {
          setIsProcessing(false);
          setResponseMessage({ message: response.data.message, severity: 'success' });
          setOpen(true);
          dispatch(getAllCourses());
          setSelectedCourse({});
          window.location.reload();
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
        <VerticallyFlexGapForm onSubmit={handleSubmit(onSubmit)} style={{ gap: '20px', backgroundColor: 'white' }}>
            <HorizontallyFlexSpaceBetweenContainer>
                <p style={{ width: '100%', fontWeight: '600', textAlign:'left' }}>{`Assign Teachers to ${courseInfo.course.name} for semester ${courseInfo.allocation.semester}, academic year of ${courseInfo.allocation.academicYear}`}</p>
            </HorizontallyFlexSpaceBetweenContainer>
            <VerticallyFlexGapContainer style={{ gap: '15px' }}>
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor="lecturerId">Teacher *</label>
                  <select 
                    id="lecturerId"
                    maxLength={4}
                    {...register("lecturerId", 
                    {required: true})} 
                    aria-invalid={errors.lecturerId ? "true" : "false"}
                  >
                    <option>Choose teacher</option>
                    {teachers.map((teacher, index) => {
                      return (
                        <option key={index} value={teacher.id}>{teacher.fullName}</option>
                      )
                    })}
                  </select>
                  {errors.lecturerId?.type === "required" && (
                    <p role="alert">Required</p>
                  )}
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor="groups">Groups *</label>
                  <input 
                      type="text" 
                      id="groups"
                      placeholder="Example: A, B, C, D" 
                      {...register("groups", 
                      {required: true})} 
                      aria-invalid={errors.groups ? "true" : "false"}
                  />
                  {errors.groups?.type === "required" && (
                    <p role="alert">{errors.groups}</p>
                  )}
                </FormElement>
                
                <FormElement style={{ flexDirection: 'row', gap: '40%' }}>
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="small" type="submit">Add</Button>
                    }
                    <Button variant="contained" color="secondary" size="small" type="button" onClick={() => {handleCloseModal()}}>Cancel</Button>
                </FormElement>
            </VerticallyFlexGapContainer>
        </VerticallyFlexGapForm>
    )
}