import { Helmet } from "react-helmet-async"
import { HeaderTwo, VerticallyFlexGapContainer } from "../../components/styles/GenericStyles"

const Settings = () => {
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>My account - </title>
        <meta name="description" content={`My account.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px' }}>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>My account</HeaderTwo>
        
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Settings