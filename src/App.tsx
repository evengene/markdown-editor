import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { MarkdownInput } from './components/MarkdownInput/MarkdownInput';
import { MarkdownPreview } from './components/MarkdownPreview/MarkdownPreview';
import { Provider as ReduxProvider } from 'react-redux';
import { store, useAppSelector } from './store/store';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Wrapper } from './components/Wrapper/Wrapper';
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal/DeleteConfirmationModal";


function App() {

  return (
    <ReduxProvider store={store}>
      <Header/>
      <Sidebar/>
      <Wrapper>
        <MarkdownInput/>
        <MarkdownPreview/>
      </Wrapper>
      <DeleteConfirmationModal />
    </ReduxProvider>
  );
}

export default App;
