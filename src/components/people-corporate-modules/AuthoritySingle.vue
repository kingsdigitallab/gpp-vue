<template>
	<div>
		<div v-show="loading" class="loader"></div>
		<article class="arch-single" v-show="!loading">
			<h1 class="page-title page-title--single">{{getAuthority.display_name}}</h1>

			<section v-if="Array.isArray(getAuthority.descriptions)" class="arch-single__desc">
				<h2 class="arch-single__desc-title">{{description}}</h2>
				<p class="arch-single__desc-text" :key="index" v-for="(data, index) in getAuthority.descriptions">
					<section class="rte" v-html="data.biography_history.abstract"></section>
				</p>
			</section>

			<section class="arch-single__meta">
				<h2 class="arch-single__meta-title">About</h2>
				<ul v-if="Array.isArray(getAuthority.metadata)" class="arch-single__list">
					<li class="arch-single__item" :key="index2" v-for="(item, index2) in getAuthority.metadata">
						<span class="arch-single__item-name">{{item.name}}</span>
						<ul v-if="Array.isArray(item.content)" class="arch-single__item-content">
							<li :key="index3" v-for="(subItem, index3) in item.content">
								<div v-if="!Array.isArray(subItem)">
									<div v-if="!Array.isArray(subItem.content)">
										<h4>{{subItem.name}}:</h4>
										<div v-html="subItem.content"></div>
									</div>
									
									<div v-if="Array.isArray(subItem.content)">
										<h4>{{subItem.name}}:</h4>
										<ul v-if="Array.isArray(subItem.content)">
											<li :key="index7" v-for="(subItemContentItem, index7) in subItem.content">
												<ul v-if="Array.isArray(subItemContentItem)">
													<li :key="index8" v-for="(subItemContentItem2, index8) in subItemContentItem" style="padding-left: 24px;">
														<h4 v-if="subItemContentItem2.content">{{subItemContentItem2.name}}:</h4>
														<div v-html="subItemContentItem2.content"></div>
													</li>
													<hr>
												</ul>
											</li>
										</ul>
									</div>
								</div>
								<div v-if="Array.isArray(subItem)">
									<div :key="index4" v-for="(sublistItem, index4) in subItem">
										<h4> {{sublistItem.name}}: </h4>
										<div v-if="!Array.isArray(sublistItem.content)" v-html="sublistItem.content">
										</div>
										<ul v-if="Array.isArray(sublistItem.content)">
											<li :key="index5" v-for="(contentItem, index5) in sublistItem.content">
												<ul v-if="Array.isArray(contentItem)">
													<li :key="index6" v-for="(contentItemChild, index6) in contentItem" style="padding-left: 24px;">
														<h4 v-if="contentItemChild.content">{{contentItemChild.name}}:</h4>
														<div v-html="contentItemChild.content"></div>
													</li>
												</ul>
												<div v-if="!Array.isArray(contentItem) && contentItem.content" style="padding-left: 24px;">
													<h4>{{contentItem.name}}:</h4>
													<div v-html="contentItem.content"></div>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</li>
						</ul>
						<div v-if="!Array.isArray(item.content)" v-html="item.content" class="arch-single__item-content"></div>
					</li>
				</ul>
			</section>
		</article>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
	name: 'AuthoritySingle',
	components: {
	},
	computed: mapGetters(['getAuthority']),
	data: function() {
		return {
			loading: true,
		}
	},
	methods: {
		...mapActions(['fetchAuthority'])
	},
	created() {
		this.loading = true;
	},
	async mounted() {
		await this.fetchAuthority(this.$route.params.id);
		this.loading = false;
	}
}
</script>
