const PrimaryBtn = ({ children, clases, disabled }) => {
	return (
		<button className={`primary_btn ${clases}`} disabled={disabled}>
			{children}
		</button>
	);
};

const SecondaryBtn = ({ children, clases, disabled }) => {
	return (
		<button className={`secondary_btn ${clases}`} disabled={disabled}>
			{children}
		</button>
	);
};

const InvisibleBtn = ({ children, clases, disabled }) => {
	return (
		<button className={`invisible_btn ${clases}`} disabled={disabled}>
			{children}
		</button>
	);
};
export { PrimaryBtn, SecondaryBtn, InvisibleBtn };
