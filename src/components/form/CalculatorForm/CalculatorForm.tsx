import { useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorSchema, CalculatorSchemaType } from "./calculatorSchema";
import Select from "react-select";

import processors from "../../../hardware/processors.json";
import countries from "../../../country/countries.json";

import { useEffect, useState } from "react";
import { Label } from "../Label";
import { calculateEnergyConsumed } from "../../../utils/equation";

const CalculatorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorSchemaType>({
    resolver: zodResolver(calculatorSchema),
  });

  const brandOptions = Object.keys(processors).map((brand) => ({
    value: brand,
    label: brand === "amd" ? "AMD" : "Intel",
  }));

  const [brand, setBrand] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [generation, setGeneration] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [processor, setProcessor] = useState<{
    value: string;
    label: string;
    tdp: number;
  } | null>(null);

  useEffect(() => {
    setGeneration(null);
    setProcessor(null);
  }, [brand]);

  useEffect(() => {
    setProcessor(null);
  }, [generation]);

  const cpuGenerationOptions = () => {
    if (!brand) return [];

    const selectedBrand = brand.value;

    console.log("Selected Brand", selectedBrand);

    const generations =
      selectedBrand === "amd" ? processors.amd : processors.intel;

    return generations.map((gen) => ({
      value: gen.generation,
      label: gen.generation,
    }));
  };

  const processorsOptions = () => {
    if (!brand || !generation) return [];
    const selectedBrand = brand.value;
    const generations =
      selectedBrand === "amd" ? processors.amd : processors.intel;

    const processorsList = generations.find(
      (gen) =>
        gen.generation.toLocaleLowerCase() ===
        generation?.value.toLocaleLowerCase()
    );

    if (!processorsList) return [];

    return (
      processorsList.models.map((proc) => ({
        value: proc["Name"],
        label: proc["Name"],
        tdp: proc["TDP"],
      })) ?? []
    );
  };

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
    setResponse(calculateEnergyConsumed());
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

        <div className="flex flex-col gap-3 items-start">
          <Label>CPU: </Label>
          <Select
            className="w-full"
            options={brandOptions}
            onChange={setBrand}
            value={brand}
          />

          <Select
            className="w-full"
            options={cpuGenerationOptions()}
            placeholder="Select Generation"
            onChange={setGeneration}
            value={generation}
            isDisabled={!brand}
          />

          <Select
            className="w-full"
            options={processorsOptions()}
            placeholder="Select CPU"
            value={processor}
            onChange={setProcessor}
            isDisabled={!brand || !generation}
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
            value={country}
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

      {response && (
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-4 ">
            <p>
              Gasto Energético (kWh) = {response?.energy_consumed.toFixed(3)}
            </p>
            <p>
              Emissão de Co2 (kgCO2e) = {response?.carbon_footprint.toFixed(3)}
            </p>
            <p>Água Consumida (L) = {response?.water_consumed.toFixed(3)}</p>
          </div>

          <div className="flex flex-col gap-4 ">
            <p>
              {(() => {
                const totalHours = Number(response?.energy_consumed) / 0.08;
                const hours = Math.floor(totalHours);
                const minutes = Math.round((totalHours - hours) * 60);
                return `${hours} horas e ${minutes} minutos de uma lâmpada ligada`;
              })()}
            </p>
            <p>
              {(Number(response?.carbon_footprint) / 0.096).toFixed(2)} km
              rodados de um carro médio brasileiro
            </p>
            <p>
              {Math.floor(Number(response?.water_consumed) / 0.5)} garrafas de
              500ml
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorForm;
