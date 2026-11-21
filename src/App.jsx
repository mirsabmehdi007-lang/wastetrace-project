import { useEffect } from 'react'
import markup from './markup.js'
import { initSimulator } from './simulator.js'

export default function App() {
  useEffect(() => initSimulator(), [])
  return <div className="app" dangerouslySetInnerHTML={{ __html: markup }} />
}
