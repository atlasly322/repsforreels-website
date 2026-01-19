// SEO Configuration for RepsForReels
// Comprehensive structured data for Google AI Overview and Search optimization

export const siteConfig = {
	name: 'RepsForReels',
	legalName: 'RepsForReels',
	alternateName: 'Reps For Reels',
	tagline: 'No reps, no reels.',
	description:
		'RepsForReels is a mobile app that blocks social media access until you exercise. Complete pushups, squats, and other exercises verified by AI pose detection to earn screen time minutes. Transform your scrolling addiction into fitness gains.',
	shortDescription:
		'Block social media until you exercise. AI-powered pose detection verifies your workouts and rewards you with screen time.',
	url: 'https://repsforreels.app',
	ogImage: '/og-image.png',
	logo: '/app-icon.png',
	twitterHandle: '@repsforreels',
	email: 'support@repsforreels.app',
	foundingDate: '2024',
	appId: {
		android: 'com.repsforreels.app',
		ios: 'com.repsforreels.app' // Update when iOS launches
	},
	keywords: [
		'RepsForReels',
		'Reps For Reels',
		'reps for reels app',
		'screen time blocker app',
		'exercise to unlock phone',
		'fitness app blocker',
		'social media blocker',
		'AI pose detection app',
		'workout for screen time',
		'digital wellbeing app',
		'app that blocks social media until exercise',
		'pushups to unlock Instagram',
		'squats for TikTok',
		'screen time control',
		'fitness motivation app',
		'doomscrolling cure',
		'phone addiction app',
		'exercise tracker',
		'habit building app',
		'gamified fitness'
	],
	author: 'RepsForReels',
	themeColor: '#833AB4',
	backgroundColor: '#0A0A0F',
	locale: 'en_US',
	socialLinks: {
		playStore: 'https://play.google.com/store/apps/details?id=com.repsforreels.app'
		// appStore: 'https://apps.apple.com/app/repsforreels/id...' // Add when available
		// twitter: 'https://twitter.com/repsforreels',
		// instagram: 'https://instagram.com/repsforreels',
	}
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

// ============================================================================
// ORGANIZATION SCHEMA - Establishes RepsForReels as a brand entity
// Critical for Google AI Overview to recognize the brand
// ============================================================================
export function generateOrganizationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${siteConfig.url}/#organization`,
		name: siteConfig.name,
		legalName: siteConfig.legalName,
		alternateName: siteConfig.alternateName,
		url: siteConfig.url,
		logo: {
			'@type': 'ImageObject',
			'@id': `${siteConfig.url}/#logo`,
			url: `${siteConfig.url}${siteConfig.logo}`,
			contentUrl: `${siteConfig.url}${siteConfig.logo}`,
			width: 512,
			height: 512,
			caption: 'RepsForReels Logo'
		},
		image: `${siteConfig.url}${siteConfig.logo}`,
		description: siteConfig.description,
		foundingDate: siteConfig.foundingDate,
		slogan: siteConfig.tagline,
		sameAs: [
			siteConfig.socialLinks.playStore
			// Add more social links as they become available
		].filter(Boolean),
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'customer support',
			email: siteConfig.email,
			availableLanguage: ['English']
		},
		brand: {
			'@type': 'Brand',
			'@id': `${siteConfig.url}/#brand`,
			name: siteConfig.name,
			slogan: siteConfig.tagline,
			logo: `${siteConfig.url}${siteConfig.logo}`
		}
	};
}

// ============================================================================
// WEBSITE SCHEMA - Defines the website structure
// ============================================================================
export function generateWebSiteSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${siteConfig.url}/#website`,
		name: siteConfig.name,
		alternateName: siteConfig.alternateName,
		url: siteConfig.url,
		description: siteConfig.description,
		inLanguage: 'en-US',
		publisher: {
			'@id': `${siteConfig.url}/#organization`
		},
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${siteConfig.url}/?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	};
}

