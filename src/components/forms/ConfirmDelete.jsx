import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GeneralContext } from "../../App";
import { FormElement, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllCourses } from "../../redux/features/courseSlice";
import { AUCAFacultiesAndDepartments } from "../../utils/AUCAFacultiesAndDepartments";

export default function ConfirmDelete({projectId}) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setOpen, setResponseMessage, openModal, setOpenModal, handleCloseModal } = useContext(GeneralContext);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(true);
    var [formData, setFormData] = useState({});  
    const [formDataErrors, setFormDataErrors] = useState({});

    const handleFormInput = ({ target: input}) => {
      setFormData({...formData, [input.name]: input.value });
    }

    const onSubmit = data => {
      formData.name = data.name;
      formData.code = data.code;
      formData.credits = data.credits;

      setIsProcessing(true);

      axios.post(`${serverUrl}/api/v1/ssmec/course/add`, formData)
      .then(response => {
        if (response.status === 201) {
          setIsProcessing(false);
          setResponseMessage({ message: response.data.message, severity: 'success' });
          setOpen(true);
          dispatch(getAllCourses());
        }
        setTimeout(() => {
          handleCloseModal();
        }, 2000)
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
                <p style={{ width: '100%', fontWeight: '600', textAlign:'left' }}>Add Course</p>
            </HorizontallyFlexSpaceBetweenContainer>
            <VerticallyFlexGapContainer style={{ gap: '15px' }}>
                <FormElement style={{ color: 'gray' }}>
                  <label htmlFor="name">Course name *</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Course name" 
                    {...register("name", 
                    {required: true})} 
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name?.type === "required" && (
                    <p role="alert">Required</p>
                  )}
                </FormElement>
                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                  <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="code">Course code *</label>
                    <input 
                        type="text" 
                        id="code"
                        placeholder="Course code" 
                        {...register("code", 
                        {required: true})} 
                        aria-invalid={errors.code ? "true" : "false"}
                    />
                    {errors.code?.type === "required" && (
                    <p role="alert">Required</p>
                    )}
                  </FormElement>
                  <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="credits">Number of credits *</label>
                    <input 
                        type="text" 
                        id="credits"
                        placeholder="Number of credits" 
                        {...register("credits", 
                        {required: true})} 
                        aria-invalid={errors.credits ? "true" : "false"}
                    />
                    {errors.credits?.type === "required" && (
                    <p role="alert">Required</p>
                    )}
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
                    {formDataErrors.faculty && <p>Faculty is required</p>}
                  </FormElement>
                  <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="department">Department *</label>
                    <select id='department' name='department' onChange={handleFormInput}>
                        <option value="">Select department</option>
                        <option value="All">All</option>
                        { formData.faculty === 'Information Technology' && 
                          AUCAFacultiesAndDepartments['Information Technology'].map((element, index) => {
                            return (
                              <option key={index} value={element}>{element}</option>
                            );
                          })
                        }
                        { formData.faculty === 'Business Administration' && 
                          AUCAFacultiesAndDepartments['Business Administration'].map((element, index) => {
                            return (
                              <option key={index} value={element}>{element}</option>
                            );
                          })
                        }
                        { formData.faculty === 'Theology' && <option value={'Theology'}>Theology</option>
                        }
                        { formData.faculty === 'Education' && 
                          AUCAFacultiesAndDepartments['Education'].map((element, index) => {
                            return (
                              <option key={index} value={element}>{element}</option>
                            );
                          })
                        }
                        { formData.faculty === 'Health Sciences' && 
                          AUCAFacultiesAndDepartments['Health Sciences'].map((element, index) => {
                            return (
                              <option key={index} value={element}>{element}</option>
                            );
                          })
                        }
                    </select>
                    {formDataErrors.department && <p>Faculty is required</p>}
                  </FormElement>                    
                </HorizontallyFlexGapContainer>
                
                <FormElement style={{ flexDirection: 'row', gap: '40%' }}>
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="small" type="submit">Add</Button>
                    }
                    <Button variant="contained" color="secondary" size="small" type="button" onClick={() => {window.location.reload()}}>Cancel</Button>
                </FormElement>
            </VerticallyFlexGapContainer>
        </VerticallyFlexGapForm>
    )
}