import { useMemo, useState } from 'react';

interface TabsProps {
  activeTab: string;
  tabs: Array<{
    key: string;
    name: string;
  }>;
  onTabChange?: (key: string) => void;
}

const Tabs = ({ tabs, activeTab: activeTabProp, onTabChange }: TabsProps) => {
  const defaultClass = 'tab tab-bordered';
  const activeClass = 'tab tab-bordered tab-active';

  const [activeTab, setactiveTab] = useState(activeTabProp);

  const handleClick = (key: string) => {
    setactiveTab(key);
  };

  useMemo(() => {
    if (!onTabChange) return;
    onTabChange(activeTab);
  }, [activeTab]);

  return (
    <div className="tabs  pt-4">
      {tabs.map((tab) => {
        const className = tab.key === activeTab ? activeClass : defaultClass;

        return (
          <a
            key={tab.key}
            className={className}
            onClick={() => handleClick(tab.key)}
          >
            {tab.name}
          </a>
        );
      })}
    </div>
  );
};

export default Tabs;
