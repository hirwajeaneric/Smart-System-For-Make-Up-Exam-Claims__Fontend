import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GeneralContext } from "../../App";
import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { useCookies } from "react-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AUCAFacultiesAndDepartments } from "../../utils/AUCAFacultiesAndDepartments";

export default function DeclareAbsenceFormPage2() {
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const [ cookies, setCookie, removeCookie ] = useCookies(null);
    const user = cookies.UserData;
    const dispatch = useDispatch();
    var [formData, setFormData] = useState({});  
    const [formDataErrors, setFormDataErrors] = useState({});

    const handleFormInput = ({ target: input}) => {
        setFormData({...formData, [input.name]: input.value });
    }

    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {
          setResponseMessage({message:'Passwords do not match', severity: 'warning'});
          setOpen(true);
          return;
        } else {
            
          data.consultantId = user.id;
          data.consultantName = user.fullName;
          data.consultantEmail = user.email;

          setIsProcessing(true);
    
          axios.post(serverUrl+'/api/v1/cpta/project/add', data)
          .then(response => {
            setTimeout(() => {
              if (response.status === 201) {
                setIsProcessing(false);
                setResponseMessage({ message: response.data.message, severity: 'success' });
                setOpen(true);
                dispatch(getAllProjects(user.id));
              }
            }, 3000)
          })
          .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
              setIsProcessing(false);
              setResponseMessage({ message: error.response.data.msg, severity:'error'})
              setOpen(true);
            }
          })
        }
      };

    return (
        <VerticallyFlexGapForm onSubmit={handleSubmit(onSubmit)} style={{ gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
            
            <VerticallyFlexGapContainer style={{ gap: '10px', borderBottom: '1px solid #b3d9ff', paddingBottom: '15px', width: '100%', alignItems: 'flex-start'}}>
                <HeaderTwo style={{ fontWeight: '600' }}>Step 1</HeaderTwo>
                <p style={{ textAlign:'left' }}>Basic information.</p>
            </VerticallyFlexGapContainer>
            

            <VerticallyFlexGapContainer style={{ gap: '15px' }}>
                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="fullName">Name *</label>
                        <input 
                            type="text" 
                            id="name"
                            placeholder="Project name" 
                            {...register("name", 
                            {required: true})} 
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name?.type === "required" && (
                        <p role="alert">Project name is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="registrationNumber">Registration Number *</label>
                        <input 
                            type="number" 
                            id="registrationNumber"
                            placeholder="Registration number" 
                            {...register("registrationNumber", 
                            {required: true})} 
                            aria-invalid={errors.registrationNumber ? "true" : "false"}
                        />
                        {errors.name?.type === "required" && (
                        <p role="alert">Registration number is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="email">Email address *</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="email" 
                            {...register("email", 
                            {required: true})} 
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email?.type === "required" && (
                        <p role="alert">Email is required</p>
                        )}
                    </FormElement>
                </HorizontallyFlexGapContainer>

                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="phone">Phone number *</label>
                        <input 
                            type="text" 
                            id="phone"
                            placeholder="Phone number" 
                            {...register("phone", 
                            {required: true})} 
                            aria-invalid={errors.phone ? "true" : "false"}
                        />
                        {errors.phone?.type === "required" && (
                            <p role="alert">Phone number is required</p>
                        )}
                    </FormElement>
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
                        {errors.faculty && <p>Faculty is required</p>}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="department">Department *</label>
                        <select id='department' name='department' onChange={handleFormInput}>
                            <option value="">Select department</option>
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
                        {errors.department && <p>Faculty is required</p>}
                    </FormElement>
                </HorizontallyFlexGapContainer>
                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="academicYear">Academic year *</label>
                        <input 
                            type="text" 
                            id="academicYear"
                            placeholder="academicYear" 
                            {...register("academicYear", 
                            {required: true})} 
                            aria-invalid={errors.academicYear ? "true" : "false"}
                        />
                        {errors.academicYear?.type === "required" && (
                            <p role="alert">Academic yaer is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="semester">Semester *</label>
                        <select 
                            {...register("semester", { required: true })}
                            aria-invalid={errors.semester ? "true" : "false"}
                        >
                            <option value="">Choose semester</option>
                            <option value={'1'}>One</option>
                            <option value={'2'}>Two</option>
                            <option value={'3'}>Three</option>
                        </select>
                        {errors.semester?.type === "required" && (
                            <p role="alert">Semester must be provided</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="department">Department *</label>
                        <select id='department' name='department' onChange={handleFormInput}>
                            <option value="">Select department</option>
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
                        {errors.department && <p>Faculty is required</p>}
                    </FormElement>
                </HorizontallyFlexGapContainer>
                

                <FormElement style={{ flexDirection: 'row', gap: '70%' }}>
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="medium" type="submit">SUBMIT</Button>
                    }
                    <Button variant="contained" color="secondary" size="medium" type="button" onClick={() => {window.location.reload()}}>Cancel</Button>
                </FormElement>
            </VerticallyFlexGapContainer>
        </VerticallyFlexGapForm>
    )
}