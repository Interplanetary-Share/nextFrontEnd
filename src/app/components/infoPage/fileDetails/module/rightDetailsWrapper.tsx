import InfoTable from './infoTable'
import React from 'react'
import RelatedFiles from './relatedFiles'
import Tabs from '@/app/components/general/tabs/tabs'

const RightDetailsWrapper = () => {
  const [activeTab, setActiveTab] = React.useState('details')
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
  )
}

export default RightDetailsWrapper
