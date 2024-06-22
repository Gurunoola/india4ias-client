import React from 'react';
import { Link } from 'react-router-dom';
import { localConfigs } from '../localConfigs';

function ClientLogo(props) {
  const { assets:{client} } = localConfigs;
  const {clientConfig = {} } = props
  return (
    <Link className="sidebar-brand d-flex align-items-center justify-content-center mb-3" to={props.rootPage || '/'}>
      <div className=" d-sm-block d-md-none">
        <img className='clientIcon' src={clientConfig.icon} />
      </div>
      <div className="sidebar-brand-text mx-3">
        <img className='clientLogo' alt={clientConfig.name} src={clientConfig.logo} />
      </div>
    </Link>
  );
}

export default ClientLogo