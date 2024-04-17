const PrimaryBtn = ({ children, clases }) => {
	return <button className={`primary_btn ${clases}`}>{children}</button>;
};

const SecondaryBtn = ({ children, clases }) => {
	return <button className={`secondary_btn ${clases}`}>{children}</button>;
};

const InvisibleBtn = ({ children, clases }) => {
	return <button className={`invisible_btn ${clases}`}>{children}</button>;
};

export { PrimaryBtn, SecondaryBtn, InvisibleBtn };
