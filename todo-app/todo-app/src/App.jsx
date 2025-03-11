import "./App.css";
import InputContainer from "../components/InputContainer";
import TodoContainer from "../components/TodoContainer";
import { useState } from "react";

function App() {
  const [inputVal, setInputVal] = useState("")

  const [todos, setTodos] = useState([])

  function writeTodo(e) {
    setInputVal(e.target.value)
  }

  function addTodo() {
    if (inputVal != '') {
      setTodos((prevTodo)=>[...prevTodo,inputVal])
      setInputVal=''  
    }
  }

  function delTodo(todoIndex){
    setTodos((prevTodo)=>prevTodo.filter((prevTodo,prevTodosIndex)=>{
      return prevTodosIndex != todoIndex
    }))
  }

  console.log(todos)

  return (
    <main>
      <h1>To Do List</h1>

      <InputContainer inputVal={inputVal} writeTodo={writeTodo} addTodo={addTodo}/>

      <TodoContainer todos={todos} delTodo={delTodo}/>
    </main>
  );
}

export default App;
