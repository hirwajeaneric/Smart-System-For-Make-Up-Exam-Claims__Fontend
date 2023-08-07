import styled from 'styled-components';

export const a = styled.div`
    width: 100%;    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const CourseAllocationsContainer = styled.table`
    width: 100%;
    overflow-y: auto;
`;

export const StudentDashboardInformationContainer = styled.div`
    width: 100%;
    background: #c2d6d6;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    font-size: 90%;

    div.left, div.right {
        width: 49%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;
        align-items: flex-start;
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
        
        div.left, div.right {
            width: 100%;
        }
    }   
    
    @media (max-width: 480px) {
        
    }   
`;


export const ClaimDetailsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    font-size: 90%;

    div.first, div.middle, form.last {
        background: white;
        padding: 15px;
        border-radius: 5px;
        width: 32%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
        
        div.first, div.middle, form.last {
            width: 49%;
            gap: 10px;
        }
    }   
    
    @media (max-width: 480px) {
        
    }   
`;


export const ClaimDetailsItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    // gap: 5px;

    label {
        font-size: 90%;
        color: gray;
    }
    
    p {
        color: black;
    }
`;