import Form from "./components/form/CalculatorForm/CalculatorForm";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />

      <div className="flex items-center justify-around my-20">
        <Form />
        <div className="flex flex-col gap-5">
          <p>
            Comparar a energia com lâmpadas convencionais - lampada de 80W -
            quanto tempo ela ficaria ligada?
          </p>
          <p>
            Comparar a pegada de carbono com carros populares brasileiros -
            0,096 kg de CO2 a cada km rodado.
          </p>
          <p>Comparar a pegada hídrica com garrafas d'água de 500ml</p>
          <p>
            Adicionar uma string para uso em publicações com o resumo dos
            resultados
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
