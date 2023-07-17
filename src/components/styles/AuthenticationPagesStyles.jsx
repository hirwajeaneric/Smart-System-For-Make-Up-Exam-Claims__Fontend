import styled from "@emotion/styled";

export const AuthenticationFormContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: rgba(26, 140, 255, 1);
    min-height: 80vh;
    border-radius: 5px;

    div.left {
        width: 40%;
        padding: 50px;
        border-radius: 5px 0 0 5px;
        height: 100%;
    }

    form.right {
        width: 60%;
        background-color: white;
        padding: 50px;
        border-radius: 0 5px 5px 0;
        height: 100%;
        align-items: flex-start;
        justify-content: center;
        gap: 20px;
    }

    @media (max-width: 768px) {
        width: 80%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;