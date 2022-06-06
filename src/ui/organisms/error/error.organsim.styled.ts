import { Button, Typography } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	height: 100%;
	align-self: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const Caption = styled(Typography.Title)``;
export const ErrorText = styled(Typography.Paragraph).attrs({
	type: 'warning',
})``;

export const RetryButton = styled(Button).attrs({
	type: 'primary',
})``;
