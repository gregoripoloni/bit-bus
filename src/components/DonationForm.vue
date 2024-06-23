<script setup>
	import { ref, computed, reactive } from 'vue';
	import Button from 'primevue/button';
	import Dialog from 'primevue/dialog';
	import InputText from 'primevue/inputtext';
	import Calendar from 'primevue/calendar';
	import { useVisitStore } from '@/stores/VisitsStore';
	import Toast from 'primevue/toast';
	import { useToast } from 'primevue/usetoast';
	import APIError from '@/API/APIError';
	import CollectionListPicker from './CollectionListPicker.vue';
	import { convertToApi } from '@/API/CollectionAPIAdapter';
	import inputmask from 'primevue/inputmask';
import DonationAPIClient from '@/API/DonationAPIClient';
import InputNumber from 'primevue/inputnumber';

	const props = defineProps({
		visible: Boolean,
		id: String
	});

	const visibleModel = computed({
		get() {
			return props.visible
		},
		set(newValue) {
			emit('update:visible', newValue)
		}
	});

	const toast = useToast();

	const emit = defineEmits(['update:visible', 'submitItem']);
	const donationAPI = new DonationAPIClient();

	const donerName = ref();
	const ammount = ref();
	const donationDate = ref('');
	let error = ref(new APIError());

	const resetForm = () => {
		donerName.value = '';
		ammount.value = '';
		donationDate.value = '';
	}

	const submit = async () => {
		try {
			let r = await donationAPI.addDonation({
				DonerName: donerName.value,
				Ammount: ammount.value,
				DonationDate: donationDate.value
			});

			toast.add({ severity: 'success', summary: 'Sua doação foi salva com sucesso', life: 5000 });
			emit('update:visible', false);
			emit('submitItem');
		} catch(e) {
			toast.add({ severity: 'error', summary: 'Não foi possível salvar a sua doação', detail: 'Por favor, verifique os campos ressaltados em vermelhor', life: 5000 });
		}
	}
</script>
<template>
	<Toast/>
	<Suspense>
		<Dialog v-model:visible="visibleModel" modal header="Incluir doação monetária" :style="{ width: '75rem' }" @hide="resetForm" @show="resetForm">
			<div class="flex flex-col gap-4">
				<span class="p-text-secondary">Insira as informações do item.</span>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col gap-2">
						<label>Nome do doador</label>
						<InputText class="col-span-2" v-model="donerName"/>
					</div>
					<div class="flex flex-col gap-2">
						<label>Valor da doação</label>
						<InputNumber :minFractionDigits="2" :maxFractionDigits="2" class="col-span-2" v-model="ammount"/>
					</div>
					<div class="flex flex-col gap-2">
						<label>Data da visita</label>
						<Calendar v-model="donationDate" dateFormat="dd/mm/yy"/>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-4"></div>
				<div class="flex justify-content-end gap-2">
					<Button type="button" label="Cancelar" severity="secondary" @click="visibleModel = false"></Button>
					<Button type="button" label="Salvar" @click="submit"></Button>
				</div>
			</div>
		</Dialog>
	</Suspense>
</template>