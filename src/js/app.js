import TodoHeader from './components/todoHeader.js';
import UserList from './components/userList.js';

class App {
  constructor($target, dataController) {
    // const defaultState = localStorage.getItem('myState');
    // // Nullish coalescing operator
    // this.state = JSON.parse(defaultState) ?? { todos: [], selected: ALL };
    this.state = {
      currentUser : 'default',
      users : {}
    }
    this.$target = $target;
    this.dataController = dataController;
    
    // userList
    this.userList = new UserList(document.querySelector('#user-list-container'),
    this.dataController,
    {
      onUpdateUser: this.onUpdateUser
    });


    // header
    this.header = new TodoHeader(document.querySelector('#user-title'), this.state.currentUser);

    // // todoinput
    // this.todoInput = new TodoInput(
    //   document.querySelector('.new-todo'),
    //   this.onKeyDown
    // );

    // // todolist
    // this.todoList = new TodoList(document.querySelector('.todo-list'), {
    //   state: this.state,
    //   onDeleteItem: this.onDeleteItem,
    //   changeTodoState: this.changeTodoState,
    //   changeTodoValue: this.changeTodoValue,
    // });

    // // todoCount
    // this.todoCount = new TodoCount(document.querySelector('.count-container'), {
    //   state: this.state,
    //   changeSelected: this.changeSelected,
    // });
    this.init();
  }

  init = async () => {
    const userList = await this.userList.getUsers();
    const users = {};
    userList.forEach((user) => {
      users[`${user.name}`] = user;
    });
    this.setState({...this.state, users})
    this.userList.setState(this.state.users);
  }

  onChangeCurrentUser = (user) => {
    this.header.setState(user);
  }

  onUpdateUser = (newUser) => {
    const newUsers = {...this.state.users};
    const currentUser = newUser.name;
    newUsers[`${currentUser}`] = newUser;
    this.onChangeCurrentUser(currentUser);
    this.setState({...this.state, currentUser, users: newUsers});
  }

  // onKeyDown = (value) => {
  //   const newTodoItems = {
  //     ...this.state,
  //     todos: [...this.state.todos, { value, state: VIEW }],
  //   };
  //   this.setState(newTodoItems);
  // };
  // onDeleteItem = (index) => {
  //   const newTodoItems = this.state.todos;
  //   newTodoItems.splice(index, 1);
  //   const newState = { ...this.state, todos: newTodoItems };
  //   this.setState(newState);
  // };

  // changeTodoState = (index, state) => {
  //   const newTodos = [...this.state.todos];
  //   newTodos[index].state = state;
  //   const newState = { ...this.state, todos: newTodos };
  //   this.setState(newState);
  // };

  // changeTodoValue = (index, value) => {
  //   const newTodos = [...this.state.todos];
  //   newTodos[index].value = value;
  //   const newState = { ...this.state, todos: newTodos };
  //   this.setState(newState);
  // };

  // changeSelected = (name) => {
  //   const newState = { ...this.state, selected: name };
  //   this.setState(newState);
  // };
  // // NOTE onKeyPress(value) {}는 동작하지 않습니다.
  // // 왜 안되는지 this에 대해서 다시 공부해봅시다.
  setState = (nextState) => {
    this.state = nextState;
    // localStorage.setItem('myState', JSON.stringify(this.state));
    // this.todoList.setState(this.state);
    // this.todoCount.setState(this.state);
  };
}

export default App;