import { useI18n } from '../config/i18n'

export default function LanguageSelector() {
  const { language, setLanguage } = useI18n()
  
  return (
    <select
      value={language}
      onChange={(e) => {
        const lang = e.target.value as Language
        setLanguage(lang)
        localStorage.setItem('appLanguage', lang)
      }}
      className="px-2 py-1 border rounded"
    >
      <option value="pt-BR">Português</option>
      <option value="en">English</option>
    </select>
  )
}
