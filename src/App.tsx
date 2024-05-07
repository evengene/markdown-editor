import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { MarkdownInput } from './components/MarkdownInput/MarkdownInput';
import { MarkdownPreview } from './components/MarkdownPreview/MarkdownPreview';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Wrapper } from './components/Wrapper/Wrapper';

function App() {

  return (
    <ReduxProvider store={store}>
      <Header/>
      <Sidebar/>
      <Wrapper>
        <MarkdownInput/>
        <hr className="divider"/>
        <MarkdownPreview/>
      </Wrapper>
    </ReduxProvider>
  );
}

export default App;
