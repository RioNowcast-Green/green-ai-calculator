import { useState } from "react";
import { CalculatorSchemaType } from "./../components/form/CalculatorForm/calculatorSchema";

export function useCalculator() {
  const [energy_consumed, setEnergyConsumed] = useState(0);
  const [carbon_footprint, setCarbonFootprint] = useState(0);
  const [water_consumed, setWaterConsumed] = useState(0);

  const calculateEnergyConsumed = (
    body: CalculatorSchemaType,
    knowsEnergyConsumed: boolean,
    processor: { tdp: string } | null,
    graphicCard: { tdp: string } | null,
    country: { wue: string; carbon_intensity: string } | null
  ) => {
    let onSiteWUE = 0;
    let pue = 1;
    let cpuTDP = 0;
    let gpuTDP = 0;

    let energy = 0;

    if (!knowsEnergyConsumed) {
      const time =
        (body.hours * 60 * 60 + body.minutes * 60 + body.seconds) / 3600; // h

      pue = body.PUE || 1;

      if (processor) {
        cpuTDP = parseInt(processor.tdp.replace(" W", "")) / 1000 || 0; // kw
      }
      if (graphicCard) {
        gpuTDP = parseInt(graphicCard.tdp.replace(" W", "")) / 1000 || 0; // kw
      }

      onSiteWUE = body.onSiteWUE || 0;

      energy = time * (cpuTDP + gpuTDP) * pue;
    } else {
      energy = body.energyConsumed; // kWh
      onSiteWUE = body.onSiteWUE || 0;
      pue = body.PUE || 1;
    }

    let waterOffSiteWUE = 0;
    if (country) {
      waterOffSiteWUE = Number(country.wue) * 3.785 || 0; // L/kWh
    }

    const carbon_intensity = Number(country?.carbon_intensity) / 1000 || 0;

    const carbon = energy * carbon_intensity; // kgCO2e
    const water = energy * (onSiteWUE + waterOffSiteWUE * pue); // L

    setEnergyConsumed(energy);
    setCarbonFootprint(carbon);
    setWaterConsumed(water);

    return {
      energy_consumed: energy,
      carbon_footprint: carbon,
      water_consumed: water,
    };
  };

  return {
    energy_consumed,
    carbon_footprint,
    water_consumed,
    calculateEnergyConsumed,
  };
}
