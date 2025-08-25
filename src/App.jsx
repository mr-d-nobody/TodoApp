import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
    // ✅ Initial load directly from localStorage (runs only once)
    let todoString = localStorage.getItem("todos")
    return todoString ? JSON.parse(todoString) : []
  })

  // ✅ Whenever todos change, save them
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id)
    setTodo(t.todo)

    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    setTodo("")
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)

    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-screen w-1/2">
        <div>
          <h1 className="font-bold text-center">iTask - Manage your todos at one place</h1>
          <div className="addTodo flex flex-col gap-4">
            <h1 className="text-lg font-bold">Add a Todo</h1>
            <input
              onChange={handleChange}
              value={todo}
              className='border-2 w-full bg-amber-50'
              type="text"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 1}
              className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md disabled:bg-violet-700 m-auto w-3/4 flex justify-center items-center space-x-2'
            >
              <FaSave />
              <span>Save</span>
            </button>
          </div>

          <h1 className='text-lg font-bold'>Your Todos</h1>
          <div className="todos">
            {todos.map(item => {
              return (
                <div key={item.id} className="todo flex justify-between w-1/4">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}  // ✅ correct
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                  <div className="buttons flex h-full ">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 my-1'
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 my-1'
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
