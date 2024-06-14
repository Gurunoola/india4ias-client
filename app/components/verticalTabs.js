import React, { useState } from 'react';
import Icon from './icon';

const VerticalTabs = ({ data, isMobile=false, theme, defaultOpen='tab0' }) => {
  const [activeTab, setActiveTab] = useState(defaultOpen);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="d-flex flex-column">
      <div className="row m-0">
        <div className="col-2 col-md-2 p-0 bg-light">
          <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            {data.map((item, index) => (
              <a
                key={index}
                className={`nav-link ${theme} ${activeTab === `tab${index}` ? 'active' : ''} rounded-0`}
                id={`v-pills-tab${index}-tab`}
                onClick={() => handleTabClick(`tab${index}`)}
                role="tab"
                aria-controls={`v-pills-tab${index}`}
                aria-selected={activeTab === `tab${index}`}
              >
                <Icon icon={item.icon} type={activeTab === `tab${index}` ? 'white' : ''}  />
                <span className='d-none d-sm-inline'> &nbsp;</span>
                <span className="d-none d-sm-inline">{`${item.title}`}</span>
                 
              </a>
            ))}
          </div>
        </div>
        <div className="col-10">
          <div className="tab-content" id="v-pills-tabContent">
            {data.map((item, index) => (
              <div
                key={index}
                className={`tab-pane fade ${activeTab === `tab${index}` ? 'show active' : ''}`}
                id={`v-pills-tab${index}`}
                role="tabpanel"
                aria-labelledby={`v-pills-tab${index}-tab`}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTabs;