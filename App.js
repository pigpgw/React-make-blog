// eslint-disable
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  let [title, setTitle] = useState(['남자 코드 추천', '강남 우동 맛집', '파이썬 독학'])
  let [modal, setModal] = useState(false);
  let [good, setGood] = useState(new Array(title.length).fill(0));
  let [titleIndex, setTitleIndex] = useState(0);
  let [newContent , setNewContent] = useState("");
  

  function sortTitle() {
    let list = [...title]
    list.sort();
    setTitle(list)
  }

  function titleIndexChanger(index) {
    setTitleIndex(index);
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
              <p>2월 17일 발행</p>
            </div>
          )
        })
      }

      <button onClick={() => {
        let list = [...title];
        list.push(newContent);
        setTitle(list);
        setNewContent("")
      }}>글 추가</button>
      <input onChange={(e) => setNewContent(e.target.value)} value={newContent}/>

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
