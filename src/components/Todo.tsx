import { PlusCircle, Trash } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";

import checkedImg from "../assets/checked.svg";
import checkImg from "../assets/check.svg";

import styles from "./Todo.module.css";
import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react";

interface TodoProps {
  id: string;
  isComplete: boolean;
  text: string;
}

export function Todo() {
  const [todoList, setTodoList] = useState<TodoProps[]>([]);

  const [newCommentText, setNewCommentText] = useState("");

  const taskCompleted = todoList.filter((todo) => todo.isComplete === true);

  function handleCheckChange(id: string) {
    const newTodo = [...todoList];
    const todoIsComplete = newTodo.map((todo) => {
      if (todo.id === id) {
        todo.isComplete ? (todo.isComplete = false) : (todo.isComplete = true);
      }

      return todo;
    });

    return setTodoList(todoIsComplete);
  }

  function handleNewTodoInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault();

    const newTodo = {
      id: uuidv4(),
      isComplete: false,
      text: newCommentText,
    };

    setTodoList([newTodo, ...todoList]);
    setNewCommentText("");
  }

  function handleNewTodoChanged(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleRemoveTask(id: string) {
    const newTodo = [...todoList];
    const newTodoWithoutTodoRemoved = newTodo.filter((todo) => todo.id !== id);

    setTodoList(newTodoWithoutTodoRemoved);
  }

  return (
    <div className={styles.containerTodo}>
      <div className={styles.todo}>
        <form onSubmit={handleCreateNewTodo} className={styles.formTodo}>
          <input
            type="text"
            name="todo"
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTodoChanged}
            onInvalid={handleNewTodoInvalid}
            required
            value={newCommentText}
          />
          <button type="submit" className={styles.buttonCreate}>
            Criar
            <PlusCircle size={15} weight="bold" />
          </button>
        </form>
      </div>

      <div className={styles.todoList}>
        <div className={styles.task}>
          <p>
            Tarefas Criadas <span>{todoList.length}</span>
          </p>
          <p>
            Concluídas{" "}
            <span>
              {taskCompleted.length} de {todoList.length}
            </span>
          </p>
        </div>

        {todoList.map((todo) => (
          <div className={styles.todoItem} key={todo.id}>
            <div className={styles.checkBox}>
              <img
                onClick={() => handleCheckChange(todo.id)}
                src={todo.isComplete ? checkedImg : checkImg}
                alt="Imagem de checagem"
              />
            </div>
            <p className={todo.isComplete ? styles.checked : styles.check}>
              {todo.text}
            </p>
            <div
              className={styles.trash}
              onClick={() => handleRemoveTask(todo.id)}
            >
              <Trash size={24} weight="bold" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
