'use client';

const PrimaryBtn = ({ children, func, clases, disabled }) => {
	return (
		<button className={`primary_btn ${clases}`} disabled={disabled} onClick={() => func && func()}>
			{children}
		</button>
	);
};

const SecondaryBtn = ({ children, func, clases, disabled }) => {
	return (
		<button className={`secondary_btn ${clases}`} disabled={disabled} onClick={() => func && func()}>
			{children}
		</button>
	);
};

const InvisibleBtn = ({ children, func, clases, disabled }) => {
	return (
		<button className={`invisible_btn ${clases}`} disabled={disabled} onClick={() => func && func()}>
			{children}
		</button>
	);
};

export { PrimaryBtn, SecondaryBtn, InvisibleBtn };
