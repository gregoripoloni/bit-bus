<script setup>
	import { ref, computed } from 'vue'
	import { useRouter } from 'vue-router'
	import Button from 'primevue/button'
	import Card from 'primevue/card'
	import Panel from 'primevue/panel'
	import ConfirmDialog from 'primevue/confirmdialog'
	import { useToast } from 'primevue/usetoast'
	import { useConfirm } from 'primevue/useconfirm'
	import { useLectureStore } from '@/stores/lecture'
	import LectureForm from '@/components/LectureForm.vue'
	import { parseToBrFormat } from '@/utils/dates'

	const props = defineProps({
		lecture: Object
	})

	const router = useRouter()
	const toast = useToast()
	const confirm = useConfirm();
	const { updateLecture, removeLecture } = useLectureStore()

	const details = computed(() => {
		return [
			{ name: 'Palestrante', value: props.lecture.person },
			{ name: 'Local', value: props.lecture.local },
			{ name: 'Data e hora', value: parseToBrFormat(props.lecture.datetime) },
			{ name: 'Duração', value: props.lecture.duration }
		]
	})

	const formVisible = ref(false)

	const submitItem = async (item) => {
		await updateLecture(props.lecture.id, item)
		toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Palestra atualizada.', life: 3000 })
	}

	const deleteItem = () => {
		confirm.require({
			message: 'Quer mesmo remover esta palestra?',
			header: 'Cuidado!',
			icon: 'pi pi-info-circle',
			rejectLabel: 'Cancelar',
			rejectClass: 'p-button-secondary p-button-outlined',
			acceptLabel: 'Remover',
			acceptClass: 'p-button-danger',
			accept: async () => {
				await removeLecture(props.lecture.id)
				toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Palestra removida.', life: 3000 })
				router.push('/palestras')
			}
		})
	}
</script>

<template>
	<Card #content>
		<div class="flex flex-col gap-8 p-4">
			<div>
				<h1 class="flex justify-between">
					{{ lecture.title }}
					<div class="flex gap-3">
						<Button label="Editar" severity="secondary" outlined @click="formVisible = true" />
						<Button icon="pi pi-trash" severity="danger" outlined @click="deleteItem" />
					</div>
				</h1>
			</div>
			<Panel header="Resumo da palestra">
				<p>{{ lecture.brief }}</p>
			</Panel>
			<Panel header="Detalhes">
				<div class="grid grid-cols-4 gap-8">
					<div v-for="detail in details.filter(detail => detail.value)" :key="detail.name" class="flex flex-col gap-1">
						<p class="LectureDetails-label">{{ detail.name }}</p>
						<p>{{ detail.value }}</p>
					</div>
				</div>
			</Panel>
			<Panel header="Currículo do palestrante">
				<p>{{ lecture.resume }}</p>
			</Panel>
		</div>
		<LectureForm v-model:visible="formVisible" :id="lecture.id" @submitItem="submitItem" />
		<ConfirmDialog></ConfirmDialog>
	</Card>
</template>

<style scoped>
	.LectureDetails-label {
		font-weight: 500;
	}
</style>
