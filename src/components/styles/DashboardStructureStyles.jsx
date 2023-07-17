import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const TopNavigationBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    z-index: 1000;
    height: 10vh;
    height: 10svh; 
    width: 100vw; 
    
    div.left {
        display: flex;
        align-items: center;
        gap: 20px;

        a {
            font-size: 200%;
            text-decoration: none;
            font-weight: 900;
            color: #339966;
        }

        svg {
            font-size: 180%;
            margin: 20px 20px 20px 10px;
        }
    }

    div.right {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-right: 20px;
    }

    @media (max-width: 768px) {
        div.left {
            display: flex;
            width: 100%;
            margin-bottom: 20px;
        }
    
        div.right {
            display: flex;
            width: 100%;
        }
        
        
    }

    @media (max-width: 480px) {
        div.left {
            
        }
    
        div.right {
        
        }
    }
`;

export const SideNavigationBar = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    position: fixed;
    z-index: 999;
    height: 90vh;
    height: 90svh;
    bottom: 0;
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
    background: #26734d;
    color: white;
    height: 90vh;
    height: 90svh;

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

export const DashboardMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    position: fixed;
    z-index: 999;
    height: 90vh;
    height: 90svh;
    bottom: 0;
    right: 0;
    background-color: #e0ebeb;
    
    @media (max-width: 1200px) {
        width: 100%;
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const DashboardInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    padding: 5px 20px 5px 5px;

    @media (max-width: 1200px) {
        padding: 5px 10px 5px 10px;
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const StepToGetStarted = styled.div`    
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    svg {
        border: 1px solid #b3d9ff;
        border-radius: 5px;
        font-size: 220%;
        padding: 5px;
    }

    div {
        p {
            color: black;
            font-weight: 600;
        }

        span {
            color: gray;
            font-size: 90%;
        }
    }
`;

export const ProjectProgressBar = styled.div`    
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #e0ebeb;
    width: 100%;
    border-radius: 5px;

    p {
        color: black;
        text-align: center;
        font-size: 90%;
        padding: 3px 0;
        width: 100%;
    }

    div {
        background-color: green;
        border-radius: 5px;
        p {
            color: white;
            text-align: center;
            font-size: 90%;
            padding: 3px 0;
        }
    }
`;