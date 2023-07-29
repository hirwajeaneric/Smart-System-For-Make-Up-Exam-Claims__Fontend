import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GeneralContext } from "../../App";
import { FormElement, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllCourses } from "../../redux/features/courseSlice";
import { useEffect } from "react";

export default function AddCourseAllocationForm() {
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setOpen, setResponseMessage, handleCloseModal, selectedCourse, setSelectedCourse } = useContext(GeneralContext);
    const dispatch = useDispatch();

    const onSubmit = data => {
      // Create a copy of the existing allocations array
      const existingAllocations = [...selectedCourse.allocations];

      if (selectedCourse.allocations.length !== 0) {
        existingAllocations.push(data);

        selectedCourse.allocations = existingAllocations
      } else if (selectedCourse.allocations.length === 0) {
        selectedCourse.allocations = [data]
      }

      console.log(selectedCourse);

      const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('hodToken')}`
        }
      }

      setIsProcessing(true);
      
      axios.put(`${serverUrl}/api/v1/ssmec/course/update?id=${selectedCourse._id}`, selectedCourse, config)
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
                <p style={{ width: '100%', fontWeight: '600', textAlign:'left' }}>Add allocation</p>
            </HorizontallyFlexSpaceBetweenContainer>
            <VerticallyFlexGapContainer style={{ gap: '15px' }}>
                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                  <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="academicYear">Academic year *</label>
                    <input 
                      type="text" 
                      id="academicYear"
                      maxLength={4}
                      placeholder="Academic Year" 
                      {...register("academicYear", 
                      {required: true})} 
                      aria-invalid={errors.academicYear ? "true" : "false"}
                    />
                    {errors.academicYear?.type === "required" && (
                      <p role="alert">Required</p>
                    )}
                  </FormElement>
                  <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="semester">Semester *</label>
                    <input 
                        type="text" 
                        id="semester"
                        maxLength={1}
                        placeholder="Semester" 
                        {...register("semester", 
                        {required: true})} 
                        aria-invalid={errors.semester ? "true" : "false"}
                    />
                    {errors.semester?.type === "required" && (
                      <p role="alert">{errors.semester}</p>
                    )}
                  </FormElement>
                </HorizontallyFlexGapContainer>

                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor="midSemesterExams">Date of mid-semester exams *</label>
                  <input 
                      type='datetime-local' 
                      id="midSemesterExams"
                      {...register("midSemesterExams", 
                      {required: false})} 
                      aria-invalid={errors.midSemesterExams ? "true" : "false"}
                  />
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor="finalExams">Date of final exams *</label>
                  <input 
                      type='datetime-local' 
                      id="finalExams"
                      {...register("finalExams", 
                      {required: false})} 
                      aria-invalid={errors.finalExams ? "true" : "false"}
                  />
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