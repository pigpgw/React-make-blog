// eslint-disable
import { now } from 'mongoose';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  let [title, setTitle] = useState(['남자 코드 추천', '강남 우동 맛집', '파이썬 독학'])
  let [modal, setModal] = useState(false);
  let [good, setGood] = useState(new Array(title.length).fill(0));
  let [titleIndex, setTitleIndex] = useState(0);
  let [newContent, setNewContent] = useState("");
  let [date, setDate] = useState(['2023년 12월 11일', '2023년 12월 11일', '2023년 12월 11일']);

  function sortTitle() {
    let list = [...title]
    list.sort();
    setTitle(list)
  }

  function titleIndexChanger(index) {
    setTitleIndex(index);
  }

  function addContentTitleHandler() {
    if (newContent.length !== 0) {
      let list = [...title];
      list.unshift(newContent);
      setTitle(list);
      setNewContent("")
      let ddabong = [...good];
      ddabong.unshift(0);
      setGood(ddabong);
      addDate();
    }
  }

  function addDate() {
    let dt = new Date();
    let year = dt.getFullYear();
    let month = dt.getMonth();
    let day = dt.getDay();
    let seconds = dt.getSeconds()
    console.log(year, month, day);
    let nowDate = `${year + " " + month + " " + day + " " + seconds}`
    let list = [...date];
    list.unshift(nowDate);
    setDate(list);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>React Blog</h4>
      </div>

      <button onClick={sortTitle}>가나다 정렬</button>

      {
        title.map((item, index) => {
          return (
            <div className="list" key={index}>
              <h4 onClick={() => {
                setModal(true)
                titleIndexChanger(index)
              }}>{item} <span onClick={(e) => {
                e.stopPropagation();
                let list = [...good];
                list[index] += 1;
                setGood(list);
              }}>😍</span> {good[index]}  </h4>

              <button onClick={() => {
                let list = [...title];
                list.splice(index, 1);
                setTitle(list);
              }}>삭제</button>

              {
                (date.length !== 0) ? <p>{date[index]}</p> : <p>2023년 12월 11일</p>
              }

            </div>
          )
        })
      }
      <button onClick={addContentTitleHandler}>글 추가</button>
      <input onChange={(e) => setNewContent(e.target.value)} value={newContent} />
      {
        modal && (
          <Modal titleIndex={titleIndex} title={title} />
        )
      }
    </div>
  );
}

function Modal(props) {
  // 의미없는 div대신 <></> 사용
  // <Modal/> 과 <Modal></Modal>이 같음
  return (
    <div className='modal'>
      <h4>{props.title[props.titleIndex]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글 수정</button>
    </div>
  )
}

export default App;
