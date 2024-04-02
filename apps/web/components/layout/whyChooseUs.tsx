import React from "react";

interface whyChooseUsCardProps {
    title: string;
    description: string;
    svg: any;
    reverse?: boolean
}

const whyChooseUsCard:React.FC<whyChooseUsCardProps> = ({title, description, svg, reverse}) => {
  return (
    <div className={`flex  item-center flex-wrap ${reverse? "flex-row-reverse gradient-border-left": "gradient-border-right"}  justify-between  p-5 w-full`}>
      <div className="flex flex-col gap-2 items-start justify-between">
        <h2 className="font-semibold text-white text-2xl">{title}</h2>
        <p className="md:w-[40rem] text-[#BBBBBB]">
         {description}
        </p>
      </div>
      <div>
        {svg}
      </div>
    </div>
  );
};

export default whyChooseUsCard;
