// export function calculateEnergyConsumed(
//   body: CalculatorSchemaType,
//   processor: any | null,
//   country: Country | null
// ) {
//   const time = body.time / 3600; // h
//   const pue = body.PUE || 1;
//   const tdp = processor?.tdp / 1000 || 0; // kw
//   const onSiteWUE = body.onSiteWUE || 0;
//   const waterOffSiteWUE = country?.wue * 3.785 || 0; // L/kWh
//   const carbon_intensity = Number(country?.carbon_intensity) / 1000 || 0;

//   const energy_consumed = time * tdp * pue;
//   const carbon_footprint = energy_consumed * carbon_intensity; // kgCO2e
//   const water_consumed = energy_consumed * (onSiteWUE + waterOffSiteWUE * pue);

//   return {
//     energy_consumed,
//     carbon_footprint,
//     water_consumed,
//   };
// }

export function calculateEnergyConsumed() {
  return;
}
