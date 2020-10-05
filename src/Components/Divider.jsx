import styled from 'styled-components';
import Colors from '../Styles/Colors';
import { Row } from './FlexBox';

export const DividerRow = styled(Row)`
	background-color: ${props => props.color || Colors.Text};
	min-height: ${props => Number.isFinite(props.height) ? props.height : 8}px;
	margin-top: ${props => Number.isFinite(props.above) ? props.above : 8}px;
	margin-bottom: ${props => Number.isFinite(props.below) ? props.below : 8}px;
`;