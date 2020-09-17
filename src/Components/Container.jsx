import styled from 'styled-components';
import { Row } from './FlexBox';

export const Container = styled(Row)`
	border: 4px solid #333333;
	border-radius: 6px;
	margin: 4px;
	padding: 8px;
	display: flex;
	flex-grow: 0;
	align-items: center;
	justify-content: center;
`;
