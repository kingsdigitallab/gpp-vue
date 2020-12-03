<template>
    <div class="carousel-template">
        <VueSlickCarousel ref="carousel" class="slider-featured-records-block" v-bind="sliderOptions">
            <div v-for='(record, index) in featuredRecords' v-bind:key="index">
                <div class="featured-card">
                    <div class="featured-card-image">
                        <img v-bind:src="record.src" v-bind:alt="'image for ' + record.title"/>
                    </div>
                    <div class="featured-card-description">
                        <p>
                            <span class="highlight">{{record.date}}</span>
                            <br><br>
                            {{record.title | truncate(200)}}
                            <br>
                            <router-link :to="{name:'files-items', params:{id: record.pk}}" class="dotted-underline" :aria-label="'link to ' + record.title">See record<span class="arrow"></span></router-link>
                        </p>
                        <p>in <router-link :to="{name:'collections-series', params:{id: record.collection.pk}}" class="dotted-underline" :aria-label="'link to ' + record.collection.title">{{record.collection.title}}</router-link></p>
                    </div>
                </div>
            </div>
        </VueSlickCarousel>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
    name: 'CarouselTemplate',
    props: ['featuredRecords'],
    components: {VueSlickCarousel},
    data: function () {
        return {
            sliderOptions: {
				"arrows": true,
				"dots": false,
                "slidesToShow": 2,
                "responsive": [
                    {
                    "breakpoint": 1150,
                    "settings": {
                        "slidesToShow": 1,
                        "slidesToScroll": 1,
                        }
                    }
                ]
			}
        }
    }
}
</script>