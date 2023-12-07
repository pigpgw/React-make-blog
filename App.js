// eslint-disable
import { now } from 'mongoose';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', 'React props란'])
  let [modal, setModal] = useState(false);
  let [good, setGood] = useState(new Array(title.length).fill(0));
  let [titleIndex, setTitleIndex] = useState(0);
  let [newTitle, setNewTitle] = useState("");
  let [date, setDate] = useState(['2023년 12월 12일 4초', '2023년 12월 10일 17초', '2023년 12월 7일 30초']);
  let [content, setContent] = useState(['나이스한 블로그', '초 멋진 블로그', '대박 블로그']);
  let [newContent, setNewContent] = useState("")
  let [modalVisible, setModalVisible] = useState(false)


  function sortTitle() {
    let list = [...title]
    list.sort();
    setTitle(list)
  }

  function titleIndexChanger(index) {
    setTitleIndex(index);
  }

  function addContentTitleHandler() {
    if (newTitle.length !== 0) {
      let list = [...title];
      list.unshift(newTitle);
      setTitle(list);
      setNewTitle("")
      let ddabong = [...good];
      ddabong.unshift(0);
      setGood(ddabong);
      addDate();

      addContentHandler();
    } else {
      alert("글 제목을 입력해주세요")
    }
  }

  function addContentHandler(){
    let list = [...content];
    list.unshift(newContent);
    setContent(list);
    console.log("content",list)
  }

  function addDate() {
    let dt = new Date();
    let year = dt.getFullYear();
    let month = dt.getMonth();
    let day = dt.getDay();
    let seconds = dt.getSeconds()
    console.log(year, month, day);
    let nowDate = `${year + "년 " + month + "월 " + day + "일 " + seconds + "초"}`
    let list = [...date];
    list.unshift(nowDate);
    setDate(list);
  }

  function  addBlogContenBtn(){
    setModalVisible(!modalVisible)
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 className='blogTitle'>React Blog</h4>
      </div>

      <div className='btnBox'>
        <button className='sortBtn' onClick={sortTitle}>사전순 글 정렬</button>
        <button onClick={addBlogContenBtn}>블로그 글 추가</button>
      </div>

      {
        modal && (
          <Modal titleIndex={titleIndex} title={title} date={date} content={content} setContent={setContent} />
        )
      }

      <div>
        <div className='blogContentCounterContainer'>
          <h3 className='blogContentCounter'>총 게시글 수 : {title.length}</h3>
        </div>
        {
          title.map((item, index) => {
            return (
              <div className="list" key={index}>
                <h4 className='' onClick={() => {
                  setModal(true)
                  titleIndexChanger(index)
                }}>{item} <span className='likeEmoticon' onClick={(e) => {
                  e.stopPropagation();
                  let list = [...good];
                  list[index] += 1;
                  setGood(list);
                }}>😍 좋아요</span> {good[index]}  </h4>

                <div className='itemBox'>
                  {
                    (date.length !== 0) ? <p >블로그 글 작성 시간 : {date[index]}</p> : <p> 블로그 글 작성 시간 : 2023년 12월 11일</p>
                  }
                  <button className='deleteItemBtn' onClick={() => {
                    let list = [...title];
                    list.splice(index, 1);
                    setTitle(list);
                  }}>글 삭제</button>
                </div>
              </div>
            )
          })
        }
      </div>
        {modalVisible && (
          <div className='addContainer'>
            <div className='addBlogContentBtnBox'>
              <input className='addBlogTitleInput' placeholder='블로그 글 제목을 작성해주세요' onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
              <input className='addBlogContentInput' placeholder='블로그 글 내용을 작성해주세요' onChange={(e) => setNewContent(e.target.value)} value={newContent} />
              <button className='addBlogContentBtn' onClick={addContentTitleHandler}>블로그 글 추가하기</button>
            </div>
          </div>
        )}
    </div>
  );
}

function Modal(props) {
  // 의미없는 div대신 <></> 사용
  // <Modal/> 과 <Modal></Modal>이 같음

  return (
    <div className='modalContiner'>
      <div className='blogContentBtnContainer'>
        <p>글 작성 시간 : {props.date[props.titleIndex]}</p>
        <button className='modifyBlogContent'>글 수정</button>
      </div>
      <div className='modal'>
        <h4>{props.title[props.titleIndex]}</h4>
        <p>상세내용</p>
        <p>{props.content[props.titleIndex]}</p>
      </div>

    </div>
  )
}

export default App;
