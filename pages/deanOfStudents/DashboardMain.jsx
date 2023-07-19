import { Link, Outlet, useNavigate } from "react-router-dom";
import { DashboardInnerContainer, DashboardMainContainer, SideBarMenuItem, SideBarMenueContainer, SideNavigationBar, TopNavigationBar } from "../../components/styles/DashboardStructureStyles"
import { HorizontallyFlexGapContainer, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from "../../components/styles/GenericStyles"
import { MdHome, MdMenu, MdNotifications } from 'react-icons/md';
import { AiFillBuild } from 'react-icons/ai';
import { PiToolboxFill } from 'react-icons/pi';
import { TiUser } from 'react-icons/ti';
import Avatar from "@mui/material/Avatar"; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, IconButton, ListItemIcon, Tooltip } from "@mui/material";
import { useState } from "react";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { getSimpleCapitalizedChars } from "../../utils/HelperFunctions";

const DashboardMain = () => {
    const [ cookies, setCookie, removeCookie ] = useCookies(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [fullSize, setFullSize] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const user = cookies.UserData;      

    const signout = () => {
        removeCookie('AuthToken');
        removeCookie('UserData');
        navigate('/auth/signin')
    }

    const { isLoading, listOfConsultantsProjects, listOfOwnerProjects, numberOfProjects } = useSelector(state => state.project);
    
    return (
        <VerticallyFlexSpaceBetweenContainer style={{ backgroundColor: '#e0ebeb' }}>
            <TopNavigationBar>
                <div className="left">
                    <MdMenu style={{ cursor: 'pointer' }} onClick={() => setFullSize(!fullSize)}/>
                    <Link to='/'>Contruc</Link>
                </div>    
                <div className="right">
                    <MdNotifications style={{ fontSize: '150%', color: 'gray'}} />
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2, background: 'white' }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32, background: 'black' }}>{getSimpleCapitalizedChars(user.fullName)}</Avatar>
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
                    <Avatar sx={{ width: 32, height: 32 }}>{getSimpleCapitalizedChars(user.fullName)}</Avatar>
                        <VerticallyFlexGapContainer style={{ justifyContent:'flex-start', alignItems:'flex-start', gap: '5px' }}>
                            <p>{user.fullName}</p>
                            <p style={{ color: 'blue', fontWeight:'700', fontSize:'90%' }}>{user.role}</p>
                            <p style={{ color: 'gray', fontSize:'90%' }}>{user.email}</p>
                        </VerticallyFlexGapContainer>
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose}>
                        <Avatar /> My account
                    </MenuItem> */}
                    <Divider />
                    {/* <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem> */}
                    <MenuItem onClick={() => {navigate('/settings'); handleClose();}}>
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


            <HorizontallyFlexGapContainer style={{ position: 'relative' }}>
                
                <SideNavigationBar style={{ width: fullSize ? '5%' : '20%' }}>
                    <SideBarMenueContainer>
                        <SideBarMenuItem to={''}>
                            <MdHome style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                                {!fullSize && <span className="text">Home</span>}
                            </div>
                        </SideBarMenuItem>
                        <SideBarMenuItem to={'projects'}>
                            <AiFillBuild style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <>
                                <span className="text">Projects</span>
                                <span className="number">{numberOfProjects}</span>
                                </>
                            }
                            </div>
                        </SideBarMenuItem>
                        { 
                            listOfConsultantsProjects.map((project, index) => {
                                return (<SideBarMenuItem key={index} onClick={()=>{window.location.replace(`/${project.code}`)}} to={`/${project.code}`} style={{ fontSize:'90%' }}>
                                    <MdHome style={{ width: fullSize ? '100%' : '20%', color: "transparent"}}/>
                                    <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                                        {!fullSize && 
                                            <>
                                                <span className="text">{project.name}</span>
                                                <span className="number">{project.progress} %</span>
                                            </>    
                                        }
                                    </div>
                                </SideBarMenuItem>)
                            }) 
                        }
                        {
                            listOfOwnerProjects.map((project, index) => {
                                return (<SideBarMenuItem key={index} onClick={()=>{window.location.replace(`/${project.code}`)}} to={`/${project.code}`} style={{ fontSize:'90%' }}>
                                    <MdHome style={{ width: fullSize ? '100%' : '20%', color: "transparent"}}/>
                                    <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                                        {!fullSize && 
                                            <>
                                                <span className="text">{project.name}</span>
                                                <span className="number">{project.progress} %</span>
                                            </>    
                                        }
                                    </div>
                                </SideBarMenuItem>)
                            }) 
                        }
                        {/* <SideBarMenuItem to={'resources'}>
                            <PiToolboxFill style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <><span className="text">Resources</span></>}
                            </div>
                        </SideBarMenuItem> */}
                        {/* <SideBarMenuItem to={'report'}>
                            <BiSolidReport />
                            <div className="nav-data">
                                <span className="text">Reports</span>
                            </div>
                        </SideBarMenuItem> */}
                        <SideBarMenuItem to={'settings'}>
                            <TiUser style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <span className="text">My account</span>}
                            </div>
                        </SideBarMenuItem>                    
                    </SideBarMenueContainer>
                </SideNavigationBar>
                


                <DashboardMainContainer  style={{ width: fullSize ? '95%' : '80%' }}>
                    <DashboardInnerContainer>
                        <Outlet />
                    </DashboardInnerContainer>
                </DashboardMainContainer>

            </HorizontallyFlexGapContainer>
        </VerticallyFlexSpaceBetweenContainer>
    )
}

export default DashboardMain