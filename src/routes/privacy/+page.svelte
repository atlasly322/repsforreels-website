<script lang="ts">
	import { siteConfig } from '$lib/seo';
</script>

<svelte:head>
	<title>Privacy Policy | {siteConfig.name}</title>
	<meta name="description" content="Privacy Policy for RepsForReels - Learn how we protect your data and privacy." />
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
		<h1 class="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
		<p class="text-text-secondary mb-12">Last Updated: January 11, 2026</p>

		<div class="prose prose-invert prose-lg max-w-none">
			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
				<p class="text-text-secondary mb-4">We collect information to provide and improve our services:</p>

				<h3 class="text-xl font-semibold text-white mt-6 mb-3">Account Information</h3>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li>Email address and name (when you create an account)</li>
					<li>Authentication method (Apple Sign-In, Google Sign-In, or email)</li>
				</ul>

				<h3 class="text-xl font-semibold text-white mt-6 mb-3">Onboarding Assessment Data</h3>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li>Your goals for reducing screen time</li>
					<li>Current and target daily screen time</li>
					<li>Apps you want to restrict</li>
					<li>Emotional impact of social media usage (stored securely on device)</li>
					<li>Reasons why certain apps are difficult to quit (stored securely on device)</li>
					<li>Your calculated dependency score</li>
				</ul>

				<h3 class="text-xl font-semibold text-white mt-6 mb-3">Exercise Data</h3>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li>Exercise type, repetition counts, and session duration</li>
					<li>Form quality scores (when AI detection is enabled)</li>
					<li>Screen time minutes earned</li>
					<li>Exercise streaks and personal records</li>
				</ul>

				<h3 class="text-xl font-semibold text-white mt-6 mb-3">Device & Usage Data</h3>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li>List of apps you've selected to restrict</li>
					<li>Daily app usage statistics (via Screen Time API on iOS, Usage Stats on Android)</li>
					<li>Device type, operating system version</li>
					<li>App interaction patterns (for improving user experience)</li>
				</ul>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">2. Camera and Pose Detection</h2>
				<p class="text-text-secondary mb-4">RepsForReels uses your device camera for AI-powered pose detection to count exercise repetitions. This is how it works:</p>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li>All pose detection happens <strong class="text-white">locally on your device</strong> using on-device machine learning models</li>
					<li>Your camera feed is <strong class="text-white">NEVER recorded, stored, or uploaded</strong> to our servers</li>
					<li>No images or videos are saved to your device or transmitted anywhere</li>
					<li>The camera is only active during exercise sessions when you explicitly start them</li>
				</ul>
				<p class="text-text-secondary mt-4">You can revoke camera permission at any time through your device settings, though this will disable the exercise counting feature.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">3. Device Permissions We Request</h2>
				<ul class="list-none space-y-4 text-text-secondary">
					<li><strong class="text-white">Camera:</strong> Required for AI exercise pose detection. Processed entirely on your device.</li>
					<li><strong class="text-white">Screen Time / Usage Stats:</strong> Required to track your app usage and enable app blocking features. On iOS, this uses the Family Controls framework. On Android, this uses the Usage Stats API.</li>
					<li><strong class="text-white">Notifications:</strong> Optional. Used for daily exercise reminders, milestone achievements, and screen time alerts.</li>
					<li><strong class="text-white">Accessibility Service (Android only):</strong> Required for displaying the blocking overlay when you open restricted apps.</li>
				</ul>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">4. Sensitive Data Protection</h2>
				<p class="text-text-secondary mb-4">We understand that some information you share is sensitive. The following data is encrypted and stored using your device's secure storage (iOS Keychain / Android Keystore):</p>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li>Emotional impact responses from onboarding</li>
					<li>Reasons why apps are difficult to quit</li>
					<li>Your restricted apps list</li>
				</ul>
				<p class="text-text-secondary mt-4">This sensitive data is <strong class="text-white">never transmitted to third parties</strong> and remains encrypted on your device.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">5. How We Use Your Data</h2>
				<p class="text-text-secondary mb-4">We use your information to:</p>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li>Provide core app functionality (exercise counting, screen time tracking, app blocking)</li>
					<li>Sync your exercise data across devices when you choose to</li>
					<li>Send notifications if you've opted in</li>
					<li>Calculate your dependency score and personalized recommendations</li>
					<li>Improve app performance and develop new features</li>
					<li>Provide customer support when you reach out</li>
				</ul>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">6. Data Storage and Security</h2>
				<p class="text-text-secondary mb-4">Your data is protected using multiple layers of security:</p>
				<p class="text-text-secondary mb-2"><strong class="text-white">Local Storage:</strong> Exercise data is stored locally using encrypted AsyncStorage. Sensitive data uses your device's secure storage (Keychain/Keystore).</p>
				<p class="text-text-secondary">We implement industry-standard security measures including encryption at rest and in transit, secure authentication, and regular security reviews.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
				<p class="text-text-secondary mb-4">We retain your data as follows:</p>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li><strong class="text-white">Exercise session history:</strong> Last 100 sessions retained for statistics and progress tracking</li>
					<li><strong class="text-white">Screen time balance history:</strong> Last 30 days retained</li>
					<li><strong class="text-white">Account data:</strong> Retained until you delete your account</li>
					<li><strong class="text-white">Analytics data:</strong> Anonymized and retained for up to 24 months</li>
				</ul>
				<p class="text-text-secondary mt-4">When you delete your account, your personal data is permanently removed from our servers within 30 days.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">8. Data Sharing</h2>
				<p class="text-text-secondary mb-4"><strong class="text-accent">We do NOT sell your personal data.</strong></p>
				<p class="text-text-secondary mb-4">We may share data in these limited circumstances:</p>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li><strong class="text-white">Anonymized analytics:</strong> We share aggregated, non-identifiable statistics to improve the app</li>
					<li><strong class="text-white">Service providers:</strong> Third-party services that help us operate the app</li>
					<li><strong class="text-white">Legal requirements:</strong> When required by law or to protect rights and safety</li>
				</ul>
				<p class="text-text-secondary mt-4">We never share your camera feed, images, exercise videos, or personally identifiable information with advertisers or data brokers.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">9. Your Rights</h2>
				<p class="text-text-secondary mb-4">You have the right to:</p>
				<ul class="list-disc pl-6 text-text-secondary space-y-2">
					<li><strong class="text-white">Access</strong> your personal data stored in our systems</li>
					<li><strong class="text-white">Correct</strong> inaccurate personal information</li>
					<li><strong class="text-white">Delete</strong> your account and data (Settings > Account > Delete Account)</li>
					<li><strong class="text-white">Export</strong> your exercise data</li>
					<li><strong class="text-white">Opt out</strong> of notifications at any time</li>
					<li><strong class="text-white">Withdraw consent</strong> for data processing</li>
				</ul>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
				<p class="text-text-secondary">RepsForReels is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child under 13 has provided us with personal information, please contact us immediately. We will promptly delete such information.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">11. Changes to Privacy Policy</h2>
				<p class="text-text-secondary">We may update this Privacy Policy from time to time. We will notify you of material changes through the App or via the email associated with your account. Your continued use of the App after changes are posted constitutes acceptance of the updated policy.</p>
			</section>

			<section class="mb-12">
				<h2 class="text-2xl font-bold text-white mb-4">12. Contact</h2>
				<p class="text-text-secondary">For questions about this Privacy Policy or to exercise your privacy rights, please contact us at <a href="mailto:vmars.innovation@gmail.com" class="text-accent hover:underline">vmars.innovation@gmail.com</a></p>
			</section>
		</div>

		<div class="mt-12 pt-8 border-t border-white/10 text-center">
			<p class="text-text-secondary italic">RepsForReels - Your data, your control.</p>
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
