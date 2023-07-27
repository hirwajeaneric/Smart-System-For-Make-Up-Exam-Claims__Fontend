import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GeneralContext } from "../../App";
import { FormElement, HeaderOne, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllCourses } from "../../redux/features/courseSlice";
import { AUCAFacultiesAndDepartments } from "../../utils/AUCAFacultiesAndDepartments";
import { Warning } from "@mui/icons-material";

export default function ConfirmDelete({ data }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { setOpen, setResponseMessage, courseToBeDeleted, openModal, setOpenModal, handleCloseModal } = useContext(GeneralContext);
    const dispatch = useDispatch();
    
    const deleteCourse = (e) => {
      e.preventDefault();

      const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('hodToken')}`
        }
      }

      setIsProcessing(true);

      axios.delete(`${serverUrl}/api/v1/ssmec/course/delete?id=${courseToBeDeleted}`, config)
      .then(response => {
        if (response.status === 200) {
          setIsProcessing(false);
          setResponseMessage({ message: response.data.message, severity: 'success' });
          setOpen(true);
          dispatch(getAllCourses());
        }
        setTimeout(() => {
          handleCloseModal();
          window.location.reload();
        }, 1000)
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
        <VerticallyFlexGapForm onSubmit={deleteCourse} style={{ gap: '20px', backgroundColor: 'white' }}>
            <VerticallyFlexGapContainer style={{ gap: '15px' }}>  
                <Warning style={{ fontSize: '400%', color: 'orange' }}/>
                <HeaderOne>Warning</HeaderOne>
                <p>Do you really want to delete this course?</p>
                <FormElement style={{ flexDirection: 'row', gap: '40%' }}>
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="small" type="submit">DELETE</Button>
                    }
                    <Button variant="contained" color="secondary" size="small" type="button" onClick={() => {handleCloseModal()}}>Cancel</Button>
                </FormElement>
            </VerticallyFlexGapContainer>
        </VerticallyFlexGapForm>
    )
}