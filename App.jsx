import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProjectsList from './src/screens/ProjectsList';
import ProjectForm from './src/screens/ProjectForm';




const App = () => {
  return (

      <Provider store={store}>
        <SafeAreaProvider>
          <ProjectForm/>
        <ProjectsList/>
        </SafeAreaProvider>
      </Provider>

  );
};

export default App;
