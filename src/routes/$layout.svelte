<script>
	import '../app.css';
	import { getStores, navigating, page, session } from '$app/stores';

	$: console.log($page)
</script>

<style>
	header {
		position: absolute;
		top:20px;
		left:20px;
		right:20px;
	}


	#S-logo {
		background-image:url("/img/logo_sawyer.svg");
		background-repeat: no-repeat;
		padding-left:80px;
		color:#fff;
		display:inline-block;
		height:100px;
	}
	#S-logo h1 {
		font-family: 'Josefin Sans', sans-serif;

	}
	#S-logo h2 {
		font-family: 'Poppins', sans-serif;
		font-size:0.875em;
	}

	#S-logo h1,
	#S-logo h2 {
		padding:0px;
		margin:0px;
	}

	#S-headerCarousel {
		position: relative;
		background-image:url("/img/banner_lanscape.png");
		background-size: cover;
		background-repeat: no-repeat;
		min-height: 240px;
	}

	#S-header #S-logo {
		background-image:url("/img/logo_sawyer_invert.svg");
		color:#000;
	} 
	#S-header {
		position: relative;
		min-height:100px;
	}
	#S-header #S-mainNav li a {
		color:#000;
	}
	

	#S-mainNav {
		font-family: 'Josefin Sans', sans-serif;
		position: absolute;
		top:0px;
		right:50px;
		text-transform: uppercase;
		font-size: 0.875em;
	}

	
	#S-mainNav ul {
		margin:0px;
		padding:0px;
		display: flex;

	}
	#S-mainNav li {
		list-style:none;
		color:#fff;
		margin-left:30px;
		cursor: pointer;
	}
	#S-mainNav li a,
	#S-mainNav li a:hover {
		color:#fff;
		text-decoration: none;
	}

	.bannerInfo {
    	line-height: 0.875em;
		font-family: 'Poppins', sans-serif;
		position: absolute;
		bottom:20%;
		right:10%;
		color:#fff;
		font-size:3em;
    	text-shadow: 0px 1px 3px rgb(0 0 0 / 30%);
		padding-left:20px;
		padding-top:100px;
	}
	.bannerInfo span {
		font-size:0.5em;
		display: block;
	}

	@media only screen and (max-width: 860px) {
		#S-mainNav {
			display: none;
		}
	}
	@media only screen and (max-width: 640px) {
		.bannerInfo {
			bottom:0px;
			font-size:2em;
			margin:20px;
			padding:0px;
		}
	}
</style>


<section>
	{#if ($page.path === '/')}
	<article id="S-headerCarousel">
		<img width="100%" src="/img/16x9.gif" alt="" />
		<header class="wrapper">
			<a id="S-logo" href="/">
				<h1>SAWYERS</h1>
				<h2>HOME &amp; GARDEN IMPROVEMENTS </h2>
			</a>

			<nav id="S-mainNav">
				<ul>
					<li><a href="/landscaping">Landscaping</a></li>
					<li><a href="/construction">Construction</a></li>
					<li><a href="/about">About</a></li>
					<li><a href="/news">News</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>
			</nav>
		</header>

		<h3 class="bannerInfo">
			Garden Landscaping
			<span>Refreshing your property</span>
		</h3>
	</article>
	{:else}
	
	<article id="S-header">
		<header class="wrapper">
			<a id="S-logo" href="/">
				<h1>SAWYERS</h1>
				<h2>HOME &amp; GARDEN IMPROVEMENTS </h2>
			</a>

			<nav id="S-mainNav">
				<ul>
					<li><a href="/landscaping">Landscaping</a></li>
					<li><a href="/construction">Construction</a></li>
					<li><a href="/about">About</a></li>
					<li><a href="/news">News</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>
			</nav>
		</header>
	</article>
	{/if}

	<main>
		<slot />
	</main>
</section>