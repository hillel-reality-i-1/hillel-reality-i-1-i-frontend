import React from 'react';
import HomePage from './pages/HomePage';
import './translations/i18n';
import SignIn from './components/SignIn/SignIn';


function App() {
  return (
    <>
      <SignIn></SignIn>
      <HomePage/>
    </>
  );
}

export default App;
