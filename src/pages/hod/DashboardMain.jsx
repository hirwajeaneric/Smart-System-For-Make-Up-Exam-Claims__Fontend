import { Link, Outlet, useNavigate } from "react-router-dom";
import { DashboardInnerContainer, DashboardMainContainer, TopNavigationBar, SecondaryMenue } from "../../components/styles/DashboardStructureStyles"
import { VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from "../../components/styles/GenericStyles"
import Avatar from "@mui/material/Avatar"; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, IconButton, ListItemIcon, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Logout, Settings } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleCapitalizedChars } from "../../utils/HelperFunctions";
import { getAllCourses } from "../../redux/features/courseSlice";

const DashboardMain = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [user, setUser] = useState({});

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('hodData'));
        user.departmentLink = user.department.split(" ").join(""); 
        setUser(user);
        dispatch(getAllCourses());
    },[dispatch]);      

    const signout = () => {
        localStorage.removeItem('hodToken');
        localStorage.removeItem('hodData');
        navigate('/hod/auth/signin');
    }

    // Load student claims
    // dispatch(getStudentClaims(student.registrationNumber));
    // Load registration information if the student is registered
    // dispatch(getStudentRegistration(student.registrationNumber));  
    const { } = useSelector(state => state.course)

    return (
        <VerticallyFlexSpaceBetweenContainer>
            <TopNavigationBar>
                <Link to={`/hod/${user.departmentLink}/`}><img src="/ssmec-logo-2.2.png" alt="" /></Link>  
                <div className="right">
                    {/* <MdNotifications style={{ fontSize: '150%', color: 'gray'}} /> */}
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2, background: '#0063ab' }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>{getSimpleCapitalizedChars(JSON.parse(localStorage.getItem('hodData')).fullName)}</Avatar>
                        </IconButton>
                    </Tooltip>
                </div>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose} style={{ display:'flex', flexDirection:'row', alignItems:'flex-start' }}>
                    <Avatar sx={{ width: 32, height: 32 }}>{getSimpleCapitalizedChars(JSON.parse(localStorage.getItem('hodData')).fullName)}</Avatar>
                        <VerticallyFlexGapContainer style={{ justifyContent:'flex-start', alignItems:'flex-start', gap: '5px' }}>
                            <p>{user.fullName}</p>
                            <p style={{ color: 'blue', fontWeight:'700', fontSize:'90%' }}>{user.role}</p>
                            <p style={{ color: 'gray', fontSize:'90%' }}>{user.email}</p>
                        </VerticallyFlexGapContainer>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {navigate(`/hod/${user.departmentLink}/settings`); handleClose();}}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>Settings
                    </MenuItem>
                    <MenuItem onClick={() => {handleClose(); signout()}}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>Logout
                    </MenuItem>
                </Menu>
            </TopNavigationBar> 


            <VerticallyFlexGapContainer style={{ position: 'relative' }}>
                <SecondaryMenue>
                    <Link to={'home'}>Home</Link>
                    <Link to={'courses'}>Courses</Link>
                    <Link to={'lecturers'}>Lecturers</Link>
                    <Link to={'claims'}>Claims</Link>
                    <Link to={'settings'}>{user.fullName}</Link>
                </SecondaryMenue>
                <DashboardMainContainer>
                    <DashboardInnerContainer>
                        <Outlet />
                    </DashboardInnerContainer>
                </DashboardMainContainer>

            </VerticallyFlexGapContainer>
        </VerticallyFlexSpaceBetweenContainer>
    )
}

export default DashboardMain