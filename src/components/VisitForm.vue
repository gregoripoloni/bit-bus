<script setup>
	import { ref, computed } from 'vue'
	import Button from 'primevue/button'
	import Dialog from 'primevue/dialog'
	import InputText from 'primevue/inputtext'
	import Textarea from 'primevue/textarea'
	import Toast from 'primevue/toast'
	import Calendar from 'primevue/calendar'
	import InputNumber from 'primevue/inputnumber'
	import Dropdown from 'primevue/dropdown'
	import { useVisitStore } from '@/stores/VisitsStore'

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

	const emit = defineEmits(['update:visible', 'submitItem']);
	const visitStore = useVisitStore();

	const place = ref();
	const period = ref();
	const responsable = ref();
	const items = ref();

	const fillForm = async () => {
		let result = await visitStore.getById(props.id);
		place.value = result.place;
		period.value = result.period;
		responsable.value = result.responsable;

	}

	const resetForm = async() => {
		place.value = '';
		period.value = '';
		responsable.value = '';
		items.value = '';
	}
</script>

<template>
	<Suspense>
		<Dialog v-model:visible="visibleModel" modal header="Incluir/Editar Visita" :style="{ width: '75rem' }" @hide="resetForm" @show="fillForm">
			<div class="flex flex-col gap-4">
				<span class="p-text-secondary">Insira as informações do item.</span>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex flex-col gap-2">
						<label>Responsável pela visita</label>
						<InputText class="col-span-2" v-model="responsable"/>
					</div>
					<div class="flex flex-col gap-2">
						<label>Local da visita</label>
						<InputText class="col-span-2" v-model="place"/>
					</div>
					<div class="flex flex-col gap-2">
						<label>Data da visita</label>
						<Calendar v-model="period"/>
					</div>
				</div>
				<div class="flex justify-content-end gap-2">
					<Button type="button" label="Cancelar" severity="secondary" @click="visibleModel = false"></Button>
					<Button type="button" label="Salvar" @click="submit"></Button>
				</div>
			</div>
		</Dialog>
	</Suspense>
</template>