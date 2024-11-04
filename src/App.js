import TodoPage from './components/Todo/TodoPage'

import { RecoilRoot } from 'recoil'

function App() {
  return (
    <div className='App'>
      <RecoilRoot>
        <TodoPage />
      </RecoilRoot>
    </div>
  )
}

export default App
