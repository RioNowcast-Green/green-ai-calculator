import { useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorSchema, CalculatorSchemaType } from "./calculatorSchema";
import Select from "react-select";

import processors from "../../../hardware/processors.json";
import graphic_cards from "../../../hardware/graphic_cards.json";
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

  const cpuBrandOptions = Object.keys(processors).map((brand) => ({
    value: brand,
    label: brand === "amd" ? "AMD" : "Intel",
  }));

  const gpuBrandOptions = Object.keys(graphic_cards).map((brand) => ({
    value: brand,
    label: brand === "amd" ? "AMD" : "NVIDIA",
  }));

  const [cpuBrand, setCPUBrand] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [gpuBrand, setGPUBrand] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [cpuGeneration, setCPUGeneration] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [gpuGeneration, setGPUGeneration] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [processor, setProcessor] = useState<{
    value: string;
    label: string;
    tdp: string;
  } | null>(null);

  const [graphicCard, setGraphicCard] = useState<{
    value: string;
    label: string;
    tdp: string;
  } | null>(null);

  useEffect(() => {
    setCPUGeneration(null);
    setProcessor(null);
  }, [cpuBrand]);

  useEffect(() => {
    setGPUGeneration(null);
    setGraphicCard(null);
  }, [cpuBrand]);

  useEffect(() => {
    setProcessor(null);
  }, [cpuGeneration]);

  useEffect(() => {
    setGraphicCard(null);
  }, [gpuGeneration]);

  const cpuGenerationOptions = () => {
    if (!cpuBrand) return [];

    const selectedCPUBrand = cpuBrand.value;

    const cpuGenerations =
      selectedCPUBrand === "amd" ? processors.amd : processors.intel;

    return cpuGenerations.map((gen) => ({
      value: gen.generation,
      label: gen.generation,
    }));
  };

  const processorsOptions = () => {
    if (!cpuBrand || !cpuGeneration) return [];
    const selectedCPUBrand = cpuBrand.value;
    const cpuGenerations =
      selectedCPUBrand === "amd" ? processors.amd : processors.intel;

    const processorsList = cpuGenerations.find(
      (gen) =>
        gen.generation.toLocaleLowerCase() ===
        cpuGeneration?.value.toLocaleLowerCase()
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

  const gpuGenerationOptions = () => {
    if (!gpuBrand) return [];

    const selectedGPUBrand = gpuBrand.value;

    const gpuGenerations =
      selectedGPUBrand === "amd" ? graphic_cards.amd : graphic_cards.nvidia;

    return gpuGenerations.map((gen) => ({
      value: gen.generation,
      label: gen.generation,
    }));
  };

  const graphicCardsOptions = () => {
    if (!gpuBrand || !gpuGeneration) return [];
    const selectedGPUBrand = gpuBrand.value;
    const gpuGenerations =
      selectedGPUBrand === "amd" ? graphic_cards.amd : graphic_cards.nvidia;

    const processorsList = gpuGenerations.find(
      (gen) =>
        gen.generation.toLocaleLowerCase() ===
        gpuGeneration?.value.toLocaleLowerCase()
    );

    if (!processorsList) return [];

    return (
      processorsList.models.map((proc) => ({
        value: proc.name,
        label: proc.name,
        tdp: proc.tdp,
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
    wue: string;
    carbon_intensity: string;
  } | null>(null);

  const [response, setResponse] = useState<{
    energy_consumed: number;
    carbon_footprint: number;
    water_consumed: number;
  } | null>(null);

  const handleCalculate = (body: CalculatorSchemaType) => {
    setResponse(calculateEnergyConsumed(body, processor, graphicCard, country));
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
            options={cpuBrandOptions}
            onChange={setCPUBrand}
            value={cpuBrand}
          />

          <Select
            className="w-full"
            options={cpuGenerationOptions()}
            placeholder="Select Generation"
            onChange={setCPUGeneration}
            value={cpuGeneration}
            isDisabled={!cpuBrand}
          />

          <Select
            className="w-full"
            options={processorsOptions()}
            placeholder="Select CPU"
            value={processor}
            onChange={setProcessor}
            isDisabled={!cpuBrand || !cpuGeneration}
          />
        </div>

        <div className="flex flex-col gap-3 items-start mt-5">
          <Label>GPU: </Label>
          <Select
            className="w-full"
            options={gpuBrandOptions}
            onChange={setGPUBrand}
            value={gpuBrand}
          />

          <Select
            className="w-full"
            options={gpuGenerationOptions()}
            placeholder="Select Generation"
            onChange={setGPUGeneration}
            value={gpuGeneration}
            isDisabled={!gpuBrand}
          />

          <Select
            className="w-full"
            options={graphicCardsOptions()}
            placeholder="Select CPU"
            value={graphicCard}
            onChange={setGraphicCard}
            isDisabled={!gpuBrand || !gpuGeneration}
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
          <p>WUE = {country ? Number(country.wue) * 3.785 : ""}</p>
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
