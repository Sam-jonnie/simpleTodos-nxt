import {Component} from 'react'

import './index.css'

import TodoItem from '../TodoItem'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
].map(each => ({...each, completed: false}))

class SimpleTodos extends Component {
  state = {
    todoList: initialTodosList,
    userInput: '',
    nextId: initialTodosList.length + 1,
  }

  onChangeInput = event => this.setState({userInput: event.target.value})

  // "Buy milk 3" -> 3 todos titled "Buy milk". No trailing number -> 1 todo.
  addTodo = () => {
    const {userInput, nextId} = this.state
    const text = userInput.trim()
    if (text === '') return

    let title = text
    let count = 1
    const match = text.match(/^(.+)\s+(\d+)$/)
    if (match) {
      title = match[1].trim()
      count = parseInt(match[2], 10)
    }

    const newTodos = Array.from({length: count}, (_, index) => ({
      id: nextId + index,
      title,
      completed: false,
    }))

    this.setState(prevState => ({
      todoList: [...prevState.todoList, ...newTodos],
      nextId: prevState.nextId + count,
      userInput: '',
    }))
  }

  onKeyDown = event => {
    if (event.key === 'Enter') this.addTodo()
  }

  deleteTodo = id => {
    const {todoList} = this.state
    this.setState({todoList: todoList.filter(each => each.id !== id)})
  }

  saveTitle = (id, newTitle) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(each =>
        each.id === id ? {...each, title: newTitle} : each,
      ),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(each =>
        each.id === id ? {...each, completed: !each.completed} : each,
      ),
    }))
  }

  render() {
    const {todoList, userInput} = this.state
    return (
      <div className="container">
        <div className="card">
          <h1 className="title">Simple Todos</h1>

          <div className="add-todo-row">
            <input
              type="text"
              className="add-input"
              placeholder="Add a todo, e.g. Buy milk 3"
              value={userInput}
              onChange={this.onChangeInput}
              onKeyDown={this.onKeyDown}
            />
            <button type="button" className="add-button" onClick={this.addTodo}>
              Add
            </button>
          </div>

          <ul className="lists-card">
            {todoList.map(eachItem => (
              <TodoItem
                todoList={eachItem}
                key={eachItem.id}
                deleteATodo={this.deleteTodo}
                saveTitle={this.saveTitle}
                toggleComplete={this.toggleComplete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
