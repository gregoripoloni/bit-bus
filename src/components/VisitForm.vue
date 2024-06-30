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
	const visitStore = useVisitStore();

	const place = ref();
	const period = ref('');
	const responsable = ref();
	const items = ref([]);
	const visitors = ref([]);
	let error = ref(new APIError());

	const fillForm = async () => {
		if (!props.id) {
			return;
		}
		let result = await visitStore.getById(props.id);
		place.value = result.place;
		period.value = (new Date(result.period)).toLocaleDateString();
		responsable.value = result.responsable;
		visitors.value = result.visitors;
		items.value = result.items ?? [];
	}

	const resetForm = () => {
		place.value = '';
		period.value = '';
		responsable.value = '';
		items.value = [];
	}

	const updateItemList = (item) => {
		debugger
		if (items.value.find((i) => i.id == item.id)) {
			items.value = items.value.filter((i) => i.id != item.id);
		} else {
			items.value.push(convertToApi(item));
		}
	}

	const submit = async () => {
		let date = '';
		if (typeof period.value != 'object') {
			date = (new Date(period.value?.split('/').reverse().join('/'))).toISOString().split('T')[0];
		}

		if (period.value != 'Invalid Date' && typeof period.value == 'object') {
			date = period.value?.toISOString().split('T')[0];
		}

		try {
			let result;
			debugger
			let saveData = {
				id: props.id,
				place: place.value,
				period: date,
				responsable:responsable.value,
				items: items.value ?? [],
				visitors: visitors.value
			};

			if (props.id != null) {
				result = await visitStore.update(saveData);
			} else {
				result = await visitStore.save(saveData);
			}

			if (result instanceof APIError) {
				error.value = result;
				toast.add({ severity: 'error', summary: 'Não foi possível salvar a sua visita', detail: 'Por favor, verifique os campos ressaltados em vermelhor', life: 5000 });
				return
			}

			toast.add({ severity: 'success', summary: 'Sua visita foi salva com sucesso', life: 5000 });
			emit('update:visible', false);
		} catch (e) {
			debugger
			error.value = e;
			toast.add({ severity: 'error', summary: 'Não foi possível salvar a sua visita', detail: 'Por favor, verifique os campos ressaltados em vermelhor', life: 5000 });
		}
	}

	const getError = (field) => {
		return error.value.getError(field);
	}
</script>

<template>
	<Toast/>
	<Suspense>
		<Dialog v-model:visible="visibleModel" modal header="Incluir/Editar Visita" :style="{ width: '75rem' }" @hide="resetForm" @show="fillForm">
			<div class="flex flex-col gap-4">
				<span class="p-text-secondary">Insira as informações do item.</span>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col gap-2">
						<label>Responsável pela visita</label>
						<InputText class="col-span-2" v-model="responsable" :invalid="getError('responsable')"/>
					</div>
					<div class="flex flex-col gap-2">
						<label>Local da visita</label>
						<InputText class="col-span-2" v-model="place" :invalid="getError('place')"/>
					</div>
					<div class="flex flex-col gap-2">
						<label>Data da visita</label>
						<Calendar v-model="period" dateFormat="dd/mm/yy" :invalid="getError('period')"/>
					</div>
				</div>
				<div>
					<label>Itens da visita</label>
					<CollectionListPicker
						:selectedItems="items"
						@updateItem="(item) => updateItemList(item)"
					/>
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