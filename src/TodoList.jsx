import React, { useState } from "react";
import "./app.css"

const Todolist = () => {
  const [inputVal, setinputVal] = useState("");
  const [todoList, settodoList] = useState([]);
  const [editing, setediting] = useState(false);
  const [editItem, seteditItem] = useState(null);

  const handleAddTodo = () => {
    if (inputVal === "") {
      alert("Please enter something first");
    } else if (editing && inputVal) {
      settodoList(
        todoList.map((list) => {
          if (list.id === editItem) {
            return { ...todoList, list: inputVal };
          } else {
            return list;
          }
        })
      );
      setinputVal("");
      seteditItem(null);
      setediting(false);
    } else {
      const todoObj = { list: inputVal, id: Date.now(), isCompleted: false };
      settodoList([...todoList, todoObj]);
      setinputVal("");
    }
  };
  const handleDeleteTodo = (id) => {
    const deletedItem = todoList.filter((list) => list.id !== id);
    settodoList(deletedItem);
  };
  const handleEditTodo = (id) => {
    const editedItem = todoList.find((list) => list.id === id);
    setinputVal(editedItem.list);
    setediting(true);
    seteditItem(id);
  };
  const handleCheckTodo=(id)=>{
    settodoList(todoList.map((list)=>list.id===id?{...list,isCompleted:!list.isCompleted}:list))
    // settodoList(todoList.map((elem)=>elem.id===id?{...elem,completed:!elem.completed}:elem))

    
  }
  

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your msg"
        value={inputVal}
        onChange={(e) => setinputVal(e.target.value)}
      />
      {editing ? (
        <button onClick={handleAddTodo}>Done</button>
      ) : (
        <button onClick={handleAddTodo}>Add</button>
      )}
      <button>Delete All</button>

      <div className="lists">
        <ul>
          {todoList.map((list, i) => (
            <div key={i}>
              <li key={list.id} className={list.isCompleted?"checked":"unchecked"}>{list.list}</li>
              <button onClick={() => handleEditTodo(list.id)}>Edit</button>
              <button onClick={() => handleDeleteTodo(list.id)}>delete</button>
              <button onClick={() => handleCheckTodo(list.id)}>Check</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
