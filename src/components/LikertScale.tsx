interface LikertScaleProps {
  name: string;
  question?: string;
  minLabel?: string;
  maxLabel?: string;
  numButtons?: number;
  buttonLabels?: string[];
  selected: number;
  onChange: (e) => void;
}

export const LikertScale: React.FC<LikertScaleProps> = ({
  name,
  question,
  minLabel,
  maxLabel,
  numButtons,
  buttonLabels,
  selected,
  onChange,
}) => {
  const renderDefaultRadioButtons = (numButtons) => {
    let radioButtons = [];
    for (let i = 1; i <= numButtons; i++) {
      radioButtons.push(
        <input
          className="h-5 w-5 "
          key={`${name}-${i}`}
          type="radio"
          name={name}
          value={i}
          checked={selected === i}
          onChange={onChange}
          required
        />
      );
    }
    return radioButtons;
  };

  const renderRadioButtonsWithLabel = (buttonLabels) => {
    let radioButtons = [];
    for (let i = 1; i <= buttonLabels.length; i++) {
      radioButtons.push(
        <label className="flex flex-col items-center" key={`${name}-${i}`}>
          <input
            className="h-5 w-5  z-10"
            type="radio"
            name={name}
            value={buttonLabels[i]}
            checked={selected === i}
            onChange={onChange}
            required
          />
          <span className="text-center">{buttonLabels[i - 1]}</span>
        </label>
      );
    }
    return radioButtons;
  };

  return (
    <div className="space-y-2">
      {question && <h3 className="text-lg font-semibold">{question}</h3>}
      <div className="flex w-full">
        {numButtons && (
          <>
            <span className="mr-3">{minLabel}</span>
            <div className="flex items-center space-x-1">
              {renderDefaultRadioButtons(numButtons)}
            </div>
            <span className="ml-3">{maxLabel}</span>
          </>
        )}
        {buttonLabels && !numButtons && (
          <div
            className={`relative grid grid-cols-${buttonLabels.length} w-full`}
          >
            <span className="absolute h-[2px] w-full bg-slate-400 top-2.5"></span>
            {renderRadioButtonsWithLabel(buttonLabels)}
          </div>
        )}
      </div>
    </div>
  );
};
