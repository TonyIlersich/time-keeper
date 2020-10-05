import React from 'react';
import * as Feather from 'react-feather';
import { ErrorText } from './Text';
import { Button } from './Button';
import { RowCard } from './RowCard';
import { Column, Gap, Row } from './FlexBox';


export default ({ children, error, onCreate }) => (
	<RowCard>
		<Column>
			<Row>
				<ErrorText title={error}>{error}</ErrorText>
			</Row>
			<Row>
				{children}
			</Row>
		</Column>
		<Gap width={12} />
		<Button onClick={onCreate}>
			<Feather.Plus />
		</Button>
	</RowCard>
);
