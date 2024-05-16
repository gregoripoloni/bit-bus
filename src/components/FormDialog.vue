<script setup>
	import { ref, computed } from 'vue'
	import Button from 'primevue/button'
	import Dialog from 'primevue/dialog'
	import InputText from 'primevue/inputtext'
	import Toast from 'primevue/toast'
	import { useToast } from 'primevue/usetoast'
	import { useCollectionStore } from '@/stores/collection'

	const props = defineProps({
		visible: Boolean
	})

	const emit = defineEmits(['update:visible'])

	const visibleModel = computed({
		get() {
			return props.visible
		},
		set(newValue) {
			emit('update:visible', newValue)
		}
	})

	const name = ref('')
	const description = ref('')

	const { addItem } = useCollectionStore()
	const toast = useToast()

	const submit = () => {
		addItem({
			id: 9,
			name: name.value,
			description: description.value
		})

		visibleModel.value = false
		toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Item cadastrado no acervo.', life: 3000 });
	}
</script>

<template>
	<Toast />
	<Dialog v-model:visible="visibleModel" modal header="Incluir item no acervo" :style="{ width: '75rem' }">
		<div class="flex flex-col gap-4">
			<span class="p-text-secondary">Insira as informações do item.</span>
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-2">
					<label for="name">Nome</label>
					<InputText v-model="name" id="name" class="flex-auto" autocomplete="off" />
				</div>
				<div class="flex flex-col gap-2">
					<label for="description">Descrição</label>
					<InputText v-model="description" id="description" class="flex-auto" autocomplete="off" />
				</div>
			</div>
			<div class="flex justify-content-end gap-2">
				<Button type="button" label="Cancelar" severity="secondary" @click="visibleModel = false"></Button>
				<Button type="button" label="Salvar" @click="submit"></Button>
			</div>
		</div>
	</Dialog>
</template>
