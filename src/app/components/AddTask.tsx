"use client";
import { BsPlusLg } from "react-icons/bs";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTask } from "../../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTask({
      id: uuidv4(),
      text: newTaskValue,
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add a task
        <BsPlusLg className="ml-2" size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTask}>
          <h3 className="font-bold text-lg">Add new Task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
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
    </div>
  );
};

export default AddTask;
