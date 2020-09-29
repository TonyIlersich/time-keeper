import { DailyPieChart } from './Components/DailyPieChart';
import { NewTaskForm } from './Components/NewTaskForm';
import { Row, Column } from './Components/FlexBox';
import { TaskView } from './Components/TaskView.jsx';
import { withCookies } from 'react-cookie';
import dayjs from 'dayjs';
import React from 'react';
import timezone from 'dayjs/plugin/timezone';
import TopBar from './Components/TopBar';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');

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
		return (
			<Column>
				<TopBar onClickTrash={this.onClearTasks} />
				<Row>
					<Column>
						{this.state.tasks.map((t, i) => (
							<TaskView
								key={i}
								task={t}
								onPlay={this.onSwitchTask}
								onPause={this.onPauseTask}
							/>
						))}
						<NewTaskForm onCreate={this.onCreateTask}/>
					</Column>
					<Column>
						<DailyPieChart tasks={this.state.tasks}/>
					</Column>
				</Row>
			</Column>
		);
	}

	onTick = () => {
		const now = dayjs();
		const lastUpdateTime = this.props.cookies.get('lastUpdateTime') || now;
		if (dayjs().startOf('day').isAfter(lastUpdateTime)) {
			this.onNewDay();
		} else {
			this.props.cookies.set('lastUpdateTime', now.clone());
			const deltaMs = now.diff(lastUpdateTime);
			this.saveTasks(this.state.tasks.map(t => ({
				...t,
				...(t.active ? { duration: t.duration + deltaMs } : {}),
			})));
		}
	};

	onNewDay = () => {
		// TODO: pause tasks, push to cookies, duplicate active task
		// this.dayHistory.push(this.state.tasks);
		// this.setState({
		// 	tasks: [],
		// });
	};

	onCreateTask = task => {
		if (this.state.tasks.some(t => t.name.toLowerCase() === task.name.toLowerCase())) {
			throw new Error(`Task name "${task.name}" is already in use.`);
		};
		const tasks = this.state.tasks.map(t => ({
			...t,
			active: false,
		}));
		tasks.push({ ...task, active: true });
		this.saveTasks(tasks);
	};

	onPauseTask = () => {
		this.saveTasks(this.state.tasks.map(t => ({
			...t,
			active: false,
		})));
	};

	onSwitchTask = target => {
		this.saveTasks(this.state.tasks.map(t => ({
			...t,
			active: t === target,
		})));
	};

	onClearTasks = () => {
		this.props.cookies.remove('lastUpdateTime');
		this.saveTasks([]);
	}

	saveTasks(tasks) {
		this.props.cookies.set('tasks', tasks);
		this.setState({ tasks });
	}
}

export default withCookies(App);
