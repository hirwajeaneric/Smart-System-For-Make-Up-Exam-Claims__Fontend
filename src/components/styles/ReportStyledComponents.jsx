import styled from 'styled-components';

export const ReportPaperContainer = styled.div`
    width: 210mm;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 60px;
`;

export const ReportHeader = styled.div`
    width: 100%;
    padding: 50px 50px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    img {
        width: 15%;
    }



`;

export const ReportFooter = styled.div`
    width: 100%;
    padding: 50px;
    font-size: 85%;

`;

export const ReportBody = styled.div`
    width: 100%;
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    h1 {
        margin-bottom: 10px;
        width: 100%;
        padding-top: 20px;
        border-top: 1px solid gray;
    }

`;

export const InstitutionDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    p {
        font-size: 85%;
    }

`;

export const ReportDateAndGenerator = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 85%;
    padding-bottom: 20px;
    border-bottom: 1px solid gray;
`;

export const ReportContent = styled.div`
    font-size: 90%;
    padding-top: 20px;

    h4 {
        margin: 20px 0 10px;
    }
`;

export const Table = styled.table`
    width: 100%;

    thead {
        tr {
            th {
                text-align: left;
            }
        }
    }
`;

export const TableList = styled.table`
    border-collapse: collapse;
    width: 100%;
    font-size: 85%;

    thead {
        tr {
            th {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid gray;
            }
        }
    }

    tbody {
        tr {
            td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid gray;
            }
        }
    }


`;