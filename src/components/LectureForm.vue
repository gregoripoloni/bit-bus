<script setup>
	import { ref, computed } from 'vue'
	import Button from 'primevue/button'
	import Dialog from 'primevue/dialog'
	import InputText from 'primevue/inputtext'
	import Textarea from 'primevue/textarea'
	import Calendar from 'primevue/calendar'
	import Message from 'primevue/message'
	import { useLectureStore } from '@/stores/lecture'
	import { parseDateToString, parseStringToDate } from '@/utils/dates'

	const props = defineProps({
		visible: Boolean,
		id: String
	})

	const emit = defineEmits(['update:visible', 'submitItem'])

	const visibleModel = computed({
		get() {
			return props.visible
		},
		set(newValue) {
			emit('update:visible', newValue)
		}
	})

	const title = ref(null)
	const person = ref(null)
	const local = ref(null)
	const datetime = ref(null)
	const duration = ref(null)
	const resume = ref(null)
	const brief = ref(null)

	const invalidFields = computed(() => {
		return !title.value || !person.value || !local.value || !datetime.value || !duration.value || !resume.value || !brief.value
	})
	const invalidForm = ref(false)

	const resetForm = () => {
		title.value = null
		person.value = null
		local.value = null
		datetime.value = null
		duration.value = null
		resume.value = null
		brief.value = null
		invalidForm.value = false
	}

	const { lecture } = useLectureStore()

	const fillForm = async () => {
		if (props.id === undefined) {
			return
		}

		title.value = lecture.data.title
		person.value = lecture.data.person
		local.value = lecture.data.local
		datetime.value = parseStringToDate(lecture.data.datetime)
		duration.value = lecture.data.duration
		resume.value = lecture.data.resume
		brief.value = lecture.data.brief
	}

	const submit = () => {
		if (invalidFields.value) {
			invalidForm.value = true
			return
		}

		emit('submitItem', {
			title: title.value,
			person: person.value,
			local: local.value,
			datetime: parseDateToString(datetime.value),
			duration: duration.value,
			resume: resume.value,
			brief: brief.value
		})

		visibleModel.value = false
	}
</script>

<template>
	<Dialog v-model:visible="visibleModel" modal :header="`${id ? 'Editar' : 'Incluir'} palestra`" :style="{ width: '1280px' }" @hide="resetForm" @show="fillForm">
		<div class="flex flex-col gap-4">
			<span class="p-text-secondary">Insira as informações da palestra.</span>
			<Transition name="p-message">
					<Message v-if="invalidForm && invalidFields" severity="error" :closable="false">Preencha os campos obrigatórios.</Message>
			</Transition>
			<div class="grid grid-cols-3 gap-4">
				<div class="flex flex-col gap-2">
					<label>Título</label>
					<InputText v-model="title" :invalid="invalidForm && !title" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Palestrante</label>
					<InputText v-model="person" :invalid="invalidForm && !person" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Local</label>
					<InputText v-model="local" :invalid="invalidForm && !local" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Data e hora</label>
					<Calendar v-model="datetime" showTime hourFormat="24" dateFormat="dd/mm/yy" :invalid="invalidForm && !datetime" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Duração</label>
					<InputText v-model="duration" :invalid="invalidForm && !duration" />
				</div>
				<div class="flex flex-col gap-2 col-span-3">
					<label>Currículo do palestrante</label>
					<Textarea v-model="resume" class="h-28" :invalid="invalidForm && !resume" />
				</div>
				<div class="flex flex-col gap-2 col-span-3">
					<label>Resumo da palestra</label>
					<Textarea v-model="brief" class="h-28" :invalid="invalidForm && !brief" />
				</div>
			</div>
			<div class="flex justify-end gap-2">
				<Button type="button" label="Cancelar" severity="secondary" outlined @click="visibleModel = false"></Button>
				<Button type="button" label="Salvar" @click="submit"></Button>
			</div>
		</div>
	</Dialog>
</template>
