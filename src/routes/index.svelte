<script context="module">
	export const prerender = true;
</script>

<script>
	
</script>

<style>
	section {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	header {
		position: absolute;
		top:20px;
		left:0px;
		right:0px;
	}

	.wrapper {
		padding-left:150px;
		padding-right:50px;
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
</style>


<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<article id="S-headerCarousel">
		<img width="100%" src="/img/16x9.gif" alt="" />
		<header class="wrapper">
			<a id="S-logo" href="/">
				<h1>SAWYERS</h1>
				<h2>HOME &amp; GARDEN IMPROVEMENTS</h2>
			</a>

			<nav id="S-mainNav">
				<ul>
					<li>Landscaping</li>
					<li>Construction</li>
					<li>About</li>
					<li>News</li>
					<li>Contact</li>
				</ul>
			</nav>
		</header>

		<h3 class="bannerInfo">
			Garden Landscaping
			<span>Refreshing your property</span>
		</h3>
	</article>

</section>