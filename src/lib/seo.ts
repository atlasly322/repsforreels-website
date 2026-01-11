// SEO Configuration for RepsForReels
export const siteConfig = {
	name: 'RepsForReels',
	tagline: 'No reps, no reels.',
	description: 'Turn your screen time addiction into gains. Complete exercises to unlock social media. AI-powered pose detection counts your reps. Build healthier habits while building muscle.',
	url: 'https://repsforreels.app',
	ogImage: '/og-image.png',
	twitterHandle: '@repsforreels',
	keywords: [
		'screen time control',
		'fitness app',
		'exercise tracker',
		'social media blocker',
		'app blocker',
		'digital wellbeing',
		'AI fitness',
		'pose detection',
		'workout app',
		'habit building',
		'doomscrolling',
		'screen time management',
		'exercise for screen time',
		'pushups',
		'squats',
		'fitness motivation'
	],
	author: 'RepsForReels',
	themeColor: '#00D4AA',
	locale: 'en_US'
};

export interface SEOProps {
	title?: string;
	description?: string;
	image?: string;
	url?: string;
	type?: 'website' | 'article';
	noindex?: boolean;
}

export function generateSEO(props: SEOProps = {}) {
	const title = props.title
		? `${props.title} | ${siteConfig.name}`
		: `${siteConfig.name} - ${siteConfig.tagline}`;

	return {
		title,
		description: props.description || siteConfig.description,
		image: props.image || `${siteConfig.url}${siteConfig.ogImage}`,
		url: props.url || siteConfig.url,
		type: props.type || 'website',
		noindex: props.noindex || false
	};
}

// JSON-LD structured data for better SEO
export function generateStructuredData() {
	return {
		'@context': 'https://schema.org',
		'@type': 'MobileApplication',
		name: siteConfig.name,
		description: siteConfig.description,
		applicationCategory: 'HealthApplication',
		operatingSystem: ['iOS', 'Android'],
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
			description: 'Free with premium subscription options'
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '1000',
			bestRating: '5',
			worstRating: '1'
		},
		featureList: [
			'AI-powered exercise detection',
			'Screen time management',
			'App blocking',
			'Pushups, squats, and more exercises',
			'Real-time rep counting',
			'Progress tracking'
		]
	};
}

// FAQ structured data for SEO
export function generateFAQStructuredData(faqs: { question: string; answer: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map(faq => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	};
}
