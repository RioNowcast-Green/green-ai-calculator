interface ResultCardProps {
  img: string;
  result: string;
  label: string;
}

export const ResultCard = ({ img, result, label }: ResultCardProps) => {
  return (
    <div className="flex flex-col gap-3  rounded-lg py-3 px-10 shadow-lg flex flex-col items-center justify-between w-[250px] h-[200px] text-center">
      <p className="font-medium text-lg">{label}</p>

      <img src={img} className="w-20 h-20" />
      <p className="text-lg">{result}</p>
    </div>
  );
};
