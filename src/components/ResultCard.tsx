interface ResultCardProps {
  img: string;
  result: string;
  label: string;
}

export const ResultCard = ({ img, result, label }: ResultCardProps) => {
  return (
    <div className="flex flex-col gap-3  rounded-lg py-3 md:px-10 shadow-lg flex flex-col items-center justify-between w-[160px] h-[170px] md:w-[250px] md:h-[200px] text-center">
      <p className="font-medium text-md md:text-lg">{label}</p>

      <img src={img} className="w-16 h-16 md:w-20 md:h-20" />
      <p className="text-md md:text-lg">{result}</p>
    </div>
  );
};
