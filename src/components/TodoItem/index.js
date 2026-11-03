import './index.css'

const TodoItem = props => {
  const {todoList, deleteATodo} = props
  const {id} = todoList
  const onDelete = () => deleteATodo(id)

  return (
    <li className="list-card">
      <p className="list-title">{todoList.title}</p>
      <button className="button" type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
