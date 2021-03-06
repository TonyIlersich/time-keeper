import styled from 'styled-components';
import Colors from '../Styles/Colors';

export const Text = styled.span`
	text-align: center;
	align-items: center;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: 16px;
	box-sizing: border-box;
	font-weight: ${props => props.bold ? 'bold' : 'normal'};
	font-family: 'Consolas';
	color: ${Colors.Text};
`;

export const Header = styled(Text)`
	font-size: 36px;
	font-weight: bolder;
	pointer-events: none;
`;

export const ErrorText = styled(Text)`
	font-weight: bolder;
	font-size: 14px;
	color: ${Colors.Error};
`;