import './App.css';
import FeatureFlagProvider from './useHasFeature/FeatureFlagProvider';
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
