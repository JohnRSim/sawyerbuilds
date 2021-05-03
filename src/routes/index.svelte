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
		font-family: 'Poppins', sans-serif;
	}

	#S-improvements {
		color:#fff;
		flex-direction: row;
		padding-top:60px;
	}
	#S-improvements article {
		padding:20px;
		min-height:550px;
		position: relative;
		flex:1;
	}
	.info {
		position: absolute;
		left:40px;
		right:40px;
	}
	#S-construction .info {
		bottom:40px;
	}
	#S-landscaping .info {
		top:40px;
	}
	
	
	#S-construction {
		background-image: url("/img/bg_construction.png");
		background-repeat: no-repeat;
		background-size: cover;
		margin-right:15px;
	}
	#S-landscaping {
		background-image: url("/img/bg_landscaping.png");
		background-repeat: no-repeat;
		background-size: cover;
		margin-left:15px;
	}

	h2 {
		font-weight:600;
		font-size:2em;
	}

	a {
		font-weight: 700;
		color:#fff;
	}
	
	@media only screen and (max-width: 640px) {
		#S-improvements {
			flex-direction: column;
		}
		#S-improvements article {
			min-height:300px;
			margin:0px 0px 20px 0px;
		}
	}
</style>


<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<section id="S-improvements" class="wrapper">
		<article id="S-construction">
			<div class="info">
				<h2>Sawyers Construction</h2>

				<p>
					Renewing your drive to giving your garden a facelift we are here for you. Let us know your vision and let us make it a reality.
				</p>

				<a href="/construction">LEARN MORE</a>
			</div>
		</article>

		<article id="S-landscaping">
			<div class="info">
				<h2>Sawyers Landscaping</h2>

				<p>
					Enhance your garden experience with a new bespoke timber construction or extension. Lets see where we can take your garden.
				</p>

				<a href="/landscaping">LEARN MORE</a>
			</div>
		</article>

	</section>

	<section>
	
		<article><br /></article>
	</section>
</section>