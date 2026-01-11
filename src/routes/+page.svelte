<script lang="ts">
	import { generateFAQStructuredData } from '$lib/seo';
	import { onMount } from 'svelte';
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
		Star
	} from 'lucide-svelte';

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
		return () => window.removeEventListener('scroll', handleScroll);
	});

	// FAQ data
	const faqs = [
		{
			question: 'How does RepsForReels detect my exercises?',
			answer: 'RepsForReels uses advanced AI-powered pose detection that runs entirely on your device. Your camera analyzes your body position in real-time to count reps accurately. No videos are ever recorded or uploaded.'
		},
		{
			question: 'Is RepsForReels free to use?',
			answer: 'RepsForReels offers a free tier with core features. Go Pro to unlock unlimited app blocking, all exercises, detailed analytics, and an ad-free experience. Pricing varies by region.'
		},
		{
			question: 'Which exercises are supported?',
			answer: 'Currently, RepsForReels supports pushups, squats, and jumping jacks with real-time AI detection. More exercises are being added regularly based on user feedback.'
		},
		{
			question: 'Does it work on both iOS and Android?',
			answer: 'Yes! RepsForReels is available on both iOS and Android devices. The app uses platform-native screen time APIs for the best possible blocking experience.'
		},
		{
			question: 'Is my camera data private?',
			answer: 'Absolutely. All pose detection happens locally on your device using on-device machine learning. Your camera feed is never recorded, stored, or transmitted anywhere. Your privacy is our priority.'
		},
		{
			question: 'Can I customize which apps get blocked?',
			answer: 'Yes! You choose exactly which apps to restrict. Block Instagram, TikTok, YouTube, X, or any other app you want. You control your digital diet.'
		}
	];

	const faqStructuredData = generateFAQStructuredData(faqs);

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
			description: 'Pushups, squats, jumping jacks, and more exercises coming soon.'
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
	{@html `<script type="application/ld+json">${JSON.stringify(faqStructuredData)}</script>`}
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
				<img src="/app-icon.png" alt="RepsForReels" class="w-10 h-10 rounded-xl" />
				<span class="flex items-baseline">
					<span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#D4A574] via-[#E8C4A0] to-[#D4A574] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reps</span>
					<span class="text-sm font-normal italic text-white/50 mx-0.5">For</span>
					<span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reels</span>
				</span>
			</a>
			<div class="hidden md:flex items-center gap-8">
				<a href="#features" class="text-text-secondary hover:text-white transition-colors text-sm">Features</a>
				<a href="#how-it-works" class="text-text-secondary hover:text-white transition-colors text-sm">How it Works</a>
				<a href="#testimonials" class="text-text-secondary hover:text-white transition-colors text-sm">Reviews</a>
				<a href="#faq" class="text-text-secondary hover:text-white transition-colors text-sm">FAQ</a>
			</div>
			<a href="#download" class="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45]"></div>
				<div class="absolute inset-[1px] bg-background rounded-[10px] group-hover:bg-transparent transition-colors duration-300"></div>
				<span class="relative bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45] bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">Download</span>
			</a>
		</div>
	</div>
