import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { DashboardInnerContainer, DashboardMainContainer, TopNavigationBar, SecondaryMenue, SecondaryMenue2 } from "../../components/styles/DashboardStructureStyles"
import { FormElement, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from "../../components/styles/GenericStyles"
import Avatar from "@mui/material/Avatar"; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Divider, IconButton, ListItemIcon, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Logout, Settings } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getSimpleCapitalizedChars } from "../../utils/HelperFunctions";
import { getAllCourses } from "../../redux/features/courseSlice";
import { getDepartmentClaims } from "../../redux/features/claimSlice";
import { getNotificationsForUser } from "../../redux/features/notificationSlice";
import { GeneralContext } from "../../App";

const DashboardMain = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [user, setUser] = useState({});
    const [filter, setFilter] = useState({});

    useEffect(() => {
        let loggedUser = JSON.parse(localStorage.getItem('hodData'));
        loggedUser.departmentLink = loggedUser.department.split(" ").join(""); 
        setUser(loggedUser);

        dispatch(getAllCourses());
        filterResults(loggedUser);
        dispatch(getNotificationsForUser({ role: 'Head of Department', department: user.department}))
    
    },[dispatch]);      

    const filterChoiceHandler = (e) => { 
        setFilter({ ...filter, [e.target.name]: e.target.value });
    }

    const filterResults = (loggedUser) => {
        if (filter.academicYear && !filter.semester) {
            dispatch(getDepartmentClaims({
                token: localStorage.getItem('hodToken'),
                department: loggedUser.department,
                academicYear: filter.academicYear
            }));
        } else if (filter.semester && !filter.academicYear) {
            setResponseMessage({ message: 'Please provide the academic year first', severity:'error'})
            setOpen(true);
        } else if (filter.academicYear !== '' && filter.semester !== '') {
            dispatch(getDepartmentClaims({
                token: localStorage.getItem('hodToken'),
                department: loggedUser.department,
                academicYear: filter.academicYear,
                semester: filter.semester
            }));
        } else {
            dispatch(getDepartmentClaims({
                token: localStorage.getItem('hodToken'),
                department: loggedUser.department
            }));
        }    
    } 


    const signout = () => {
        localStorage.removeItem('hodToken');
        localStorage.removeItem('hodData');
        navigate('/hod/auth/signin');
    }

    const {} = useSelector(state => state.course)

    return (
        <VerticallyFlexSpaceBetweenContainer>
            <TopNavigationBar>
                <Link to={`/hod/${user.departmentLink}/`}><img src="/ssmec-logo-2.2.png" alt="" /></Link>  
                <div className="right">
                    {/* <MdNotifications style={{ fontSize: '150%', color: 'gray'}} /> */}
                    <p>{user.role}</p>
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
                <div style={{ gap: '40px', padding: '0px 100px', backgroundColor: '#0063ab', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SecondaryMenue2 style={{ padding: '0px' }}>
                        <NavLink to={'home'}>Home</NavLink>
                        <NavLink to={'courses'}>Courses</NavLink>
                        <NavLink to={'settings'}>Settings</NavLink>
                    </SecondaryMenue2>

                    <div style={{ gap: '10px', display: 'flex', alignItems: 'center' }}>
                        <FormElement>
                        <select style={{ padding: '6px 10px', background: 'white', borderRadius: "0px", border: 'none' }} name='academicYear' id='academicYear' onChange={filterChoiceHandler}>
                            <option>Select academic year</option>
                            <option value='2023'>2023</option>
                            <option value='2024'>2024</option>
                        </select>
                        </FormElement>
                        <FormElement>
                        <select name='semester' id='semester' style={{ padding: '6px 10px', background: 'white', borderRadius: "0px", border: 'none' }} onChange={filterChoiceHandler}>
                            <option>Choose semester</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                        </select>
                        </FormElement>
                        <button
                            style={{
                                fontSize: '100%',
                                background: 'transparent',
                                border: '1px solid white',
                                color: 'white',
                                padding: '5px 9px'
                            }}  
                            onClick={(e) => { 
                                e.preventDefault(); 
                                filterResults(user);
                            }}>Filter
                        </button>
                        <button 
                            style={{
                                fontSize: '100%',
                                background: 'white-smoke',
                                border: '1px solid blue',
                                color: 'blue',
                                padding: '5px 9px'
                            }}  
                            onClick={() => {
                                window.location.reload()
                            }}>Reset
                        </button>
                    </div>
                </div>
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