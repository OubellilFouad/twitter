import { useState } from 'react'
import Content from './components/Content'
import Info from './components/Info'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <div className="h-screen flex">
      <Sidebar/>
      <Content/>
      <Info/>
    </div>
  )
}

export default App
