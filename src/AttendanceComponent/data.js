const studentsData = [
  

    // { id: 8, name: 'Pranav', year: 'Year 6' },
    { id: 9, name: 'Rithvik', year: 'Year 6' },
    { id: 10, name: 'Abhiram', year: 'Year 6' },

    { id: 12, name: 'Samanvi', year: 'Year 6' },
    { id: 13, name: 'Gautam', year: 'Year 6' },
    // { id: 14, name: 'Varshini', year: 'Year 6' },

    { id: 7, name: 'Dheekshita', year: 'Year 6' },
    { id: 20, name: 'Parinitha', year: 'Year 4' },
    { id: 21, name: 'Likitha', year: 'Year 4' },
    { id: 22, name: 'Rinidh', year: 'Year 6' },
    { id: 23, name: 'Manu', year: 'Year 6' },
    { id: 26, name: 'Sri', year: 'Year 8' },

    { id: 27, name: 'Kanav', year: 'Year 4M' },
    { id: 28, name: 'Advik', year: 'Year 6M' },
    { id: 29, name: 'Deetya', year: 'Year 4' },

    { id: 30, name: 'Ryan', year: 'Year 6' },
    { id: 33, name: 'Aaradya', year: 'Year 5M' },
    { id: 34, name: 'Roshini', year: 'Year 5M' },


    { id: 35, name: 'Saharsh', year: 'Year 4' },
    { id: 36, name: 'Riharshi', year: 'Year 4' },
    { id: 38, name: 'Noel', year: 'Year 7' },
    { id: 39, name: 'Mrunali', year: 'GCSE' },

    { id: 44, name: 'Sahasra', year: 'Year 4' },
    { id: 45, name: 'Aarna', year: 'Year 8' },


  ];
  
  
  export const fetchStudents = async (identifier) => {
    if (isNaN(identifier)) {
        // Filter students based on the selected year
        return studentsData.filter(student => student.year === identifier);
    } else {
        // Filter students based on the selected ID
        return studentsData.filter(student => student.id === parseInt(identifier, 10));
    }
};


  export const submitAttendanceData = async (attendanceData) => {
    // Mock implementation of submitting attendance data
    console.log('Submitted attendance data:', attendanceData);
  };