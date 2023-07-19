import styled from "@emotion/styled";

export const AuthenticationFormContainer = styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    padding: 25px;

    @media (min-width: 1240px) {
        width: 30%;
    }

    @media (max-width: 991px) {
        width: 40%;
    }

    @media (max-width: 768px) {
        width: 70%;
    }

    @media (max-width: 480px) {
        width: 98%;
    }
`;