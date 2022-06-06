import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const Loading = styled.div.attrs({ children: React.createElement(LoadingOutlined) })`
	width: 100%;
	height: 100%;
	align-self: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;
