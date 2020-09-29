import React from 'react';
import { Column } from './FlexBox';
import NewTodoForm from './NewTodoForm';
import TodoView from './TodoView';

export default ({ todos, onCreateTodo, onPromoteTodo }) => (
	<Column>
		{todos.map((t, i) => (
			<TodoView
				key={i}
				todo={t}
				onClickRight={() => onPromoteTodo(t)}
			/>
		))}
		<NewTodoForm onCreate={onCreateTodo} />
	</Column>
);
