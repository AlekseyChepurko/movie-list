import { media } from '@utils/styles/media';
import { Layout as ALayout } from 'antd';
import styled, { css } from 'styled-components';

export const Layout = styled(ALayout)`
	min-height: 100vh;
	height: 100%;
	overflow: auto;
`;

const applicationPaddings = css`
	padding: 1rem;
	${media.xs`
        padding: 1.25rem;
    `}
	${media.s`
        padding: 1.5rem;
    `}
    ${media.m`
        padding: 2rem;
    `}
`;

export const Header = styled(ALayout.Header)`
	line-height: 2rem;
	min-height: 4rem;
	height: auto;
	${applicationPaddings};
	padding-top: 0;
	padding-bottom: 0;
`;

export const Main = styled(ALayout.Content)`
	height: 100%;
	${applicationPaddings};
	padding-bottom: 0;
`;
