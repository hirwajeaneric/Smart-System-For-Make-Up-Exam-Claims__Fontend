import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createContext, useEffect, useState } from 'react';
import ResponseComponent from './components/ResponseComponent';

// PAGES 
// STUDENT //////////////////////////////////////////////////////////////////////////////////////////////
import StudentAuth from './pages/student/auth/Auth';
import StudentSignin from './pages/student/auth/Signin';
import StudentSignup from './pages/student/auth/Signup';
import StudentForgotPassword from './pages/student/auth/ForgotPassword';
import StudentResetPassword from './pages/student/auth/ResetPassword';
import StudentDashboardMain from './pages/student/DashboardMain';
import CompleteAccount from './pages/student/CompleteAccount';
import StudentStats from './pages/student/Stats';
import StudentSettings from './pages/student/Settings';
import StudentDeclareAbsence from './pages/student/DeclareAbsence';
import StudentClaimDetails from './pages/student/ClaimDetails';
import StudentMyClaims from './pages/student/MyClaims';
import StudentSuccessPage from './pages/student/SuccessPage';


// TEACHER //////////////////////////////////////////////////////////////////////////////////////////////
import TeacherAuth from './pages/teacher/auth/Auth';
import TeacherSignin from './pages/teacher/auth/Signin';
import TeacherSignup from './pages/teacher/auth/Signup';
import TeacherForgotPassword from './pages/teacher/auth/ForgotPassword';
import TeacherResetPassword from './pages/teacher/auth/ResetPassword';
import TeacherDashboardMain from './pages/teacher/DashboardMain';
import TeacherStats from './pages/teacher/Stats';
import TeacherSettings from './pages/teacher/Settings';
import TeacherAssignedCourses from './pages/teacher/AssignedCourses';
import TeacherAssignedCourseDetails from './pages/teacher/AssignedCourseDetails';
import TeacherClaimDetails from './pages/teacher/ClaimDetails';
import TeacherClaims from './pages/teacher/Claims';


// HOD //////////////////////////////////////////////////////////////////////////////////////////////
import HODAuth from './pages/hod/auth/Auth';
import HODSignin from './pages/hod/auth/Signin';
import HODSignup from './pages/hod/auth/Signup';
import HODForgotPassword from './pages/hod/auth/ForgotPassword';
import HODResetPassword from './pages/hod/auth/ResetPassword';
import HODDashboardMain from './pages/hod/DashboardMain';
import HODStats from './pages/hod/Stats';
import HODSettings from './pages/hod/Settings';
import HODClaimDetails from './pages/hod/ClaimDetails';
import HODClaims from './pages/hod/Claims';
import HODLecturerDetails from './pages/hod/LecturerDetails';
import HODLecturers from './pages/hod/Lecturers';
import HODCourses from './pages/hod/Courses';
import HODCourseDetails from './pages/hod/CourseDetails';
import HODAssignCourses from './pages/hod/AssignCourses';


// DEAN OF STUDENT DISCIPLINE //////////////////////////////////////////////////////////////////////////////////////////////
import DOSAuth from './pages/deanOfStudents/auth/Auth';
import DOSSignin from './pages/deanOfStudents/auth/Signin';
import DOSSignup from './pages/deanOfStudents/auth/Signup';
import DOSForgotPassword from './pages/deanOfStudents/auth/ForgotPassword';
import DOSResetPassword from './pages/deanOfStudents/auth/ResetPassword';
import DOSDashboardMain from './pages/deanOfStudents/DashboardMain';
import DOSStats from './pages/deanOfStudents/Stats';
import DOSSettings from './pages/deanOfStudents/Settings';
import DOSClaimDetails from './pages/deanOfStudents/ClaimDetails';
import DOSClaims from './pages/deanOfStudents/Claims';
import DOSReportPreview from './pages/deanOfStudents/ReportPreview';


// ACCOUNTANT //////////////////////////////////////////////////////////////////////////////////////////////
import AccountantAuth from './pages/accountant/auth/Auth';
import AccountantSignin from './pages/accountant/auth/Signin';
import AccountantSignup from './pages/accountant/auth/Signup';
import AccountantForgotPassword from './pages/accountant/auth/ForgotPassword';
import AccountantResetPassword from './pages/accountant/auth/ResetPassword';
import AccountantDashboardMain from './pages/accountant/DashboardMain';
import AccountantStats from './pages/accountant/Stats';
import AccountantSettings from './pages/accountant/Settings';
import AccountantClaimDetails from './pages/accountant/ClaimDetails';
import AccountantClaims from './pages/accountant/Claims';
import AccountantReportPreview from './pages/accountant/ReportPreview';


