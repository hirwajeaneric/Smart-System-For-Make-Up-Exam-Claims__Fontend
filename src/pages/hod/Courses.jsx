import { Button } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { HeaderTwo, HorizontallyFlexGapContainer, TopPageTitle, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import CoursesTable from '../../components/tables/CoursesTable'
import { GeneralContext } from '../../App'
import { useContext } from 'react'
import UpdateCourseForm from '../../components/forms/UpdateCourseForm'

const Courses = () => {
  const { isLoading, listOfCourses, selectedCourse, numberOfCourses } = useSelector(state => state.course)
  const { setFormType, handleOpenModal, isFormVisible } = useContext(GeneralContext);  

  const displayAddCourseModal = () => {
    setFormType('addCourse');
    handleOpenModal();
  }

  const displayLecturerPopup = (lecturers) => {
    console.log(lecturers[0].name);
  }

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Courses</title>
        <meta name="description" content={`List of Courses.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px' }}>
        <TopPageTitle>
          <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>Courses</HeaderTwo>
          <Button size='small' color='success' variant='contained' onClick={displayAddCourseModal}>Add</Button>
        </TopPageTitle>
        <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
          <div className="left" style={{ background: 'white', borderRadius: '5px', padding: '10px' }}>
            {/* Courses table */}
            <CoursesTable data={listOfCourses} />
          </div>
          <div className="right" style={{ background: 'white', borderRadius: '5px', padding: '10px 2px', flexDirection: 'column' }}>
            {/* Form to update courses  */}
            <UpdateCourseForm />
          </div>
        </HorizontallyFlexGapContainer>
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Courses