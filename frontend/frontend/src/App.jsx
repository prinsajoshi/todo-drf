import {useState,useEffect} from 'react'
import axios from 'axios';
import TodoSearch from './components/TodoSearch'
import TodoFilter from './components/TodoFilter'
import TodoList from './components/TodoList'

function App(){

  const [todos,setTodos]=useState([])
  const [errors,setErrors]=useState("")

  useEffect(()=>{

    axios.get("http://127.0.0.1:8000/todos")
    .then(res=>setTodos(res.data))
    .catch(err=>setErrors(err.message))
  },[])

  const deleteTodo=(id)=>{
    setTodos(todos.filter(todo=>todo.id!==id))
    const originalTodos=[...todos]
    axios.delete("http://127.0.0.1:8000/todos/"+id)
    .catch(err=>{setErrors(err.message) 
      setTodos(originalTodos)})
  }

  const addTodo=(data)=>{
    const originalTodos=[...todos]
    setTodos([...todos,data={...data,id:parseInt([todos[todos.length-1].id])+1,status:"Active"}])
    axios.post("http://127.0.0.1:8000/todos",data)
    .then(res=>setTodos([...todos,res.data]))
    .catch(err=>{
      setErrors(err.message)
      setTodos(originalTodos)
    })
  }

  const updateTodo=(e,id,new_task,todo)=>{
    e.preventDefault()
    const updatedUser={...todo,task:new_task,status:"Active"}
    setTodos(todos.map(t=>t.id==id? updatedUser: t))
    const updatedTodo={...todo,task:new_task}
    axios.patch("http://127.0.0.1:8000/todos/"+id,updatedTodo)

  }

  const completeTodo=(e,id,todo)=>{
    if(e.target.checked){
      console.log("okay")
      setTodos(todos.map(todo=>todo.id==id? {...todo,completed:true}: todo))
      const updatedTodo={...todo,completed:true}
      axios.patch("http://127.0.0.1:8000/todos/"+id,updatedTodo)

    }
    else{
      console.log("omo")
      setTodos(todos.map(todo=>todo.id==id? {...todo,completed:false}:todo))
      const updatedTodo={...todo,completed:false}
      axios.patch("http://127.0.0.1:8000/todos/"+id,updatedTodo)
    }
  }

  let filterTodo=(text)=>{
    setTodos(todos.filter(todo=>todo.status===text))
  }
  return(
    <div className='todo-container'>
      {errors && <p>{errors}</p>}
      <TodoSearch add_todo={addTodo}/>
      <TodoFilter filter_todo={filterTodo}/>
      <TodoList todos={todos} delete_todo={deleteTodo} updated_todo={updateTodo} complete_todo={completeTodo}/>
    </div>
  )
}
export default App;