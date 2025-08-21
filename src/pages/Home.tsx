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

import logo from "../../public/icons/logo.svg";

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

        <div className="flex flex-col items-center  gap-10 max-w-[800px]">
          <div className="flex flex-wrap justify-between gap-5 max-w-[900px]">
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
              label={"Light Bulb (60W)"}
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
          <div className="rounded-lg py-3 px-10 shadow-lg flex flex-col ">
            <div className="flex flex-col gap-5">
              <div className="flex gap-10">
                <img src={logo} className="w-40" />
                <div className="flex flex-col gap-3">
                  <h1 className="text-xl font-bold">About Us</h1>
                  <p>
                    The Ethical and Sustainable AI Group at the Federal
                    Fluminense University explores responsible and
                    environmentally conscious approaches to Artificial
                    Intelligence.
                  </p>
                  <p>
                    This Work was developed by{" "}
                    <strong>Gabriel B. Breder</strong> and{" "}
                    <strong>Mariza Ferro</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg py-3 px-10 shadow-lg flex flex-col ">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-bold">How to Cite</h1>
                <p>
                  This experiment{" "}
                  {context.time &&
                  context.time.hours +
                    context.time.minutes +
                    context.time.seconds >
                    0 ? (
                    <>
                      ran for {context.time?.hours} hours and{" "}
                      {context.time?.minutes} minutes on{" "}
                      {context.cpuInfo && context.gpuInfo ? (
                        <>
                          {context.cpuInfo} and {context.gpuInfo}
                        </>
                      ) : (
                        context.cpuInfo || context.gpuInfo
                      )}{" "}
                      consuming {context.energy_consumed.toFixed(2)} kWh
                    </>
                  ) : (
                    <>consumed {context.energy_consumed.toFixed(2)} kWh</>
                  )}
                  , with an estimated footprint of{" "}
                  {context.carbon_footprint.toFixed(2)} kgCO₂e and{" "}
                  {context.water_consumed.toFixed(2)} L of water in{" "}
                  {context.country}, as calculated with the Carbon and Water
                  Footprint Calculator (UFF, 2025).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
