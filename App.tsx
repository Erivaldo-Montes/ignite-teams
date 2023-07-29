import { Groups } from '@screens/groups';
import {ThemeProvider} from 'styled-components'
import Theme from  './src/themes'
export default function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Groups />
    </ThemeProvider>
  );
}

