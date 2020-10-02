import { DailyPieChart } from './Components/DailyPieChart';
import { Row, Column } from './Components/FlexBox';
import TaskListView from './Components/TaskListView';
import TodoListView from './Components/TodoListView';
import { withCookies } from 'react-cookie';
import dayjs from 'dayjs';
import React from 'react';
import timezone from 'dayjs/plugin/timezone';
import TopBar from './Components/TopBar';
import utc from 'dayjs/plugin/utc';
import { createTask } from './Utils/Task';
import styled from 'styled-components';

dayjs.extend(utc)
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');

const Body = styled(Row)`
	padding: 6px;
`;

class App extends React.Component {
	handlerId = null;

	/** @param {Record<string, any>} props - this is necessary to avoid deprecation warning on `super(props)`*/
	constructor(props) {
		super(props);
		this.state = {
			todos: props.cookies.get('todos') || [],
			tasks: props.cookies.get('tasks') || [],
		};
	}

	componentDidMount() {
		this.handlerId = setInterval(() => this.onTick(), 100);
	}

	componentWillUnmount() {
		this.handlerId && clearInterval(this.handlerId);
	}

	render() {
		return (
			<Column>
				<TopBar
					totalTodo={this.state.todos.reduce((sum, todo) => sum + todo.estDuration, 0)}
					totalDoing={this.state.tasks.reduce((sum, task) => sum + (task.estDuration ? task.estDuration - task.duration : 0), 0)}
					onClickTrash={this.onClear}
				/>
				<Body>
					<Column style={{ flexGrow: 3 / 2 }}>
						<Row>
							<TodoListView
								todos={this.state.todos}
								onCreateTodo={this.onCreateTodo}
								onPromoteTodo={this.onPromoteTodo}
								onDeleteTodo={this.onDeleteTodo}
							/>
							<TaskListView
								tasks={this.state.tasks}
								onSwitchTask={this.onSwitchTask}
								onPauseTask={this.onPauseTask}
								onCreateTask={this.onCreateTask}
								onDeleteTask={this.onDeleteTask}
							/>
							{/* TODO: create list for completions */}
						</Row>
					</Column>
					<Column>
						<DailyPieChart tasks={this.state.tasks} />
					</Column>
				</Body>
			</Column>
		);
	}

	onDeleteTodo = todo => {
		this.save({ todos: this.state.todos.filter(t => t.name !== todo.name) });
	}

	// TODO: prevent todo v. task name conflict
	onCreateTodo = todo => {
		if (this.state.todos.some(t => t.name.toLowerCase() === todo.name.toLowerCase())) {
			throw new Error(`Todo name "${todo.name}" is already in use.`);
		};
		const todos = [...this.state.todos];
		todos.push(todo);
		this.save({ todos });
	};

	onPromoteTodo = todo => {
		const todos = this.state.todos.filter(t => t.name !== todo.name);
		const tasks = this.state.tasks.map(t => ({ ...t, active: false }));
		tasks.push(createTask({ ...todo, active: true }));
		this.save({ todos, tasks });
	};

	onTick = () => {
		const now = dayjs();
		const lastUpdateTime = this.props.cookies.get('lastUpdateTime') || now;
		if (dayjs().startOf('day').isAfter(lastUpdateTime)) {
			console.log('here');
			this.onNewDay();
		}
		this.props.cookies.set('lastUpdateTime', now.clone());
		const deltaMs = now.diff(lastUpdateTime);
		this.save({
			tasks: this.state.tasks.map(t => ({
				...t,
				...(t.active ? { duration: t.duration + deltaMs } : {}),
			})),
		});
	};

	onNewDay = () => {
		// TODO: pause tasks, push to cookies, duplicate active task
		// this.dayHistory.push(this.state.tasks);
		// this.setState({
		// 	tasks: [],
		// });
	};

	onDeleteTask = task => {
		this.save({ tasks: this.state.tasks.filter(t => t.name !== task.name) });
	}

	onCreateTask = task => {
		if (this.state.tasks.some(t => t.name.toLowerCase() === task.name.toLowerCase())) {
			throw new Error(`Task name "${task.name}" is already in use.`);
		};
		const tasks = this.state.tasks.map(t => ({
			...t,
			active: false,
		}));
		tasks.push({ ...task, active: true });
		this.save({ tasks });
	};

	onPauseTask = () => {
		this.save({
			tasks: this.state.tasks.map(t => ({
				...t,
				active: false,
			})),
		});
	};

	onSwitchTask = target => {
		this.save({
			tasks: this.state.tasks.map(t => ({
				...t,
				active: t === target,
			})),
		});
	};

	onClear = () => {
		this.props.cookies.remove('lastUpdateTime');
		this.save({ todos: [], tasks: [] });
	};

	save({ todos, tasks }) {
		todos || (todos = this.state.todos);
		tasks || (tasks = this.state.tasks);
		this.props.cookies.set('todos', todos);
		this.props.cookies.set('tasks', tasks);
		this.setState({ todos, tasks });
	}
}

export default withCookies(App);
