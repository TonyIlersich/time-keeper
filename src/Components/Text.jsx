import styled from 'styled-components';

export const Text = styled.span`
	align-items: center;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 16px;
	box-sizing: border-box;
	font-weight: ${props => props.bold ? 'bold' : 'normal'};
`;
