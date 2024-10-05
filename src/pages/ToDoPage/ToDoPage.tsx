import React, { useState, useMemo, useCallback } from "react";
import { TextInput, Button, Title, List, Select } from "@mantine/core"; // Import Select from Mantine
import { useForm } from "@mantine/form";
import ToDo from "../../components/ToDo/ToDo";
import classes from "./ToDoPage.module.css";
import { MAX_TODO_LENGTH } from "../../constants/constants";

interface Todo {
	id: number;
	text: string;
	createdAt: Date;
}

const ToDoPage: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [sortOption, setSortOption] = useState<string>("latest");

	const form = useForm({
		initialValues: {
			todo: "",
		},
	});

	const addTodo = (text: string) => {
		if (text.trim() === "") {
			setError("To do cannot be empty");
			return;
		}
		if (text.length > 150) {
			setError("To do cannot exceed 150 characters");
			return;
		}
		setError(null);
		setTodos([...todos, { id: Date.now(), text, createdAt: new Date() }]);
		form.reset();
	};

	const removeTodo = useCallback((id: number) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	}, []);

	const sortTodos = (todos: Todo[]) => {
		switch (sortOption) {
			case "alphabetical":
				return [...todos].sort((a, b) => a.text.localeCompare(b.text));
			case "reverse-alphabetical":
				return [...todos].sort((a, b) => b.text.localeCompare(a.text));
			case "earliest":
				return [...todos].sort(
					(a, b) => a.createdAt.getTime() - b.createdAt.getTime()
				);
			case "latest":
			default:
				return [...todos].sort(
					(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
				);
		}
	};

	const displayedTodos = sortTodos(todos);

	const todoList = useMemo(() => (
		<List className={classes.list}>
			{displayedTodos.map((todo) => (
				<ToDo
					key={todo.id}
					id={todo.id}
					text={todo.text}
					onRemove={removeTodo}
				/>
			))}
		</List>
	), [displayedTodos, removeTodo]);

	return (
		<section className={classes.container}>
			<Title className="pb-4 text-black">To Do List</Title>

			<form
				onSubmit={form.onSubmit((values) => addTodo(values.todo))}
				className="w-full flex justify-center items-start gap-x-6">
				<TextInput
					placeholder={`Add a new todo (max ${MAX_TODO_LENGTH} characters)...`}
					{...form.getInputProps("todo")}
					className={classes.input}
					classNames={{
						wrapper: classes.inputWrapper,
					}}
					error={error}
					onChange={(event) => {
						setError(null);
						form.setFieldValue("todo", event.currentTarget.value);
					}}
					maxLength={MAX_TODO_LENGTH}
				/>
				<section className="flex items-center gap-x-6">
					<Button type="submit">Submit</Button>
					<Select
						value={sortOption}
						onChange={(value) => setSortOption(value || "latest")}
						data={[
							{ value: "alphabetical", label: "Alphabetically" },
							{
								value: "reverse-alphabetical",
								label: "Reverse-Alphabetically",
							},
							{ value: "latest", label: "Latest Added" },
							{ value: "earliest", label: "Earliest Added" },
						]}
						placeholder="Select sorting option"
						className={classes.dropdown}
					/>
				</section>
			</form>

			{todoList}
		</section>
	);
};

export default ToDoPage;
