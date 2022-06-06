import { Image } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
	overflow: hidden;
	padding-top: 22px;
	padding-bottom: 36px;
	background: gray;
	transition: height 0.1s ease-in-out;
`;

export const BluredBackground = styled.img`
	position: absolute;
	top: -10px;
	left: -10%;
	width: 120%;
	height: 500px;
	object-fit: cover;
	filter: blur(70px);
	transform: translateZ(0);
`;

export const Img = styled(Image).attrs({
	wrapperStyle: {
		position: 'relative',
		display: 'block',
		overflow: 'hidden',
		maxWidth: 256,
		maxHeight: 380,
		margin: '0 auto',
	},
})`
	width: 256px;
	height: 380px;
	border-radius: 8px;
	object-fit: cover;
`;