// REGISTRATION OFFICER //////////////////////////////////////////////////////////////////////////////////////////////
import RegistrationAuth from './pages/registrationOfficer/auth/Auth';
import RegistrationSignin from './pages/registrationOfficer/auth/Signin';
import RegistrationSignup from './pages/registrationOfficer/auth/Signup';
import RegistrationForgotPassword from './pages/registrationOfficer/auth/ForgotPassword';
import RegistrationResetPassword from './pages/registrationOfficer/auth/ResetPassword';
import RegistrationDashboardMain from './pages/registrationOfficer/DashboardMain';
import RegistrationStats from './pages/registrationOfficer/Stats';
import RegistrationSettings from './pages/registrationOfficer/Settings';
import RegistrationClaimDetails from './pages/registrationOfficer/ClaimDetails';
import RegistrationClaims from './pages/registrationOfficer/Claims';
import RegistrationReportPreview from './pages/registrationOfficer/ReportPreview';


// EXAMINATION OFFICER //////////////////////////////////////////////////////////////////////////////////////////////
import ExaminationAuth from './pages/examinationOfficer/auth/Auth';
import ExaminationSignin from './pages/examinationOfficer/auth/Signin';
import ExaminationSignup from './pages/examinationOfficer/auth/Signup';
import ExaminationForgotPassword from './pages/examinationOfficer/auth/ForgotPassword';
import ExaminationResetPassword from './pages/examinationOfficer/auth/ResetPassword';
import ExaminationDashboardMain from './pages/examinationOfficer/DashboardMain';
import ExaminationStats from './pages/examinationOfficer/Stats';
import ExaminationSettings from './pages/examinationOfficer/Settings';
import ExaminationClaimDetails from './pages/examinationOfficer/ClaimDetails';
import ExaminationClaims from './pages/examinationOfficer/Claims';
import ExaminationReportPreview from './pages/examinationOfficer/ReportPreview';


// REDUX REDUCERS ///////////////////////////////////////////////////////////////////////////////////////////////////
import { getAccountantClaims, getDeanOfStudentsClaims, getDepartmentClaims, getExaminationOfficeClaims, getRegistrationOfficeClaims, getStudentClaims } from './redux/features/claimSlice';
import { getStudentRegistration } from './redux/features/registrationSlice';
import { getCoursesForTeacher } from './redux/features/courseSlice';
import { getAllUsers } from './redux/features/userSlice';


// FORMS AS PAGES /////////////////////////////////////////////////////////////////////////////////////////////////
import DeclareAbsenceFormPage1 from './components/forms/DeclareAbsenceFormPage1';
import DeclareAbsenceFormPage2 from './components/forms/DeclareAbsenceFormPage2';


// CREATING CONTEXT ///////////////////////////////////////////////////////////////////////////////////////////////////
export const GeneralContext = createContext();

