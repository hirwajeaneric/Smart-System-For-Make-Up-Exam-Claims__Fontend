import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import LecturerCoursesTable from '../../components/tables/LecturerCoursesTable'

const AssignedCourses = () => {
  const { isLoading, coursesForSelectedTeacher } = useSelector(state => state.course)

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Assigned courses</title>
        <meta name="description" content={`Courses assigned to lecture.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>Assigned courses</HeaderTwo>
        {isLoading ?  <p>Loading... </p> :<LecturerCoursesTable data={coursesForSelectedTeacher} />}
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default AssignedCourses