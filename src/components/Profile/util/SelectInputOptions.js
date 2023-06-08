export const classOptions = [
  { value: "2019", label: "2019" },
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
];

export const disciplineOptions = [
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Urban Engineering", label: "Urban Engineering" },
  { value: "Petroleum Engineering", label: "Petroleum Engineering" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Textile Engineering", label: "Textile Engineering" },
  {
    value: "Industrial & Manufacturing Engineering",
    label: "Industrial & Manufacturing Engineering",
  },
  { value: "Automotive Engineering", label: "Automotive Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  {
    value: "Computer Systems Engineering",
    label: "Computer Systems Engineering",
  },
  { value: "Electronic Engineering", label: "Electronic Engineering" },
  {
    value: "Telecommunications Engineering",
    label: "Telecommunications Engineering",
  },
  { value: "Materials Engineering", label: "Materials Engineering" },
  { value: "Chemical Engineering", label: "Chemical Engineering" },
  { value: "Metallurgical Engineering", label: "Metallurgical Engineering" },
  {
    value: "Polymer & Petrochemical Engineering",
    label: "Polymer & Petrochemical Engineering",
  },
  { value: "Software Engineering", label: "Software Engineering" },
  { value: "Biomedical Engineering", label: "Biomedical Engineering" },
  { value: "Food Engineering", label: "Food Engineering" },
  { value: "Development Studies", label: "Development Studies" },
  { value: "Management Sciences", label: "Management Sciences" },
  { value: "Textile Sciences", label: "Textile Sciences" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Computational Finance", label: "Computational Finance" },
  { value: "Applied Physics", label: "Applied Physics" },
  { value: "Industrial Chemistry", label: "Industrial Chemistry" },
  { value: "English Linguistics", label: "English Linguistics" },
  { value: "Economics & Finance", label: "Economics & Finance" },
  { value: "Bachelor of Architecture", label: "Bachelor of Architecture" },
];

export const provinceOptions = [
  { name: "Punjab" },
  { name: "Sindh" },
  { name: "Khyber Pakhtunkhwa" },
  { name: "Balochistan" },
  { name: "Gilgit-Baltistan" },
  { name: "Azad Kashmir" },
];

export const cityOptions = [
  { name: "Lahore", province: "Punjab" },
  { name: "Faisalabad", province: "Punjab" },
  { name: "Rawalpindi", province: "Punjab" },
  { name: "Multan", province: "Punjab" },
  { name: "Karachi", province: "Sindh" },
  { name: "Hyderabad", province: "Sindh" },
  { name: "Sukkur", province: "Sindh" },
  { name: "Peshawar", province: "Khyber Pakhtunkhwa" },
  { name: "Abbottabad", province: "Khyber Pakhtunkhwa" },
  { name: "Mardan", province: "Khyber Pakhtunkhwa" },
  { name: "Quetta", province: "Balochistan" },
  { name: "Gwadar", province: "Balochistan" },
  { name: "Mirpur", province: "Azad Kashmir" },
  { name: "Gilgit", province: "Gilgit-Baltistan" },
  { name: "Skardu", province: "Gilgit-Baltistan" },
  { name: "Muzaffarabad", province: "Azad Kashmir" },
];

export const districtOptions = [
  //lahore
  { name: "Lahore", city: "Lahore" },
  { name: "Kasur", city: "Lahore" },
  { name: "Sheikhupura", city: "Lahore" },
  { name: "Nankana Sahib", city: "Lahore" },
  //Faisalabad
  { name: "Faisalabad", city: "Faisalabad" },
  //Rawalpindi
  { name: "Rawalpindi", city: "Rawalpindi" },
  //Multan
  { name: "Multan", city: "Multan" },
  //Karachi
  { name: "Karachi East", city: "Karachi" },
  { name: "Karachi West", city: "Karachi" },
  { name: "Karachi Central", city: "Karachi" },
  { name: "Karachi South", city: "Karachi" },
  { name: "Korangi", city: "Karachi" },
  { name: "Malir", city: "Karachi" },
  { name: "Keamari", city: "Karachi" },
  //Hyderabad
  { name: "Hyderabad", city: "Hyderabad" },
  //sukkur
  { name: "Sukkur", city: "Sukkur" },
  //Peshawar
  { name: "Peshawar", city: "Peshawar" },
  { name: "Charsadda", city: "Peshawar" },
  { name: "Nowshera", city: "Peshawar" },
  //Abbottabad
  { name: "Abbottabad", city: "Abbottabad" },
  //Mardan
  { name: "Mardan", city: "Mardan" },
  //Quetta
  { name: "Quetta", city: "Quetta" },
  //Gwadar
  { name: "Gwadar", city: "Gwadar" },
  //Gilgit
  { name: "Gilgit", city: "Gilgit" },
  //Skardu
  { name: "Skardu", city: "Skardu" },
  //Muzaffarabad
  { name: "Muzaffarabad", city: "Muzaffarabad" },
  //Mirpur
  { name: "Mirpur", city: "Mirpur" },
  // Add more districts...
];

export const relationOptions = [
  "Wife",
  "Son",
  "Daughter",
  "Father",
  "Mother",
  "Brother",
  "Sister",
];

export const occupationOptions = [
  "Student",
  "Retired",
  "Jobless",
  "Deceased",
  "Other",
];

export const meritPositionOptions = [
  "None",
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
];

export const semesterOptions = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
];

export const typeOptions = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  // { value: "file", label: "File" },
];
export const validationOptions = [
  { value: "notEmpty", label: "Not Empty", type: "text" },
  { value: "multiline", label: "Multiline", type: "text" },
  { value: "notEmpty", label: "Not Empty", type: "number" },
  // { value: "pdf", label: "PDF", type: "file" },
  // { value: "image", label: "Image", type: "file" },
  // { value: "allType", label: "All types", type: "file" },
];
