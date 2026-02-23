<script lang="ts">
	import { generateAllStructuredData, siteConfig } from '$lib/seo';
	import { onMount } from 'svelte';
	import { ChevronDown, Star, Check, Lock } from 'lucide-svelte';

	// Parallax star effect
	let scrollY = $state(0);
	let stars: Array<{ x: number; y: number; size: number; opacity: number; speed: number }> = $state([]);

	onMount(() => {
		const starCount = 80;
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

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// Scroll-reveal action — IntersectionObserver-driven, GPU-accelerated, fires once
	function reveal(node: HTMLElement, options: { delay?: number; y?: number; scale?: boolean } = {}) {
		const { delay = 0, y = 30, scale = false } = options;

		if (typeof window === 'undefined') return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const initial = `translateY(${y}px)${scale ? ' scale(0.95)' : ''}`;
		node.style.opacity = '0';
		node.style.transform = initial;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						node.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
						node.style.opacity = '1';
						node.style.transform = 'translateY(0) scale(1)';
						observer.unobserve(node);
					}
				}
			},
			{ threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
		);

		observer.observe(node);
		return { destroy() { observer.disconnect(); } };
	}

	// FAQ data - used for both display and structured data
	const faqs = [
		{
			question: 'What is RepsForReels?',
			answer: 'RepsForReels is a mobile app that blocks social media access until you complete physical exercises. Using AI-powered pose detection, the app verifies pushups, squats, and other exercises in real-time, then rewards you with screen time minutes. The core concept is "No reps, no reels" - you earn your scroll time through physical activity.'
		},
		{
			question: 'How does the exercise detection work?',
			answer: 'RepsForReels uses advanced AI-powered pose detection that runs entirely on your device. Your camera analyzes your body position in real-time to count reps accurately. No videos are ever recorded or uploaded - all processing happens locally for complete privacy.'
		},
		{
			question: 'Is it free?',
			answer: 'RepsForReels includes a free 7-day trial with full access to all Pro features — the best way to try a screen time blocker and digital detox app risk-free. After the trial, a Pro subscription unlocks unlimited exercise sessions, all conversion rates, unlimited app blocking, and an ad-free experience. Plans start at $29.99/year or $4.99/month.'
		},
		{
			question: 'How is RepsForReels different from other screen time apps?',
			answer: 'Most screen time apps like Opal, ScreenZen, and Freedom rely on willpower — they block apps but give you nothing in return. RepsForReels is the only app blocker that rewards exercise with screen time. Instead of just locking your phone, it uses AI pose detection to verify real pushups and squats, then earns you minutes to scroll. It\'s positive reinforcement vs. pure restriction — and it builds a workout habit as a side effect.'
		},
		{
			question: 'Which exercises are supported?',
			answer: 'Currently, RepsForReels supports pushups and squats with real-time AI detection. More exercises including jumping jacks, lunges, and sit-ups are being added regularly based on user feedback.'
		},
		{
			question: 'Is my camera data private?',
			answer: 'Absolutely. All pose detection happens locally on your device using on-device machine learning. Your camera feed is never recorded, stored, or transmitted anywhere. RepsForReels is designed with privacy as a core principle.'
		},
		{
			question: 'Can I customize which apps get blocked?',
			answer: 'Yes! You choose exactly which apps to restrict. Block Instagram, TikTok, YouTube, X (Twitter), Snapchat, or any other app you want. You have full control over your digital diet and can change settings anytime.'
		}
	];

	// Generate comprehensive structured data including FAQs
	const allStructuredData = generateAllStructuredData(faqs);

	// How it works steps — each paired with an app screenshot in an iPhone mockup
	const steps = [
		{
			number: '01',
			title: 'Choose Your Apps',
			description: 'Block <span class="text-coral">Instagram, TikTok, YouTube</span>, or any app that steals your time. <span class="text-white">You set the rules.</span>',
			image: {
				webp: '/mockup-choose.webp',
				png: '/mockup-choose.png',
				alt: 'RepsForReels app selection screen — choose which distracting apps to block including WhatsApp, YouTube, and Chrome',
				width: 700,
				height: 1379
			}
		},
		{
			number: '02',
			title: 'Do Your Reps',
			description: 'Pushups, squats — <span class="text-teal">AI watches your form</span> and counts every rep. <span class="text-white">No cheating.</span>',
			image: {
				webp: '/mockup-reps.webp',
				png: '/mockup-reps.png',
				alt: 'RepsForReels AI pose detection — camera tracking pushup form with skeleton overlay and real-time rep counter',
				width: 700,
				height: 1379
			}
		},
		{
			number: '03',
			title: 'Scroll Guilt-Free',
			description: 'Earned screen time <span class="text-success">unlocks your apps</span>. Bank it and spend it whenever you want.',
			image: {
				webp: '/mockup-block.webp',
				png: '/mockup-block.png',
				alt: 'Instagram blocked by RepsForReels — showing time bank balance of 13 minutes and 5-minute unlock slot button',
				width: 700,
				height: 1379
			}
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
				<a href="#how-it-works" class="text-text-secondary hover:text-white transition-colors text-sm">How it Works</a>
				<a href="/blog" class="text-text-secondary hover:text-white transition-colors text-sm">Blog</a>
				<a href="#faq" class="text-text-secondary hover:text-white transition-colors text-sm">FAQ</a>
			</div>
			<a
				href="#download"
				class="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm overflow-hidden"
			>
				<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45]"></div>
				<span class="relative text-white font-semibold">Download Free</span>
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
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
					</span>
					<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45] bg-clip-text text-transparent font-medium">Available on iOS & Android</span>
				</div>

				<h1 class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 leading-[0.95]">
					<span class="text-white">No reps,</span><br />
					<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent">no reels.</span>
				</h1>

				<p class="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
					You're spending <strong class="text-white">5+ hours a day</strong> <span class="text-coral font-semibold">doomscrolling</span>. That's <span class="text-white font-semibold">76 days a year</span> gone. RepsForReels <span class="text-primary font-semibold">locks your apps</span> until you exercise &mdash; <span class="text-teal font-semibold">do reps, earn screen time.</span> AI counts every rep. No cheating.
				</p>

				<!-- Primary CTA -->
				<div class="max-w-md mx-auto lg:mx-0">
					<p class="text-sm font-semibold text-white mb-3">Start Your Free Week</p>
					<div class="flex flex-col sm:flex-row items-center gap-4">
						<a
							href="https://apps.apple.com/gb/app/repsforreels-app-blocker/id6757309601"
							target="_blank"
							rel="noopener noreferrer"
							class="transition-transform hover:scale-105"
						>
							<img src="/badge-app-store.svg" alt="Download on the App Store" width="150" height="50" class="h-12" />
						</a>
						<a
							href="https://play.google.com/store/apps/details?id=com.repsforreels.app"
							target="_blank"
							rel="noopener noreferrer"
							class="transition-transform hover:scale-105"
						>
							<img src="/badge-google-play.svg" alt="Get it on Google Play" width="150" height="50" class="h-12" />
						</a>
					</div>
				</div>

				<!-- Trust signals -->
				<div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 justify-center lg:justify-start text-sm text-text-secondary">
					<div class="flex items-center gap-1.5">
						<Star class="w-4 h-4 text-[#FCAF45] fill-[#FCAF45]" />
						<span class="text-white font-medium">4.8</span>
						<span>on the App Store</span>
					</div>
					<div class="hidden sm:block w-px h-4 bg-white/10"></div>
					<div class="flex items-center gap-1.5">
						<Check class="w-4 h-4 text-[#4ECDC4]" />
						<span>Free 7-day trial</span>
					</div>
					<div class="hidden sm:block w-px h-4 bg-white/10"></div>
					<div class="flex items-center gap-1.5">
						<Lock class="w-4 h-4 text-[#8DD04A]" />
						<span>100% on-device privacy</span>
					</div>
				</div>
			</div>

			<!-- 3-Phone iPhone Mockup Composition -->
			<div class="relative flex justify-center lg:justify-end">
				<!-- Glow effect behind composition -->
				<div class="absolute inset-0 -m-16 bg-gradient-to-br from-[#833AB4]/30 via-[#DD2A7B]/20 to-[#F77737]/30 rounded-full blur-3xl opacity-60"></div>

				<!-- Phone composition -->
				<div class="relative inline-flex items-start justify-center">
					<!-- Left phone — App blocking overlay -->
					<div
						class="hidden sm:block relative z-[1] -mr-[35px] md:-mr-[45px] lg:-mr-[50px] mt-6 flex-shrink-0"
						style="transform: rotate(-6deg); filter: drop-shadow(0 25px 50px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(131,58,180,0.15));"
					>
						<picture>
							<source srcset="/mockup-block.webp" type="image/webp" />
							<img
								src="/mockup-block.png"
								alt="Instagram blocked by RepsForReels — showing time bank balance and unlock button"
								width="700"
								height="1379"
								loading="lazy"
								class="w-[150px] md:w-[180px] lg:w-[200px]"
							/>
						</picture>
					</div>

					<!-- Center phone — Home screen -->
					<div
						class="relative z-[3] flex-shrink-0"
						style="filter: drop-shadow(0 30px 60px rgba(0,0,0,0.6)) drop-shadow(0 15px 30px rgba(131,58,180,0.15));"
					>
						<picture>
							<source srcset="/mockup-home.webp" type="image/webp" />
							<img
								src="/mockup-home.png"
								alt="RepsForReels home screen — weekly exercise tracker, screen time balance, pushups and squats"
								width="700"
								height="1379"
								fetchpriority="high"
								class="w-[230px] sm:w-[240px] md:w-[270px] lg:w-[280px]"
							/>
						</picture>
					</div>

					<!-- Right phone — Stats / Digital Wellbeing -->
					<div
						class="hidden sm:block relative z-[1] -ml-[35px] md:-ml-[45px] lg:-ml-[50px] mt-6 flex-shrink-0"
						style="transform: rotate(6deg); filter: drop-shadow(0 25px 50px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(131,58,180,0.15));"
					>
						<picture>
							<source srcset="/mockup-stats.webp" type="image/webp" />
							<img
								src="/mockup-stats.png"
								alt="RepsForReels digital wellbeing dashboard — screen time balance, activity breakdown, app usage"
								width="700"
								height="1379"
								loading="lazy"
								class="w-[150px] md:w-[180px] lg:w-[200px]"
							/>
						</picture>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Why RepsForReels Section -->
