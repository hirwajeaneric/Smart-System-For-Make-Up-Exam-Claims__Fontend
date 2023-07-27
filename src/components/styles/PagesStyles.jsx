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

export const CourseAllocationsTable = styled.table`
    font-size: 90%; 
    border-collapse: collapse;
    width: 100%;
    
    thead {
        th, td {
            text-align: left;
            padding: 8px;
        }
    }

    tbody {
        td {
            text-align: left;
            padding: 8px;
    
            button {
                border: 0px;
                background-color: black;
                color: white;
                cursor: pointer;
                padding: 5px 10px;
            }
        }
    }

    tr {
        
    }
    
    tr:nth-child(even) {background-color: #f2f2f2;}
`;