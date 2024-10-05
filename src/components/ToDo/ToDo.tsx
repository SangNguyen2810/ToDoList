import React from "react";
import { List } from "@mantine/core";
import deleteButton from "../../images/trash.png";

interface ToDoProps {
	id: number;
	text: string;
	onRemove: (id: number) => void;
}

const ToDo: React.FC<ToDoProps> = ({ id, text, onRemove }) => {
	return (
		<List.Item
			className="relative flex justify-between bg-[#FDF1AB] text-black p-2 rounded mb-2 h-72 group hover:bg-[#ede8ca] transition-colors duration-300"
		>
			<p className="flex-grow break-words">
				{text}
			</p>
			<img
				src={deleteButton}
				alt="Delete"
				className="w-6 h-6 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				onClick={() => onRemove(id)}
			/>
		</List.Item>
	);
};

export default React.memo(ToDo);