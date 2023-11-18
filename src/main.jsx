import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './routes/Layout.jsx';
import CatalogView from './routes/CatalogView.jsx'
import ClothingFormView from './routes/ClothingFormView.jsx'

import {Routes, Route, BrowserRouter} from 'react-router-dom';
import DetailedView from './components/DetailedView.jsx';
import EditFormView from './routes/EditFormView.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route  index={true} element={<App />}  />
          <Route  index={false} path="/catalog-view" element={<CatalogView />}  />
          <Route  index={false} path="/clothing-form" element={<ClothingFormView />}  />
          <Route index={false} path="/catalog-view/edit/:id" element={<EditFormView />} />
          <Route index={false} path="/catalog-view/:id" element={<DetailedView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
