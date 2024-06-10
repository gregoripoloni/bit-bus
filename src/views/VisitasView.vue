<script setup>
	import { RouterLink } from 'vue-router'
	import Button from 'primevue/button'
	import Breadcrumb from 'primevue/breadcrumb'
	import { useVisitStore } from '@/stores/VisitsStore'
	import VisitList from '@/components/VisitList.vue'
	import VisitForm from '@/components/VisitForm.vue'
	import { onMounted, ref } from 'vue'
	import Calendar from 'primevue/calendar'
	import InputText from 'primevue/inputtext'
	import Skeleton from 'primevue/skeleton'

	const store = useVisitStore();

	const home = ref({
		icon: 'pi pi-home',
		route: '/'
	});
	
	const period = ref();
	const responsable = ref();
	const place = ref();
	const isLoading = ref(true);
	const visible = ref(false);

	const items = ref([
		{ label: 'Visitas' }
	])

	const listItems = ref([]);

	onMounted(async () => {
		listItems.value = await store.getAllVisits();
		isLoading.value = false;
	});

	const resetFilters = () => {
		period.value = null;
		responsable.value = '';
		place.value = '';
		search();
	}

	const search = async () => {
		let date = period.value?.toLocaleDateString();

		try {
			isLoading.value = true;
			let result = await store.getAllVisits({
				period: date,
				responsable: responsable.value ?? '',
				place: place.value ?? ''
			});

			listItems.value = result;
			isLoading.value = false;
		} catch (e) {
			console.log(e);
		}
	}

</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex justify-between items-center">
			<Breadcrumb :home :model="items" #item="{ item }">
				<RouterLink v-if="item.route" :to="item.route">
					<span :class="[item.icon, 'text-primary']" ></span>
					<span class="text-primary font-medium">{{ item.label }}</span>
				</RouterLink>
				<span v-else class="text-2xl font-semibold">{{ item.label }}</span>
			</Breadcrumb>
			<Button label="Incluir" icon="pi pi-plus" @click="visible = true" />
		</div>
		<div class="flex justify-between items-center">
			<div class="grid grid-cols-4 gap-4">
				<div class="flex flex-col gap-2">
					<label>Data da visita</label>
					<Calendar v-model="period" dateFormat="dd/mm/yy" showIcon iconDisplay="input"/>
				</div>
				<div class="flex flex-col gap-2">
					<label>Responsável pela visita</label>
					<InputText class="col-span-2" v-model="responsable"/>
				</div>
				<div class="flex flex-col gap-2">
					<label>Local da visita</label>
					<InputText class="col-span-2" v-model="place"/>
				</div>
				<div class="flex flex-row gap-2 justify-start items-end">
					<Button label="filtrar" icon="pi pi-search" @click="search()" />
					<i class="pi pi-history text-4xl cursor-pointer" @click="resetFilters"/>
				</div>
			</div>
		</div>
		<div class="flex gap-4"v-if="isLoading">
			<Skeleton width="22rem" height="18rem"/>
			<Skeleton width="22rem" height="18rem"/>
			<Skeleton width="22rem" height="18rem"/>
			<Skeleton width="22rem" height="18rem"/>
		</div>
		<VisitList :items="listItems" v-else-if="listItems.length > 0"/>
			<div class="flex flex-col gap-4 align-center w-full justify-center text-center" v-else>
				<i class="pi pi-star-half-fill text-9xl"></i>
				<h1>Nenhum resultado encontrado</h1>
				<p>Não encontramos nenhum resultado resultado, <br/>por favor busque com outros filtros</p>
			</div>
		</div>
		<VisitForm v-model:visible="visible" :id="null" @submitItem="" />
</template>
