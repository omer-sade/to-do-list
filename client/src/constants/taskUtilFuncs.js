import {EMPTY_OPTION, statusOptions, priorityOptions } from "./taskConstants";

export const filterOutDeletedTasks = (tasks) => tasks.filter(task => task.status_id.value !== '5');

// Parse the response (single task) from the database to fit frontend format
export const parseDatabaseResponseTask = (dbTask) => {
    const formatDate = (isoDate) => {
        if (!isoDate) return null; // Use null instead of "empty"
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}/${month}/${day}`;
    };

    return {
        task_id: dbTask.task_id,
        title: dbTask.title || "",
        description: dbTask.description || "",
        create_date: formatDate(dbTask.create_date),
        update_date: formatDate(dbTask.update_date),
        due_date: formatDate(dbTask.due_date),
        assigned_user_id: dbTask.assigned_user_id || "",
        priority_id: priorityOptions.find(option => option.value === String(dbTask.priority_id)) || EMPTY_OPTION,
        status_id: statusOptions.find(option => option.value === String(dbTask.status_id)) || EMPTY_OPTION,
    };
};