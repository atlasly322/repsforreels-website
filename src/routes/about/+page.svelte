<script lang="ts">
	import {
		siteConfig,
		generateOrganizationSchema,
		generateWebPageSchema,
		generateBreadcrumbSchema
	} from '$lib/seo';
	import {
		Shield,
		Smartphone,
		Target,
		Users,
		Heart,
		Lock,
		ArrowLeft,
		Sparkles,
		Zap,
		Eye,
		Brain,
		Timer,
		TrendingDown,
		Activity,
		CheckCircle2,
		Star
	} from 'lucide-svelte';
	import { onMount } from 'svelte';

	// Parallax star effect (matching homepage)
	let scrollY = $state(0);
	let stars: Array<{ x: number; y: number; size: number; opacity: number; speed: number }> = $state([]);

	onMount(() => {
		const starCount = 100;
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
		return () => window.removeEventListener('scroll', handleScroll);
	});

	// Generate page-specific structured data
	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				...generateOrganizationSchema(),
				'@context': undefined
			},
			{
				...generateWebPageSchema('About', `${siteConfig.url}/about`),
				'@context': undefined,
				'@type': 'AboutPage',
				mainEntity: {
					'@id': `${siteConfig.url}/#organization`
				}
			},
			{
				...generateBreadcrumbSchema([
					{ name: 'Home', url: siteConfig.url },
					{ name: 'About', url: `${siteConfig.url}/about` }
				]),
				'@context': undefined
			}
		]
	};

	const values = [
		{
			icon: Shield,
			title: 'Privacy First',
			description: 'All exercise detection happens on your device. We never record, store, or transmit your camera data.',
			gradient: 'from-[#833AB4] to-[#DD2A7B]'
		},
		{
			icon: Heart,
			title: 'Health Over Metrics',
			description: "We're not maximizing screen time - we're building healthier habits. Your wellbeing is our success metric.",
			gradient: 'from-[#DD2A7B] to-[#F77737]'
		},
		{
			icon: Users,
			title: 'User Empowerment',
			description: "You're in control. Choose apps, reps, and timing. No manipulation, no dark patterns.",
			gradient: 'from-[#F77737] to-[#FCAF45]'
		},
		{
			icon: Lock,
			title: 'Honest Technology',
			description: 'Our AI accurately counts your reps - no inflating numbers. Real exercise, real results.',
			gradient: 'from-[#4ECDC4] to-[#7EDED7]'
		}
	];

	const stats = [
		{ value: '60%', label: 'Average screen time reduction', icon: TrendingDown },
		{ value: '5min', label: 'Setup time', icon: Timer },
		{ value: '100%', label: 'On-device processing', icon: Eye },
		{ value: '4.8★', label: 'User rating', icon: Star }
	];
</script>

<svelte:head>
	<title>About RepsForReels | What is RepsForReels?</title>
	<meta
		name="description"
		content="Learn about RepsForReels - the mobile app that blocks social media until you exercise. Discover our mission to transform screen time addiction into fitness gains using AI-powered pose detection."
	/>
	<meta name="keywords" content="about RepsForReels, what is RepsForReels, RepsForReels mission, exercise app blocker, AI fitness app" />
	<link rel="canonical" href="{siteConfig.url}/about" />

	<!-- Open Graph -->
	<meta property="og:title" content="About RepsForReels | What is RepsForReels?" />
	<meta property="og:description" content="Learn about RepsForReels - the mobile app that blocks social media until you exercise. Discover our mission to transform screen time addiction into fitness gains." />
	<meta property="og:url" content="{siteConfig.url}/about" />
	<meta property="og:type" content="website" />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
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
	<div class="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
</div>

<!-- Navigation -->
<nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/5">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<a href="/" class="flex items-center gap-3">
				<img src="/app-icon.png" alt="RepsForReels" class="w-10 h-10 rounded-xl" />
				<span class="flex items-baseline">
					<span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#D4A574] via-[#E8C4A0] to-[#D4A574] bg-clip-text text-transparent">Reps</span>
					<span class="text-sm font-normal italic text-white/50 mx-0.5">For</span>
					<span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent">Reels</span>
				</span>
			</a>
			<a href="/" class="group flex items-center gap-2 text-text-secondary hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5">
				<ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
				<span class="text-sm">Back to Home</span>
			</a>
		</div>
	</div>
