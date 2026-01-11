<script lang="ts">
	import { siteConfig } from '$lib/seo';
</script>

<svelte:head>
	<title>Terms of Service | {siteConfig.name}</title>
	<meta name="description" content="Terms of Service for RepsForReels - Read our terms and conditions." />
</svelte:head>

<!-- Navigation -->
<nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-white/5">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<a href="/" class="flex items-center gap-2">
				<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
					<span class="text-background font-bold text-sm">R</span>
				</div>
				<span class="font-bold text-lg text-white">RepsForReels</span>
			</a>
			<a href="/" class="text-text-secondary hover:text-white transition-colors">
				&larr; Back to Home
			</a>
		</div>
	</div>
</nav>

<main class="pt-24 pb-20">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
		<h1 class="text-4xl font-bold text-white mb-2">Terms of Service</h1>
		<p class="text-text-secondary mb-12">Last Updated: January 11, 2026</p>

		<div class="prose prose-invert prose-lg max-w-none">
			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
				<p class="text-text-secondary">By accessing and using RepsForReels ("the App"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
				<p class="text-text-secondary">RepsForReels is a wellness application that encourages physical exercise by requiring users to complete exercises to earn screen time minutes. The App uses AI-powered pose detection to count exercise repetitions and integrates with your device's screen time management features to help you manage app usage.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">3. Age Requirements</h2>
				<p class="text-text-secondary mb-4">RepsForReels is intended for users aged 13 and older. If you are under 18 years old, you must have permission from a parent or legal guardian to use this App. Parents or guardians may set up and manage accounts on behalf of minors under their supervision.</p>
				<p class="text-text-secondary">We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us immediately.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">4. App Blocking and Screen Time Features</h2>
				<p class="text-text-secondary mb-4">RepsForReels includes features to help you manage your screen time:</p>
				<p class="text-text-secondary mb-2"><strong class="text-white">On iOS:</strong> The App uses Apple's Screen Time API (Family Controls framework) to restrict access to apps you select. This requires you to grant Screen Time authorization through the system settings.</p>
				<p class="text-text-secondary mb-4"><strong class="text-white">On Android:</strong> The App uses Accessibility Services and system overlay permissions to display blocking screens when you attempt to open restricted apps. These permissions are required for the app blocking feature to function.</p>
				<p class="text-text-secondary">You acknowledge that these features are tools to support your goals and may not be completely bypass-proof. The effectiveness depends on your device settings and operating system version.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">5. Health and Exercise Disclaimer</h2>
				<div class="bg-secondary/10 border border-secondary/20 rounded-xl p-6 mb-4">
					<p class="text-white font-semibold mb-2">RepsForReels is not a medical application.</p>
					<p class="text-text-secondary">The exercise features are designed for general wellness purposes only.</p>
				</div>
				<p class="text-text-secondary mb-4">Before starting any exercise program, you should consult with a qualified healthcare professional, especially if you have any medical conditions, injuries, or concerns about your physical health.</p>
				<p class="text-text-secondary mb-4"><strong class="text-white">You exercise at your own risk.</strong> Stop immediately if you experience pain, dizziness, or discomfort. We are not responsible for any injuries that may occur during exercise.</p>
				<p class="text-text-secondary">The AI pose detection provides general feedback and should not be relied upon for professional exercise instruction or physical therapy.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">6. User Responsibilities</h2>
				<p class="text-text-secondary mb-4">You are responsible for:</p>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li>Maintaining the confidentiality of your account credentials</li>
					<li>Exercising safely and within your physical capabilities</li>
					<li>Providing accurate information during registration and onboarding</li>
					<li>Ensuring you have the authority to manage device settings (parental consent for minors)</li>
					<li>Not attempting to circumvent or bypass the app blocking features</li>
					<li>Complying with all applicable laws and regulations</li>
				</ul>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">7. Privacy and Data Collection</h2>
				<p class="text-text-secondary mb-4">Your privacy is important to us. All exercise pose detection happens locally on your device. Your camera feed is never uploaded to our servers. We collect information necessary to provide our services, including exercise statistics, screen time data, and account information.</p>
				<p class="text-text-secondary">Please review our <a href="/privacy" class="text-accent hover:underline">Privacy Policy</a> for complete details on how we collect, use, and protect your information.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">8. Subscription and Payment</h2>
				<p class="text-text-secondary mb-4">RepsForReels offers both free and premium subscription tiers. Premium subscriptions ("Pro") are managed through your device's app store (Apple App Store or Google Play Store).</p>
				<p class="text-text-secondary mb-4">Subscriptions auto-renew unless cancelled at least 24 hours before the end of the current billing period. You can manage or cancel your subscription through your device's app store settings.</p>
				<p class="text-text-secondary">Prices may vary by region and are subject to change. Any price changes will not affect your current subscription period.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">9. Limitations of Liability</h2>
				<p class="text-text-secondary mb-4">RepsForReels is provided "as is" without warranties of any kind, express or implied. We do not warrant that the App will be uninterrupted, error-free, or completely secure.</p>
				<p class="text-text-secondary mb-4">To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:</p>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li>Physical injuries from exercise</li>
					<li>Loss of data or productivity</li>
					<li>Failure of app blocking features</li>
					<li>Device compatibility issues</li>
				</ul>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">10. Account Termination</h2>
				<p class="text-text-secondary mb-4">You may delete your account at any time through Settings > Account > Delete Account. Upon deletion:</p>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li>Your exercise data and statistics will be permanently removed</li>
					<li>Your app blocking settings will be cleared</li>
					<li>Your subscription will not be automatically cancelled (manage through app store)</li>
				</ul>
				<p class="text-text-secondary mt-4">We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or abusive behavior.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
				<p class="text-text-secondary">We may update these Terms of Service from time to time. We will notify you of material changes through the App or via email. Your continued use of the App after changes are posted constitutes acceptance of the updated terms.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
				<p class="text-text-secondary">These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of the App shall be resolved through good faith negotiation before pursuing other legal remedies.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">13. Contact</h2>
				<p class="text-text-secondary">For questions about these Terms of Service, please contact us at <a href="mailto:vmars.innovation@gmail.com" class="text-accent hover:underline">vmars.innovation@gmail.com</a></p>
			</section>
		</div>

		<div class="mt-12 pt-8 border-t border-white/10 text-center">
			<p class="text-text-secondary italic">RepsForReels - No reps, no reels.</p>
		</div>
	</div>
</main>

<!-- Simple Footer -->
<footer class="py-8 border-t border-white/5">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<p class="text-text-secondary text-sm">
			&copy; {new Date().getFullYear()} RepsForReels. All rights reserved.
		</p>
	</div>
</footer>
