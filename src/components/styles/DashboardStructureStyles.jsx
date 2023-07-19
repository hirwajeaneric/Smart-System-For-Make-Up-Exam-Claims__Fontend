import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const TopNavigationBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 100px;
    z-index: 1000;
    width: 100vw;
    background: white; 
    
    a {
        font-size: 200%;
        text-decoration: none;
        font-weight: 900;

        img {
            width: 200px;
        }
    }

    div.left {
        display: flex;
        align-items: center;

        svg {
            font-size: 180%;
            margin: 20px 20px 20px 10px;
        }
    }

    div.right {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 20px;
    }

    @media (max-width: 768px) {
        padding: 10px 40px;        
        
    }

    @media (max-width: 480px) {
        padding: 10px 20px;
        
    }
`;

export const SideNavigationBar = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    position: fixed;
    z-index: 999;
    height: 80vh;
    height: 80svh;
    // bottom: 0;
    left: 0;
    padding: 0 10px 20px;
    background-color: #e0ebeb;

    @media (max-width: 1200px) {
        width: 20%;
    }
    
    @media (max-width: 768px) {
        width: 20%;
    }

    @media (max-width: 480px) {
        
    }
`;

export const SideBarMenueContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
    border-radius: 5px;
    background: white;
    color: black;
    height: 80vh;
    height: 80svh;

    @media (max-width: 1200px) {
        
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const SideBarMenuItem = styled(NavLink)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    color: white;
    padding: 12px 0;
    cursor: pointer;
    text-decoration: none;
    text-align: left;

    svg {
        width: 20%;
    }

    div.nav-data {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 80%;

        span.text {
            width: 80%;
        }
    
        span.number {
            width: 20%;
            font-size: 90%;
        }
    }

    &:hover {
        color: yellow;
    }

    &.active {
        color: orange;
    }

    @media (max-width: 991px) {

    }

    @media (max-width: 480px) {
        
    }
`;

export const SecondaryMenue = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    z-index: 999;
    background-color: #0063ab;
    padding: 10px 100px;
    align-items: center;
    justify-content: center;
    gap: 30px;
    
    a {
        color: white;
        text-decoration: none;
    }
    

    @media (max-width: 768px) {
        padding: 10px 40px;
    }

    @media (max-width: 480px) {
        padding: 10px 20px;
    }
`;

export const DashboardMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    background-color: #e0ebeb;
    padding: 40px 100px; 

    @media (max-width: 991px) {
        padding: 40px 80px;
    }

    @media (max-width: 768px) {
        padding: 40px 40px;
    }

    @media (max-width: 480px) {
        padding: 40px 20px;
    }
`;

export const DashboardInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    // min-height: 90vh;

    @media (max-width: 1200px) {

    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

