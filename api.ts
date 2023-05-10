import { ITask } from "./types/tasks";

const baseUrl = 'http://localhost:3001';

export const getAllTodos = async () : Promise<ITask[]> => {
    const result = await fetch(`${baseUrl}/tasks`, {cache: 'no-store'});
    const list = await result.json();
    return list;
}

export const addTask = async (task: ITask): Promise<ITask> =>{
    const result = await fetch(`${baseUrl}/tasks`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })

    const newTask = await result.json();
    return newTask;
}

export const editTask = async (task: ITask): Promise<ITask> =>{
    const result = await fetch(`${baseUrl}/tasks/${task.id}`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })

    const updatedTask = await result.json();
    return updatedTask;
}


export const deleteTask = async (id: string): Promise<void> =>{
    await fetch(`${baseUrl}/tasks/${id}`,{
        method: 'DELETE',
    })
}

