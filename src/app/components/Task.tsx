"use client";

import { BsTrash3 } from "react-icons/bs";
import { ITask } from "../../../types/tasks";
import { FaEdit } from "react-icons/fa";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTask, editTask } from "../../../api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const router = useRouter();

  const handleSubmitEditTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTask({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setOpenModalDelete(false); // close modal
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FaEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-600"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTask}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Confirm
              </button>
            </div>
          </form>
        </Modal>

        <BsTrash3
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-600"
          size={25}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">Do you really want to delete this task?</h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="btn">
              Ok
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
