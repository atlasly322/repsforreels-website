<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X } from 'lucide-svelte';

	// Check if we're on a blog page
	const isBlogPage = $derived(page.url.pathname.startsWith('/blog'));

	let mobileMenuOpen = $state(false);

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<!-- Navigation -->
<nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/5">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3" onclick={closeMenu}>
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

			<!-- Desktop Nav -->
			<div class="hidden md:flex items-center gap-8">
				<a href="/#about" class="text-text-secondary hover:text-white transition-colors text-sm">About</a>
				<a href="/#features" class="text-text-secondary hover:text-white transition-colors text-sm">Features</a>
				<a href="/#how-it-works" class="text-text-secondary hover:text-white transition-colors text-sm">How it Works</a>
				<a href="/blog" class="{isBlogPage ? 'text-white font-medium' : 'text-text-secondary'} hover:text-white transition-colors text-sm">Blog</a>
				<a href="/#faq" class="text-text-secondary hover:text-white transition-colors text-sm">FAQ</a>
			</div>

			<!-- Desktop CTA -->
			<a href="/#download" class="hidden md:inline-flex group relative items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45]"></div>
				<div class="absolute inset-[1px] bg-background rounded-[10px] group-hover:bg-transparent transition-colors duration-300"></div>
				<span class="relative bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] to-[#FCAF45] bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">Join Waitlist</span>
			</a>

			<!-- Mobile Menu Button -->
			<button
				onclick={toggleMenu}
				class="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
				aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
			>
				{#if mobileMenuOpen}
					<X class="w-6 h-6" />
				{:else}
					<Menu class="w-6 h-6" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/5">
			<div class="px-4 py-4 space-y-3">
				<a href="/#about" onclick={closeMenu} class="block py-2 text-text-secondary hover:text-white transition-colors">About</a>
				<a href="/#features" onclick={closeMenu} class="block py-2 text-text-secondary hover:text-white transition-colors">Features</a>
				<a href="/#how-it-works" onclick={closeMenu} class="block py-2 text-text-secondary hover:text-white transition-colors">How it Works</a>
				<a href="/blog" onclick={closeMenu} class="block py-2 {isBlogPage ? 'text-white font-medium' : 'text-text-secondary'} hover:text-white transition-colors">Blog</a>
				<a href="/#faq" onclick={closeMenu} class="block py-2 text-text-secondary hover:text-white transition-colors">FAQ</a>

				<!-- Mobile CTA -->
				<a href="/#download" onclick={closeMenu} class="block mt-4 group relative text-center py-3 rounded-xl font-semibold text-sm overflow-hidden">
					<div class="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#DD2A7B] via-[#F77737] to-[#FCAF45]"></div>
					<span class="relative text-white">Join Waitlist</span>
				</a>
			</div>
		</div>
	{/if}
</nav>
