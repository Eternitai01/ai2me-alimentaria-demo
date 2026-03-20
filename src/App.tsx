import { Routes, Route } from 'react-router-dom'
import CompanySelect from './pages/CompanySelect'
import ProductFinder from './pages/ProductFinder'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CompanySelect />} />
      <Route path="/ferrarini" element={<ProductFinder company="ferrarini" />} />
      <Route path="/litera-meat" element={<ProductFinder company="litera-meat" />} />
    </Routes>
  )
}

export default App
