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

const StyledButton = styled(Button)`
	margin-left: 4px;
`;

export default ({ todo, onPromote, onDelete }) => (
	<StyledContainer color={todo.color}>
		<Row>
			<TaskInfo task={todo} />
			<StyledButton onClick={onPromote}>
				<Feather.ArrowRight />
			</StyledButton>
			<StyledButton onClick={() => onDelete(todo)}>
				<Feather.X />
			</StyledButton>
		</Row>
	</StyledContainer>
);