import { useTheme } from './ThemeContext';

function App() {
 const { isDarkTheme } = useTheme();

 return (
    <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      {/* Your other components */}
    </div>
 );
}

export default App;