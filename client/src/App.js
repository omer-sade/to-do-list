import "@cloudscape-design/global-styles/index.css"
import MainTable from "./components/MainTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { EMPTY_TASK, EMPTY_OPTION, statusOptions, priorityOptions } from "./constants/taskConstants";
import {
    AppLayout,
    Header,
    SpaceBetween,
    ContentLayout, 
    FormField,
    Input,
    Container,
    Select,
    Button,
    DatePicker
  } from '@cloudscape-design/components';
  import { filterOutDeletedTasks, parseDatabaseResponseTask } from "./constants/taskUtilFuncs";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState(EMPTY_TASK);
    const [selectedTaskID, setSelectedTaskID] = useState(null); //task id that the user selected to delete

    const fetchAndSetTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/tasks");
            const parsedTasks = response.data.map(parseDatabaseResponseTask);
            setTasks(filterOutDeletedTasks(parsedTasks));
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Handles clinking 'Add' button
    const handleAddTask = async () => {
        try {
            // Convert dates to ISO format
            const taskToSend = {
                ...newTask,
                due_date: newTask.due_date ? new Date(newTask.due_date).toISOString() : null, // Convert to ISO string
                create_date: new Date().toISOString(), // Use current date for creation
                update_date: new Date().toISOString(), // Use current date for update
                assigned_user_id: Number(newTask.assigned_user_id), // Ensure this is a number
                priority_id: Number(newTask.priority_id.value), // Extract value from priority_id
                status_id: Number(newTask.status_id.value), // Extract value from status_id
            };

            // Send POST request to the backend
            await axios.post("http://localhost:5000/api/tasks", taskToSend);
        
            // Fetch the updated list of tasks
            fetchAndSetTasks();
    
            // Reset the new task
            setNewTask(EMPTY_TASK);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Handles clicking 'Delete' button
    const handleDelete = async () => {
        try {
            // Send PUT request to simulate delete (changes status_id to 5)
            await axios.put(`http://localhost:5000/api/tasks/${selectedTaskID}`, {
                status_id: 5, // Only send the updated status
            });
                
            // Fetch the updated list of tasks after deletion
            fetchAndSetTasks();
    
            // Reset the selected task ID
            setSelectedTaskID(null);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("Task not found!");
            } else if (error.response && error.response.status === 400) {
                alert(error.response.data.error); // Display specific error message (e.g., "Task already deleted")
            } else {
                console.error("Error deleting task:", error);
                alert("An error occurred while deleting the task.");
            }
        }
    };
    
    // Loads all the tasks from the database when app launches
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                fetchAndSetTasks();
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    },[]);

    return(
        <div className="app-container">
            <AppLayout
                headerVariant="high-contrast"
                content = {
                    <ContentLayout
                        headerVariant="high-contrast"
                        header={<Header variant = "h1">Task Manager</Header>}
                    >
                        <SpaceBetween size="m">
                            {/* New Task Container*/}
                            <Container
                                header={
                                    <Header 
                                        variant="h2"
                                        description={"Enter all the parameters of a new task below"}
                                    >
                                        Add New Task
                                    </Header>
                                }
                            >
                                <SpaceBetween direction="horizontal" size="xs">
                                    <FormField
                                        label = "Title"
                                    >
                                        <Input
                                            value = {newTask.title}
                                            onChange={event =>
                                                setNewTask({...newTask, title: event.detail.value})
                                            }
                                            placeholder="Enter title"
                                        />
                                    </FormField>
                                    <FormField
                                        label = "Description"
                                    >
                                        <Input
                                            value = {newTask.description}
                                            onChange={event =>
                                                setNewTask({...newTask, description: event.detail.value})
                                            }
                                            placeholder="Enter description"
                                        />
                                    </FormField>
                                    <FormField
                                        label = "Due date"
                                    >
                                        <DatePicker
                                            value = {newTask.due_date}
                                            onChange={({ detail }) =>
                                                setNewTask({...newTask, due_date: detail.value})}
                                            placeholder="YYYY/MM/DD"
                                        />
                                    </FormField>
                                    <FormField
                                        label = "Assigned user"
                                    >
                                        <Input
                                            value = {newTask.assigned_user_id}
                                            onChange={event =>
                                                setNewTask({...newTask, assigned_user_id: event.detail.value})
                                            }
                                            type="number"
                                            placeholder="Enter assigned user"
                                        />
                                    </FormField>
                                    <FormField
                                        label = "Priority"
                                    >
                                        <Select
                                            selectedOption = {newTask.priority_id}
                                            onChange={({ detail }) =>
                                                setNewTask({...newTask, priority_id: detail.selectedOption})
                                            }
                                            options={priorityOptions}
                                            placeholder="Select priority"
                                        />
                                    </FormField>
                                    <FormField
                                        label = "Status"
                                    >
                                        <Select
                                            selectedOption = {newTask.status_id}
                                            onChange={({ detail }) =>
                                                setNewTask({...newTask, status_id: detail.selectedOption})
                                            }
                                            options = {statusOptions.filter(option => option.label !== "Deleted")}
                                            placeholder="Select status"
                                        />
                                    </FormField>
                                    <div style = {{ display: 'flex', alignItems: 'flex-end', height: '100%'}}>
                                        <Button 
                                            onClick = {handleAddTask} 
                                            disabled = {
                                                newTask.title === '' || 
                                                newTask.priority_id === EMPTY_OPTION || 
                                                newTask.status_id === EMPTY_OPTION ||
                                                newTask.assigned_user_id === '' ||
                                                newTask.description === '' ||
                                                newTask.due_date === ''
                                            }
                                            disabledReason="Fill all task parameters"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    
                                </SpaceBetween>
                            </Container>

                            {/* Main Task Table */}
                            <MainTable tasks = {tasks}/>
                            <Container
                                header={
                                    <Header 
                                        variant="h2"
                                        description={"Enter the ID of the task you would like to delete"}
                                    >
                                        Delete Task
                                    </Header>
                                }
                            >
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Input
                                    onChange={({ detail }) => setSelectedTaskID(detail.value)}
                                    value={selectedTaskID}
                                    type="number"
                                    />  
                                    <Button
                                        onClick={handleDelete}
                                        disabled={!selectedTaskID}
                                        disabledReason="Enter task ID"
                                    >
                                        Delete
                                    </Button>
                                </SpaceBetween>
                            </Container>
                        </SpaceBetween>
                    </ContentLayout>
                }
                navigationHide = {true}
                toolsHide = {true}
            />
        </div>
    );
};