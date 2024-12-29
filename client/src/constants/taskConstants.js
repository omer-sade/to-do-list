/*
    This file contains const variables that are used in App.js
*/

export const EMPTY_OPTION = {label: "", value: ""};

export const EMPTY_TASK = {
    title: "",
    description: "",
    create_date: "",
    update_date : "",
    due_date: "",
    assigned_user_id : "",
    priority_id : EMPTY_OPTION, 
    status_id : EMPTY_OPTION
};

export const statusOptions = [
    { label: "Draft", value: "1" },
    { label: "In progress", value: "2" },
    { label: "On hold", value: "3" },
    { label: "Completed", value: "4" },
    { label: "Deleted", value: "5" }
];

export const priorityOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" }
];