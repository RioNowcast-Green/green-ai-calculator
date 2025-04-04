import { useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorSchema, CalculatorSchemaType } from "./calculatorSchema";
import Select from "react-select";

import processors from "../../../hardware/processors.json";
import countries from "../../../country/countries.json";

import { useState } from "react";
import { Label } from "../Label";

const CalculatorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorSchemaType>({
    resolver: zodResolver(calculatorSchema),
  });

  const processorsOptions = processors.map((p) => ({
    value: p.id,
    label: p.label,
    tdp: p.tdp,
  }));

  const [processor, setProcessor] = useState<{
    value: number;
    label: string;
    tdp: number;
  } | null>(null);

  const countriesOptions = countries.map((c) => ({
    value: c.id,
    label: c.name,
    wue: c.wue,
    carbon_intensity: c.carbon_intensity,
  }));
  const [country, setCountry] = useState<{
    value: number;
    label: string;
    wue: number;
    carbon_intensity: number;
  } | null>(null);

  const [response, setResponse] = useState<{
    energy_consumed: number;
    carbon_footprint: number;
    water_consumed: number;
  } | null>(null);

  const handleCalculate = (body: CalculatorSchemaType) => {
    const time = body.time / 3600; // h
    const pue = body.PUE || 1;
    const tdp = processor?.tdp / 1000 || 0; // kw
    const onSiteWUE = body.onSiteWUE || 0;
    const waterOffSiteWUE = country?.wue * 3.785 || 0; // L/kWh
    const carbon_intensity = country?.carbon_intensity || 0;

    const energy_consumed = time * tdp * pue;
    const carbon_footprint = energy_consumed * carbon_intensity; // kgCO2e
    const water_consumed =
      time * energy_consumed * (onSiteWUE + waterOffSiteWUE * pue);

    setResponse({
      energy_consumed,
      carbon_footprint,
      water_consumed,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleCalculate)} className="w-96 m-4">
        <FormField
          label="Time (s)"
          placeholder="Enter time"
          errorMessage={errors.time?.message}
          {...register("time")}
        />

        <div className="flex gap-3 items-center">
          <Label>CPU </Label>
          <Select
            className="w-full"
            options={processorsOptions}
            onChange={setProcessor}
          />
        </div>

        <FormField
          label="on-site WUE"
          placeholder="Enter on-site WUE"
          errorMessage={errors.onSiteWUE?.message}
          {...register("onSiteWUE")}
        />

        <div className="flex gap-3 items-center">
          <Label>País </Label>
          <Select
            className="w-full"
            options={countriesOptions}
            onChange={setCountry}
          />
        </div>

        <FormField
          label="PUE"
          placeholder="Enter PUE"
          errorMessage={errors.PUE?.message}
          {...register("PUE")}
        />

        <div className="my-10">
          <p>TDP = {processor?.tdp}</p>
          <p>WUE = {country ? country.wue * 3.785 : ""}</p>
          <p>Intensidade Carbônica = {country?.carbon_intensity}</p>
        </div>

        <button className="bg-light-green py-3 w-full rounded font-bold text-lg">
          Calcular
        </button>
      </form>

      <div className="flex flex-col gap-4 mt-20">
        <p>Gasto Energético (kWh) = {response?.energy_consumed.toFixed(3)}</p>
        <p>Emissão de Co2 (kgCO2e) = {response?.carbon_footprint.toFixed(3)}</p>
        <p>Água Consumida (L) = {response?.water_consumed.toFixed(3)}</p>
      </div>
    </div>
  );
};

export default CalculatorForm;
