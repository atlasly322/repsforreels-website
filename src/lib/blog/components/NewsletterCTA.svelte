<script lang="ts">
	import { Mail, ArrowRight } from 'lucide-svelte';

	let email = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let message = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!email) return;

		status = 'loading';

		// TODO: Integrate with your newsletter provider (Convex, ConvertKit, etc.)
		// For now, simulate success
		await new Promise((resolve) => setTimeout(resolve, 1000));

		status = 'success';
		message = "You're on the list! Check your inbox to confirm.";
		email = '';

		// Reset after a few seconds
		setTimeout(() => {
			status = 'idle';
			message = '';
		}, 5000);
	}
</script>

<div
	class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface to-surface-elevated border border-border p-8 md:p-10"
>
	<!-- Background decoration -->
	<div
		class="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
	></div>
	<div
		class="absolute bottom-0 left-0 w-48 h-48 bg-coral/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
	></div>

	<div class="relative z-10 max-w-xl mx-auto text-center">
		<!-- Icon -->
		<div class="w-14 h-14 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-6">
			<Mail class="w-7 h-7 text-teal" />
		</div>

		<!-- Heading -->
		<h3 class="text-2xl md:text-3xl font-bold text-text-primary mb-3">
			Get Weekly Digital Wellness Tips
		</h3>

		<p class="text-text-secondary mb-6">
			Join thousands of people learning to build healthier screen habits. No spam, unsubscribe
			anytime.
		</p>

		<!-- Form -->
		{#if status === 'success'}
			<div class="p-4 rounded-xl bg-success/10 border border-success/20 text-success">
				{message}
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="flex flex-col sm:flex-row gap-3">
				<input
					type="email"
					bind:value={email}
					placeholder="Enter your email"
					required
					disabled={status === 'loading'}
					class="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal disabled:opacity-50 transition-all"
				/>

				<button
					type="submit"
					disabled={status === 'loading'}
					class="px-6 py-3 rounded-xl bg-teal text-background font-semibold hover:bg-teal-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
				>
					{#if status === 'loading'}
						<span class="animate-spin">⟳</span>
						Subscribing...
					{:else}
						Subscribe
						<ArrowRight class="w-4 h-4" />
					{/if}
				</button>
			</form>

			<p class="text-xs text-text-muted mt-4">
				By subscribing, you agree to our
				<a href="/privacy" class="text-teal hover:underline">Privacy Policy</a>.
			</p>
		{/if}
	</div>
</div>
