<script setup>
	import Image from 'primevue/image'
	import Card from 'primevue/card'
	import Panel from 'primevue/panel'

	defineProps({
		item: Object
	})
</script>

<template>
	<Card #content>
		<div class="flex flex-col gap-8 p-4">
			<div>
				<h1>{{ item.name }}</h1>
				<p class="ItemDetails-category">{{ item.category.name }}</p>
			</div>
			<div class="grid grid-cols-6 gap-8">
				<div class="col-span-5 grid grid-cols-4 gap-8">
					<div v-if="item.type" class="flex flex-col gap-1">
						<p class="ItemDetails-label">Tipo</p>
						<p>{{ item.type.name }}</p>
					</div>
					<div v-if="item.year" class="flex flex-col gap-1">
						<p class="ItemDetails-label">Ano</p>
						<p>{{ item.year }}</p>
					</div>
					<div v-if="item.quantity" class="flex flex-col gap-1">
						<p class="ItemDetails-label">Quantidade</p>
						<p>{{ item.quantity }}</p>
					</div>
					<div v-if="item.dimensions" class="flex flex-col gap-1">
						<p class="ItemDetails-label">Dimensões</p>
						<p>{{ item.dimensions }}</p>
					</div>
					<div v-if="item.local" class="flex flex-col gap-1">
						<p class="ItemDetails-label">Local de armazenamento</p>
						<p>{{ item.local }}</p>
					</div>
					<div v-if="item.donor" class="flex flex-col gap-1">
						<p class="ItemDetails-label">Nome do doador</p>
						<p>{{ item.donor }}</p>
					</div>
				</div>
				<Image v-if="item.img" preview>
					<template #indicatoricon>
						<i class="pi pi-search"></i>
					</template>
					<template #image>
						<img class="ItemDetails-image" :src="item.img" />
					</template>
					<template #preview="slotProps">
						<img :src="item.img" alt="preview" :style="slotProps.style" />
					</template>
				</Image>
			</div>
			<Panel v-if="item.description" header="Descrição" toggleable>
				<p>{{ item.description }}</p>
			</Panel>
			<Panel v-if="item.links" header="Links" toggleable>
				<a :href="item.links">{{ item.links }}</a>
			</Panel>
		</div>
	</Card>
</template>

<style scoped>
	.ItemDetails-image {
		border-radius: 8px;
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}

	.ItemDetails-category {
		color: var(--text-color-secondary);
	}

	.ItemDetails-label {
		font-weight: 500;
	}
</style>
