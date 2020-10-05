import { DailyPieChart } from './Components/DailyPieChart';
import { Row, Column } from './Components/FlexBox';
import TaskListView from './Components/TaskListView';
import { withCookies } from 'react-cookie';
import dayjs from 'dayjs';
import React from 'react';
import timezone from 'dayjs/plugin/timezone';
import TopBar from './Components/TopBar';
import utc from 'dayjs/plugin/utc';
import { TaskStatus } from './Utils/Task';
import styled from 'styled-components';
import NewPlannedTaskForm from './Components/NewPlannedTaskForm';
import { NewInProgressTaskForm } from './Components/NewInProgressTaskForm';
import { DividerRow } from './Components/Divider';

dayjs.extend(utc)
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');

const Body = styled(Column)`
	padding: 6px;
`;

class App extends React.Component {
	handlerId = null;

	/** @param {Record<string, any>} props - this is necessary to avoid deprecation warning on `super(props)`*/
	constructor(props) {
		super(props);
		this.state = {
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
		const now = dayjs();
		const tasksPlanned = this.state.tasks.filter(t => t.status === TaskStatus.Planned)
		return (
			<Column>
				<TopBar
					now={now}
					totalPlanned={tasksPlanned.reduce((sum, task) => sum + task.estDuration, 0)}
					totalInProgress={this.getEstTimeRemainingInProgress()}
					totalCompleted={this.getTimeSaved()}
				/>
				<Body>
					<Row>
						<Column>
							<TaskListView
								tasks={this.state.tasks.filter(t => t.status === TaskStatus.Planned)}
								onPromote={this.onPromoteTask}
								onDelete={this.onDeleteTask}
							/>
							<NewPlannedTaskForm onCreate={this.onCreateTaskPlanned} />
						</Column>
						<Column>
							<TaskListView
								tasks={this.state.tasks.filter(t => t.status === TaskStatus.InProgress)}
								onPlay={this.onSwitchTask}
								onPause={this.onPauseTask}
								onDelete={this.onDeleteTask}
								onPromote={this.onPromoteTask}
							/>
							<NewInProgressTaskForm onCreate={this.onCreateTaskInProgress} />
						</Column>
						<Column>
							<TaskListView
								tasks={this.state.tasks.filter(t => t.status === TaskStatus.Completed)}
								onDelete={this.onDeleteTask}
							/>
						</Column>
					</Row>
					<DividerRow />
					<DailyPieChart tasks={this.state.tasks} />
				</Body>
			</Column >
		);
	}

	getEstTimeRemainingInProgress() {
		return this.state.tasks
			.filter(t => t.status === TaskStatus.InProgress)
			.reduce((sum, t) => sum + (t.estDuration - t.duration || 0), 0);
	}

	getTimeSaved() {
		return this.state.tasks
			.filter(t => t.status === TaskStatus.Completed)
			.reduce((sum, t) => sum + (t.estDuration - t.duration || 0), 0);
	}

	onTick = () => {
		const now = dayjs();
		const lastUpdateTime = this.props.cookies.get('lastUpdateTime') || now;
		this.props.cookies.set('lastUpdateTime', now.clone());
		if (dayjs().startOf('day').isAfter(lastUpdateTime)) {
			this.onNewDay();
		}
		this.save({
			tasks: this.state.tasks.map(t => ({
				...t,
				duration: t.active ? t.duration + now.diff(lastUpdateTime) : t.duration,
			})),
		});
	};

	onNewDay = () => {
		// TODO: pause tasks, push to cookies, duplicate active task
	};

	onDeleteTask = task => {
		this.save({ tasks: this.state.tasks.filter(t => t.name !== task.name) });
	}

	onCreateTaskPlanned = task => {
		if (this.state.tasks.some(t => t.name.toLowerCase() === task.name.toLowerCase())) {
			throw new Error(`You already have a task named "${task.name}".`);
		};
		this.save({ tasks: [...this.state.tasks, task] });
	};

	onCreateTaskInProgress = task => {
		if (this.state.tasks.some(t => t.name.toLowerCase() === task.name.toLowerCase())) {
			throw new Error(`You already have a task named "${task.name}".`);
		};
		this.save({
			tasks: [
				...this.state.tasks.map(t => ({ ...t, active: false })),
				{ ...task, active: true },
			],
		});
	};

	onPauseTask = task => {
		this.save({
			tasks: this.state.tasks.map(t => ({
				...t,
				active: t === task ? false : t.active,
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

	onPromoteTask = task => {
		let tasks;
		switch (task.status) {
			case TaskStatus.Planned:
				tasks = this.state.tasks.map(t => t.name === task.name
					? { ...t, active: true, status: TaskStatus.InProgress }
					: { ...t, active: false }
				);
				break;
			case TaskStatus.InProgress:
				tasks = this.state.tasks.map(t => t.name === task.name
					? { ...t, active: false, status: TaskStatus.Completed }
					: t
				);
				break;
			case TaskStatus.Completed:
				throw new Error('cannot promote completed task');
			default:
				throw new Error(`invalid task status: ${task.status}`);
		}
		this.save({ tasks });
	};

	save({ tasks }) {
		tasks || (tasks = this.state.tasks);
		this.props.cookies.set('tasks', tasks);
		this.setState({ tasks });
	}
}

export default withCookies(App);
