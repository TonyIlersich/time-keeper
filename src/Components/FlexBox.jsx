import styled from 'styled-components';

export const FlexBox = styled.div`
	display: flex;
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: 0px;
	box-sizing: border-box;
	min-width: 0px;
	justify-content: ${props => props.center
		? 'center'
		: (props.spread ? 'space-between' : 'flex-start')};
`;

export const Column = styled(FlexBox)`
	flex-direction: column;
`;

export const Row = styled(FlexBox)`
	flex-direction: row;
`;