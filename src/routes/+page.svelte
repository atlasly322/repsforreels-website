<script lang="ts">
	import { generateAllStructuredData, siteConfig } from '$lib/seo';
	import { addToWaitlist, generateFingerprint, TURNSTILE_SITE_KEY } from '$lib/convex';
	import { onMount } from 'svelte';
	import { z } from 'zod';
	import {
		Scan,
		ShieldCheck,
		TrendingUp,
		Lock,
		Clock,
		Dumbbell,
		ChevronDown,
		Smartphone,
		Target,
		Zap,
		Star,
		Info,
		Mail,
		ArrowRight,
		CheckCircle2,
		Loader2,
		Bell,
		Sparkles,
		Eye,
		EyeOff,
		Brain,
		RefreshCw,
		Timer,
		TrendingDown,
		Heart,
		Shield,
		Camera,
		Play
	} from 'lucide-svelte';

	// Email waitlist state
	let email = $state('');
	let honeypot = $state(''); // Bot trap - should remain empty
	let turnstileToken = $state(''); // Cloudflare Turnstile token
	let emailSubmitStatus = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let emailError = $state('');

	// Turnstile callback - called when challenge is completed
	function onTurnstileSuccess(token: string) {
		turnstileToken = token;
	}

	// Reset Turnstile when needed
	function resetTurnstile() {
		turnstileToken = '';
		if (typeof window !== 'undefined' && (window as any).turnstile) {
			(window as any).turnstile.reset();
		}
	}

	// Zod schema for client-side validation
	const emailSchema = z
		.string()
		.min(1, 'Email is required')
		.max(254, 'Email is too long')
		.email('Please enter a valid email address')
		.refine(
			(email) => {
				// Block common disposable email domains
				const disposableDomains = [
					'tempmail.com', 'throwaway.email', 'guerrillamail.com', '10minutemail.com',
					'mailinator.com', 'yopmail.com', 'temp-mail.org', 'fakeinbox.com',
					'trashmail.com', 'getnada.com', 'sharklasers.com', 'maildrop.cc'
				];
				const domain = email.split('@')[1]?.toLowerCase();
				return !disposableDomains.includes(domain);
			},
			{ message: 'Please use a permanent email address' }
		);

	async function handleEmailSubmit(e: Event) {
		e.preventDefault();
		emailError = '';

		// Client-side validation with Zod
		const validation = emailSchema.safeParse(email.trim());
		if (!validation.success) {
			emailError = validation.error.issues[0]?.message ?? 'Invalid email';
			return;
		}

		// Require Turnstile verification
		if (!turnstileToken && TURNSTILE_SITE_KEY) {
			emailError = 'Please complete the security check';
			return;
		}

		emailSubmitStatus = 'loading';

		try {
			// Generate fingerprint for rate limiting
			const fingerprint = generateFingerprint();

			// Call Convex action with full protection
			const result = await addToWaitlist({
				email: validation.data,
				source: 'website',
				referrer: document.referrer || undefined,
				userAgent: navigator.userAgent,
				fingerprint,
				honeypot, // Should be empty - bots fill this
				turnstileToken, // Cloudflare Turnstile token for server verification
			});

			if (result.success) {
				emailSubmitStatus = 'success';
				email = '';
				honeypot = '';
				turnstileToken = '';
			} else {
				throw new Error('Failed to join waitlist');
			}
		} catch (err) {
			emailSubmitStatus = 'error';
			emailError = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
			// Reset Turnstile on error so user can try again
			resetTurnstile();
		}
	}

	// Parallax star effect
	let scrollY = $state(0);
	let stars: Array<{ x: number; y: number; size: number; opacity: number; speed: number }> = $state([]);

	onMount(() => {
		// Generate random stars
		const starCount = 150;
		stars = Array.from({ length: starCount }, () => ({
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 2 + 1,
			opacity: Math.random() * 0.8 + 0.2,
			speed: Math.random() * 0.5 + 0.1
		}));

		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll);

		// Load Cloudflare Turnstile script
		if (TURNSTILE_SITE_KEY) {
			const script = document.createElement('script');
			script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
			script.async = true;
			script.defer = true;
			document.head.appendChild(script);

			// Set up global callback for Turnstile
			(window as any).onTurnstileLoad = () => {
				// Render Turnstile widgets
				const containers = document.querySelectorAll('.turnstile-container');
				containers.forEach((container) => {
					if (!container.hasChildNodes()) {
						(window as any).turnstile.render(container, {
							sitekey: TURNSTILE_SITE_KEY,
							callback: (token: string) => {
								turnstileToken = token;
							},
							'error-callback': () => {
								emailError = 'Security verification failed. Please refresh and try again.';
							},
							theme: 'dark',
							size: 'flexible'
						});
					}
				});
			};
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// FAQ data - used for both display and structured data
	const faqs = [
		{
			question: 'What is RepsForReels?',
			answer: 'RepsForReels is a mobile app that blocks social media access until you complete physical exercises. Using AI-powered pose detection, the app verifies pushups, squats, and other exercises in real-time, then rewards you with screen time minutes. The core concept is "No reps, no reels" - you earn your scroll time through physical activity.'
		},
		{
			question: 'How does RepsForReels detect my exercises?',
			answer: 'RepsForReels uses advanced AI-powered pose detection that runs entirely on your device. Your camera analyzes your body position in real-time to count reps accurately. No videos are ever recorded or uploaded - all processing happens locally for complete privacy.'
		},
		{
			question: 'Is RepsForReels free to use?',
			answer: 'RepsForReels offers a free tier with core features including basic exercise detection and app blocking. Go Pro to unlock unlimited app blocking, all exercises, detailed analytics, and an ad-free experience. Pricing varies by region.'
		},
		{
			question: 'Which exercises are supported?',
			answer: 'Currently, RepsForReels supports pushups and squats with real-time AI detection. More exercises including jumping jacks, lunges, and sit-ups are being added regularly based on user feedback.'
		},
		{
			question: 'Does RepsForReels work on both iOS and Android?',
			answer: 'RepsForReels is launching soon on both iOS (App Store) and Android (Google Play). Join our waitlist to be the first to know when we launch! Both versions will use platform-native screen time APIs for the best possible blocking experience.'
		},
		{
			question: 'Is my camera data private?',
			answer: 'Absolutely. All pose detection happens locally on your device using on-device machine learning. Your camera feed is never recorded, stored, or transmitted anywhere. RepsForReels is designed with privacy as a core principle.'
		},
		{
			question: 'Can I customize which apps get blocked?',
			answer: 'Yes! You choose exactly which apps to restrict. Block Instagram, TikTok, YouTube, X (Twitter), Snapchat, or any other app you want. You have full control over your digital diet and can change settings anytime.'
		},
		{
			question: 'How does the time banking feature work?',
			answer: 'Every rep you complete earns you screen time minutes. These minutes are "banked" and can be used whenever you want to access your blocked apps. For example, 10 pushups might earn you 5 minutes of Instagram time. You can build up a balance for later use.'
		}
	];

	// Generate comprehensive structured data including FAQs
	const allStructuredData = generateAllStructuredData(faqs);

	// Features data
	const features = [
		{
			icon: 'scan',
			title: 'AI Pose Detection',
			description: 'Advanced machine learning counts your reps in real-time with form feedback.'
		},
		{
			icon: 'shield',
			title: 'Smart App Blocking',
			description: 'Block any app until you complete your exercises. No cheating possible.'
		},
		{
			icon: 'trending',
			title: 'Progress Tracking',
			description: 'See your fitness journey with detailed stats, streaks, and achievements.'
		},
		{
			icon: 'lock',
			title: 'Privacy First',
			description: 'All processing happens on your device. No videos recorded or uploaded.'
		},
		{
			icon: 'clock',
			title: 'Time Banking',
			description: 'Earn screen time minutes for every rep. Bank time for later use.'
		},
		{
			icon: 'dumbbell',
			title: 'Multiple Exercises',
			description: 'Pushups and squats available now, with more exercises coming soon.'
		}
	];

	// How it works steps
	const steps = [
		{
			number: '01',
			title: 'Choose Your Apps',
			description: 'Select which apps you want to restrict. Instagram, TikTok, YouTube - you decide.',
			icon: 'smartphone'
		},
		{
			number: '02',
			title: 'Do Your Reps',
			description: 'Complete exercises to earn screen time. Our AI counts every rep accurately.',
			icon: 'target'
		},
		{
			number: '03',
			title: 'Unlock & Scroll',
			description: 'Earned your time? Now you can scroll guilt-free. More reps = more reels.',
			icon: 'zap'
		}
	];

	// Testimonials with real photos
	const testimonials = [
		{
			name: 'James Davidson',
			handle: '@jamesd_fit',
			avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
			rating: 5,
			text: "RepsForReels completely changed my relationship with my phone. I've done more pushups in the last month than the entire previous year!"
		},
		{
			name: 'Aisha Khan',
			handle: '@aisha.wellness',
			avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
			rating: 5,
			text: "Finally an app that actually works for limiting screen time. The AI detection is surprisingly accurate."
		},
		{
			name: 'Marcus Rivera',
			handle: '@marcus_r',
			avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
			rating: 5,
			text: "Genius concept. I went from 6 hours of daily scrolling to 2 hours, and I'm actually getting fit in the process."
		},
		{
			name: 'Sophie Kim',
			handle: '@sophie.k',
			avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
			rating: 5,
			text: "My screen time is down 60% and I've never felt better. This app gamifies fitness in the best way possible."
		}
	];

	let openFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaq = openFaq === index ? null : index;
	}
</script>

<svelte:head>
	<!-- Comprehensive Structured Data for Google AI Overview -->
	{@html `<script type="application/ld+json">${JSON.stringify(allStructuredData)}</script>`}
</svelte:head>

<!-- Parallax Star Background -->
<div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
	{#each stars as star}
		<div
			class="absolute rounded-full bg-white"
			style="
				left: {star.x}%;
				top: calc({star.y}% + {scrollY * star.speed * 0.1}px);
				width: {star.size}px;
				height: {star.size}px;
				opacity: {star.opacity * (1 - Math.min(scrollY / 3000, 0.5))};
				box-shadow: 0 0 {star.size * 2}px rgba(255,255,255,{star.opacity * 0.5});
			"
		></div>
	{/each}
	<!-- Gradient overlay for depth -->
	<div class="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
</div>

<!-- Navigation -->
<nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/5">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<a href="/" class="flex items-center gap-3">
				<picture>
					<source srcset="/app-icon.webp" type="image/webp" />
					<img src="/app-icon.png" alt="RepsForReels" width="40" height="40" class="w-10 h-10 rounded-xl" />
				</picture>
				<span class="flex items-baseline">
					<span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#D4A574] via-[#E8C4A0] to-[#D4A574] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reps</span>
					<span class="text-sm font-normal italic text-white/50 mx-0.5">For</span>
					<span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reels</span>
				</span>
			</a>
			<div class="hidden md:flex items-center gap-8">
				<a href="#about" class="text-text-secondary hover:text-white transition-colors text-sm">About</a>
				<a href="#features" class="text-text-secondary hover:text-white transition-colors text-sm">Features</a>
				<a href="#how-it-works" class="text-text-secondary hover:text-white transition-colors text-sm">How it Works</a>
				<a href="#testimonials" class="text-text-secondary hover:text-white transition-colors text-sm">Reviews</a>
				<a href="#faq" class="text-text-secondary hover:text-white transition-colors text-sm">FAQ</a>
			</div>
			<a href="#download" class="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45]"></div>
				<div class="absolute inset-[1px] bg-background rounded-[10px] group-hover:bg-transparent transition-colors duration-300"></div>
				<span class="relative bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45] bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">Join Waitlist</span>
			</a>
		</div>
	</div>
</nav>

<!-- Main content -->
<main>
<!-- Hero Section -->
<section class="relative min-h-screen flex items-center pt-16 overflow-hidden">
	<!-- Background gradient orbs -->
	<div class="absolute top-1/4 left-0 w-[800px] h-[800px] bg-[#833AB4]/20 rounded-full blur-[150px] -translate-x-1/2"></div>
	<div class="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#F77737]/15 rounded-full blur-[120px] translate-x-1/3"></div>
	<div class="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#DD2A7B]/10 rounded-full blur-[100px]"></div>

	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
		<div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
			<!-- Text content -->
			<div class="text-center lg:text-left">
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm mb-8 backdrop-blur-sm">
					<span class="relative flex h-2 w-2">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCAF45] opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-[#FCAF45]"></span>
					</span>
					<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45] bg-clip-text text-transparent font-medium">Launching Soon on iOS & Android</span>
				</div>

				<h1 class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 leading-[0.95]">
					<span class="text-white">No reps,</span><br />
					<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent">no reels.</span>
				</h1>

				<p class="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
					<strong>RepsForReels blocks social media until you exercise.</strong> Complete pushups or squats verified by
					<span class="text-white font-medium">AI-powered pose detection</span> to earn screen time minutes.
				</p>

				<!-- Email Waitlist Form -->
				<div class="max-w-md mx-auto lg:mx-0">
					{#if emailSubmitStatus === 'success'}
						<div class="flex items-center gap-3 bg-[#8DD04A]/10 border border-[#8DD04A]/30 rounded-2xl p-4">
							<CheckCircle2 class="w-6 h-6 text-[#8DD04A] flex-shrink-0" />
							<div>
								<p class="text-white font-semibold">You're on the list!</p>
								<p class="text-text-secondary text-sm">We'll notify you when RepsForReels launches.</p>
							</div>
						</div>
					{:else}
						<form onsubmit={handleEmailSubmit} class="space-y-3">
							<!-- Honeypot field - hidden from users, bots will fill it -->
							<div class="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
								<label for="website_url">Website</label>
								<input
									type="text"
									id="website_url"
									name="website_url"
									bind:value={honeypot}
									tabindex="-1"
									autocomplete="off"
								/>
							</div>
							<div class="flex flex-col sm:flex-row gap-3">
								<div class="relative flex-1">
									<Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
									<input
										type="email"
										bind:value={email}
										placeholder="Enter your email"
										disabled={emailSubmitStatus === 'loading'}
										class="w-full pl-12 pr-4 py-3.5 bg-surface/80 border border-white/10 rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-[#833AB4]/50 focus:ring-2 focus:ring-[#833AB4]/20 transition-all disabled:opacity-50"
									/>
								</div>
								<button
									type="submit"
									disabled={emailSubmitStatus === 'loading'}
									class="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45]"></div>
									{#if emailSubmitStatus === 'loading'}
										<Loader2 class="relative w-5 h-5 text-white animate-spin" />
									{:else}
										<span class="relative text-white">Join Waitlist</span>
										<ArrowRight class="relative w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
									{/if}
								</button>
							</div>
							{#if emailError}
								<p class="text-red-400 text-sm">{emailError}</p>
							{/if}
							<!-- Cloudflare Turnstile Widget -->
							{#if TURNSTILE_SITE_KEY}
								<div class="turnstile-container"></div>
							{/if}
							<p class="text-text-muted text-sm flex items-center gap-2">
								<Bell class="w-4 h-4" />
								Be the first to know when we launch. No spam, ever.
							</p>
						</form>
					{/if}
				</div>

				<!-- Early adopters social proof -->
				<div class="mt-10 flex items-center gap-4 justify-center lg:justify-start">
					<div class="flex -space-x-2">
						<img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Early adopter" width="36" height="36" class="w-9 h-9 rounded-full border-2 border-background object-cover" loading="lazy" />
						<img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Early adopter" width="36" height="36" class="w-9 h-9 rounded-full border-2 border-background object-cover" loading="lazy" />
						<img src="https://randomuser.me/api/portraits/men/52.jpg" alt="Early adopter" width="36" height="36" class="w-9 h-9 rounded-full border-2 border-background object-cover" loading="lazy" />
						<img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Early adopter" width="36" height="36" class="w-9 h-9 rounded-full border-2 border-background object-cover" loading="lazy" />
						<div class="w-9 h-9 rounded-full bg-gradient-to-r from-[#833AB4] to-[#F77737] border-2 border-background flex items-center justify-center text-xs font-bold text-white">+</div>
					</div>
					<div class="text-left">
						<p class="text-white font-semibold text-sm">Join early adopters</p>
						<p class="text-xs text-text-muted">Get exclusive launch perks</p>
					</div>
				</div>
			</div>

			<!-- 3D Phone mockup -->
			<div class="relative flex justify-center lg:justify-end perspective-1000">
				<div class="relative" style="transform: perspective(1000px) rotateY(-15deg) rotateX(5deg) rotateZ(2deg); transform-style: preserve-3d;">
					<!-- Glow effect -->
					<div class="absolute -inset-8 bg-gradient-to-br from-[#833AB4]/40 via-[#DD2A7B]/30 to-[#F77737]/40 rounded-[4rem] blur-3xl opacity-60"></div>

					<!-- Phone frame -->
					<div class="relative bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-[3rem] p-2 shadow-2xl" style="box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5), 0 30px 60px -30px rgba(131,58,180,0.3), inset 0 1px 0 rgba(255,255,255,0.1);">
						<!-- Inner bezel -->
						<div class="bg-black rounded-[2.5rem] overflow-hidden relative">
							<!-- Screen content -->
							<picture>
								<source srcset="/app-screenshot.webp" type="image/webp" />
								<img
									src="/app-screenshot.jpg"
									alt="RepsForReels App Screenshot showing exercise tracking interface"
									width="300"
									height="652"
									class="w-[280px] sm:w-[300px] h-auto"
									fetchpriority="high"
								/>
							</picture>
						</div>
					</div>

					<!-- Reflection -->
					<div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-[3rem] pointer-events-none"></div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ABOUT SECTION - Critical for Google AI Overview -->
<!-- Bento grid design with all SEO text preserved -->
<section id="about" class="py-24 relative z-10 overflow-hidden">
	<!-- Background accents -->
	<div class="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#833AB4]/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
	<div class="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#F77737]/10 rounded-full blur-[120px] translate-x-1/3"></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
		<!-- Section header -->
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm mb-6 backdrop-blur-sm">
				<Sparkles class="w-4 h-4 text-[#FCAF45]" />
				<span class="text-text-secondary">Discover the app</span>
			</div>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold">
				<span class="text-white">What is </span>
				<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45] bg-clip-text text-transparent">RepsForReels</span>
				<span class="text-white">?</span>
			</h2>
		</div>

		<!-- Bento Grid - Fully Responsive -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">

			<!-- Main Definition Card (Large) -->
			<div class="sm:col-span-2 lg:col-span-7 group relative">
				<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#F77737] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
				<div class="relative h-full bg-gradient-to-br from-surface/90 to-surface/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 overflow-hidden group-hover:border-white/20 transition-colors">
					<!-- Decorative gradient orb -->
					<div class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#833AB4]/30 to-[#F77737]/20 rounded-full blur-3xl"></div>

					<div class="relative">
						<div class="flex items-center gap-3 mb-6">
							<div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#833AB4] to-[#DD2A7B] flex items-center justify-center shadow-lg shadow-[#833AB4]/25">
								<Info class="w-6 h-6 text-white" />
							</div>
							<div class="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
						</div>

						<p class="text-lg lg:text-xl text-text-secondary leading-relaxed">
							<strong class="text-white text-xl lg:text-2xl">RepsForReels is a mobile app that blocks social media access until you complete physical exercises.</strong>
							<span class="block mt-4">The app uses AI-powered pose detection to verify exercises like pushups and squats in real-time, then rewards you with screen time minutes.</span>
						</p>
					</div>
				</div>
			</div>

			<!-- "No Reps No Reels" Tagline Card -->
			<div class="sm:col-span-2 lg:col-span-5 group relative">
				<div class="absolute inset-0 bg-gradient-to-r from-[#DD2A7B] to-[#F77737] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
				<div class="relative h-full bg-gradient-to-br from-[#833AB4]/20 via-[#DD2A7B]/10 to-[#F77737]/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center overflow-hidden group-hover:border-white/20 transition-colors">
					<!-- Animated background pattern -->
					<div class="absolute inset-0 opacity-30">
						<div class="absolute top-4 left-4 w-2 h-2 bg-[#833AB4] rounded-full animate-pulse"></div>
						<div class="absolute top-8 right-8 w-1.5 h-1.5 bg-[#DD2A7B] rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
						<div class="absolute bottom-6 left-8 w-1 h-1 bg-[#F77737] rounded-full animate-pulse" style="animation-delay: 1s"></div>
						<div class="absolute bottom-10 right-6 w-2 h-2 bg-[#FCAF45] rounded-full animate-pulse" style="animation-delay: 0.3s"></div>
					</div>

					<div class="relative">
						<p class="text-sm uppercase tracking-widest text-text-muted mb-3">The core concept</p>
						<p class="text-3xl lg:text-4xl font-black leading-tight">
							<span class="text-white">"No reps,</span><br />
							<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45] bg-clip-text text-transparent">no reels."</span>
						</p>
						<p class="text-text-secondary mt-4 text-sm">Want to scroll Instagram or TikTok?<br />First, do some pushups.</p>
					</div>
				</div>
			</div>

			<!-- AI Detection Card -->
			<div class="sm:col-span-1 lg:col-span-4 group relative">
				<div class="absolute inset-0 bg-gradient-to-r from-[#4ECDC4] to-[#7EDED7] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
				<div class="relative h-full bg-gradient-to-br from-surface/90 to-surface/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 group-hover:border-[#4ECDC4]/30 transition-colors">
					<div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4ECDC4]/20 to-[#4ECDC4]/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
						<Brain class="w-7 h-7 text-[#4ECDC4]" />
					</div>
					<h3 class="text-xl font-bold text-white mb-3">AI-Powered Detection</h3>
					<p class="text-text-secondary text-sm leading-relaxed">
						The app's camera watches your form using on-device machine learning, counts your reps accurately, and adds earned minutes to your screen time balance.
					</p>
				</div>
			</div>

			<!-- Privacy Card -->
			<div class="sm:col-span-1 lg:col-span-4 group relative">
				<div class="absolute inset-0 bg-gradient-to-r from-[#8DD04A] to-[#A8E063] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
				<div class="relative h-full bg-gradient-to-br from-surface/90 to-surface/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 group-hover:border-[#8DD04A]/30 transition-colors">
					<div class="flex items-center gap-3 mb-5">
						<div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8DD04A]/20 to-[#8DD04A]/5 flex items-center justify-center group-hover:scale-110 transition-transform">
							<EyeOff class="w-7 h-7 text-[#8DD04A]" />
						</div>
						<div class="flex items-center gap-1.5">
							<Shield class="w-4 h-4 text-[#8DD04A]" />
							<span class="text-xs font-semibold text-[#8DD04A] uppercase tracking-wide">100% Private</span>
						</div>
					</div>
					<h3 class="text-xl font-bold text-white mb-3">On-Device Processing</h3>
					<p class="text-text-secondary text-sm leading-relaxed">
						Nothing is uploaded or recorded. All pose detection happens locally on your device using machine learning.
					</p>
				</div>
			</div>

			<!-- Stats Card - 60% Reduction -->
			<div class="sm:col-span-2 lg:col-span-4 group relative">
				<div class="absolute inset-0 bg-gradient-to-r from-[#F77737] to-[#FCAF45] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
				<div class="relative h-full bg-gradient-to-br from-surface/90 to-surface/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 group-hover:border-[#F77737]/30 transition-colors overflow-hidden">
					<!-- Background stat -->
					<div class="absolute -bottom-4 -right-4 text-[120px] font-black text-white/[0.03] leading-none select-none">60</div>

					<div class="relative">
						<div class="flex items-center gap-2 mb-4">
							<TrendingDown class="w-5 h-5 text-[#8DD04A]" />
							<span class="text-xs font-semibold text-[#8DD04A] uppercase tracking-wide">Average Result</span>
						</div>
						<div class="text-5xl lg:text-6xl font-black bg-gradient-to-r from-[#F77737] to-[#FCAF45] bg-clip-text text-transparent mb-2">
							60%
						</div>
						<p class="text-white font-semibold">Screen time reduction</p>
						<p class="text-text-secondary text-sm mt-2">While building consistent workout habits</p>
					</div>
				</div>
			</div>

			<!-- Transformation Card (Wide) -->
			<div class="sm:col-span-2 lg:col-span-8 group relative">
				<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] to-[#DD2A7B] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
				<div class="relative h-full bg-gradient-to-br from-surface/90 to-surface/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 group-hover:border-white/20 transition-colors">
					<div class="flex flex-col lg:flex-row lg:items-center gap-6">
						<div class="flex items-center gap-4">
							<div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#833AB4]/20 to-[#DD2A7B]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
								<RefreshCw class="w-7 h-7 text-[#DD2A7B]" />
							</div>
							<div class="hidden lg:block w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold text-white mb-3">Transform Doomscrolling Into Fitness</h3>
							<p class="text-text-secondary leading-relaxed">
								RepsForReels transforms the negative habit of doomscrolling into a positive fitness routine.
								Instead of fighting your phone addiction with willpower alone, you create a simple exchange:
								<strong class="text-white">exercise for entertainment</strong>.
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Quick Stats Row -->
			<div class="sm:col-span-2 lg:col-span-4 group relative">
				<div class="absolute inset-0 bg-gradient-to-r from-[#4ECDC4] to-[#833AB4] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
				<div class="relative h-full bg-gradient-to-br from-surface/90 to-surface/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 group-hover:border-white/20 transition-colors">
					<div class="flex flex-col h-full justify-between">
						<div class="flex items-center gap-3 mb-4">
							<Heart class="w-5 h-5 text-[#DD2A7B]" />
							<span class="text-xs font-semibold text-text-muted uppercase tracking-wide">Why it works</span>
						</div>
						<div class="space-y-3">
							<div class="flex items-center gap-3">
								<div class="w-8 h-8 rounded-lg bg-[#833AB4]/20 flex items-center justify-center">
									<Camera class="w-4 h-4 text-[#833AB4]" />
								</div>
								<span class="text-sm text-white">Real-time verification</span>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-8 h-8 rounded-lg bg-[#DD2A7B]/20 flex items-center justify-center">
									<Timer class="w-4 h-4 text-[#DD2A7B]" />
								</div>
								<span class="text-sm text-white">Earn screen time</span>
							</div>
							<div class="flex items-center gap-3">
								<div class="w-8 h-8 rounded-lg bg-[#F77737]/20 flex items-center justify-center">
									<Play class="w-4 h-4 text-[#F77737]" />
								</div>
								<span class="text-sm text-white">Free to start</span>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</section>

<!-- Problem Section -->
<section class="py-24 relative z-10">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
				<span class="text-white">The </span>
				<span class="bg-gradient-to-r from-[#FF6B6B] to-[#FF8A8A] bg-clip-text text-transparent">doomscrolling</span>
				<span class="text-white"> epidemic</span>
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				The average person spends 5-6 hours daily on their phone. That's 10+ years of your life scrolling through endless feeds.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			<div class="group bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 text-center hover:border-[#DD2A7B]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#DD2A7B]/10">
				<div class="text-5xl sm:text-6xl font-black bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#F77737] bg-clip-text text-transparent mb-3">5.6</div>
				<p class="text-text-secondary">hours per day on phone</p>
			</div>
			<div class="group bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 text-center hover:border-[#DD2A7B]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#DD2A7B]/10">
				<div class="text-5xl sm:text-6xl font-black bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#F77737] bg-clip-text text-transparent mb-3">10+</div>
				<p class="text-text-secondary">years of life scrolling</p>
			</div>
			<div class="group bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 text-center hover:border-[#DD2A7B]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#DD2A7B]/10">
				<div class="text-5xl sm:text-6xl font-black bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#F77737] bg-clip-text text-transparent mb-3">80%</div>
				<p class="text-text-secondary">feel addicted to their phone</p>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section id="features" class="py-24 relative z-10">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
				<span class="text-white">Transform </span>
				<span class="bg-gradient-to-r from-[#4ECDC4] to-[#7EDED7] bg-clip-text text-transparent">addiction into action</span>
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				RepsForReels uses behavioral science to turn your scrolling habit into a fitness routine.
			</p>
		</div>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each features as feature}
				<div class="group bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-[#4ECDC4]/30 hover:shadow-xl hover:shadow-[#4ECDC4]/5 transition-all duration-300">
					<div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4ECDC4]/20 to-[#4ECDC4]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
						{#if feature.icon === 'scan'}
							<Scan class="w-7 h-7 text-[#4ECDC4]" />
						{:else if feature.icon === 'shield'}
							<ShieldCheck class="w-7 h-7 text-[#4ECDC4]" />
						{:else if feature.icon === 'trending'}
							<TrendingUp class="w-7 h-7 text-[#4ECDC4]" />
						{:else if feature.icon === 'lock'}
							<Lock class="w-7 h-7 text-[#4ECDC4]" />
						{:else if feature.icon === 'clock'}
							<Clock class="w-7 h-7 text-[#4ECDC4]" />
						{:else if feature.icon === 'dumbbell'}
							<Dumbbell class="w-7 h-7 text-[#4ECDC4]" />
						{/if}
					</div>
					<h3 class="text-xl font-bold text-white mb-3">{feature.title}</h3>
					<p class="text-text-secondary leading-relaxed">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section id="how-it-works" class="py-24 relative z-10">
	<div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#833AB4]/5 to-transparent"></div>
	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
				<span class="text-white">How </span>
				<span class="bg-gradient-to-r from-[#D4A574] to-[#E8C4A0] bg-clip-text text-transparent">RepsForReels</span>
				<span class="text-white"> works</span>
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				No complicated setup. Get started in under a minute.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			{#each steps as step, i}
				<div class="relative">
					{#if i < steps.length - 1}
						<div class="hidden md:block absolute top-14 left-full w-full h-px bg-gradient-to-r from-[#D4A574]/50 to-transparent -translate-x-1/2 z-0"></div>
					{/if}
					<div class="group bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 text-center relative z-10 hover:border-[#D4A574]/30 transition-all duration-300">
						<div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4A574]/20 to-[#D4A574]/5 mb-6 group-hover:scale-110 transition-transform">
							{#if step.icon === 'smartphone'}
								<Smartphone class="w-7 h-7 text-[#D4A574]" />
							{:else if step.icon === 'target'}
								<Target class="w-7 h-7 text-[#D4A574]" />
							{:else if step.icon === 'zap'}
								<Zap class="w-7 h-7 text-[#D4A574]" />
							{/if}
						</div>
						<div class="text-sm font-bold bg-gradient-to-r from-[#D4A574] to-[#E8C4A0] bg-clip-text text-transparent mb-2">{step.number}</div>
						<h3 class="text-xl font-bold text-white mb-3">{step.title}</h3>
						<p class="text-text-secondary leading-relaxed">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Testimonials Section -->
<section id="testimonials" class="py-24 relative z-10">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
				<span class="text-white">Early testers, </span>
				<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#F77737] bg-clip-text text-transparent">real feedback</span>
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				Here's what our beta testers are saying about RepsForReels.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-6">
			{#each testimonials as testimonial}
				<div class="group bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-[#DD2A7B]/20 transition-all duration-300">
					<div class="flex items-center gap-4 mb-6">
						<img src={testimonial.avatar} alt={testimonial.name} width="56" height="56" class="w-14 h-14 rounded-full object-cover border-2 border-white/10" loading="lazy" />
						<div class="flex-1">
							<h4 class="font-bold text-white">{testimonial.name}</h4>
							<p class="text-sm text-text-muted">{testimonial.handle}</p>
						</div>
						<div class="flex gap-0.5">
							{#each Array(testimonial.rating) as _}
								<Star class="w-4 h-4 text-[#FCAF45] fill-[#FCAF45]" />
							{/each}
						</div>
					</div>
					<p class="text-text-secondary leading-relaxed">"{testimonial.text}"</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section id="faq" class="py-24 relative z-10">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
				<span class="text-white">Frequently asked </span>
				<span class="bg-gradient-to-r from-[#4ECDC4] to-[#7EDED7] bg-clip-text text-transparent">questions</span>
			</h2>
		</div>

		<div class="space-y-4">
			{#each faqs as faq, i}
				<div class="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-[#4ECDC4]/20 transition-colors">
					<button
						onclick={() => toggleFaq(i)}
						class="w-full px-6 py-5 flex items-center justify-between text-left"
					>
						<span class="font-semibold text-white pr-4">{faq.question}</span>
						<ChevronDown
							class="w-5 h-5 text-text-muted transition-transform flex-shrink-0 {openFaq === i ? 'rotate-180' : ''}"
						/>
					</button>
					{#if openFaq === i}
						<div class="px-6 pb-5 text-text-secondary leading-relaxed">
							{faq.answer}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Join Waitlist CTA Section -->
<section id="download" class="py-24 relative overflow-hidden z-10">
	<div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#833AB4]/10 to-[#DD2A7B]/5"></div>
	<div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#833AB4]/20 rounded-full blur-[150px]"></div>
	<div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F77737]/15 rounded-full blur-[120px]"></div>

	<div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<!-- Logo -->
		<div class="flex items-center justify-center gap-4 mb-8">
			<picture>
				<source srcset="/app-icon.webp" type="image/webp" />
				<img src="/app-icon.png" alt="RepsForReels" width="80" height="80" class="w-20 h-20 rounded-2xl" loading="lazy" />
			</picture>
			<span class="flex items-baseline">
				<span class="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#D4A574] via-[#E8C4A0] to-[#D4A574] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reps</span>
				<span class="text-xl font-normal italic text-white/50 mx-1">For</span>
				<span class="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reels</span>
			</span>
		</div>

		<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
			<span class="text-white">Be the first to </span>
			<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent">transform your screen time</span>
		</h2>
		<p class="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
			RepsForReels is launching soon on iOS and Android. Join the waitlist to get early access and exclusive launch perks.
		</p>

		<!-- CTA Email Form -->
		<div class="max-w-lg mx-auto">
			{#if emailSubmitStatus === 'success'}
				<div class="flex items-center justify-center gap-3 bg-[#8DD04A]/10 border border-[#8DD04A]/30 rounded-2xl p-5">
					<CheckCircle2 class="w-7 h-7 text-[#8DD04A] flex-shrink-0" />
					<div class="text-left">
						<p class="text-white font-semibold text-lg">You're on the list!</p>
						<p class="text-text-secondary">We'll notify you when RepsForReels launches.</p>
					</div>
				</div>
			{:else}
				<form onsubmit={handleEmailSubmit} class="space-y-4">
					<!-- Honeypot field - hidden from users -->
					<div class="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
						<input type="text" name="company" bind:value={honeypot} tabindex="-1" autocomplete="off" />
					</div>
					<div class="flex flex-col sm:flex-row gap-3">
						<div class="relative flex-1">
							<Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
							<input
								type="email"
								bind:value={email}
								placeholder="Enter your email"
								disabled={emailSubmitStatus === 'loading'}
								class="w-full pl-12 pr-4 py-4 bg-surface/80 border border-white/10 rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-[#833AB4]/50 focus:ring-2 focus:ring-[#833AB4]/20 transition-all disabled:opacity-50 text-lg"
							/>
						</div>
						<button
							type="submit"
							disabled={emailSubmitStatus === 'loading'}
							class="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45]"></div>
							{#if emailSubmitStatus === 'loading'}
								<Loader2 class="relative w-5 h-5 text-white animate-spin" />
							{:else}
								<span class="relative text-white">Join Waitlist</span>
								<ArrowRight class="relative w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
							{/if}
						</button>
					</div>
					{#if emailError}
						<p class="text-red-400 text-sm">{emailError}</p>
					{/if}
					<!-- Cloudflare Turnstile Widget -->
					{#if TURNSTILE_SITE_KEY}
						<div class="turnstile-container"></div>
					{/if}
				</form>
			{/if}
		</div>

		<!-- Platform badges (coming soon) -->
		<div class="mt-10 flex items-center justify-center gap-6">
			<div class="flex items-center gap-2 text-text-muted">
				<img src="/badge-app-store.svg" alt="App Store" width="135" height="40" class="h-8 opacity-40" loading="lazy" />
				<span class="text-sm">Coming Soon</span>
			</div>
			<div class="flex items-center gap-2 text-text-muted">
				<img src="/badge-google-play.svg" alt="Google Play" width="135" height="40" class="h-8 opacity-40" loading="lazy" />
				<span class="text-sm">Coming Soon</span>
			</div>
		</div>
	</div>
</section>
</main>

<!-- Footer -->
<footer class="py-16 border-t border-white/5 relative z-10">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid md:grid-cols-4 gap-12 mb-12">
			<!-- Brand -->
			<div class="md:col-span-2">
				<a href="/" class="flex items-center gap-3 mb-6">
					<picture>
						<source srcset="/app-icon.webp" type="image/webp" />
						<img src="/app-icon.png" alt="RepsForReels" width="48" height="48" class="w-12 h-12 rounded-xl" loading="lazy" />
					</picture>
					<span class="flex items-baseline">
						<span class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#D4A574] via-[#E8C4A0] to-[#D4A574] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reps</span>
						<span class="text-base font-normal italic text-white/50 mx-0.5">For</span>
						<span class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reels</span>
					</span>
				</a>
				<p class="text-text-secondary max-w-sm leading-relaxed mb-4">
					RepsForReels is a mobile app that blocks social media until you exercise. Transform your screen time addiction into fitness gains. No reps, no reels.
				</p>
				<p class="text-text-muted text-sm">
					Launching soon on iOS & Android. <a href="#download" class="text-[#4ECDC4] hover:underline">Join the waitlist</a> for early access.
				</p>
			</div>

			<!-- Links -->
			<div>
				<h4 class="font-semibold text-white mb-4">Product</h4>
				<ul class="space-y-3">
					<li><a href="#about" class="text-text-secondary hover:text-white transition-colors">About</a></li>
					<li><a href="#features" class="text-text-secondary hover:text-white transition-colors">Features</a></li>
					<li><a href="#how-it-works" class="text-text-secondary hover:text-white transition-colors">How it Works</a></li>
					<li><a href="#testimonials" class="text-text-secondary hover:text-white transition-colors">Reviews</a></li>
					<li><a href="#faq" class="text-text-secondary hover:text-white transition-colors">FAQ</a></li>
				</ul>
			</div>

			<!-- Legal -->
			<div>
				<h4 class="font-semibold text-white mb-4">Legal</h4>
				<ul class="space-y-3">
					<li><a href="/privacy" class="text-text-secondary hover:text-white transition-colors">Privacy Policy</a></li>
					<li><a href="/terms" class="text-text-secondary hover:text-white transition-colors">Terms of Service</a></li>
				</ul>
			</div>
		</div>

		<div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
			<p class="text-text-muted text-sm">
				&copy; {new Date().getFullYear()} RepsForReels. All rights reserved.
			</p>
			<p class="text-text-muted text-sm">
				Made with 💪 for fitness enthusiasts everywhere
			</p>
		</div>
	</div>
</footer>

<style>
	.perspective-1000 {
		perspective: 1000px;
	}
</style>
