import React from 'react';
import { Row, Column } from './Components/FlexBox';
import { TaskView } from './Components/TaskView.jsx';
import { NewTaskForm } from './Components/NewTaskForm';

class App extends React.Component {
	handlerId = null;

	state = {
		tasks: [{
			name: 'dsiapjfdiopajgidopasjfidopasjidpnaui9pbvdu9pageui9dagui9pdhau9gheuwa90hgeu9d0hagu9edawu9g0hea90hg8u9e0dagedagedawgedafeagewag',
			duration: 0,
			active: true,
		}],
	};

	componentDidMount() {
		const interval = 500;
		this.handlerId = setInterval(() => this.onTick(interval), interval);
	}

	componentWillUnmount() {
		this.handlerId && clearInterval(this.handlerId);
	}

	render() {
		return (
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
				</Column>
			</Row>
		);
	}

	onTick = deltaMs => {
		const tasks = this.state.tasks.map(t => ({
			...t,
			...(t.active ? { duration: t.duration + deltaMs } : {}
			),
		}));
		this.setState({ tasks });
	};

	onCreateTask = task => {
		if (this.state.tasks.some(t => t.name.toLowerCase() === task.name.toLowerCase())) {
			throw new Error(`Task name "${task.name}" is already in use.`);
		};
		const tasks = this.state.tasks.map(t => ({
			...t,
			active: false,
		}));
		tasks.push(task);
		this.setState({ tasks });
	};

	onPauseTask = () => {
		const tasks = this.state.tasks.map(t => ({
			...t,
			active: false,
		}));
		this.setState({ tasks });
	};

	onSwitchTask = target => {
		const tasks = this.state.tasks.map(t => ({
			...t,
			active: t === target,
		}));
		this.setState({ tasks });
	};
}

export default App;
