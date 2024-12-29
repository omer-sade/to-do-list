import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import Header from "@cloudscape-design/components/header";
import { Container} from "@cloudscape-design/components";

const tableColumnDefs = [
    {
        id: "task_id",
        header: "Task ID",
        cell: e => e.task_id, 
        isRowHeader: true,
    },
    {
        id: "title",
        header: "Title",
        cell: e => e.title, 
    },
    {
        id: "description",
        header: "Description",
        cell: e => e.description, 
    },
    {
        id: "due_date",
        header: "Due date",
        cell: e => e.due_date, 
    },
    {
        id: "assigned_user_id",
        header: "User responsible",
        cell: e => e.assigned_user_id, 
    },
    {
        id: "priority_id",
        header: "Priority",
        cell: e => e.priority_id.label, 
    },
    {
        id: "status_id",
        header: "Status",
        cell: e => e.status_id.label, 
    },
];

export const MainTable = ({tasks}) => {
    const [currTasks, setCurrTasks] = React.useState(tasks);

    React.useEffect(() => {
        setCurrTasks(tasks);
    }, [tasks]);

  return (
    <Container
        header={
            <Header variant="h2">Your Tasks</Header>
        }
    >
        <Table
            columnDefinitions={tableColumnDefs}
            items={currTasks} // Rows in table
            variant="embedded"
            wrapLines
            stripedRows
            empty={
                <Box
                margin={{ vertical: "xs" }}
                textAlign="center"
                color="inherit"
                >
                <b>No tasks</b>
                </Box>
            }
        />
    </Container>
  );
}

export default MainTable;