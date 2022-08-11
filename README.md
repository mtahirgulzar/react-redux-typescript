# Getting Started

Simple admin and user dashboard

# Task React-Redux-Typescript 

    •	Create Login form with user name and password with button to log in the application with welcome ${name} massage, and validation in login form, which user data open only Tasks Page, and Admin data open the both Tasks and Users pages.
    •	Users Page: Create data table with userData from fakeData.json file which show data in the data Table, edit, view and delete icons in every row, add button in the top of the page to add new field (use one form component in all actions).
    •	Admin Page: Create Task Manager which show tasks data from fakeData.json and add new task in popup, delete, edit tasks, and sort tasks with drag and drop.
    •	Show all data in data table as lazy load.

    •	Use React Redux Toolkit , react router , and type script in coding.
    •	Show "actions" from TaskData in multi-select dropdown list.
    •	Admin Can update user status with radio button in every row in the table.

    fakeData.json:
    data: {
        Id: "1"
        UserData: {
            User_name: "Ali
            Password: "Ali@1234"
            Active: "true"
            User_type: "user"
            create_date: ""
            activation_date:""
            deActication_date: ""
            updated_date: ""
        }
        UserTask: {
            0: {
                Id: "1"
                task_name: "Task1"
                task_date: "Mon 08/08/2022 06:00:00:07 Am"
                actions: { goingToThePark, FinishHomeWork, CallMyFather, bringGiftToMySisitrtBirthday}
            }
        }
    };

## Install dependencies

### `npm i` or `yarn`

## Run local server

### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
