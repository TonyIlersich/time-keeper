import React from 'react';
import * as Feather from 'react-feather';
import { Container } from './Container';
import { Row } from './FlexBox';
import { Button } from './Button';
import styled from 'styled-components';
import TaskInfo from './TaskInfo';

const StyledContainer = styled(Container)`
	flex-basis: 70px;
`;

export const TaskView = ({ task, onPause, onPlay }) => (
	<StyledContainer color={task.color}>
		<Row>
			<TaskInfo task={task} />
			<Button onClick={() => task.active ? onPause() : onPlay(task)}>
				{task.active ? <Feather.Pause /> : <Feather.Play />}
			</Button>
		</Row>
	</StyledContainer>
);