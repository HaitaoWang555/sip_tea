import { useState } from 'react'
import './App.css'
import { AxiosPromise } from 'axios'
import request from './utils/request'

function testApi(): AxiosPromise<string> {
  return request({
    url: '',
    method: 'get',
  })
}

function App() {
  const [text, setText] = useState('')

  function getText() {
    testApi().then((res) => {
      setText(res.data)
    })
  }

  return (
    <>
      <button onClick={getText}>测试接口</button>
      <p>{text}</p>
    </>
  )
}

export default App
