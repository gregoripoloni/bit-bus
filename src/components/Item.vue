<script setup>
	import Card from 'primevue/card'
	import Button from 'primevue/button'
</script>

<template>
	<Card class="Item">
		<template #header>
			<div class="Item-header">
				<img class="Item-image" src="../assets/ibm.jpg" />
			</div>
		</template>
		<template #title>Card title</template>
		<template #subtitle>Card subtitle</template>
		<template #content>
			<p class="m-0">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum!
			</p>
		</template>
		<template #footer>
			<div class="flex gap-3 mt-1">
				<Button label="Visitar" class="w-full" />
			</div>
		</template>
	</Card>
</template>

<style scoped>
	.Item {
		overflow: hidden;
	}

	.Item-header {
		padding: 24px 24px 0 24px;
	}

	.Item-image {
		border-radius: 8px;
		width: 50%;
	}
</style>
