
function displayGrades(data, searchValue) {
  const gradesContainer = document.getElementById("grades-container");
  console.log(data);


  gradesContainer.innerHTML = "";

  
  const filteredData = data.filter((entry) =>
    entry[0].toString().includes(searchValue) // Filter using id
  );
  console.log(filteredData[0]);

  filteredData.forEach(element => {
    console.log(element)
   gradesContainer.innerText += element + "\n \n \n"; // Display
    
  });

}

// Function to read Excel file and return data
function readExcelFile(filePath) {
  return new Promise((resolve, reject) => {
    // Use your preferred method to fetch the file, e.g., fetch API
    fetch(filePath)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming the first sheet is the one you want to read
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert worksheet to array of objects
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        resolve(jsonData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Sample data URL (replace this with the actual path or URL to your Excel file)
const sampleDataURL = "view.xlsx";

const inputID = document.querySelector("#frmIdInput input");
function validateInput(inputElement) {
  // Remove non-digit characters from the input
  inputElement.value = inputElement.value.replace(/[^\d-]/g, "");
}

inputID.addEventListener("keyup", () => {
  validateInput(inputID);
});
// Call the readExcelFile function with the sample data URL
readExcelFile(sampleDataURL)
  .then((data) => {
    // Call the displayGrades function with the retrieved data initially
    displayGrades(data, "");

    // Add an input event listener to the input field for live search
    inputID.addEventListener("input", () => {
      const inputValue = inputID.value.trim(); // Trim to remove leading/trailing spaces
      validateInput(inputID);
      displayGrades(data, inputValue);
    });
  })
  .catch((error) => {
    console.error("Error reading Excel file:", error);
  });
