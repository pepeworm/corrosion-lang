export default function Button(props) {
	const { fullWidth, onClick, bgColor, icon, content, margin } = props;

	return (
		<button
			className={`${fullWidth && "w-full"} ${bgColor} ${
				icon && "flex flex-row justify-between items-center"
			} ${margin} border border-border rounded py-1.5 px-3`}
            onClick={onClick}
		>
			{content}

            {icon}
		</button>
	);
}
