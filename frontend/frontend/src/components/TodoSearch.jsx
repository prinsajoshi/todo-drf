import React from 'react';
import {useForm} from 'react-hook-form'

const TodoSearch = ({add_todo}) => {
    const {register,handleSubmit,reset,formState:{errors}}=useForm()
  return (
    <div className="todo-search">
        <form action="" onSubmit={handleSubmit((data)=>{add_todo(data); reset()})}>
            <input type="text" placeholder="enter todo"{...register("task",{required:true})}/>
            <button>Add</button>
        </form>
        {errors.task?.type=="required" && <small> This field cannot be blank</small>}
      
    </div>
  );
};

export default TodoSearch;