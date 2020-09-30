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

export default ({ todo, onClickRight }) => (
	<StyledContainer color={todo.color}>
		<Row>
			<TaskInfo task={todo} />
			<Button onClick={onClickRight}>
				<Feather.ArrowRight />
			</Button>
		</Row>
	</StyledContainer>
);