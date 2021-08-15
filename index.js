const inquirer = require('inquirer');
const consoleTable = require('console.table')

const db = require('./db/connection');




function mainmenu() {
    inquirer
        .prompt({
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                    'View All Employees',
                    'View All Employees By Department',
                    'View All Employees By Manager',
                    'Add Employee',
                    'Remove Employee',
                    'Update Employee Role',
                    'Update Employee Manager',
                    'View All Roles',
                    'Add Role',
                    'Remove Role',
                    'EXIT'
                    ]
            }).then(function (value) {
                switch (value.choice) {
                    case 'View All Employees':
                        employeeList();
                        break;
                    case 'View All Employees By Department':
                        employeeListBD();
                        break;
                    case 'View All Employees By Manager':
                        employeeListBM();
                        break;
                    case 'Add Employee':
                        addEmployee();
                        break;
                    case 'Remove Employee':
                        removeEmployee();
                        break;
                    case 'Update Employee Role':
                        updateRole();
                        break;
                    case 'View All Departments':
                        viewDepartments();
                        break;
                    case 'View All roles':
                        viewRoles();
                        break;
                    case 'Add a department':
                        addDepartment();
                        break;
                    case 'Add a role':
                        addRole();
                        break;
                    case 'EXIT': 
                        exitApp();
                        break;
                    default:
                        break;
                }
        })
};

// view all employees in the database
function employeeList() {
    var query = 'SELECT * FROM employee';
    db.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res); 
        mainmenu();
    })
};

function employeeListBD() {
    // var sql = 'SELECT * FROM department';
    // db.query(sql, function(err, res){
    //     if(err) throw err;
        inquirer
            .prompt({
                name:'department',
                type:'list',
                message: 'which department?',
                choices: [
                    'Sales',
                    'Engineering',
                    'Finance',
                    'Legal'
                ]
            }).then(function(answer){
                switch (answer.department){
                    case 'Sales':
                        var sql = 'SELECT first_name, last_name, department_id FROM employee WHERE department_id = 1';
                        db.query(sql, function(err, res) {
                            if (err) throw err;
                            console.log(res.length + ' employees found!');
                            console.table('All Employees:', res); 
                            mainmenu();
                        })
                        break;
                    case 'Engineering':
                        var sql = 'SELECT first_name, last_name, department_id FROM employee WHERE department_id = 2';
                        db.query(sql, function(err, res) {
                            if (err) throw err;
                            console.log(res.length + ' employees found!');
                            console.table('All Employees:', res); 
                            mainmenu();
                        })
                        break;
                    case 'Finance':
                        var sql = 'SELECT first_name, last_name, department_id FROM employee WHERE department_id = 3';
                        db.query(sql, function(err, res) {
                            if (err) throw err;
                            console.log(res.length + ' employees found!');
                            console.table('All Employees:', res); 
                            mainmenu();
                        })
                        break;
                    case 'Legal':
                        var sql = 'SELECT first_name, last_name, department_id FROM employee WHERE department_id = 4';
                        db.query(sql, function(err, res) {
                            if (err) throw err;
                            console.log(res.length + ' employees found!');
                            console.table('All Employees:', res); 
                            mainmenu();
                        })
                        break;
                    default:
                        break;

                }
            })
        // console.log(res.length + ' employees found!');
        // console.table('All Employees:', res); 
        // mainmenu();
//     })
};

function employeeListBM() {
  db.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    mainmenu()
  })
}

// view all departments in the database
function viewDepartments() {
    var query = 'SELECT * FROM department';
    db.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        mainmenu();
    })
};

// view all roles in the database
function viewRoles() {
    var query = 'SELECT * FROM role';
    db.query(query, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        mainmenu();
    })
};

// add an employee to the database
function addEmployee() {
    db.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input', 
                    message: "What is the employee's fist name? ",
                },
                {
                    name: 'last_name',
                    type: 'input', 
                    message: "What is the employee's last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input', 
                    message: "What is the employee's manager's ID? "
                },
                {
                    name: 'role', 
                    type: 'list',
                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "What is this employee's role? "
                }
                ]).then(function (answer) {
                    let role_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            role_id = res[a].id;
                            console.log(role_id)
                        }                
                    }
                    let dp_id;
                    if (role_id === 4 || role_id === 5) {
                        dp_id = 1;
                    }
                    if (role_id === 1 || role_id === 6) {
                        dp_id = 2;
                    }
                    if (role_id === 3 ) {
                        dp_id = 3;
                    }
                    if (role_id === 2 || role_id === 7) {
                        dp_id = 4;
                    }
                    db.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                        department_id: dp_id
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Your employee has been added!');
                        mainmenu();
                    })
                })
        })
};



// add a department to the database
function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer) {
                db.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                db.query(query, function(err, res) {
                if(err)throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                mainmenu();
                })
            })
};

// add a role to the database
function addRole() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            db.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    mainmenu();
                })
        })
    })
};

// update a role in the database
function updateRole() {

};

//  delete an employee
// function removeEmployee() {
//     inquirer
//             .prompt({
//                 name:'employee',
//                 type:'list',
//                 message: 'which employee?',
//                 choices: [
//                     'TofuLu',
//                     'Engineering',
//                     'Finance',
//                     'Legal'
//                 ]
//             }).then(function(answer){
//                 switch (answer.employee){
//                     case 'TofuLu':
//                         var sql = 'DELETE FROM employee WHERE id = 9';
//                         db.query(sql, function(err, res) {
//                             if (err) throw err;
//                             console.log(res);
//                             console.table('All Employees:', res); 
//                             mainmenu();
//                         })
//                         break;
//                     case 'Engineering':
//                         var sql = 'SELECT first_name, last_name, department_id FROM employee WHERE department_id = 2';
//                         db.query(sql, function(err, res) {
//                             if (err) throw err;
//                             console.log(res.length + ' employees found!');
//                             console.table('All Employees:', res); 
//                             mainmenu();
//                         })
//                         break;
//                     case 'Finance':
//                         var sql = 'SELECT first_name, last_name, department_id FROM employee WHERE department_id = 3';
//                         db.query(sql, function(err, res) {
//                             if (err) throw err;
//                             console.log(res.length + ' employees found!');
//                             console.table('All Employees:', res); 
//                             mainmenu();
//                         })
//                         break;
//                     case 'Legal':
//                         var sql = 'SELECT first_name, last_name, department_id FROM employee WHERE department_id = 4';
//                         db.query(sql, function(err, res) {
//                             if (err) throw err;
//                             console.log(res.length + ' employees found!');
//                             console.table('All Employees:', res); 
//                             mainmenu();
//                         })
//                         break;
//                     default:
//                         break;

//                 }
//             })

// };

const removeEmployee = () => {
    let sql =     `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

    db.query(sql, (error, response) => {
      if (error) throw error;
      let employeeNamesArray = [];
      response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

      inquirer
        .prompt([
          {
            name: 'chosenEmployee',
            type: 'list',
            message: 'Which employee would you like to remove?',
            choices: employeeNamesArray
          }
        ])
        .then((answer) => {
          let employeeId;

          response.forEach((employee) => {
            if (
              answer.chosenEmployee ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
            }
          });

          let sql = `DELETE FROM employee WHERE employee.id = ?`;
          db.query(sql, [employeeId], (error) => {
            if (error) throw error;
            console.log(`Employee Successfully Removed`);
            employeeList();
          });
        });
    });
  };

// exit the app
function exitApp() {
    db.end();
};

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    mainmenu();
});