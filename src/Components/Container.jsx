import styled from 'styled-components';
import { Row } from './FlexBox';

export const Container = styled(Row)`
	min-height: 0px;
	border: 4px solid #333333;
	border-radius: 6px;
	margin: 4px;
	padding: 6px;
	flex-grow: 0;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.color || 'transparent'};
`;
