import { CalculatorProvider } from "./context/CalculatorContext";
import { Home } from "./pages/Home";

function App() {
  return (
    <CalculatorProvider>
      <Home />
    </CalculatorProvider>
  );
}

export default App;
