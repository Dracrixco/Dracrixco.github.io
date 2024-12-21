import "./App.css";
import SelectTrainerType from "./components/select-trainer";

function App() {
  return (
    <div>
      Trainer Generator
      <SelectTrainerType
        onChange={function (id: string): void {
          console.log(id);
        }}
      />
    </div>
  );
}

export default App;
