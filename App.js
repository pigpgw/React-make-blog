// eslint-disable
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  let [title, setTitle] = useState(['남자 코드 추천', '강남 우동 맛집', '파이썬 독학'])
  let [like , setLike] = useState(0);
  let [modal , setModal] = useState(false);
  let [good, setGood] = useState(new Array(title.length).fill(0));

  function changeTitle(){
    let list = [...title];
    list[0] = "여자 코트 추천"
    setTitle(list);
  }

  function sortTitle(){
    let list = [...title]
    list.sort();
    setTitle(list)
  }

  function modalVisibleHandler(){
    setModal(!modal);
  }

  useEffect(() => {
    console.log("응애")
  },good)

  return (

    <div className="App">
      <div className="black-nav">
        <h4>React Blog</h4>
      </div>

      <button onClick={sortTitle}>가나다 정렬</button>

      {
        title.map((item,index) => {

          return (
            <div className="list" key={index}>
              <h4>{item} <span onClick={() => {
                let list = [...good];
                list[index] += 1;
                setGood(list);
              }}>😍</span> {good[index]}  </h4>
              <p>2월 17일 발행</p>
            </div>
          )
        })
      }
    
      {
        modal && (
          <Modal/>
        )
      }
      <button onClick={modalVisibleHandler}>모달 보여줘</button>
    </div>
  );
}

function Modal(){
  // 의미없는 div대신 <></> 사용
  // <Modal/> 과 <Modal></Modal>이 같음
  return (
    <div className='modal'>
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
