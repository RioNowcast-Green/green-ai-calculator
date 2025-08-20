import { CalculatorSchemaType } from "./../components/form/CalculatorForm/calculatorSchema";

export function calculateEnergyConsumed(
  body: CalculatorSchemaType,
  knowsEnergyConsumed: boolean,
  processor: { tdp: string } | null,
  graphicCard: { tdp: string } | null,
  country: { wue: string; carbon_intensity: string } | null
) {
  let energy_consumed;
  let onSiteWUE = 0;
  let pue = 1;
  let cpuTDP = 0;
  let gpuTDP = 0;

  console.log(knowsEnergyConsumed, body);

  if (!knowsEnergyConsumed) {
    const time =
      (body.hours * 60 * 60 + body.minutes * 60 + body.seconds) / 3600; // h

    const pue = body.PUE || 1;

    if (processor) {
      cpuTDP = parseInt(processor!.tdp.replace(" W", "")) / 1000 || 0; // kw
    }
    if (graphicCard) {
      gpuTDP = parseInt(graphicCard!.tdp.replace(" W", "")) / 1000 || 0; // kw
    }

    onSiteWUE = body.onSiteWUE || 0;

    energy_consumed = time * (cpuTDP + gpuTDP) * pue;

    console.log({
      time,
      cpuTDP,
      gpuTDP,
      onSiteWUE,
      pue,
      energy_consumed,
    });
  } else {
    energy_consumed = body.energyConsumed || 0; // kWh
    onSiteWUE = body.onSiteWUE || 0;
    pue = body.PUE || 1;
  }

  let waterOffSiteWUE = 0;
  if (country) {
    waterOffSiteWUE = Number(country.wue) * 3.785 || 0; // L/kWh
  }

  const carbon_intensity = Number(country?.carbon_intensity) / 1000 || 0;

  const carbon_footprint = energy_consumed * carbon_intensity; // kgCO2e
  const water_consumed = energy_consumed * (onSiteWUE + waterOffSiteWUE * pue);

  console.log({
    pue,
    onSiteWUE,
    waterOffSiteWUE,
    carbon_intensity,
    energy_consumed,
    carbon_footprint,
    water_consumed,
  });

  return {
    energy_consumed,
    carbon_footprint,
    water_consumed,
  };
}
