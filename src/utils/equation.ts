export function calculateEnergyConsumed(
  body: CalculatorSchemaType,
  processor: { tdp: string } | null,
  graphicCard: { tdp: string } | null,
  country: { wue: number; carbon_intensity: number } | null
) {
  const time = body.time / 3600; // h

  const pue = body.PUE || 1;

  const cpuTDP = parseInt(processor?.tdp?.replace(" W", "")) / 1000 || 0; // kw
  const gpuTDP = parseInt(graphicCard?.tdp?.replace(" W", "")) / 1000 || 0; // kw

  const onSiteWUE = body.onSiteWUE || 0;

  const waterOffSiteWUE = country?.wue * 3.785 || 0; // L/kWh

  const carbon_intensity = Number(country?.carbon_intensity) / 1000 || 0;

  const energy_consumed = time * (cpuTDP + gpuTDP) * pue;
  const carbon_footprint = energy_consumed * carbon_intensity; // kgCO2e
  const water_consumed = energy_consumed * (onSiteWUE + waterOffSiteWUE * pue);

  console.log({
    time,
    pue,
    cpuTDP,
    gpuTDP,
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
