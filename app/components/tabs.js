import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        {tabs.map((tab, index) => (
          <li className="nav-item" key={index}>
            <a
              className={`nav-link ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
              href="#"
            >
              {tab.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content mt-1">
        {tabs.map((tab, index) => (
          <div
            className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
            key={index}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;