</nav>

<main class="min-h-screen pt-24 pb-16 relative z-10">
	<!-- Hero Section -->
	<section class="relative py-16 overflow-hidden">
		<!-- Background gradient orbs -->
		<div class="absolute top-0 left-0 w-[600px] h-[600px] bg-[#833AB4]/20 rounded-full blur-[150px] -translate-x-1/2"></div>
		<div class="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#F77737]/15 rounded-full blur-[120px] translate-x-1/3"></div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
			<div class="text-center mb-12">
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm mb-6 backdrop-blur-sm">
					<Sparkles class="w-4 h-4 text-[#FCAF45]" />
					<span class="text-text-secondary">About the App</span>
				</div>

				<h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
					<span class="text-white">About </span>
					<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent">RepsForReels</span>
				</h1>

				<p class="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
					<strong class="text-white">RepsForReels is a mobile application that blocks social media access until you complete physical exercises.</strong>
					Using AI-powered pose detection technology, the app verifies exercises like pushups and squats in real-time, then rewards you with screen time minutes.
				</p>
			</div>

			<!-- Stats Row -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
				{#each stats as stat}
					<div class="group relative bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center hover:border-[#DD2A7B]/30 transition-all duration-300 hover:scale-105">
						<div class="absolute inset-0 bg-gradient-to-br from-[#833AB4]/5 to-[#F77737]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
						<div class="relative">
							<div class="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#F77737] bg-clip-text text-transparent mb-1">
								{stat.value}
							</div>
							<div class="text-xs sm:text-sm text-text-muted">{stat.label}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- What is RepsForReels - Bento Grid -->
	<section class="py-16 relative">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid lg:grid-cols-3 gap-6">
				<!-- Main Definition Card - Spans 2 columns -->
				<div class="lg:col-span-2 group relative overflow-hidden">
					<div class="absolute inset-0 bg-gradient-to-br from-[#833AB4]/20 via-[#DD2A7B]/10 to-[#F77737]/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
					<div class="relative bg-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 h-full">
						<div class="flex items-center gap-3 mb-6">
							<div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#833AB4] to-[#DD2A7B] flex items-center justify-center">
								<Brain class="w-6 h-6 text-white" />
							</div>
							<h2 class="text-2xl sm:text-3xl font-bold text-white">What is RepsForReels?</h2>
						</div>

						<div class="space-y-4 text-text-secondary leading-relaxed">
							<p class="text-lg">
								<strong class="text-white">RepsForReels is a fitness and digital wellbeing app</strong> designed to help people reduce their social media addiction by creating a positive exchange: exercise for screen time.
							</p>
							<p>
								The core concept is simple: <span class="text-white font-semibold">"No reps, no reels."</span> Want to scroll Instagram or TikTok? First, do some pushups. The app's camera watches your form using on-device machine learning (nothing is uploaded or recorded), counts your reps accurately, and adds earned minutes to your screen time balance.
							</p>
							<p>
								Instead of fighting your phone addiction with willpower alone, you create a simple exchange: <span class="text-white font-semibold">exercise for entertainment</span>. Users report an average 60% reduction in screen time while simultaneously building consistent workout habits.
							</p>
						</div>
					</div>
				</div>

				<!-- Tagline Card -->
				<div class="group relative overflow-hidden">
					<div class="absolute inset-0 bg-gradient-to-br from-[#F77737]/30 to-[#FCAF45]/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
					<div class="relative bg-surface/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-center items-center text-center">
						<div class="text-6xl sm:text-7xl font-black leading-none mb-4">
							<span class="bg-gradient-to-r from-[#D4A574] to-[#E8C4A0] bg-clip-text text-transparent">No</span>
							<br />
							<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#F77737] bg-clip-text text-transparent">reps,</span>
						</div>
						<div class="text-6xl sm:text-7xl font-black leading-none">
							<span class="bg-gradient-to-r from-[#D4A574] to-[#E8C4A0] bg-clip-text text-transparent">no</span>
							<br />
							<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#F77737] bg-clip-text text-transparent">reels.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- The Problem Section -->
	<section class="py-16 relative">
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B6B]/5 to-transparent"></div>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
			<div class="text-center mb-12">
				<h2 class="text-3xl sm:text-4xl font-bold mb-4">
					<span class="text-white">The Problem </span>
					<span class="bg-gradient-to-r from-[#FF6B6B] to-[#FF8A8A] bg-clip-text text-transparent">We Solve</span>
				</h2>
			</div>

			<div class="grid md:grid-cols-2 gap-8 items-center">
				<div class="space-y-6">
					<div class="flex gap-4">
						<div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF8A8A]/10 flex items-center justify-center">
							<Activity class="w-6 h-6 text-[#FF6B6B]" />
						</div>
						<div>
							<p class="text-text-secondary leading-relaxed">
								The average person spends <strong class="text-white">5-6 hours daily</strong> on their smartphone, with a significant portion spent on social media apps. This "doomscrolling" habit has been linked to increased anxiety, decreased productivity, poor sleep quality, and reduced physical activity.
							</p>
						</div>
					</div>

					<div class="flex gap-4">
						<div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF8A8A]/10 flex items-center justify-center">
							<Target class="w-6 h-6 text-[#FF6B6B]" />
						</div>
						<div>
							<p class="text-text-secondary leading-relaxed">
								Traditional screen time limits don't work for most people because they rely on willpower. When a timer expires, it's too easy to tap "ignore" and keep scrolling. RepsForReels takes a different approach.
							</p>
						</div>
					</div>

					<div class="flex gap-4">
						<div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4ECDC4]/20 to-[#7EDED7]/10 flex items-center justify-center">
							<Zap class="w-6 h-6 text-[#4ECDC4]" />
						</div>
						<div>
							<p class="text-text-secondary leading-relaxed">
								Instead of punishment-based restrictions, we create a <strong class="text-white">reward-based system</strong> where physical activity becomes the key to unlock your favorite apps. Users don't just reduce screen time - they actively improve their physical health.
							</p>
						</div>
					</div>
				</div>

				<!-- Visual Stats -->
				<div class="grid grid-cols-2 gap-4">
					<div class="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 text-center">
						<div class="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#FF6B6B] to-[#FF8A8A] bg-clip-text text-transparent mb-2">5.6h</div>
						<div class="text-sm text-text-muted">Daily phone usage</div>
					</div>
					<div class="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 text-center">
						<div class="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#FF6B6B] to-[#FF8A8A] bg-clip-text text-transparent mb-2">80%</div>
						<div class="text-sm text-text-muted">Feel addicted</div>
					</div>
					<div class="col-span-2 bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 text-center">
						<div class="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#4ECDC4] to-[#7EDED7] bg-clip-text text-transparent mb-2">10+ years</div>
						<div class="text-sm text-text-muted">Of your life spent scrolling</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- How It Works Section -->
	<section class="py-16 relative">
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#833AB4]/5 to-transparent"></div>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
			<div class="text-center mb-12">
				<h2 class="text-3xl sm:text-4xl font-bold mb-4">
					<span class="text-white">How </span>
					<span class="bg-gradient-to-r from-[#D4A574] to-[#E8C4A0] bg-clip-text text-transparent">RepsForReels</span>
					<span class="text-white"> Works</span>
				</h2>
			</div>

			<div class="grid md:grid-cols-4 gap-6">
				{#each [
					{ num: '01', title: 'Choose Apps', desc: 'Select which social media apps to restrict. Instagram, TikTok, YouTube, X, Snapchat - you decide.', gradient: 'from-[#833AB4] to-[#DD2A7B]' },
					{ num: '02', title: 'Do Exercises', desc: 'Complete exercises when you want to use blocked apps. AI detects and counts your pushups and squats.', gradient: 'from-[#DD2A7B] to-[#F77737]' },
					{ num: '03', title: 'Earn Time', desc: 'Each rep earns screen time minutes. These are banked and can be used whenever you want.', gradient: 'from-[#F77737] to-[#FCAF45]' },
					{ num: '04', title: 'Track Progress', desc: 'View stats on exercise history, screen time savings, and fitness progress. Build streaks!', gradient: 'from-[#4ECDC4] to-[#7EDED7]' }
				] as step, i}
					<div class="group relative">
						{#if i < 3}
							<div class="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r {step.gradient} opacity-30 -translate-x-1/2 z-0"></div>
						{/if}
						<div class="relative bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105 h-full">
							<div class="w-16 h-16 rounded-2xl bg-gradient-to-br {step.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
								<span class="text-2xl font-black text-white">{step.num}</span>
							</div>
							<h3 class="text-lg font-bold text-white mb-2">{step.title}</h3>
							<p class="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Values Section -->
	<section class="py-16 relative">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12">
				<h2 class="text-3xl sm:text-4xl font-bold mb-4">
					<span class="text-white">Our </span>
					<span class="bg-gradient-to-r from-[#4ECDC4] to-[#7EDED7] bg-clip-text text-transparent">Values</span>
				</h2>
			</div>

			<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each values as value}
					<div class="group relative overflow-hidden">
						<div class="absolute inset-0 bg-gradient-to-br {value.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
						<div class="relative bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 h-full">
							<div class="w-14 h-14 rounded-2xl bg-gradient-to-br {value.gradient} opacity-20 flex items-center justify-center mb-4 group-hover:opacity-30 transition-opacity">
								<svelte:component this={value.icon} class="w-7 h-7 text-white" />
							</div>
							<h3 class="font-bold text-white mb-2">{value.title}</h3>
							<p class="text-sm text-text-secondary leading-relaxed">{value.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#833AB4]/10 to-[#DD2A7B]/5"></div>
		<div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#833AB4]/20 rounded-full blur-[150px]"></div>
		<div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F77737]/15 rounded-full blur-[120px]"></div>

		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
			<div class="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
				<h2 class="text-3xl sm:text-4xl font-bold mb-4">
					<span class="text-white">Ready to </span>
					<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#F77737] bg-clip-text text-transparent">transform</span>
					<span class="text-white"> your screen time?</span>
				</h2>
				<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
					Join thousands who are turning their scrolling addiction into a fitness superpower with RepsForReels.
				</p>

				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<a
						href="https://play.google.com/store/apps/details?id=com.repsforreels.app"
						target="_blank"
						rel="noopener noreferrer"
						class="relative hover:scale-105 transition-transform"
					>
						<img src="/badge-google-play.svg" alt="Get it on Google Play" class="h-14" />
					</a>
					<button
						onclick={() => alert('Coming soon to iOS!')}
						class="relative hover:scale-105 transition-transform cursor-pointer"
					>
						<img src="/badge-app-store.svg" alt="Download on the App Store" class="h-14 opacity-60" />
						<span class="absolute -top-2 -right-2 bg-accent text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">SOON</span>
					</button>
				</div>

				<p class="text-text-muted text-sm mt-6">
					Questions? Reach out at <a href="mailto:support@repsforreels.app" class="text-[#4ECDC4] hover:underline">support@repsforreels.app</a>
				</p>
			</div>
		</div>
	</section>
</main>

<!-- Footer -->
<footer class="py-8 border-t border-white/5 relative z-10">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
			<p class="text-text-muted text-sm">
				&copy; {new Date().getFullYear()} RepsForReels. All rights reserved.
			</p>
			<div class="flex gap-6">
				<a href="/privacy" class="text-text-muted hover:text-white text-sm transition-colors">Privacy Policy</a>
				<a href="/terms" class="text-text-muted hover:text-white text-sm transition-colors">Terms of Service</a>
			</div>
		</div>
	</div>
</footer>
