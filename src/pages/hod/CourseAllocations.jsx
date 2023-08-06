import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { HeaderTwo, HorizontallyFlexGapContainer, TopPageTitle, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { GeneralContext } from '../../App'
import { useContext } from 'react'
import { useState } from 'react';
import CourseAllocationsTable from '../../components/tables/CourseAllocationsTable'
import axios from 'axios'
import UpdateCourseAllocationsForm from '../../components/forms/UpdateCourseAllocationsForm'
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const CourseAllocations = () => {
  const params = useParams();
  const [course, setCOurse] = useState({});
  const { setFormType, handleOpenModal, setSelectedCourse } = useContext(GeneralContext);  

  // Fetch course by code 
  useEffect(() => {
    axios.get(`${serverUrl}/api/v1/ssmec/course/findByCode?code=${params.courseCode}`)
    .then(response => {
      setCOurse(response.data.course);
      response.data.course.allocations.forEach(element => {
        element.id = element._id;
      });
    })
    .catch(err => console.error(err))
  },[])

  const displayAddCourseAllocationModal = () => {
    setFormType('addCourseAllocations');
    handleOpenModal();
    setSelectedCourse(course);
  }

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>{`Course Allocations for ${course.name}`}</title>
        <meta name="description" content={`Course allocation per semesters.`} /> 
      </Helmet>
      <VerticallyFlexGapContainer style={{ gap: '20px' }}>
        <TopPageTitle>
          {course.name && 
            <>
              <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>{`Course Allocations for ${course.name}`}</HeaderTwo>
              <Button size='small' color='success' variant='contained' onClick={displayAddCourseAllocationModal}>Add</Button>
            </>
          }
        </TopPageTitle>
        <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
          <div className="left" style={{ background: 'white', borderRadius: '5px', padding: '10px' }}>
            {/* Course allocations table */}
            <CourseAllocationsTable data={course.allocations || []} />
          </div>
          <div className="right" style={{ background: 'white', borderRadius: '5px', padding: '10px 2px', flexDirection: 'column' }}>
            {/* Form to update courses  */}
            <UpdateCourseAllocationsForm/>
          </div>
        </HorizontallyFlexGapContainer>
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default CourseAllocations