import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GeneralContext } from "../../App";
import { FormElement, HorizontallyFlexGapContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import axios from "axios";
import { useDispatch } from "react-redux";

const listOfFarmers = [
    {
        id:'1',
        fullName: 'Mukamana Esperance'
    },
    {
        id:'2',
        fullName: 'Rutikanga Jule'
    },
];

export default function AddManureProductionForm({projectId}) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(true);
    
    const onSubmit = data => {
        data.quantity = Number(data.quantity); 
        data.unitPrice = Number(data.unitPrice);

        setIsProcessing(true);
        
        console.log(data);

        axios.post(serverUrl+'/api/v1/mmpas/manure/add', data)
        .then(response => {
            setTimeout(() => {
                if (response.status === 201) {
                    setIsProcessing(false);
                    setResponseMessage({ message: response.data.message, severity: 'success' });
                    setOpen(true);
                    // dispatch(getProjectResources(projectId));
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
      };

    return (
        <VerticallyFlexGapForm onSubmit={handleSubmit(onSubmit)} style={{ gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
            <VerticallyFlexGapContainer style={{ gap: '15px' }}>
                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="measurementUnit">Farmer Name *</label>
                    <select 
                        {...register("measurementUnit", { required: true })}
                        aria-invalid={errors.measurementUnit ? "true" : "false"}
                    >
                        <option value="">Select farmer</option>
                        {listOfFarmers.map((farmer, index) => (
                            <option key={index} value={farmer.id}>{farmer.fullName}</option>
                        ))}
                    </select>
                    {errors.measurementUnit?.type === "required" && (
                    <p role="alert">Provide farmer name</p>
                    )}
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="quantity">Farmer phone *</label>
                    <input 
                        type="text" 
                        id="farmerPhone"
                        placeholder="Phone" 
                        {...register("farmerPhone", 
                        {required: true})} 
                        aria-invalid={errors.farmerPhone ? "true" : "false"}
                    />
                    {errors.quantity?.type === "required" && (
                        <p role="alert">The phone number of the farmer is required</p>
                    )}
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="name">Sector *</label>
                    <input 
                        type="text" 
                        id="sector"
                        placeholder="Sector" 
                        {...register("sector", 
                        {required: true})} 
                        aria-invalid={errors.sector ? "true" : "false"}
                    />
                    {errors.name?.type === "required" && (
                    <p role="alert">Sector is required</p>
                    )}
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="quantity">Quantity *</label>
                    <input 
                        type="number" 
                        id="quantity"
                        placeholder="Quantity" 
                        {...register("quantity", 
                        {required: true})} 
                        aria-invalid={errors.quantity ? "true" : "false"}
                    />
                    {errors.quantity?.type === "required" && (
                        <p role="alert">Quantity must be provided</p>
                    )}
                </FormElement>
                <FormElement style={{ flexDirection: 'row', gap: '40%' }}>
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="small" type="submit">SUBMIT</Button>
                    }
                    <Button variant="contained" color="secondary" size="small" type="button" onClick={() => {window.location.reload()}}>Cancel</Button>
                </FormElement>
            </VerticallyFlexGapContainer>
        </VerticallyFlexGapForm>
    )
}