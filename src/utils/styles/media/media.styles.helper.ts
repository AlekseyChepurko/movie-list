import { css, SimpleInterpolation, FlattenSimpleInterpolation } from 'styled-components';

type MediaKey = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

type MediaQueries = {
	[key in MediaKey]: string;
};

const mediaQueries: MediaQueries = {
	// Here we define the breakpoints which will become the border for each media size (in the 'px')
	xxs: '(min-width: 375px)',
	// Based on Breakpoints' map of antd
	// @see https://ant.design/components/layout/#breakpoint-width
	xs: '(min-width: 480px)',
	s: '(min-width: 576px)',
	m: '(min-width: 768px)',
	l: '(min-width: 992px)',
	xl: '(min-width: 1200px)',
	xxl: '(min-width: 1600px)',
};

type Media = {
	[key in MediaKey]: (
		styles: TemplateStringsArray,
		...interpolations: SimpleInterpolation[]
	) => FlattenSimpleInterpolation;
};

// Helper to provide media queries for any breakpoint we have defined in `MediaQueries`
export const media: Media = Object.keys(mediaQueries).reduce((acc, segment) => {
	// Tagged template to create media queries
	const styledMediaFunction = (styles: TemplateStringsArray, ...interpolations: SimpleInterpolation[]) => css`
		@media ${mediaQueries[segment as MediaKey]} {
			${css(styles, ...interpolations)}
		}
	`;
	return {
		...acc,
		[segment]: styledMediaFunction,
	};
}, {} as Media);