function App() {
  const dispatch = useDispatch();
  const [ open, setOpen ] = useState(false);
  const [ responseMessage, setResponseMessage ] = useState({ message: '', severity: ''});
  
  var stdToken = '';
  var teaToken = '';
  var hodToken = '';
  var accToken = '';
  var dosToken = '';
  var regToken = '';
  var exoToken = '';

  var student = '';
  var teacher = '';
  var headOfDepartment = '';
  var accountant = '';
  var deanOfStudents = '';
  var registrationOfficer = '';
  var examinationOfficer = '';

  const [declarationFormData, setDeclarationFormData] = useState({});
  const [proofOfTuitionPayment, setProofOfTuitionPayment] = useState('');
  const [numberOfCourses, setNumberOfCourses] = useState(0);
  const [declarationFormErrors, setDeclarationFormErrors] = useState({});
  const [courseOne, setCourseOne] = useState({});
  const [courseTwo, setCourseTwo] = useState({});
  const [courseThree, setCourseThree] = useState({});
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  useEffect(() => {
    stdToken = localStorage.getItem('stdToken');
    teaToken = localStorage.getItem('teaToken');
    hodToken = localStorage.getItem('hodToken');
    accToken = localStorage.getItem('accToken');
    dosToken = localStorage.getItem('dosToken');
    regToken = localStorage.getItem('regToken');
    exoToken = localStorage.getItem('exoToken');

    student = JSON.parse(localStorage.getItem('stdData'));
    teacher = JSON.parse(localStorage.getItem('teaData'));
    headOfDepartment = JSON.parse(localStorage.getItem('hodData'));
    accountant = JSON.parse(localStorage.getItem('accData'));
    deanOfStudents = JSON.parse(localStorage.getItem('dosData'));
    registrationOfficer = JSON.parse(localStorage.getItem('regData'));
    examinationOfficer = JSON.parse(localStorage.getItem('exoData')); 

    if (student && student !== undefined) {
      // Load student claims
      dispatch(getStudentClaims({ registrationNumber: student.registrationNumber }));
      // Load registration information if the student is registered
      dispatch(getStudentRegistration({ registrationNumber: student.registrationNumber }));
    } else if (teacher && teacher !== undefined) {
      // Load all courses assigned to him/her
      dispatch(getCoursesForTeacher({ lecturerId: teacher.id, token: teaToken}));
    } else if (headOfDepartment && headOfDepartment !== undefined) {
      // Load list of lecturers
      dispatch(getAllUsers());
      // Load list of teacher approved claims
      dispatch(getDepartmentClaims({ token: hodToken, department: headOfDepartment.department }));
    } else if (accountant && accountant !== undefined) {
      // Load list of claims for students who have paid
      dispatch(getAccountantClaims({ token: accToken }));
    } else if (deanOfStudents && deanOfStudents !== undefined) {
      // Load list of claims approved by the accounting office
      dispatch(getDeanOfStudentsClaims({ token: dosToken }));
    } else if (registrationOfficer && registrationOfficer !== undefined) {
      // Load list of claims approved by the dean of students
      dispatch(getRegistrationOfficeClaims({ token: regToken }));
    } else if (examinationOfficer && examinationOfficer !== undefined) {
      // Load list of claims approved by the registration office
      dispatch(getExaminationOfficeClaims({ token: exoToken }));
    }
  },[dispatch]);

  return (
    <GeneralContext.Provider 
      value={{
        setOpen,
        responseMessage, 
        setResponseMessage,
        declarationFormData,
        setDeclarationFormData,
        declarationFormErrors,
        setDeclarationFormErrors,
        proofOfTuitionPayment, 
        setProofOfTuitionPayment, 
        numberOfCourses, 
        setNumberOfCourses,
        courseOne,
        setCourseOne,
        courseTwo,
        setCourseTwo,
        courseThree,
        setCourseThree
      }}>
      <BrowserRouter>
        <Routes>
          
          {/* STUDENT pages ////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
          <Route path='/student/auth/' element={<StudentAuth />}>
            <Route path='signin' element={<StudentSignin />} />
            <Route path='signup' element={<StudentSignup />} />
            <Route path='forgot-password' element={<StudentForgotPassword />} />
            <Route path='reset-password/:token/:userId' element={<StudentResetPassword />} />
          </Route>
          <Route path='/student/complete-account' element={<CompleteAccount />} />
          <Route path='/student/:registrationNumber' element={localStorage.getItem('stdToken') ? <StudentDashboardMain /> : <Navigate replace to={'/student/auth/signin'} />}>
            <Route path='home' element={<StudentStats />} />
            <Route path='declare' element={<StudentDeclareAbsence />}>
              <Route path='' element={<DeclareAbsenceFormPage1 />} />
              <Route path='step1' element={<DeclareAbsenceFormPage1 />} />
              <Route path='step2' element={<DeclareAbsenceFormPage2 />} />
            </Route>
            <Route path='claims' element={<StudentMyClaims />} />
            <Route path='claims/:claimId' element={<StudentClaimDetails />} />
            <Route path='success' element={<StudentSuccessPage />} />
            <Route path='settings' element={<StudentSettings />} />
          </Route>


          {/* TEACHER pages //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Route path='/teacher/auth/' element={<TeacherAuth />}>
            <Route path='signin' element={<TeacherSignin />} />
            <Route path='signup' element={<TeacherSignup />} />
            <Route path='forgot-password' element={<TeacherForgotPassword />} />
            <Route path='reset-password/:token/:userId' element={<TeacherResetPassword />} />
          </Route>
          <Route path='/teacher/:name' element={localStorage.getItem('teaToken') ? <TeacherDashboardMain /> : <Navigate replace to={'/teacher/auth/signin'} />}>
            <Route path='home' element={<TeacherStats />} />
            <Route path='courses' element={<TeacherAssignedCourses />} />
            <Route path='courses/:courseId' element={<TeacherAssignedCourseDetails />} />
            <Route path='claims' element={<TeacherClaims />} />
            <Route path='claims/:claimId' element={<TeacherClaimDetails />} />
            <Route path='settings' element={<TeacherSettings />} />
          </Route>


          {/* HOD Pages //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Route path='/hod/auth/' element={<HODAuth />}>
            <Route path='signin' element={<HODSignin />} />
            <Route path='signup' element={<HODSignup />} />
            <Route path='forgot-password' element={<HODForgotPassword />} />
            <Route path='reset-password/:token/:userId' element={<HODResetPassword />} />
          </Route>
          <Route path='/hod/:department/' element={localStorage.getItem('hodToken') ? <HODDashboardMain /> : <Navigate replace to={'/hod/auth/signin'} />}>
            <Route path='home' element={<HODStats />} />
            <Route path='claims' element={<HODClaims />} />
            <Route path='claims/:claimId' element={<HODClaimDetails />} />
            <Route path='lecturers' element={<HODLecturers />} />
            <Route path='lecturers/:lecturerId' element={<HODLecturerDetails />} />
            <Route path='courses' element={<HODCourses />} />
            <Route path='courses/:courseCode' element={<HODCourseDetails />} />
            <Route path='assign' element={<HODAssignCourses />} />
            <Route path='settings' element={<HODSettings />} />
          </Route>


          {/* ACCOUNTANT pages ////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
          <Route path='/accountant/auth/' element={<AccountantAuth />}>
            <Route path='signin' element={<AccountantSignin />} />
            <Route path='signup' element={<AccountantSignup />} />
            <Route path='forgot-password' element={<AccountantForgotPassword />} />
            <Route path='reset-password/:token/:userId' element={<AccountantResetPassword />} />
          </Route>
          <Route path='/accountant/:name' element={localStorage.getItem('accToken') ? <AccountantDashboardMain /> : <Navigate replace to={'/accountant/auth/signin'} />}>
            <Route path='home' element={<AccountantStats />} />
            <Route path='claims' element={<AccountantClaims />} />
            <Route path='claims/:claimId' element={<AccountantClaimDetails />} />
            <Route path='report-preview' element={<AccountantReportPreview />} />
            <Route path='settings' element={<AccountantSettings />} />
          </Route>


          {/* DEAN OF STUDENT DISCIPLINE pages //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Route path='/dos/auth/' element={<DOSAuth />}>
            <Route path='signin' element={<DOSSignin />} />
            <Route path='signup' element={<DOSSignup />} />
            <Route path='forgot-password' element={<DOSForgotPassword />} />
            <Route path='reset-password/:token/:userId' element={<DOSResetPassword />} />
          </Route>
          <Route path='/dos/:name' element={localStorage.getItem('dosToken') ? <DOSDashboardMain /> : <Navigate replace to={'/dos/auth/signin'} />}>
            <Route path='home' element={<DOSStats />} />
            <Route path='claims' element={<DOSClaims />} />
            <Route path='claims/:claimId' element={<DOSClaimDetails />} />
            <Route path='report-preview' element={<DOSReportPreview />} />
            <Route path='settings' element={<DOSSettings />} />
          </Route>


          {/* REGISTRATION OFFICER pages //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Route path='/registration/auth/' element={<RegistrationAuth />}>
            <Route path='signin' element={<RegistrationSignin />} />
            <Route path='signup' element={<RegistrationSignup />} />
            <Route path='forgot-password' element={<RegistrationForgotPassword />} />
            <Route path='reset-password/:token/:userId' element={<RegistrationResetPassword />} />
          </Route>
          <Route path='/registration/:name' element={localStorage.getItem('regToken') ? <RegistrationDashboardMain /> : <Navigate replace to={'/registration/auth/signin'} />}>
            <Route path='home' element={<RegistrationStats />} />
            <Route path='claims' element={<RegistrationClaims />} />
            <Route path='claims/:claimId' element={<RegistrationClaimDetails />} />
            <Route path='report-preview' element={<RegistrationReportPreview />} />
            <Route path='settings' element={<RegistrationSettings />} />
          </Route>


          {/* EXAMINATION OFFICER pages //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Route path='/examinationoffice/auth/' element={<ExaminationAuth />}>
            <Route path='signin' element={<ExaminationSignin />} />
            <Route path='signup' element={<ExaminationSignup />} />
            <Route path='forgot-password' element={<ExaminationForgotPassword />} />
            <Route path='reset-password/:token/:userId' element={<ExaminationResetPassword />} />
          </Route>
          <Route path='/examinationoffice/:name' element={localStorage.getItem('exoToken') ? <ExaminationDashboardMain /> : <Navigate replace to={'/examinationoffice/auth/signin'} />}>
            <Route path='home' element={<ExaminationStats />} />
            <Route path='claims' element={<ExaminationClaims />} />
            <Route path='claims/:claimId' element={<ExaminationClaimDetails />} />
            <Route path='report-preview' element={<ExaminationReportPreview />} />
            <Route path='settings' element={<ExaminationSettings />} />
          </Route>

        </Routes>
      </BrowserRouter>

      {/* RESPONSE MESSAGE DISPLAYER ****************************************************************************************************************************** */}
      <ResponseComponent 
        message={responseMessage.message} 
        severity={responseMessage.severity}
        open={open} 
        handleClose={handleClose} 
      />
    </GeneralContext.Provider>
  )
}

export default App
