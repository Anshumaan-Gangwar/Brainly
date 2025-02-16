import './App.css'
import { Button } from './components/ui/Button'
import { ShareIcon } from './components/ui/ShareIcon'

function App() {
  return (
    <div className="bg-slate-300 h-screen">
      <Button type="secondary" size="sm" text="Click me" frontIcon={<ShareIcon size="sm"/>}></Button>
      <Button type="secondary" size="md" text="Click me" frontIcon={<ShareIcon size="md"/>}></Button>
      <Button type="secondary" size="lg" text="Click me" frontIcon={<ShareIcon size="lg"/>}></Button>
      <Button type="primary" size="sm" text="Click me"></Button>
      <Button type="primary" size="md" text="Click me"></Button>
      <Button type="primary" size="lg" text="Click me"></Button>
    </div>
  )
}

export default App

