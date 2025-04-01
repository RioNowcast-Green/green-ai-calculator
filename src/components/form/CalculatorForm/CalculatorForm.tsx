import { useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculatorSchema, CalculatorSchemaType } from "./calculatorSchema";

const CalculatorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorSchemaType>({
    resolver: zodResolver(calculatorSchema),
  });

  const handleCalculate = () => {
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit(handleCalculate)} className="w-96 m-4">
      <FormField
        label="Energy (kWh)"
        placeholder="Enter energy consumed"
        errorMessage={errors.energy?.message}
        {...register("energy")}
      />
      <FormField
        label="on-site WUE"
        placeholder="Enter on-site WUE"
        errorMessage={errors.onSiteWUE?.message}
        {...register("onSiteWUE")}
      />
      <FormField
        label="off-site WUE"
        placeholder="Enter off-site WUE"
        errorMessage={errors.offSiteWUE?.message}
        {...register("offSiteWUE")}
      />
      <FormField
        label="PUE"
        placeholder="Enter PUE"
        errorMessage={errors.PUE?.message}
        {...register("PUE")}
      />
      <button className="bg-light-green py-3 w-full rounded font-bold text-lg">
        Calcular
      </button>
    </form>
  );
};

export default CalculatorForm;
