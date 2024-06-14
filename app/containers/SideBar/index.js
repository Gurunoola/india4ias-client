import React, { useEffect, useState } from 'react';
import {indexOf} from 'lodash';
import { Link } from 'react-router-dom';
import { Dropdown, Nav, NavDropdown, Tooltip, NavItem, NavLink } from 'react-bootstrap';
import { ClientLogo, Icon } from '../../components';
import PoweredBy from '../../components/poweredBy';
import { CustomToggle } from '../../components/customToggle';


function SideBar(props) {

  const [role, setRole] = useState(props.userRole)
  const { brandConfig, clientConfig } = props || {}
  const { routes } = props
  return (
    <div
      className={`navbar-nav bg-gradient-primary min-vh-100 sidebar sidebar-dark accordion ${props.showSideBar ? 'show' : 'collapse'
        }`}
      id="accordionSidebar"
    >

      <div className="d-flex flex-column">
        <div className="clientLogoContainer border-right" style={{ height: '12.4vh' }}>
          <ClientLogo clientConfig={clientConfig} rootPage={props.rootPage} />
        </div>
        { routes && routes[0] && <div className="bd-highlight customScroll overflow-auto overflow-x-hidden" style={{ height: '79vh' }}>
          <Nav variant="pills" activeKey="1">
            {Object.keys(props.routes[0]).map((item, index) => {
              const id = `navbarDropdown_${index}`;
              const { title, path, icon, subMenu, roles, enabled } = props.routes[0][item];
              if (indexOf(roles, role) === -1 || !enabled) return undefined;
              // const subMenuClass = 
              if (!subMenu) {
                return <Nav.Item key={index} id="nav-dropdown" className=''>
                  <Link onClick={()=>{props.isMobile ? props.setShowSideBar(false) : undefined}} data-bs-toggle="tooltip" as={Link} className={`nav-link text-decoration-none text-capitalize ${subMenu ? 'dropdown-toggle' : ''} text-white p-2 pl-3 pr-3`} id={id} data-toggle={`${subMenu ? 'dropdown' : ''}`} to={path}>
                    <Icon icon={icon} type="white" />
                    <span className='d-none d-sm-inline'> &nbsp;&nbsp;</span>
                    <span className="ms-1">{`${title}`}</span>
                  </Link>
                </Nav.Item>
              }
              return <Dropdown className='nav-item w-100 m-0'>
                <Dropdown.Toggle as={CustomToggle} id={`${id}`}>
                  <span className={`nav-link text-capitalize ${subMenu ? 'dropdown-toggle' : ''} text-white p-2 pl-3 pr-3`} id={id} data-toggle={`${subMenu ? 'dropdown' : ''}`} to={path}>
                    <Icon icon={icon} type="white" />
                    <span className='d-none d-sm-inline'> &nbsp;&nbsp;</span>
                    <span className="ms-1 d-none d-sm-inline">{`${title}`}</span>
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu key={`dropdown-${index}`} className='dropdown-menu p-0 m-0 position-relative rounded-0 bg-gray-100 sideBarSubMenuCustom'>
                  {
                    Object.keys(subMenu).map((sub, index) => {
                      if (indexOf(subMenu[sub].roles, role) === -1 || !subMenu[sub].enabled) return undefined;

                      return <Dropdown.Item eventKey="1" className="bg-gray-100" >
                        <Link key={`sub-${id}-${index}`} className="dropdown-item text-capitalize " to={subMenu[sub].path}>
                          <Icon icon={subMenu[sub].icon} type={subMenu[sub].color || 'primary'} className="mr-2" />
                          <span className="ml-3 ms-1 d-none d-sm-inline">{`${subMenu[sub].title}`}</span>
                        </Link>
                      </Dropdown.Item>
                    })}
                </Dropdown.Menu>
              </Dropdown>

            })}

          </Nav>


        </div> }
        <div className="bd-highlight shadow pt-2" style={{  }}>
          <PoweredBy position="" brandConfig={brandConfig} />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
