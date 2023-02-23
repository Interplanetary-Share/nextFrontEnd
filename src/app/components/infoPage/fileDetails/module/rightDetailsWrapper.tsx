import Tabs from '@/app/components/general/tabs/tabs';
import React from 'react';
import InfoTable from './infoTable';
import RelatedFiles from './relatedFiles';

const RightDetailsWrapper = () => {
  const [activeTab, setActiveTab] = React.useState('details');
  return (
    <>
      <Tabs
        activeTab={activeTab}
        tabs={[
          {
            key: 'details',
            name: 'Details',
          },
          {
            key: 'related',
            name: 'Related Files',
          },
        ]}
        onTabChange={(key) => setActiveTab(key)}
      />
      {activeTab === 'details' && <InfoTable />}
      {activeTab === 'related' && <RelatedFiles />}
    </>
  );
};

export default RightDetailsWrapper;
