import {Component} from 'react'

import './index.css'

class TodoItem extends Component {
  state = {isEditing: false, editText: ''}

  onDelete = () => {
    const {todoList, deleteATodo} = this.props
    deleteATodo(todoList.id)
  }

  onToggle = () => {
    const {todoList, toggleComplete} = this.props
    toggleComplete(todoList.id)
  }

  onEdit = () => {
    const {todoList} = this.props
    this.setState({isEditing: true, editText: todoList.title})
  }

  onChangeEdit = event => this.setState({editText: event.target.value})

  onSave = () => {
    const {todoList, saveTitle} = this.props
    const {editText} = this.state
    const newTitle = editText.trim()
    if (newTitle !== '') saveTitle(todoList.id, newTitle)
    this.setState({isEditing: false})
  }

  onKeyDown = event => {
    if (event.key === 'Enter') this.onSave()
  }

  render() {
    const {todoList} = this.props
    const {isEditing, editText} = this.state
    const {title, completed} = todoList

    return (
      <li className="list-card">
        <input
          type="checkbox"
          className="checkbox"
          checked={completed}
          onChange={this.onToggle}
        />

        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={this.onChangeEdit}
            onKeyDown={this.onKeyDown}
          />
        ) : (
          <p className={`list-title ${completed ? 'completed' : ''}`}>
            {title}
          </p>
        )}

        <div className="button-group">
          {isEditing ? (
            <button type="button" className="edit-button" onClick={this.onSave}>
              Save
            </button>
          ) : (
            <button type="button" className="edit-button" onClick={this.onEdit}>
              Edit
            </button>
          )}
          <button type="button" className="button" onClick={this.onDelete}>
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default TodoItem