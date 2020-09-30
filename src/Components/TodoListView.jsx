import React from 'react';
import { Column } from './FlexBox';
import NewTodoForm from './NewTodoForm';
import TodoView from './TodoView';

export default ({ todos, onCreateTodo, onPromoteTodo, onDeleteTodo }) => (
	<Column>
		{todos.map((t, i) => (
			<TodoView
				key={i}
				todo={t}
				onPromote={onPromoteTodo}
				onDelete={onDeleteTodo}
			/>
		))}
		<NewTodoForm onCreate={onCreateTodo} />
	</Column>
);
