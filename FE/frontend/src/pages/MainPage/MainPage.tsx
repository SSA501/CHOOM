import React from 'react'
import Btn from '../../components/Btn/Btn'
import NavBar from '../../components/NavBar/NavBar'

function MainPage() {
  return (
    <div>
      <NavBar />
      메인페이지
      
      <br /><br />버튼 테스트<br />
      <Btn login loginType={"kakao"} handleClick={()=>alert("로그인!!")}>로그인</Btn>
      <Btn handleClick={() => alert("버튼 클릭!!")}>일반 버튼</Btn>
    </div>
  )
}

export default MainPage