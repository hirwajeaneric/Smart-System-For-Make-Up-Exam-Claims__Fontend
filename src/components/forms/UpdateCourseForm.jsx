import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { GeneralContext } from "../../App";
import { FormElement, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllCourses } from "../../redux/features/courseSlice";
import { AUCAFacultiesAndDepartments } from "../../utils/AUCAFacultiesAndDepartments";
import { useEffect } from "react";

export default function UpdateCourseForm() {
    const [isProcessing, setIsProcessing] = useState(false);
    const { setOpen, setResponseMessage, selectedCourse, setSelectedCourse, setCourseToBeDeleted } = useContext(GeneralContext);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(true);
    const [selectedCourseErrors, setSelectedCourseErrors] = useState({});

    const handleFormInput = ({ target: input}) => {
      setSelectedCourse({...selectedCourse, [input.name]: input.value });
    }

    const displayConfirmationModal = (courseId) => {
        setFormType('confirmDelete');
        handleOpenModal();
        setCourseToBeDeleted(courseId);
    }

    const updateCourseData = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('hodToken')}`
            }
        }

        axios.put(`${serverUrl}/api/v1/ssmec/course/update?id=${selectedCourse.id}`, selectedCourse, config)
        .then(response => {
            if (response.status === 200) {
                setIsProcessing(false);
                setResponseMessage({ message: response.data.message, severity: 'success' });
                setOpen(true);
                dispatch(getAllCourses());
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
        <VerticallyFlexGapForm onSubmit={updateCourseData} style={{ gap: '20px', backgroundColor: 'white', padding: '0 10px 20px' }}>
            <HorizontallyFlexSpaceBetweenContainer>
                <p style={{ width: '100%', fontWeight: '600', textAlign:'left' }}>Update Course Data</p>
            </HorizontallyFlexSpaceBetweenContainer>
            <VerticallyFlexGapContainer style={{ gap: '15px' }}>
                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="name">Course name *</label>
                        <input 
                            type="text" 
                            id="name"
                            name="name"
                            placeholder="Course name" 
                            value={selectedCourse.name || ''}
                            onChange={handleFormInput}
                        />
                        {/* {errors.name?.type === "required" && (
                                <p role="alert">Required</p>
                        )} */}
                    </FormElement>    
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="code">Course code *</label>
                        <input 
                            type="text" 
                            id="code"
                            name="code"
                            placeholder="Course code" 
                            value={selectedCourse.code || ''}
                            onChange={handleFormInput}
                        />
                        {/* {errors.code?.type === "required" && (
                            <p role="alert">Required</p>
                        )} */}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="credits">Number of credits *</label>
                        <input 
                            type="text" 
                            id="credits"
                            name="credits"
                            placeholder="Number of credits" 
                            value={selectedCourse.credits || ''}
                            onChange={handleFormInput}
                        />
                        {/* {errors.credits?.type === "required" && (
                            <p role="alert">Required</p>
                        )} */}
                    </FormElement>
                </HorizontallyFlexGapContainer>

                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                  <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="faculty">Faculty *</label>
                    <select id='faculty' name='faculty' onChange={handleFormInput}>
                        <option value="">Select faculty</option>
                        <option value={"Information Technology"}>Information Technology</option>
                        <option value="Business Administration">Business Administration</option>
                        <option value="Theology">Theology</option>
                        <option value="Education">Education</option>
                        <option value="Health Sciences">Health Sciences</option>
                    </select>
                    {selectedCourseErrors.faculty && <p>Faculty is required</p>}
                  </FormElement>
                  <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="department">Department *</label>
                    <select id='department' name='department' onChange={handleFormInput}>
                        <option value="">Select department</option>
                        <option value="All">All</option>
                        { selectedCourse.faculty === 'Information Technology' && 
                          AUCAFacultiesAndDepartments['Information Technology'].map((element, index) => {
                            return (
                              <option key={index} value={element || ''}>{element}</option>
                            );
                          })
                        }
                        { selectedCourse.faculty === 'Business Administration' && 
                          AUCAFacultiesAndDepartments['Business Administration'].map((element, index) => {
                            return (
                              <option key={index} value={element || ''}>{element}</option>
                            );
                          })
                        }
                        { selectedCourse.faculty === 'Theology' && <option value={'Theology'}>Theology</option>
                        }
                        { selectedCourse.faculty === 'Education' && 
                          AUCAFacultiesAndDepartments['Education'].map((element, index) => {
                            return (
                              <option key={index} value={element || ''}>{element}</option>
                            );
                          })
                        }
                        { selectedCourse.faculty === 'Health Sciences' && 
                          AUCAFacultiesAndDepartments['Health Sciences'].map((element, index) => {
                            return (
                              <option key={index} value={element || ''}>{element}</option>
                            );
                          })
                        }
                    </select>
                    {selectedCourseErrors.department && <p>Faculty is required</p>}
                  </FormElement>                    
                </HorizontallyFlexGapContainer>
                
                <FormElement style={{ flexDirection: 'row' }}>
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="small" type="submit">Update</Button>
                    }
                    <Button variant="contained" color="secondary" size="small" type="button" onClick={() => {window.location.reload()}}>Cancel</Button>
                    <Button variant="contained" color="error" size="small" type="button" onClick={() => displayConfirmationModal(selectedCourse.id)}>DELETE</Button>
                </FormElement>
            </VerticallyFlexGapContainer>
        </VerticallyFlexGapForm>
    )
}