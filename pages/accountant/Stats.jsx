import React from 'react'
import { Helmet } from 'react-helmet-async'
import { HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import CountryLevelMilkProductionTable from '../../components/tables/CountryLevelMilkProductionTable'

const milkProductionDummyData = [
  {
    id: 'sdfasdfasdf',
    district: 'Nyamagabe',
    quantity: 20000,
    period: 'weekly',
  },
  {
    id: 'sdfasdfasd1',
    district: 'Magatare',
    quantity: 19000,
    period: 'weekly',
  },
  {
    id: 's343434d',
    district: 'Gatsibo',
    quantity: 19000,
    period: 'weekly',
  },
]

const Stats = () => {

  return (
    <VerticallyFlexGapContainer>
      <Helmet>
        <title>RAB Dashboard - Home</title>
      </Helmet>
      
      <HorizontallyFlexSpaceBetweenContainer style={{ flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        
        <VerticallyFlexGapContainer style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
          <span style={{ textAlign:'left', width: '100%' }}><strong>Milk </strong>- Weekly Records</span>
          <HorizontallyFlexSpaceBetweenContainer style={{ alignItems: 'flex-end' }}>
            <HeaderTwo style={{ fontSize: '200%' }}>2400 Ltrs</HeaderTwo>
            <img src='/weekly-inputs.png' alt='' />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
          <span style={{ textAlign:'left', width: '100%' }}><strong>Manure </strong>- Weekly Records</span>
          <HorizontallyFlexSpaceBetweenContainer style={{ alignItems: 'flex-end' }}>
            <HeaderTwo style={{ fontSize: '200%' }}>50 Tones</HeaderTwo>
            <img src='/weekly-inputs.png' alt='' />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ gap: '20px', boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
          <strong style={{ textAlign:'left', width: '100%' }}>Registered MCCs vs Unregistered ones</strong>
          <HorizontallyFlexSpaceBetweenContainer>
            <img src='/RegisteredVsUnregistered.png' style={{ width: '100%' }} alt='' />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ gap: '20px',boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
          <strong style={{ textAlign:'left', width: '100%' }}>Milk Weekly Records</strong>
          <HorizontallyFlexSpaceBetweenContainer>
            <CountryLevelMilkProductionTable data={milkProductionDummyData} />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
      </HorizontallyFlexSpaceBetweenContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats