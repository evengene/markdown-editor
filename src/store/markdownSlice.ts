import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from "./store";
import { Urls } from "../constants/urls";


const baseApiUrl = 'http://localhost:3001';

interface MarkdownState {
  content: string;
  name: string;
  documents: any[],
  id: number | string;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: MarkdownState = {
  content: '',
  name: '',
  documents: [],
  id: 0,
  status: 'idle',
};


export const readDocument = createAsyncThunk(
  'markdown/readDocument',
  async () => {
    debugger;
    try {
      return await fetch(`${baseApiUrl}${Urls.Read}`).then(response => {
        return response.json();
      });
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const saveDocument = createAsyncThunk(
  'markdown/saveDocument',
  async ( { id, name, content }: { id: number | string, name: string, content: string }, { getState } ) => {
    debugger;
    console.log('saveDocument dispatched');
    const state = getState() as RootState;
    if (state.markdown.documents.some(doc => doc.id !== id)) {
      console.log('fetch call being executed');

      const response = await fetch(`${baseApiUrl}${Urls.Save}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name, content })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Server error');
          }
          return response.json();
        })
        .then(data => {
          return data;
        })
        .catch(error => {
          console.log('fetch call completed');
          console.error(error);
          throw error;
        });

      return response;
    }
  }
);

export const updateDocument = createAsyncThunk(
  'markdown/updateDocument',
  async ( { id, name, content }: { id: number | string, name: string, content: string }, { getState } ) => {
    debugger;
    const state = getState() as RootState;
    if (state.markdown.documents.some(doc => doc.id === id)) {
      try {
      const response = await fetch(`${baseApiUrl}${Urls.Update}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name, content })
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      return { id, name, content: data };
    } catch (error) {
      console.error(error);
      throw error;
    }}}
);

export const deleteDocument = createAsyncThunk(
  'markdown/deleteDocument',
  async ( { id, name }: { id: number | string, name: string } ) => {
    debugger;
    const response = await fetch(`${baseApiUrl}${Urls.Delete}`, {

      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, name })
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    // the response is a string not object
    const data = await response.text();
    return data;
  }
);


export const createDocument = createAsyncThunk(
  'markdown/createDocument',
  async () => {
    debugger;
    const response = await fetch(`${baseApiUrl}${Urls.Create}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: uuidv4(),
        createdAt: new Date().toLocaleDateString(),
        name: 'New Document',
        content: ''
      })
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    return await response.json();
  })


export const markdownSlice = createSlice({
  name: 'markdown',
  initialState,
  reducers: {
    setText: ( state, action: PayloadAction<string> ) => {
      state.content = action.payload;
    },
    setDocTitle: ( state, action: PayloadAction<string> ) => {
      state.name = action.payload;
    },
    resetDocument: ( state ) => {
      state.content = '';
      state.name = 'New Document';
      state.id = uuidv4();
    },
    selectDocument: ( state, action: PayloadAction<string> ) => {
      const documentId = action.payload;
      const selectedDocument = state.documents.find(doc => doc.id === documentId);
      if (selectedDocument) {
        state.content = selectedDocument.content;
        state.name = selectedDocument.name;
        state.id = selectedDocument.id;
      }
    },
    setId: ( state, action: PayloadAction<number | string> ) => {
      state.id = action.payload;
    },
    setStatus(state, action: PayloadAction<'idle' | 'pending' | 'fulfilled' | 'rejected'>) {
      state.status = action.payload;
    },
  },
  extraReducers: ( builder ) => {
    builder.addCase(readDocument.fulfilled, ( state, action ) => {
      state.documents = action.payload;
    });
    builder.addCase(updateDocument.fulfilled, (state, action ) => {
      debugger;
      const { id } = action.meta.arg;
      // if the doc already exists update the array with it otherwise add new array
      if (state.documents.some(doc => doc.id === id)) {
        state.documents = state.documents.map(doc => {
          if (doc.id === id) {
            return action.meta.arg;
          }
          return doc;
        })
      } else {
        state.documents.push(action.meta.arg);
      }
      state.status = 'idle';
    });
    builder.addCase(updateDocument.pending, ( state, action ) => {
      state.status = 'pending';
      console.log('updateDocument pending');
    });
    builder.addCase(updateDocument.rejected, ( state, action ) => {
      state.status = 'rejected';
      console.log('updateDocument rejected');
    });
    builder.addCase(saveDocument.fulfilled, ( state, action ) => {
      const { id } = action.meta.arg;
      // if the doc already exists update the array with it otherwise add new array
      if (state.documents.some(doc => doc.id === id)) {
        state.documents = state.documents.map(doc => {
          if (doc.id === id) {
            return action.meta.arg;
          }
          return doc;
        })
      } else {
        state.documents.push(action.meta.arg);
      }
    });
    builder.addCase(deleteDocument.fulfilled, ( state, action ) => {
      debugger;
      const { arg } = action.meta;
      state.documents = state.documents.filter(doc => doc.id !== arg.id);
      state.content = '';
      state.name = '';
      console.log("builder.addCase(deleteDocument -  deleted");
    });
    builder.addCase(createDocument.fulfilled, ( state, action ) => {
      debugger;
      state.documents.push(action.payload);
      console.log(action.payload);
      console.log("Document created!");

      state.content = action.payload.content;
      state.name = action.payload.name;
      state.id = action.payload.id;
    });
  }
});

export const { setText, setDocTitle, selectDocument, resetDocument, setId } = markdownSlice.actions;

export default markdownSlice.reducer;
