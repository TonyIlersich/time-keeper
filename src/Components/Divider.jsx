import styled from 'styled-components';
import Colors from '../Styles/Colors';
import { Column, Row } from './FlexBox';

export const DividerRow = styled(Row)`
	background-color: ${props => props.color || Colors.Text};
	min-height: ${props => Number.isFinite(props.height) ? props.height : 8}px;
	margin-top: ${props => Number.isFinite(props.above) ? props.above : 8}px;
	margin-bottom: ${props => Number.isFinite(props.below) ? props.below : 8}px;
`;

export const DividerColumn = styled(Column)`
	flex-grow: 0;
	background-color: ${props => props.color || Colors.Text};
	min-width: ${props => Number.isFinite(props.width) ? props.width : 8}px;
	margin-left: ${props => Number.isFinite(props.left) ? props.left : 8}px;
	margin-right: ${props => Number.isFinite(props.right) ? props.right : 8}px;
`;