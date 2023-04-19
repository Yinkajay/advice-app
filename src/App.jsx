import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Dice from '../images/icon-dice.svg'
import PatternDividerDesktop from '../images/pattern-divider-desktop.svg'
import PatternDividerMobile from '../images/pattern-divider-mobile.svg'

function App() {
  const [adviceInfo, setAdviceInfo] = useState({
    id: '',
    text: ''
  })
  const [hasFetchedAdvice, setHasFetchedAdvice] = useState(false)

  const fetchAdvice = async () => {
    const response = await fetch('https://api.adviceslip.com/advice')
    const data = await response.json()
    const adviceObj = data['slip']
    const { id: adviceId, advice: adviceText } = adviceObj
    setAdviceInfo({ id: adviceId, text: adviceText })
    setHasFetchedAdvice(true)
  }

  useEffect(() => {
    fetchAdvice()
  }, [])

  if (!hasFetchedAdvice) return

  return (
    <section className='advice-card'>
          <h5>Advice #{adviceInfo.id}</h5>
          <p>"{adviceInfo.text}"</p>
          <span><img src={PatternDividerDesktop} alt="" className='desktop-divider' /></span>
          <span><img src={PatternDividerMobile} alt="" className='mobile-divider' /></span>
          <button onClick={fetchAdvice}><img src={Dice} /></button>
    </section>
  )
}

export default App
