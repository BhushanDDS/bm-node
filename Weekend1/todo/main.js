/*
1. To-Do Manager (Local Data)
Create a JavaScript module to manage to-dos:
● Add, remove, and list tasks
● Store tasks in an array (in memory)
● Use array methods like filter, map, findIndex
*/
let todoList = [{
    id: 1,
    task: "demo"
}]
const listTodos = () => {
    todoList.forEach((todo) => console.log(`${todo.id}-------todo : ${todo.task}\n`));
}

const addTask = (task) => {
    if (!task) {
        console.log("Enter a Task ");

    }
    const newTodo = {
        id: todoList.length + 1,
        task
    }
    try {
        todoList.push(newTodo);
    } catch (error) {
        console.log(error);

    }

}

const remove = (id) => {
    if (!id) {
        console.log("please provide id");
    }

    try {
        todoList = todoList.filter((todo) => todo.id != id);
    } catch (error) {
        console.log(error);

    }

}



listTodos();
addTask("lop")
listTodos();
remove(2);
listTodos();