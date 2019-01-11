import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class App extends React.Component {
  state = {
    inputValue: "",
    filter: "all",
    error: "",
    todos: [{ id: 1, todo: "todo1", isDone: false }]
  };

  changeInput = event => {
    const newTodo = event.target.value;
    // errorMessageが表示されている場合、何か入力されればerrorMessageは削除する
    this.setState({ inputValue: newTodo, error: "" });
  };

  addTodo = event => {
    // formタグの画面遷移を止める
    event.preventDefault();
    // todoが入力されずに追加ボタンが押された場合のエラーメッセージ
    if (event.target.inputTodo.value === "") {
      this.setState({ error: "todoを入力してください" });
      return;
    }
    // todosの中のidだけ取得する
    const ids = this.state.todos.map(todo => todo.id);
    // ...idsでidsを展開し、idsの中で一番大きいものを取得する
    let lastId = 0;
    if (this.state.todos.length > 0) {
      lastId = Math.max(...ids);
    }
    const newId = lastId + 1;
    const newTodos = this.state.todos.concat({
      id: newId,
      todo: this.state.inputValue,
      isDone: false
    });
    this.setState({ todos: newTodos, inputValue: "" });
  };

  // indexはtodosの何番目の要素かを示す。　※idは普遍
  doneTodo = index => {
    const todosCopy = this.state.todos.slice();
    // ...todosCopy[index]で、該当のTODOのid,todo,isDoneを展開。その上でisDoneを上書きする
    todosCopy[index] = { ...todosCopy[index], isDone: true };
    this.setState({ todos: todosCopy });
  };

  deleteTodo = index => {
    this.state.todos.splice(index, 1);
    this.setState({ todos: this.state.todos });
  };

  allDisplay = () => {
    this.setState({ filter: "all" });
  };

  activeDisplay = () => {
    this.setState({ filter: "active" });
  };

  completedDisplay = () => {
    this.setState({ filter: "completed" });
  };

  clearCompleted = () => {
    this.state.todos.map((todo, index) => {
      if (todo.isDone === true) {
        this.state.todos.splice(index, 1);
      }
    });
    this.setState({ todos: this.state.todos });
  };

  render() {
    const allTodos = this.state.todos;
    const activeTodos = this.state.todos.filter(todo => todo.isDone === false);
    const completedTodos = this.state.todos.filter(
      todo => todo.isDone === true
    );
    let displayTodos = [];
    if (this.state.filter === "all") {
      displayTodos = allTodos;
    } else if (this.state.filter === "active") {
      displayTodos = activeTodos;
    } else if (this.state.filter === "completed") {
      displayTodos = completedTodos;
    }
    return (
      <div>
        <form onSubmit={this.addTodo}>
          <input
            type="text"
            name="inputTodo"
            value={this.state.inputValue}
            onChange={this.changeInput}
          />
          <input type="submit" value="ToDo追加" />
        </form>
        {this.state.error ? (
          <div className="errorMessage">{this.state.error}</div>
        ) : null}
        <button onClick={this.allDisplay}>All</button>
        <button onClick={this.activeDisplay}>Active</button>
        <button onClick={this.completedDisplay}>Completed</button>
        <button onClick={this.clearCompleted}>ClearCompleted</button>
        {displayTodos.map((todo, index) => {
          return (
            <div key={todo.id}>
              <span
                className={todo.isDone ? "todoContent" : ""}
                onClick={() => this.doneTodo(index)}
              >
                {todo.isDone ? "[X]" : "[]"} id: {todo.id} {todo.todo}
              </span>
              <span
                className="deleteButton"
                onClick={() => this.deleteTodo(index)}
              >
                X
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
