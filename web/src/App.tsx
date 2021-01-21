import React from 'react';
import './assets/styles/global.css'

import {AuthProvider} from './contexts/auth';
import Routes from './routes/index';

// Exemplo de component
// Component sempre tem que ter letra maiúscula
// import de React é obrigatório
function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
