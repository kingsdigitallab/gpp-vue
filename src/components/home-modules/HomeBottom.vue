<template>
	<div class="home-bottom container">
		<div class="two-column-50-50">
			<div class="card">
				<div class="card-image">
					<img src="@/assets/images/archival-record-banner.png" alt="Banner for the DBrowse archival records section depicting an archival record"/>
				</div>
				<div class="card-description">
					<h2>Browse archival records</h2>
					<p>Hierarchically organised, our archival records include: diaries, writings, maps, correspondence, wills, commonplace books, financial records, and more!</p>
				</div>
				<div class="card-button">
					<router-link to="/archival-records" class="link-button-default large">See all archival records <span class="arrow"></span></router-link>
				</div>
			</div>
			<div class="card">
				<div class="card-image">
					<img src="@/assets/images/Masked-Ball-Louis-XV-court.jpg" alt="Banner for the Discover people and corporate bodies section depicting Masked Ball Louis XV court"/>
				</div>
				<div class="card-description">
					<h2>Discover people &amp; corporate bodies</h2>
					<p>Our database contains information about over 1,500 people and corporate bodies from the Georgian era.</p>
				</div>
				<div class="card-button">
					<router-link to="/people-and-corporate-bodies" class="link-button-default large">See all people &amp; corporate bodies <span class="arrow"></span></router-link>
				</div>
			</div>
		</div>
		<div class="two-column-50-50">
			<div class="about">
				<h2>About</h2>
				<p>The Collaborative Workspace is a digital platform, developed by <a href="https://www.kdl.kcl.ac.uk/" class="dotted-underline">King’s Digital Lab</a>, that holds material digitised by the <a href="https://gpp.rct.uk/" class="dotted-underline">Royal Archives</a> as part of the <a href="https://georgianpapers.com/" class="dotted-underline">Georgian Papers Programme</a>. It is the one platform on which all datastreams for the Georgian papers, images, metadata and completed transcriptions, are offered; and will allow scholarly users to edit and augment these according to their own knowledge and close reading of the material.</p>
				<p>The platform is built to solicited requirements from both academics and information professionals and brings the rigour required by archivists through the implementation of archival standards (<a href="https://www.loc.gov/ead/EAD3taglib/index.html" class="dotted-underline">EAD3</a> and <a href="https://eac.staatsbibliothek-berlin.de/schema/taglibrary/cpfTagLibrary2019_EN.html" class="dotted-underline">EAC-CPF</a>) while offering flexibility to scholars in allowing them to correct and augment almost all data surfaced in the Workspace. Editing is moderated to ensure fidelity.</p>
			</div>
			<div>
				<img src="@/assets/images/Charlotte_children_brothers.jpg" alt="Queen Charlotte with her Children and Brothers" class="image-fill"/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeBottom',
	data: function() {
		return {
			
		}
	}
}
</script>
