interface ResultCardProps {
  img: string;
  result: string;
  label: string;
}

export const ResultCard = ({ img, result, label }: ResultCardProps) => {
  return (
    <div className="flex flex-col gap-5  rounded-lg py-6 px-10 shadow-lg flex flex-col items-center p-5 ">
      <p className="font-medium text-lg">{label}</p>

      <img src={img} className="w-20 h-20" />
      <p className="text-lg">{result}</p>
    </div>
  );
};
