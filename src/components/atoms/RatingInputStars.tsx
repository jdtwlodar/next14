import "@/app/assets/css/rating.css";

interface Option {
	value: string;
}

interface RadioGroupProps {
	options: Option[];
	name: string;
	selectedValue: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RatingInputStars = ({ options, name, selectedValue, onChange }: RadioGroupProps) => {
	return (
		<fieldset className="rating">
			{options.map((option) => (
				<label key={option.value}>
					<input
						type="radio"
						name={name}
						value={option.value}
						checked={option.value === selectedValue}
						onChange={onChange}
					/>
					{Array.from({ length: parseInt(option.value) }, (_, index) => (
						<span className="icon" key={index}>
							★
						</span>
					))}
				</label>
			))}
		</fieldset>
	);
};
