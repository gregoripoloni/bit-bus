<script setup>
	import { ref, computed } from 'vue'
	import Button from 'primevue/button'
	import Dialog from 'primevue/dialog'
	import InputText from 'primevue/inputtext'
	import Textarea from 'primevue/textarea'
	import Toast from 'primevue/toast'
	import InputNumber from 'primevue/inputnumber'
	import Calendar from 'primevue/calendar'
	import Dropdown from 'primevue/dropdown'
	import FileUpload from 'primevue/fileupload'

	const props = defineProps({
		visible: Boolean,
		item: Object
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

	const image = ref(null)
	const name = ref(null)
	const category = ref(null)
	const type = ref(null)
	const classification = ref(null)
	const model = ref(null)
	const manufacturer = ref(null)
	const year = ref(null)
	const quantity = ref(null)
	const dimensions = ref(null)
	const local = ref(null)
	const description = ref(null)
	const links = ref(null)

	const resetForm = () => {
		image.value = null
		name.value = null
		category.value = null
		type.value = null
		classification.value = null
		model.value = null
		manufacturer.value = null
		year.value = null
		quantity.value = null
		dimensions.value = null
		local.value = null
		description.value = null
		links.value = null
	}

	const fillForm = () => {
		if (!props.item) {
			return
		}

		name.value = props.item.name
		category.value = props.item.category
		type.value = props.item.type
		classification.value = props.item.classification
		model.value = props.item.model
		manufacturer.value = props.item.manufacturer
		year.value = props.item.year ? new Date(props.item.year, 1, 1) : null
		quantity.value = props.item.quantity
		dimensions.value = props.item.dimensions
		local.value = props.item.local
		description.value = props.item.description
		links.value = props.item.links
	}

	const categories = ref([
		{ name: 'Processadores e Memórias', code: 1 },
		{ name: 'Periféricos e Discos Removíveis', code: 2 },
		{ name: 'Servidores (Tower/físico)', code: 3 },
		{ name: 'Placas', code: 4 },
		{ name: 'Telefone', code: 5 }
	])

	const types = ref([
		{ name: 'Mídia', code: 1 },
		{ name: 'Dispositivo', code: 2 },
		{ name: 'Protótipo', code: 3 },
		{ name: 'Mouse', code: 4 },
		{ name: 'Teclado', code: 5 },
		{ name: 'Dispositivo de Entrada', code: 6 },
		{ name: 'Dispositivo de Armazenamento', code: 7 },
		{ name: 'Dispositivo de Saída', code: 8 }
	])

	const classifications = ref([
		{ name: 'ATX', code: 1 },
		{ name: 'Micro-ATX', code: 2 },
		{ name: 'Mini-ATX', code: 3 }
	])

	const uploadImage = async (event) => {
		const file = event.files[0]
		const reader = new FileReader()
		let blob = await fetch(file.objectURL).then((r) => r.blob())

		reader.readAsDataURL(blob)

		reader.onloadend = () => {
			image.value = reader.result
		}
	}

	const submit = () => {
		emit('submitItem', {
			img: image.value,
			name: name.value,
			category: category.value,
			type: type.value,
			classification: classification.value,
			model: model.value,
			manufacturer: manufacturer.value,
			year: year.value ? year.value.getFullYear() : null,
			quantity: quantity.value,
			dimensions: dimensions.value,
			local: local.value,
			description: description.value,
			links: links.value
		})
		visibleModel.value = false
	}
</script>

<template>
	<Toast />
	<Dialog v-model:visible="visibleModel" modal header="Incluir item no acervo" :style="{ width: '75rem' }" @hide="resetForm" @show="fillForm">
		<div class="flex flex-col gap-4">
			<span class="p-text-secondary">Insira as informações do item.</span>
			<div class="grid grid-cols-2 gap-4">
				<div class="col-span-2">
					<FileUpload class="col-span-2" chooseLabel="Enviar imagem" mode="basic" accept="image/*" @select="uploadImage" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Nome</label>
					<InputText v-model="name" autocomplete="off" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Categoria</label>
					<Dropdown v-model="category" :options="categories" optionLabel="name" placeholder="Selecione uma categoria" />
				</div>
				<div v-if="category && category.code == 2" class="flex flex-col gap-2">
					<label>Tipo</label>
					<Dropdown v-model="type" :options="types" optionLabel="name" placeholder="Selecione um tipo" />
				</div>
				<div v-if="category && category.code == 4" class="flex flex-col gap-2">
					<label>Classificação</label>
					<Dropdown v-model="classification" :options="classifications" optionLabel="name" placeholder="Selecione uma classificação" />
				</div>
				<div v-if="category && category.code == 5" class="flex flex-col gap-2">
					<label>Modelo</label>
					<InputText v-model="model" autocomplete="off" />
				</div>
				<div v-if="category && category.code == 5" class="flex flex-col gap-2">
					<label>Fabricante</label>
					<InputText v-model="manufacturer" autocomplete="off" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Ano</label>
					<Calendar v-model="year" view="year" dateFormat="yy" />
				</div>
				<div v-if="!category || category.code != 5" class="flex flex-col gap-2">
					<label>Quantidade</label>
					<InputNumber v-model="quantity" mode="decimal" showButtons :min="0" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Dimensões</label>
					<InputText v-model="dimensions" autocomplete="off" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Local de armazenamento</label>
					<InputText v-model="local" autocomplete="off" />
				</div>
				<div class="flex flex-col gap-2 col-span-2">
					<label>Descrição</label>
					<Textarea v-model="description" autocomplete="off" />
				</div>
				<div class="flex flex-col gap-2 col-span-2">
					<label>Links</label>
					<Textarea v-model="links" autocomplete="off" />
				</div>
			</div>
			<div class="flex justify-content-end gap-2">
				<Button type="button" label="Cancelar" severity="secondary" @click="visibleModel = false"></Button>
				<Button type="button" label="Salvar" @click="submit"></Button>
			</div>
		</div>
	</Dialog>
</template>
