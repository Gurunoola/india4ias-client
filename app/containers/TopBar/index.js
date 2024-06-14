import React, { useEffect, useState } from 'react';
import {
    TopBarAlerts,
    TopBarMessages,
    TopBarProfile,
    TopBarSearch,
    Icon,
    Nav,
    NavItem
} from '../../components';
import { getUser } from '../../services/userServices';

function TopBar(props) {
    const {globalConfigs } = props
    const { showTopSearch, showTopBarAlertIcon, showTopBarMessagesIcon } = globalConfigs.appConfig;
    const [user, setUser] = useState({});
    function handleSideBar() {
        props.setShowSideBar(!props.showSideBar)
    }

    useEffect(() => {
        const user = getUser();
        setUser(user)
    }, [])

    return (
        <>
            <div className="navbar d-flex p-2 bd-highlight rounded-0 navbar-expand navbar-light bg-white topbar sticky-top shadow-sm">
                <div className="p-2 flex-grow-1 bd-highlight">
                    {props.sideBarCollapsiable ? <button onClick={handleSideBar} id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3 p-0">
                        <Icon icon={'list'} size='20px' />
                    </button> : undefined}
                    {showTopSearch ? <TopBarSearch /> : undefined}
                </div>
                <div className="p-2 bd-highlight">
                    <Nav >
                        {showTopBarAlertIcon && <NavItem className="dropdown no-arrow mx-1" >
                            <TopBarAlerts />
                        </NavItem>}
                        {showTopBarMessagesIcon && <NavItem className="dropdown no-arrow mx-1" >
                            <TopBarMessages />
                        </NavItem>
                        }
                        <NavItem className="dropdown no-arrow mx-1" >
                            <TopBarProfile user={{ ...user.data }} />
                        </NavItem>
                    </Nav>
                </div>
            </div>
        </>
    );
}

export default TopBar