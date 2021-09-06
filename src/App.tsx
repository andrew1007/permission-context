import './App.css';
import FeatureFlagProvider from './useFeatureFlag/FeatureFlagProvider';
import FeatureChecker from './FeatureChecker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FeatureChecker />
      </header>
    </div>
  );
}

export default FeatureFlagProvider(App);
