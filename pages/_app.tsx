import React from 'react';
import '../src/global.css';
import { Header } from '../src/components/Header/Header';
import { MarkdownInput } from '../src/components/MarkdownInput/MarkdownInput';
import { MarkdownPreview } from '../src/components/MarkdownPreview/MarkdownPreview';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../src/store/store';
import { Sidebar } from '../src/components/Sidebar/Sidebar';
import { Wrapper } from '../src/components/Wrapper/Wrapper';
import { DeleteConfirmationModal } from "../src/components/DeleteConfirmationModal/DeleteConfirmationModal";
import { NotificationModal } from "../src/components/NotificationModal/NotificationModal";


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
      <NotificationModal />
    </ReduxProvider>
  );
}

export default App;