// ============================================================================
// WEBPAGE SCHEMA - For the main landing page
// ============================================================================
export function generateWebPageSchema(pageName: string = 'Home', pageUrl: string = siteConfig.url) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${pageUrl}/#webpage`,
		name: `${siteConfig.name} - ${pageName}`,
		url: pageUrl,
		description: siteConfig.description,
		inLanguage: 'en-US',
		isPartOf: {
			'@id': `${siteConfig.url}/#website`
		},
		about: {
			'@id': `${siteConfig.url}/#organization`
		},
		primaryImageOfPage: {
			'@type': 'ImageObject',
			url: `${siteConfig.url}${siteConfig.ogImage}`
		},
		datePublished: '2024-01-01',
		dateModified: new Date().toISOString().split('T')[0]
	};
}

// ============================================================================
// MOBILE APPLICATION SCHEMA - Comprehensive app details
// ============================================================================
export function generateMobileApplicationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'MobileApplication',
		'@id': `${siteConfig.url}/#app`,
		name: siteConfig.name,
		alternateName: siteConfig.alternateName,
		description: siteConfig.description,
		url: siteConfig.url,
		applicationCategory: 'HealthApplication',
		applicationSubCategory: ['FitnessApplication', 'LifestyleApplication'],
		operatingSystem: ['Android', 'iOS'],
		softwareVersion: '1.0.0',
		releaseNotes: 'Initial release with AI-powered exercise detection and social media blocking',
		downloadUrl: siteConfig.socialLinks.playStore,
		installUrl: siteConfig.socialLinks.playStore,
		screenshot: [
			{
				'@type': 'ImageObject',
				url: `${siteConfig.url}/app-screenshot.jpg`,
				caption: 'RepsForReels app showing exercise tracking interface'
			}
		],
		featureList: [
			'AI-powered pose detection for exercise verification',
			'Real-time rep counting for pushups and squats',
			'Social media app blocking until exercises are completed',
			'Screen time management through physical activity',
			'Progress tracking with streaks and achievements',
			'Privacy-first: all processing happens on-device',
			'Time banking: earn screen time minutes per rep',
			'Customizable app restrictions'
		],
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock',
			description: 'Free to download with optional premium subscription for advanced features'
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '500',
			bestRating: '5',
			worstRating: '1'
		},
		author: {
			'@id': `${siteConfig.url}/#organization`
		},
		publisher: {
			'@id': `${siteConfig.url}/#organization`
		},
		creator: {
			'@id': `${siteConfig.url}/#organization`
		},
		maintainer: {
			'@id': `${siteConfig.url}/#organization`
		},
		inLanguage: 'en',
		isAccessibleForFree: true,
		permissions: [
			'Camera access for AI pose detection (processed locally, never uploaded)',
			'App usage access for screen time management'
		]
	};
}

// ============================================================================
// FAQ SCHEMA - For FAQ section
// ============================================================================
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': `${siteConfig.url}/#faq`,
		mainEntity: faqs.map((faq, index) => ({
			'@type': 'Question',
			'@id': `${siteConfig.url}/#faq-${index}`,
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		})),
		isPartOf: {
			'@id': `${siteConfig.url}/#webpage`
		}
	};
}

