import React from 'react';
import { Link } from 'react-router-dom';
import { globalConfigs } from '../globalConfigs';

function ClientLogo(props) {
  const { clientConfig } = globalConfigs;
  return (
    <Link className="sidebar-brand d-flex align-items-center justify-content-center mb-3" to={props.rootPage || '/'}>
      <div className=" d-sm-block d-md-none">
        <img className='clientIcon ' src={clientConfig.logoIcon} />
      </div>
      <div className="sidebar-brand-text mx-3">
        <img className='clientLogo' alt={clientConfig.name} src={clientConfig.logo} />
      </div>
    </Link>
  );
}

export default ClientLogo