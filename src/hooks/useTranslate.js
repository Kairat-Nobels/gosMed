import { useSelector } from 'react-redux'
import ru from '../locales/ru.json'
import kg from '../locales/kg.json'

const useTranslate = () => {
  const lang = useSelector(state => state.languageReducer.lang)
  const t = lang === 'ru' ? ru : kg
  return t
}

export default useTranslate
