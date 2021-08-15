const inquirer = require('inquirer');
const consoleTable = require('console.table')

const db = require('./db/connection');

const chalk = require('chalk');
const figlet = require('figlet');



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
                    // 'Update Employee Manager',
                    'View All Departments',
                    'Add Department',
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
                        viewDP();
                        break;
                    case 'View All Roles':
                        viewRoles();
                        break;
                    case 'Add Department':
                        addnewDP();
                        break;
                    case 'Add Role':
                        addnewRole();
                        break;
                    case 'Remove Role':
                        removeRole();
                        break;
                    case 'EXIT': 
                        exitApp();
                        break;
                    default:
                        break;
                }
        })
};

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
       
};
// SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;"
function employeeListBM() {
  db.query("SELECT first_name, last_name, manager_id FROM employee", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    mainmenu()
  })
}

function viewDP() {
    var sql = 'SELECT * FROM department';
    db.query(sql, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        mainmenu();
    })
};

function viewRoles() {
    var sql = 'SELECT * FROM role';
    db.query(sql, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        mainmenu();
    })
};

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



function addnewDP() {
    inquirer
        .prompt([
            {
                name: 'newDP', 
                type: 'input', 
                message: 'What department will be added?'
            }
            ]).then(function (answer) {
                db.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDP
                    });
                var sql = 'SELECT * FROM department';
                db.query(sql, function(err, res) {
                if(err)throw err;
                console.log('The new department has been added!');
                console.table('All Departments:', res);
                mainmenu();
                })
            })
};

function addnewRole() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'newrole',
                type: 'input', 
                message: "What new role would be added?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary? (number only)'
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
                    title: answer.newrole,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('Your new role has been added!');
                    // console.table('All Roles:', res);
                    
                    mainmenu();
                })
        })
    })
};





//======================================== Reference ========================================//
// Update an Employee's Role
const updateRole = () => {
    let sql =       `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
                    FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
    db.query(sql, (error, response) => {
      if (error) throw error;
      let employeeNamesArray = [];
      response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

      let sql =     `SELECT role.id, role.title FROM role`;
      db.query(sql, (error, response) => {
        if (error) throw error;
        let rolesArray = [];
        response.forEach((role) => {rolesArray.push(role.title);});

        inquirer
          .prompt([
            {
              name: 'chosenEmployee',
              type: 'list',
              message: 'Which employee has a new role?',
              choices: employeeNamesArray
            },
            {
              name: 'chosenRole',
              type: 'list',
              message: 'What is their new role?',
              choices: rolesArray
            }
          ])
          .then((answer) => {
            let newTitleId, employeeId;

            response.forEach((role) => {
              if (answer.chosenRole === role.title) {
                newTitleId = role.id;
              }
            });

            response.forEach((employee) => {
              if (
                answer.chosenEmployee ===
                `${employee.first_name} ${employee.last_name}`
              ) {
                employeeId = employee.id;
              }
            });

            var sqls =    'UPDATE employee SET employee.role_id = ? WHERE employee.id = ?';
            db.query(
              sqls,
              [newTitleId,employeeId],
              (error) => {
                if (error) throw error;
                console.log(`Employee Role Updated`);
                mainmenu();
              }
            );
          });
      });
    });
};
//======================================== Reference ========================================//




//======================================== Reference ========================================//
function removeEmployee() {
    let sql =     `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

    db.query(sql, (err, res) => {
      if (err) throw err;
      let employeeNamesArray = [];
      res.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});

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

          res.forEach((employee) => {
            if (
              answer.chosenEmployee ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
            }
          });

          let sql = `DELETE FROM employee WHERE employee.id = ?`;
          db.query(sql, [employeeId], (err) => {
            if (err) throw err;
            console.log(`Employee Successfully Removed`);
            employeeList();
          });
        });
    });
};
//======================================== Reference ========================================//


function removeRole() {
    let sql = `SELECT role.id, role.title FROM role`;

    db.query(sql, (error, response) => {
      if (error) throw error;
      let roleNamesArray = [];
      response.forEach((role) => {roleNamesArray.push(role.title);});

      inquirer
        .prompt([
          {
            name: 'chosenRole',
            type: 'list',
            message: 'Which role would you like to remove?',
            choices: roleNamesArray
          }
        ])
        .then((answer) => {
          let roleId;

          response.forEach((role) => {
            if (answer.chosenRole === role.title) {
              roleId = role.id;
            }
          });

          let sql =   `DELETE FROM role WHERE role.id = ?`;
          db.query(sql, [roleId], (error) => {
            if (error) throw error;
            console.log(`Role Successfully Removed`);
            viewRoles();
          });
        });
    });
};

function exitApp() {
    db.end();
};

db.connect(err => {
    if (err) throw err;
//======================================== Reference ========================================//
console.log(chalk.red.bold(`====================================================================================`));
    console.log(``);
    console.log(chalk.blue.bold(figlet.textSync('Employee Tracker')));
    console.log(``);
    console.log(`                                                          ` + chalk.bold('Created By: ChunYu Chang'));
    console.log(``);
    console.log(chalk.red.bold(`====================================================================================`));
//======================================== Reference ========================================//  
    mainmenu();
});