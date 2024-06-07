<script setup>
	defineProps({
		item: Object
	})
</script>

<template>
	<img :src="item.img" />
	<h2>{{ item.name }}</h2>
	<p>{{ item.description }}</p>
</template>

<style scoped>
</style>
