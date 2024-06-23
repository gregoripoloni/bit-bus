<script setup>
	import DataTable from 'primevue/datatable';
	import Column from 'primevue/column';
	import DonationAPIClient from '@/API/DonationAPIClient';
	import { onMounted, ref } from 'vue';
	import DonationForm from '@/components/DonationForm.vue';
	import Button from 'primevue/button';
	import PageBreadcrumb from '@/components/PageBreadcrumb.vue';

	const donations = ref([]);
	const visible = ref(false);
	const donationAPI = new DonationAPIClient();

	const load = async () => {
		donations.value = await donationAPI.getAll();
		donations.value = donations.value.map((d) => {
			d.donationDate = (new Date(d.donationDate)).toLocaleDateString()
			return d;
		})
	}

	const breadcrumbItems = ref([
		{ label: 'Doações' }
	])

	const del = async (props) => {
		await donationAPI.delete(donations.value[props.index].id);
		load();
	}

	onMounted(load);

</script>

<template>
	<PageBreadcrumb :items="breadcrumbItems" />
	<div class="flex justify-end items-center gap-4 p-3">
		<Button label="Incluir" icon="pi pi-plus" outlined @click="visible = true" class="shrink-0" />
	</div>
	<div class="flex flex-col gap-8 p-5">
		<DataTable :value="donations" lazy paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
			sortMode="multiple">
			<template>
				<Column sortable field="donerName" header="Nome do doador"></Column>
				<Column sortable field="ammount" header="Quantidade da doação"></Column>
				<Column sortable field="donationDate" header="Data da doação"></Column>
				<Column :exportable="false" style="min-width: 2rem">
					<template #body="slotProps">
						<Button icon="pi pi-trash" outlined rounded severity="danger" @click="del(slotProps)" />
					</template>
				</Column>
			</template>
			<template #empty> Nenhuma doação encontrada. </template>
		</DataTable>
	</div>
	<DonationForm v-model:visible="visible" :id="null" @submitItem="load" />
</template>
