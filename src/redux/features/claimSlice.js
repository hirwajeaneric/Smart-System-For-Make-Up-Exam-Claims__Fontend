import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    studentClaims: [],
    
    selectedClaim: {},
    selectedClaimCourse: {},
    selectedClaimCourseLecturer: {},
    selectedClaimHodSignature: {},
    selectedClaimRegistrationOfficerSignature: {},
    selectedClaimDeanOfStudentsSignature: {},
    selectedClaimAccountantSignature: {},
    selectedClaimExaminationOfficerSignature: {},
    filterPeriod: {},

    courseClaims: [],
    teacherClaims: [],
    hodClaims: [],
    accountantClaims: [],
    deanOfStudentsClaims: [],
    registrationOfficeClaims: [],
    examinationOfficerClaims: [],
    numberOfTeacherClaims: 0,
    numberOfHodClaims: 0,
    numberOfAccountantClaims: 0,
    numberOfDeanOfStudentsClaims: 0,
    numberOfRegistrationOfficeClaims: 0,
    numberOfExaminationOfficerClaims: 0,
    isLoading: false,
}

export const getStudentClaims = createAsyncThunk(
    'claim/getStudentClaims',
    async (filter, thunkAPI) => {
        const { registrationNumber } = filter;
        try {
            const response = await axios.get(`${serverUrl}/api/v1/ssmec/claim/findByRegistrationNumber?registrationNumber=${registrationNumber}`);
            response.data.claims.forEach((element) => {
                element.id = element._id;
                element.course = element.courses[0].courseName;
                element.submitDate = new Date(element.submitDate).toUTCString();
            });
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getCourseClaims = createAsyncThunk(
    'claim/getCourseClaims',
    async (filter, thunkAPI) => {
        const { token, courseCode } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByCourse?courseCode=${courseCode}`, config);
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getTeacherClaims = createAsyncThunk(
    'claim/getTeacherClaims',
    async (filter, thunkAPI) => {
        const { lecturerId, token } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }

            const resp = await axios.get(serverUrl+`/api/v1/ssmec/course/findByLecturerId?lecturerId=${lecturerId}`, config);
            var assignedCourses = resp.data.courses;

            var claims = [];            
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/list`, config);
            response.data.claims.forEach((element) => {
                element.id = element._id;
                element.course = element.courses[0].courseName;
                element.submitDate = new Date(element.submitDate).toUTCString();
            });

            response.data.claims.forEach(claim => {
                assignedCourses.forEach((course) => {
                    if (claim.courses[0].courseCode === course.code && claim.status === 'In Progress') {
                        claims.push(claim);
                    }
                });
            })
            
            return claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getDepartmentClaims = createAsyncThunk(
    'claim/getDepartmentClaims',
    async (filter, thunkAPI) => {
        const { token, department, academicYear, semester } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByLecturerSignature?department=${department}`, config);
            response.data.claims.forEach((element) => {
                element.id = element._id;
                delete element.__v;
                element.course = element.courses[0].courseName;
                element.submitDate = new Date(element.submitDate).toUTCString()
            });

            // Return claims according to provided filter values
            var claims = [];
            if (academicYear) {
                claims = response.data.claims.filter(element => element.academicYear === academicYear);
            }

            if (semester) {
                claims = response.data.claims.filter(element => element.semester === semester);
            }

            if (academicYear && semester) {
                claims = response.data.claims.filter(element => element.semester === semester && element.academicYear === academicYear);
            } 

            if (!academicYear && !semester) {
                claims = response.data.claims;
            }
            return { claims: claims, academicYear: academicYear, semester: semester};
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getAccountantClaims = createAsyncThunk(
    'claim/getAccountantClaims',
    async (filter, thunkAPI) => {
        const { token } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByPaid`, config);
            response.data.claims.forEach((element) => {
                element.id = element._id;
                delete element.__v;
                element.course = element.courses[0].courseName;
                element.submitDate = new Date(element.submitDate).toUTCString()
            });
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getDeanOfStudentsClaims = createAsyncThunk(
    'claim/getDeanOfStudentsClaims',
    async (filter, thunkAPI) => {
        const { token } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByDepartmentSignature`, config);
            response.data.claims.forEach((element) => {
                element.id = element._id;
                delete element.__v;
                element.course = element.courses[0].courseName;
                element.submitDate = new Date(element.submitDate).toUTCString()
            });
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getRegistrationOfficeClaims = createAsyncThunk(
    'claim/getRegistrationOfficeClaims',
    async (filter, thunkAPI) => {
        const { token } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByDepartmentSignature`, config);
            response.data.claims.forEach((element) => {
                element.id = element._id;
                delete element.__v;
                element.course = element.courses[0].courseName;
                element.submitDate = new Date(element.submitDate).toUTCString()
            });
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getExaminationOfficeClaims = createAsyncThunk(
    'claim/getExaminationOfficeClaims',
    async (filter, thunkAPI) => {
        const { token } = filter;
        try {
            const config = {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            }
            const response = await axios.get(serverUrl+`/api/v1/ssmec/claim/findByDepartmentSignature`, config);
            response.data.claims.forEach((element) => {
                element.id = element._id;
                delete element.__v;
                element.course = element.courses[0].courseName;
                element.submitDate = new Date(element.submitDate).toUTCString()
            });
            return response.data.claims;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const claimSlice = createSlice({
    name: 'claim',
    initialState,
    reducers: {
        setSelectedClaim: (state, action) => {
            state.selectedClaim = action.payload;
            state.selectedClaimCourse = action.payload.courses[0];
            state.selectedClaimCourseLecturer = action.payload.courses[0].lecturer;
            state.selectedClaimHodSignature = action.payload.hodDeanSignature;
            state.selectedClaimRegistrationOfficerSignature = action.payload.registrationOfficerSignature;
            state.selectedClaimDeanOfStudentsSignature = action.payload.deanOfStudentsSignature;
            state.selectedClaimAccountantSignature = action.payload.accountantSignature;
            state.selectedClaimExaminationOfficerSignature = action.payload.examinationOfficerSignature;
        }
    },
    extraReducers: {
        [getStudentClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getStudentClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.studentClaims = action.payload;
        },
        [getStudentClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getTeacherClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getTeacherClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.teacherClaims = action.payload;
        },
        [getTeacherClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getCourseClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getCourseClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.courseClaims = action.payload;
        },
        [getCourseClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getDepartmentClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getDepartmentClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            const { claims, academicYear, semester } = action.payload;
            state.hodClaims = claims.filter(element => element.attachment);
            state.filterPeriod = { academicYear: academicYear, semester: semester }
        },
        [getDepartmentClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getAccountantClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getAccountantClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.accountantClaims = action.payload;
        },
        [getAccountantClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getDeanOfStudentsClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getDeanOfStudentsClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.deanOfStudentsClaims = action.payload;
        },
        [getDeanOfStudentsClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getRegistrationOfficeClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getRegistrationOfficeClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.registrationOfficeClaims = action.payload;
        },
        [getRegistrationOfficeClaims.rejected] : (state) => {
            state.isLoading = false;
        },
        [getExaminationOfficeClaims.pending] : (state) => {
            state.isLoading = true;
        },
        [getExaminationOfficeClaims.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.examinationOfficerClaims = action.payload;
        },
        [getExaminationOfficeClaims.rejected] : (state) => {
            state.isLoading = false;
        },
    }
});

export const { setSelectedClaim } = claimSlice.actions;
export default claimSlice.reducer;