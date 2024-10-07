## How to setup this project

1. Make the `task-cli.js` executable
    ```
    chmod +x task-cli.js
    ```

2. Link `task-cli` to be used globally or locally
    ```
    npm link            // globally links package
    npm link task-cli   // locally links package
    ```

3. Now you can run commands as follows
    ```
    # Adding a new task
    task-cli add "Buy groceries"
    # Output: Task added successfully (ID: 1)

    # Updating and deleting tasks
    task-cli update 1 "Buy groceries and cook dinner"
    task-cli delete 1

    # Marking a task as in progress or done
    task-cli mark-in-progress 1
    task-cli mark-done 1

    # Listing all tasks
    task-cli list

    # Listing tasks by status
    task-cli list done
    task-cli list todo
    task-cli list in-progress
    ```

#### Ref: https://roadmap.sh/projects/task-tracker
