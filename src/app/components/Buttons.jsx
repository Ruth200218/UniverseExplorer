const PrimaryBtn = ({ content, clases }) => {
	return <button className={`primary_btn ${clases}`}>{content}</button>;
};

const SecondaryBtn = ({ content, clases }) => {
	return <button className={`secondary_btn ${clases}`}>{content}</button>;
};

const InvisibleBtn = ({ content, clases }) => {
	return <button className={`invisible_btn ${clases}`}>{content}</button>;
};

export { PrimaryBtn, SecondaryBtn, InvisibleBtn };
