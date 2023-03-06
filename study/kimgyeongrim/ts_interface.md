## Interface

- 일반적으로 타입 체크를 위해 사용되며 변수, 함수, 클래스에 사용
1. 변수와 인터페이스

```jsx
// 인터페이스의 정의
interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

// 변수 todo의 타입으로 Todo 인터페이스를 선언하였다.
let todo: Todo;

// 변수 todo는 Todo 인터페이스를 준수하여야 한다.
todo = { id: 1, content: 'typescript', completed: false };
```

- 인터페이스를 사용하여 함수 파라미터의 타입을 선언 가능

```jsx
// 인터페이스의 정의
interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

let todos: Todo[] = [];

// 파라미터 todo의 타입으로 Todo 인터페이스를 선언하였다.
function addTodo(todo: Todo) {
  todos = [...todos, todo];
}

// 파라미터 todo는 Todo 인터페이스를 준수하여야 한다.
const newTodo: Todo = { id: 1, content: 'typescript', completed: false };
addTodo(newTodo);
console.log(todos)
// [ { id: 1, content: 'typescript', completed: false } ]
```

2. 함수와 인터페이스
- 함수의 인터페이스에는 타입이 선언된 파라미터 리스트와 리턴 타입을 정의

```jsx
// 함수 인터페이스의 정의
interface SquareFunc {
  (num: number): number;
}

// 함수 인테페이스를 구현하는 함수는 인터페이스를 준수하여야 한다.
const squareFunc: SquareFunc = function (num: number) {
  return num * num;
}

console.log(squareFunc(10)); // 100
```

3. 선택적 프로퍼티
- 인터페이스의 프로퍼티는 반드시 구현되어야 하지만 프로퍼티명 뒤에 ?를 붙이면 생략 가능

```jsx
interface UserInfo {
  username: string;
  password: string;
  age?    : number;
  address?: string;
}

const userInfo: UserInfo = {
  username: 'ungmo2@gmail.com',
  password: '123456'
}

console.log(userInfo);
```

4. 인터페이스 상속
- 인터페이스는 extends 키워드를 사용하여 인터페이스 또는 클래스를 상속 가능

```jsx
interface Person {
  name: string;
  age?: number;
}

interface Student extends Person {
  grade: number;
}

const student: Student =  {
  name: 'Lee',
  age: 20,
  grade: 3
}
```

- 복수의 인터페이스도 상속 가능

```jsx
interface Person {
  name: string;
  age?: number;
}

interface Developer {
  skills: string[];
}

interface WebDeveloper extends Person, Developer {}

const webDeveloper: WebDeveloper =  {
  name: 'Lee',
  age: 20,
  skills: ['HTML', 'CSS', 'JavaScript']
}
```