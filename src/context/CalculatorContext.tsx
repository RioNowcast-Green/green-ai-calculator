import React, { createContext } from "react";
import { useCalculator } from "../hooks/useCalculator";
import { CalculatorSchemaType } from "../components/form/CalculatorForm/calculatorSchema";

interface CalculatorContextData {
  energy_consumed: number;
  carbon_footprint: number;
  water_consumed: number;
  calculateEnergyConsumed: (
    body: CalculatorSchemaType,
    knowsEnergyConsumed: boolean,
    processor: { tdp: string } | null,
    graphicCard: { tdp: string } | null,
    country: { wue: string; carbon_intensity: string } | null
  ) => void;
}

export const CalculatorContext = createContext<CalculatorContextData>(
  {} as CalculatorContextData
);

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    energy_consumed,
    carbon_footprint,
    water_consumed,
    calculateEnergyConsumed,
  } = useCalculator();

  return (
    <CalculatorContext.Provider
      value={{
        energy_consumed,
        carbon_footprint,
        water_consumed,
        calculateEnergyConsumed,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};
