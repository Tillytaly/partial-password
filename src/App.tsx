import { PartialPassword } from "./Components";
import "./App.css";
import { PartialPasswordProvider } from "./Contexts";

const passwordSettings = { minLength: 8, maxLength: 25 };
const onSuccess = () => alert("Success!");
function App() {
  return (
    <PartialPasswordProvider>
      <div className="App">
        <PartialPassword
          password="contexts"
          onSuccess={onSuccess}
          passwordSettings={passwordSettings}
        />
      </div>
    </PartialPasswordProvider>
  );
}

export default App;
