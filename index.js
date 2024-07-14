// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeData) {
    return employeeData.map(data => createEmployeeRecord(data));
  }
  
  function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour, 10) });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour, 10) });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => event.date);
    let payable = dates.reduce((memo, date) => memo + wagesEarnedOnDate(employee, date), 0);
    return payable;
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((memo, employee) => memo + allWagesFor(employee), 0);
  }
  