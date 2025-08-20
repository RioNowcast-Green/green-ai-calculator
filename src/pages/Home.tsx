import { useContext } from "react";
import { CalculatorContext } from "../context/CalculatorContext";
import { ResultCard } from "../components/ResultCard";
import CalculatorForm from "../components/form/CalculatorForm/CalculatorForm";
import Header from "../components/Header";

import co2Icon from "../../public/icons/co2.png";
import energyIcon from "../../public/icons/energy.png";
import waterIcon from "../../public/icons/water.png";
import lightBulbIcon from "../../public/icons/light-bulb.png";
import carIcon from "../../public/icons/car.png";
import bottleIcon from "../../public/icons/bottle.png";

export const Home = () => {
  const context = useContext(CalculatorContext);

  const hoursDecimal = Number(context.energy_consumed.toFixed(2)) / 0.06;
  const hours = Math.floor(hoursDecimal);
  const minutes = Math.round((hoursDecimal - hours) * 60);

  return (
    <>
      <Header />
      <div className="flex items-center justify-around mt-5 mb-20">
        <CalculatorForm />

        <div className="flex flex-wrap gap-5 max-w-[900px]">
          <ResultCard
            img={energyIcon}
            label={"Energy Consumed"}
            result={`${context.energy_consumed.toFixed(2)} kWh`}
          />
          <ResultCard
            img={co2Icon}
            label={"Carbon Footprint"}
            result={`${context.carbon_footprint.toFixed(2)} kgCO2e`}
          />
          <ResultCard
            img={waterIcon}
            label={"Water Footprint"}
            result={`${context.carbon_footprint.toFixed(2)} kgCO2e`}
          />
          <ResultCard
            img={lightBulbIcon}
            label={"Incandescent Light Bulb"}
            result={`${hours}h ${minutes}min`}
          />
          <ResultCard
            img={carIcon}
            label={"Carbon Footprint"}
            result={`${Math.floor(
              Number(context.carbon_footprint.toFixed(2)) / 0.096
            )} km`}
          />
          <ResultCard
            img={bottleIcon}
            label={"Bottle of Water"}
            result={`${Math.floor(
              Number(context.water_consumed.toFixed(2)) / 2
            )} units`}
          />
        </div>
      </div>
    </>
  );
};
