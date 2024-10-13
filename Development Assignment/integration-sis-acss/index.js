const axios = require('axios');

const SIS_BASE_URL = 'http://localhost:3000';
const ACSS_BASE_URL = 'http://localhost:3001';

// Function to get JWT token (you need to implement user registration first)
async function getToken(system) {
  const baseURL = system === 'SIS' ? SIS_BASE_URL : ACSS_BASE_URL;
  const response = await axios.post(`${baseURL}/auth/login`, {
    username: system === 'SIS' ? 'sis_user' : 'acss_user',
    password: 'password123'
  });
  return response.data.token;
}

// Function to send enrollment data from SIS to ACSS
async function sendEnrollmentData(courseId) {
  try {
    const sisToken = await getToken('SIS');
    const acssToken = await getToken('ACSS');

    // Fetch enrollment data from SIS
    const enrollmentResponse = await axios.get(`${SIS_BASE_URL}/enrollments/course/${courseId}`, {
      headers: { Authorization: sisToken }
    });

    const enrollmentData = enrollmentResponse.data.map(enrollment => ({
      student: enrollment.Student.name,
      course: enrollment.Course.name,
      enrollmentDate: enrollment.enrollmentDate
    }));

    // Send enrollment data to ACSS
    await axios.post(`${ACSS_BASE_URL}/enrollments/import`, enrollmentData, {
      headers: { Authorization: acssToken }
    });

    console.log('Enrollment data sent successfully');
  } catch (error) {
    console.error('Error sending enrollment data:', error.message);
  }
}

// Function to send schedule data from ACSS to SIS
async function sendScheduleData() {
  try {
    const acssToken = await getToken('ACSS');
    const sisToken = await getToken('SIS');

    // Fetch schedule data from ACSS
    const scheduleResponse = await axios.get(`${ACSS_BASE_URL}/schedules/export`, {
      headers: { Authorization: acssToken }
    });

    const scheduleData = scheduleResponse.data;

    // Send schedule data to SIS
    await axios.post(`${SIS_BASE_URL}/schedules/import`, { xml: scheduleData }, {
      headers: { Authorization: sisToken }
    });

    console.log('Schedule data sent successfully');
  } catch (error) {
    console.error('Error sending schedule data:', error.message);
  }
}

// Example usage
sendEnrollmentData(1); // Replace 1 with actual course ID
sendScheduleData();