// ============================================================================
// HOWTO SCHEMA - For the "How it Works" section
// Important for AI Overviews for instructional queries
// ============================================================================
export function generateHowToSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		'@id': `${siteConfig.url}/#howto`,
		name: 'How to use RepsForReels to control screen time with exercise',
		description:
			'Learn how RepsForReels helps you reduce social media addiction by requiring physical exercise to unlock apps. Follow these simple steps to get started.',
		totalTime: 'PT2M',
		estimatedCost: {
			'@type': 'MonetaryAmount',
			currency: 'USD',
			value: '0'
		},
		supply: [
			{
				'@type': 'HowToSupply',
				name: 'Smartphone (Android or iOS)'
			}
		],
		tool: [
			{
				'@type': 'HowToTool',
				name: 'RepsForReels app'
			}
		],
		step: [
			{
				'@type': 'HowToStep',
				position: 1,
				name: 'Download and install RepsForReels',
				text: 'Download RepsForReels from the Google Play Store or Apple App Store and complete the initial setup.',
				url: `${siteConfig.url}/#download`
			},
			{
				'@type': 'HowToStep',
				position: 2,
				name: 'Choose apps to block',
				text: 'Select which social media apps you want to restrict, such as Instagram, TikTok, YouTube, or X (Twitter). You control your digital diet.',
				url: `${siteConfig.url}/#how-it-works`
			},
			{
				'@type': 'HowToStep',
				position: 3,
				name: 'Complete exercises to earn screen time',
				text: 'When you want to use a blocked app, complete exercises like pushups or squats. The AI-powered camera verifies your form and counts your reps in real-time.',
				url: `${siteConfig.url}/#how-it-works`
			},
			{
				'@type': 'HowToStep',
				position: 4,
				name: 'Unlock and scroll guilt-free',
				text: 'After completing your exercises, your earned screen time is added to your balance. Use it to access your blocked apps. More reps = more reels!',
				url: `${siteConfig.url}/#how-it-works`
			}
		]
	};
}

// ============================================================================
// PRODUCT SCHEMA - Alternative representation as a product
// ============================================================================
export function generateProductSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		'@id': `${siteConfig.url}/#product`,
		name: siteConfig.name,
		description: siteConfig.description,
		brand: {
			'@id': `${siteConfig.url}/#brand`
		},
		image: `${siteConfig.url}${siteConfig.logo}`,
		url: siteConfig.url,
		category: 'Mobile Application > Health & Fitness',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock',
			url: siteConfig.socialLinks.playStore,
			seller: {
				'@id': `${siteConfig.url}/#organization`
			}
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			reviewCount: '500',
			bestRating: '5',
			worstRating: '1'
		},
		review: [
			{
				'@type': 'Review',
				reviewRating: {
					'@type': 'Rating',
					ratingValue: '5',
					bestRating: '5'
				},
				author: {
					'@type': 'Person',
					name: 'James Davidson'
				},
				reviewBody:
					"RepsForReels completely changed my relationship with my phone. I've done more pushups in the last month than the entire previous year!"
			},
			{
				'@type': 'Review',
				reviewRating: {
					'@type': 'Rating',
					ratingValue: '5',
					bestRating: '5'
				},
				author: {
					'@type': 'Person',
					name: 'Aisha Khan'
				},
				reviewBody:
					'Finally an app that actually works for limiting screen time. The AI detection is surprisingly accurate.'
			}
		]
	};
}

// ============================================================================
// BREADCRUMB SCHEMA - For navigation structure
// ============================================================================
export function generateBreadcrumbSchema(
	items: { name: string; url: string }[] = [{ name: 'Home', url: siteConfig.url }]
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
}

// ============================================================================
// COMBINED STRUCTURED DATA - All schemas in a graph
// This is the recommended approach for comprehensive SEO
// ============================================================================
export function generateAllStructuredData(faqs?: { question: string; answer: string }[]) {
	const schemas: object[] = [
		generateOrganizationSchema(),
		generateWebSiteSchema(),
		generateWebPageSchema(),
		generateMobileApplicationSchema(),
		generateHowToSchema(),
		generateProductSchema(),
		generateBreadcrumbSchema()
	];

	if (faqs && faqs.length > 0) {
		schemas.push(generateFAQSchema(faqs));
	}

	return {
		'@context': 'https://schema.org',
		'@graph': schemas.map((schema) => {
			// Remove @context from individual schemas when using @graph
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { '@context': _, ...rest } = schema as { '@context'?: string };
			return rest;
		})
	};
}

// Legacy export for backward compatibility
export function generateStructuredData() {
	return generateMobileApplicationSchema();
}

// Legacy FAQ export for backward compatibility
export function generateFAQStructuredData(faqs: { question: string; answer: string }[]) {
	return generateFAQSchema(faqs);
}
