let employeesInfoArray = fs.readFileSync('employees.txt', 'utf8');
const employeeInfoFile = employeesInfoArray.replace(/"/g, "").trim().split('\n');

let empDeptArray = fs.readFileSync('employeedepartment.txt', 'utf8');
const employeeDeptFile = empDeptArray.replace(/"/g, "").trim().split('\n');

let deptArray = fs.readFileSync('departments.txt', 'utf8');
const deptInfoFile = deptArray.replace(/"/g, "").trim().split('\n');

let employeeSalaryArray = fs.readFileSync('employeesalaries.txt', 'utf8');
const employeeSalaryFile = employeeSalaryArray.replace(/"/g, "").trim().split('\n');

let employeeSalaries = {};
for (let line of employeeSalaryFile) {
  let [employeeNumber, salary, startDate, endDate] = line.split(',');
  if (!(employeeNumber in employeeSalaries) || endDate > employeeSalaries[employeeNumber].endDate) {
    employeeSalaries[employeeNumber] = {salary, startDate, endDate};
  }
}

for (let i = 0; i < employeeInfoFile.length; i++) {
  const [empNo, birthDate, firstName, lastName, ...rest] = employeeInfoFile[i].split(',');
  const matchedDept = employeeDeptFile.find((d) => d.startsWith(`${empNo},`));
  const deptNo = matchedDept ? matchedDept.split(',')[1] : '';
  const matchedDeptInfo = deptInfoFile.find((d) => d.startsWith(`${deptNo},`));
  const deptName = matchedDeptInfo ? matchedDeptInfo.split(',')[1] : '';
  
  const {salary, startDate, endDate} = employeeSalaries[empNo] || {salary: '', startDate: '', endDate: ''};
  const currentSalary = salary ? salary : 'No salary found';
  
  if (deptNo !== '') {
    console.log(`Emp No: ${empNo}, First Name: ${firstName}, Last Name: ${lastName}, Dept No: ${deptNo}, Dept Name: ${deptName}, Current Salary: ${currentSalary}`);
  } else {
    console.log(`Emp No: ${empNo}, First Name: ${firstName}, Last Name: ${lastName}, Current Salary: ${currentSalary}`);
  }
}
