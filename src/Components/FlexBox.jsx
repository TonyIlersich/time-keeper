import styled from 'styled-components';

export const FlexBox = styled.div`
	display: flex;
	flex-grow: ${props => props.flexRatio || 1};
	flex-shrink: ${props => props.flexRatio || 1};
	flex-basis: 0px;
	box-sizing: border-box;
	min-width: 0px;
	justify-content: ${props => props.justify || 'initial'};
	align-items: ${props => props.align || 'initial'};
`;

export const Column = styled(FlexBox)`
	flex-direction: column;
`;

export const Row = styled(FlexBox)`
	flex-direction: row;
`;

export const Gap = styled.div`
	width: ${props => props.width ? `${props.width}px` : 'initial'};
	height: ${props => props.height ? `${props.height}px` : 'initial'};
`;