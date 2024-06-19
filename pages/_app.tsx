import React from 'react';
import '../src/global.css';
import { Header } from '../src/components/Header/Header';
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
      <Wrapper />
      <DeleteConfirmationModal />
      <NotificationModal />
    </ReduxProvider>
  );
}

export default App;
