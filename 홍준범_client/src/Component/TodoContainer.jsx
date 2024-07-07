import React, { useEffect, useState } from 'react';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import axios from 'axios';

const TodoContainer = () => {
  // 🧊 state
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  // 데이터 가져오기
  // ❓ hook
  useEffect(() => {
    // 비동기 요청
    getList();
  }, []);

  // 🌞 할일 리스트 가져오기
  const getList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/todos');
      setTodoList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🌞 체크 박스 토글
  const onToggle = async (todo) => {
    console.log("체크박스 toggle!");
    console.log(`체크박스 여부 : ${todo.status}`);

    const data = {
      no: todo.no,
      name: todo.name,
      status: todo.status ? 0 : 1, // ↔ 토글
      regDate: todo.regDate,
      updDate: todo.updDate
    };

    try {
      const response = await axios.put('http://localhost:8080/todos', data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    getList();
  };

  // 🌞 할일 삭제
  const onRemove = async (no) => {
    console.log('할일 삭제 클릭!');

    try {
      const response = await axios.delete(`http://localhost:8080/todos/${no}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    getList();
  };

  // 🌞 할일 추가
  // onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: input,
      status: 0
    };

    console.log(`dsds` + input);

    try {
      const response = await axios.post('http://localhost:8080/todos', data);
      getList();
    } catch (error) {
      console.log(error);
    }
    // 할일 입력 비우기
    setInput('');
  };

  // 🌞 할일 입력 변경 이벤트
  const onChange = (e) => {
    const changedInput = e.target.value;
    setInput(changedInput);
  };

  // 🌞 전체 완료
  const onCompleteAll = async () => {
    console.log('전체 완료!');

    const data = {
      no: -1
    };

    try {
      const response = await axios.put('http://localhost:8080/todos', data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    getList();
  };

  // 🌞 전체 삭제
  const onRemoveAll = async () => {
    console.log('전체삭제!');

    try {
      const response = await axios.delete('http://localhost:8080/todos/-1');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    getList();
  };

  return (
    <div className='container'>
      <TodoHeader />
      <TodoInput onSubmit={onSubmit} input={input} onChange={onChange} />
      <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove} />
      <TodoFooter onCompleteAll={onCompleteAll} onRemoveAll={onRemoveAll} />
    </div>
  );
};

export default TodoContainer;
