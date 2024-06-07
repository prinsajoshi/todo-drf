import React, { useState } from 'react';

const TodoList = ({ todos, delete_todo,updated_todo,complete_todo }) => {

  let [toggle, setToggle] = useState(false);
  let [todoItem, setTodoItem] = useState("");
  let [todo,setTodo]=useState({})
  let [todoId,setTodoId]=useState(0)

  const toggleModel = (todoTask,id,todo) => {


    setToggle(true);
    setTodoItem(todoTask);
    setTodoId(id)
    setTodo(todo)
  };

  return (
    <>
      <div className="todo-list">
        {todos.map((todo,index) => (
          <div className="todo-list-item" key={index}>
            <div className="task">
              <input type="checkbox" onChange={(e)=>complete_todo(e,todo.id,todo)} />
              <p id="t_task" className={todo.completed == true? "strike":""}>{todo.task}</p>
            </div>

            <div className="btn-container">
              <div >
                <button onClick={() => toggleModel(todo.task,todo.id,todo)}>Edit</button>
              </div>
              <div className="delete">
                <button onClick={() => delete_todo(todo.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {toggle && (
        <div className='modal-container'>
          <div className='modal'>
            <h1>Update Form</h1>

            <form action="" onSubmit={(e)=>{updated_todo(e,todoId,todoItem); setToggle(false)}}>
              <input type="text" placeholder="update todo" value={todoItem} onChange={(e) => setTodoItem(e.target.value)} required />
              <button id="add" type="submit">Add</button>
            </form>

            <div className='btn-container'>
              <button className='cancel mod-btn' onClick={() => setToggle(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;
