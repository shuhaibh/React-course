import React from 'react'
import Todo from './Todo'

function TodoContainer({todos ,delTodo}) {
  return (
    <div className="task-container">
      {todos.map((todo ,index)=>{
        return <Todo todo={todo} index={index} delTodo={delTodo}/>
      })}
  </div>
  )
}

export default TodoContainer
