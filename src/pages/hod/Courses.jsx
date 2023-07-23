import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { HeaderTwo, HorizontallyFlexGapContainer, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import CourseAllocations from '../../components/tables/CourseAllocations'
import CoursesTable from '../../components/tables/CoursesTable'

export const CourseAllocationsContainer = styled.table`
  width: 100%;
  overflow-y: auto;
`;

export const CourseAllocationsTable = styled.table`
  font-size: 90%; 
  border-collapse: collapse;
  width: 100%;
  
  th, td {
    text-align: left;
    padding: 8px;
  }

  tr {
    cursor: pointer;
  }
  
  tr:nth-child(even) {background-color: #f2f2f2;}
`;

const Courses = () => {
  const { isLoading, listOfCourses, selectedCourse, numberOfCourses } = useSelector(state => state.course)

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
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}>Courses</HeaderTwo>
        <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
          <div className="left" style={{ background: 'white', borderRadius: '5px', padding: '10px' }}>
            <CoursesTable data={listOfCourses} />
          </div>
          <div className="right" style={{ background: 'white', borderRadius: '5px', padding: '10px 2px', flexDirection: 'column' }}>
            <h3 style={{ padding: '0px 0px 0px 8px' }}>Allocations</h3>
            {selectedCourse.allocations && 
              <CourseAllocationsContainer>
                {selectedCourse.allocations.map((allocation, index) => {
                  return (
                    <CourseAllocationsTable key={index}>
                      <tr style={{ textAlign: 'left' }}>
                        <th>Academic Year</th>
                        <th>Semester</th>
                        <th>Mid semester exam</th>
                        <th>Final exam</th>
                        <th>Lecturers</th>
                      </tr>
                      <tr onClick={() => displayLecturerPopup(allocation.lecturers)}>
                        <td>{allocation.academicYear}</td>
                        <td>{allocation.semester}</td>
                        <td>{allocation.midSemesterExams}</td>
                        <td>{allocation.finalExams}</td>
                        <td><Link to={'/'}>Teachers</Link></td>
                      </tr>
                    </CourseAllocationsTable>
                  )
                })}
              </CourseAllocationsContainer>
            }
            {/* <CourseAllocations data={selectedCourse.allocations ? selectedCourse.allocations : []}/> */}
          </div>
        </HorizontallyFlexGapContainer>
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Courses