<section class="py-24 relative z-10">
	<div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16" use:reveal={{ y: 20 }}>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
				<span class="text-white">Why </span>
				<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45] bg-clip-text text-transparent">RepsForReels</span>
				<span class="text-white">?</span>
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				Other screen time apps rely on willpower. We reward you for healthy behavior.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<!-- Card 1: AI Detection -->
			<div
				class="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-[#4ECDC4]/20 transition-colors"
				use:reveal={{ delay: 0, y: 30 }}
			>
				<div class="w-12 h-12 rounded-xl bg-[#4ECDC4]/10 flex items-center justify-center mb-5">
					<svg class="w-6 h-6 text-[#4ECDC4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
				</div>
				<h3 class="text-xl font-bold text-white mb-3">AI-Powered Exercise Detection</h3>
				<p class="text-text-secondary leading-relaxed">
					Advanced AI pose detection verifies every pushup and squat in real-time. No fake reps — the camera checks your form and counts accurately, all processed on-device for privacy.
				</p>
			</div>

			<!-- Card 2: Real App Blocking -->
			<div
				class="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-[#DD2A7B]/20 transition-colors"
				use:reveal={{ delay: 100, y: 30 }}
			>
				<div class="w-12 h-12 rounded-xl bg-[#DD2A7B]/10 flex items-center justify-center mb-5">
					<svg class="w-6 h-6 text-[#DD2A7B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
				</div>
				<h3 class="text-xl font-bold text-white mb-3">Real App Blocking</h3>
				<p class="text-text-secondary leading-relaxed">
					Not just reminders — RepsForReels uses system-level screen time blocking to lock distracting apps. Block TikTok, Instagram, YouTube, or any app until you complete your workout.
				</p>
			</div>

			<!-- Card 3: Earn Screen Time -->
			<div
				class="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-[#F77737]/20 transition-colors"
				use:reveal={{ delay: 200, y: 30 }}
			>
				<div class="w-12 h-12 rounded-xl bg-[#F77737]/10 flex items-center justify-center mb-5">
					<svg class="w-6 h-6 text-[#F77737]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				</div>
				<h3 class="text-xl font-bold text-white mb-3">Earn Your Screen Time</h3>
				<p class="text-text-secondary leading-relaxed">
					Every rep earns real screen time you can spend whenever you want. Bank minutes in the morning, use them later. A dopamine detox that rewards fitness instead of punishing scrolling.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section id="how-it-works" class="py-24 relative z-10">
	<div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#833AB4]/5 to-transparent"></div>
	<div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 lg:mb-20" use:reveal={{ y: 20 }}>
			<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
				<span class="text-white">How </span>
				<span class="bg-gradient-to-r from-[#D4A574] to-[#E8C4A0] bg-clip-text text-transparent">RepsForReels</span>
				<span class="text-white"> works</span>
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				Replace doomscrolling with fitness in under a minute.
			</p>
		</div>

		<div class="space-y-16 md:space-y-24">
			{#each steps as step, i}
				<div class="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
					<!-- Phone mockup -->
					<div
						class="flex justify-center {i % 2 === 1 ? 'md:order-2' : ''}"
						style="filter: drop-shadow(0 25px 50px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.3));"
						use:reveal={{ y: 40, scale: true }}
					>
						<picture>
							<source srcset={step.image.webp} type="image/webp" />
							<img
								src={step.image.png}
								alt={step.image.alt}
								width={step.image.width}
								height={step.image.height}
								loading="lazy"
								class="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]"
							/>
						</picture>
					</div>

					<!-- Text content -->
					<div class="text-center md:text-left {i % 2 === 1 ? 'md:order-1' : ''}" use:reveal={{ delay: 200, y: 30 }}>
						<div class="text-sm tracking-widest uppercase font-bold bg-gradient-to-r from-[#D4A574] to-[#E8C4A0] bg-clip-text text-transparent mb-3">{step.number}</div>
						<h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">{step.title}</h3>
						<p class="text-text-secondary text-lg leading-relaxed max-w-md mx-auto md:mx-0">{@html step.description}</p>
					</div>
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

<!-- Download CTA Section -->
<section id="download" class="py-24 relative overflow-hidden z-10">
	<div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#833AB4]/10 to-[#DD2A7B]/5"></div>
	<div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#833AB4]/20 rounded-full blur-[150px]"></div>
	<div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F77737]/15 rounded-full blur-[120px]"></div>

	<div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<!-- Store badges -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
			<a
				href="https://apps.apple.com/gb/app/repsforreels-app-blocker/id6757309601"
				target="_blank"
				rel="noopener noreferrer"
				class="transition-transform hover:scale-105"
			>
				<img src="/badge-app-store.svg" alt="Download on the App Store" width="150" height="50" class="h-11" />
			</a>
			<a
				href="https://play.google.com/store/apps/details?id=com.repsforreels.app"
				target="_blank"
				rel="noopener noreferrer"
				class="transition-transform hover:scale-105"
			>
				<img src="/badge-google-play.svg" alt="Get it on Google Play" width="150" height="50" class="h-11" />
			</a>
		</div>

		<!-- Trust signals -->
		<div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-text-secondary">
			<div class="flex items-center gap-1.5">
				<Check class="w-4 h-4 text-[#4ECDC4]" />
				<span>Free 7-day trial</span>
			</div>
			<div class="hidden sm:block w-px h-4 bg-white/10"></div>
			<div class="flex items-center gap-1.5">
				<Check class="w-4 h-4 text-[#4ECDC4]" />
				<span>Cancel anytime</span>
			</div>
			<div class="hidden sm:block w-px h-4 bg-white/10"></div>
			<div class="flex items-center gap-1.5">
				<Check class="w-4 h-4 text-[#4ECDC4]" />
				<span>No credit card to start</span>
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
					Turn your screen time addiction into fitness gains. RepsForReels blocks social media until you exercise. No reps, no reels.
				</p>
				<p class="text-text-muted text-sm">
					Available on <a href="https://apps.apple.com/gb/app/repsforreels-app-blocker/id6757309601" class="text-[#4ECDC4] hover:underline" target="_blank" rel="noopener noreferrer">iOS</a> and <a href="https://play.google.com/store/apps/details?id=com.repsforreels.app" class="text-[#4ECDC4] hover:underline" target="_blank" rel="noopener noreferrer">Android</a>.
				</p>
			</div>

			<!-- Links -->
			<div>
				<h4 class="font-semibold text-white mb-4">Product</h4>
				<ul class="space-y-3">
					<li><a href="#how-it-works" class="text-text-secondary hover:text-white transition-colors">How it Works</a></li>
					<li><a href="#faq" class="text-text-secondary hover:text-white transition-colors">FAQ</a></li>
					<li><a href="/blog" class="text-text-secondary hover:text-white transition-colors">Blog</a></li>
				</ul>
			</div>

			<!-- Legal -->
			<div>
				<h4 class="font-semibold text-white mb-4">Legal</h4>
				<ul class="space-y-3">
					<li><a href="/privacy" class="text-text-secondary hover:text-white transition-colors">Privacy Policy</a></li>
					<li><a href="/terms" class="text-text-secondary hover:text-white transition-colors">Terms of Service</a></li>
				</ul>

				<!-- Social Links -->
				<h4 class="font-semibold text-white mb-4 mt-8">Connect</h4>
				<div class="flex items-center gap-3">
					<a href="https://x.com/repsforreels" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-surface/50 border border-white/5 text-text-secondary hover:border-white/50 hover:text-white transition-all" aria-label="Follow us on X">
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
					</a>
					<a href="https://instagram.com/repsforreels" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-surface/50 border border-white/5 text-text-secondary hover:border-[#E4405F]/50 hover:text-[#E4405F] transition-all" aria-label="Follow us on Instagram">
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
					</a>
					<a href="https://tiktok.com/@repsforreels" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-surface/50 border border-white/5 text-text-secondary hover:border-[#00F2EA]/50 hover:text-[#00F2EA] transition-all" aria-label="Follow us on TikTok">
						<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
					</a>
				</div>
			</div>
		</div>

		<div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
			<p class="text-text-muted text-sm">
				&copy; {new Date().getFullYear()} RepsForReels. All rights reserved.
			</p>
			<p class="text-text-muted text-sm">
				Made with reps for fitness enthusiasts everywhere
			</p>
		</div>
	</div>
</footer>