</nav>

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
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8DD04A] opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-[#8DD04A]"></span>
					</span>
					<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45] bg-clip-text text-transparent font-medium">Available on iOS & Android</span>
				</div>

				<h1 class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 leading-[0.95]">
					<span class="text-white">No reps,</span><br />
					<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent">no reels.</span>
				</h1>

				<p class="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
					Turn your screen time addiction into gains. Complete exercises to unlock social media.
					<span class="text-white font-medium">AI-powered pose detection</span> counts your reps automatically.
				</p>

				<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
					<a href="#download" class="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold overflow-hidden transition-transform hover:scale-105">
						<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45]"></div>
						<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] blur-xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
						<svg class="relative w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
						<span class="relative text-white">App Store</span>
					</a>
					<a href="#download" class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 backdrop-blur-sm">
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
						Google Play
					</a>
				</div>

				<!-- Social proof with real faces -->
				<div class="mt-12 flex items-center gap-6 justify-center lg:justify-start">
					<div class="flex -space-x-3">
						<img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="w-11 h-11 rounded-full border-2 border-background object-cover" />
						<img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="w-11 h-11 rounded-full border-2 border-background object-cover" />
						<img src="https://randomuser.me/api/portraits/men/52.jpg" alt="User" class="w-11 h-11 rounded-full border-2 border-background object-cover" />
						<img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" class="w-11 h-11 rounded-full border-2 border-background object-cover" />
						<div class="w-11 h-11 rounded-full bg-gradient-to-r from-[#833AB4] to-[#F77737] border-2 border-background flex items-center justify-center text-xs font-bold text-white">99+</div>
					</div>
					<div class="text-left">
						<div class="flex items-center gap-0.5">
							{#each [1, 2, 3, 4, 5] as _}
								<Star class="w-4 h-4 text-[#FCAF45] fill-[#FCAF45]" />
							{/each}
						</div>
						<p class="text-sm text-text-secondary">Loved by fitness enthusiasts</p>
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
							<img
								src="/app-screenshot.jpg"
								alt="RepsForReels App Screenshot"
								class="w-[280px] sm:w-[300px] h-auto"
							/>
						</div>
					</div>

					<!-- Reflection -->
					<div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 rounded-[3rem] pointer-events-none"></div>
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
				<span class="text-white">Simple as </span>
				<span class="bg-gradient-to-r from-[#D4A574] to-[#E8C4A0] bg-clip-text text-transparent">1-2-3</span>
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
				<span class="text-white">Real people, </span>
				<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#F77737] bg-clip-text text-transparent">real results</span>
			</h2>
			<p class="text-lg text-text-secondary max-w-2xl mx-auto">
				Join thousands who've transformed their screen time into fitness time.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-6">
			{#each testimonials as testimonial}
				<div class="group bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-[#DD2A7B]/20 transition-all duration-300">
					<div class="flex items-center gap-4 mb-6">
						<img src={testimonial.avatar} alt={testimonial.name} class="w-14 h-14 rounded-full object-cover border-2 border-white/10" />
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

<!-- Download CTA Section -->
<section id="download" class="py-24 relative overflow-hidden z-10">
	<div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#833AB4]/10 to-[#DD2A7B]/5"></div>
	<div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#833AB4]/20 rounded-full blur-[150px]"></div>
	<div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F77737]/15 rounded-full blur-[120px]"></div>

	<div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<!-- Logo -->
		<div class="flex items-center justify-center gap-4 mb-8">
			<img src="/app-icon.png" alt="RepsForReels" class="w-20 h-20 rounded-2xl" />
			<span class="flex items-baseline">
				<span class="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#D4A574] via-[#E8C4A0] to-[#D4A574] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reps</span>
				<span class="text-xl font-normal italic text-white/50 mx-1">For</span>
				<span class="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reels</span>
			</span>
		</div>

		<h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
			<span class="text-white">Ready to transform your </span>
			<span class="bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent">screen time?</span>
		</h2>
		<p class="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
			Join thousands who are turning their scrolling addiction into a fitness superpower. Download now and start your journey.
		</p>

		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a href="#" class="group inline-flex items-center justify-center gap-4 px-8 py-4 bg-white text-background font-bold rounded-2xl hover:bg-gray-100 transition-all hover:scale-105 shadow-xl shadow-white/10">
				<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
				<div class="text-left">
					<div class="text-xs opacity-75">Download on the</div>
					<div class="text-lg font-bold -mt-1">App Store</div>
				</div>
			</a>
			<a href="#" class="group inline-flex items-center justify-center gap-4 px-8 py-4 bg-white text-background font-bold rounded-2xl hover:bg-gray-100 transition-all hover:scale-105 shadow-xl shadow-white/10">
				<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
				<div class="text-left">
					<div class="text-xs opacity-75">Get it on</div>
					<div class="text-lg font-bold -mt-1">Google Play</div>
				</div>
			</a>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="py-16 border-t border-white/5 relative z-10">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid md:grid-cols-4 gap-12 mb-12">
			<!-- Brand -->
			<div class="md:col-span-2">
				<a href="/" class="flex items-center gap-3 mb-6">
					<img src="/app-icon.png" alt="RepsForReels" class="w-12 h-12 rounded-xl" />
					<span class="flex items-baseline">
						<span class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#D4A574] via-[#E8C4A0] to-[#D4A574] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reps</span>
						<span class="text-base font-normal italic text-white/50 mx-0.5">For</span>
						<span class="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45] bg-clip-text text-transparent" style="-webkit-background-clip: text;">Reels</span>
					</span>
				</a>
				<p class="text-text-secondary max-w-sm leading-relaxed">
					Transform your screen time addiction into gains. No reps, no reels.
				</p>
			</div>

			<!-- Links -->
			<div>
				<h4 class="font-semibold text-white mb-4">Product</h4>
				<ul class="space-y-3">
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
