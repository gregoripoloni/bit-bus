<script setup>
	import { ref, computed } from 'vue'
	import Button from 'primevue/button'
	import Dialog from 'primevue/dialog'
	import InputText from 'primevue/inputtext'
	import Textarea from 'primevue/textarea'
	import InputNumber from 'primevue/inputnumber'
	import Calendar from 'primevue/calendar'
	import Dropdown from 'primevue/dropdown'
	import FileUpload from 'primevue/fileupload'
	import Message from 'primevue/message'
	import { useCollectionStore } from '@/stores/collection'
	import { categoriesModel, typesModel, classificationsModel } from '@/utils/models'

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

	const categories = ref(categoriesModel)
	const types = ref(typesModel)
	const classifications = ref(classificationsModel)

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
	const donor = ref(null)
	const description = ref(null)
	const links = ref(null)

	const invalidName = computed(() => {
		return !name.value
	})

	const invalidCategory = computed(() => {
		return !category.value
	})

	const invalidForm = ref(false)

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
		donor.value = null
		description.value = null
		links.value = null
		invalidForm.value = false
	}

	const { item } = useCollectionStore()

	const fillForm = async () => {
		if (props.id === undefined) {
			return
		}

		image.value = item.data.img
		name.value = item.data.name
		category.value = item.data.category
		type.value = item.data.type
		classification.value = item.data.classification
		model.value = item.data.model
		manufacturer.value = item.data.manufacturer
		year.value = item.data.year ? new Date(item.data.year, 1, 1) : null
		quantity.value = item.data.quantity
		dimensions.value = item.data.dimensions
		local.value = item.data.local
		donor.value = item.data.donor
		description.value = item.data.description
		links.value = item.data.links
	}

	const submit = () => {
		if (invalidName.value || invalidCategory.value) {
			invalidForm.value = true
			return
		}

		emit('submitItem', {
			img: image.value,
			name: name.value,
			category: category.value,
			type: category.value?.code == 2 ? type.value : null,
			classification: category.value?.code == 4 ? classification.value : null,
			model: category.value?.code == 5 ? model.value : null,
			manufacturer: category.value?.code == 5 ? manufacturer.value : null,
			year: year.value ? year.value.getFullYear() : null,
			quantity: quantity.value,
			dimensions: dimensions.value,
			local: local.value,
			donor: donor.value,
			description: description.value,
			links: links.value
		})

		visibleModel.value = false
	}

	const uploadImage = async (event) => {
		const file = event.files[0]
		const reader = new FileReader()
		let blob = await fetch(file.objectURL).then((r) => r.blob())

		reader.readAsDataURL(blob)

		reader.onloadend = () => {
			image.value = reader.result
		}
	}
</script>

<template>
	<Dialog v-model:visible="visibleModel" modal :header="`${id ? 'Editar' : 'Incluir'} item no acervo`" :style="{ width: '1280px' }" @hide="resetForm" @show="fillForm">
		<div class="flex flex-col gap-4">
			<span class="p-text-secondary">Insira as informações do item.</span>
			<Transition name="p-message">
					<Message v-if="invalidForm && (invalidName || invalidCategory)" severity="error" :closable="false">Preencha os campos obrigatórios.</Message>
			</Transition>
			<div class="grid grid-cols-3 gap-4">
				<div class="col-span-3">
					<FileUpload
						class="p-button-secondary p-button-outlined"
						uploadIcon="pi pi-images"
						chooseIcon="pi pi-images"
						chooseLabel="Enviar imagem"
						mode="basic"
						accept="image/*"
						@select="uploadImage"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<label>Nome</label>
					<InputText v-model="name" :invalid="invalidForm && invalidName" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Categoria</label>
					<Dropdown v-model="category" :invalid="invalidForm && invalidCategory" :options="categories" optionLabel="name" placeholder="Selecione uma categoria" />
				</div>
				<div v-if="category?.code == 2" class="flex flex-col gap-2">
					<label>Tipo</label>
					<Dropdown v-model="type" :options="types" optionLabel="name" placeholder="Selecione um tipo" />
				</div>
				<div v-if="category?.code == 4" class="flex flex-col gap-2">
					<label>Classificação</label>
					<Dropdown v-model="classification" :options="classifications" optionLabel="name" placeholder="Selecione uma classificação" />
				</div>
				<div v-if="category?.code == 5" class="flex flex-col gap-2">
					<label>Modelo</label>
					<InputText v-model="model" />
				</div>
				<div v-if="category?.code == 5" class="flex flex-col gap-2">
					<label>Fabricante</label>
					<InputText v-model="manufacturer" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Ano</label>
					<Calendar v-model="year" view="year" dateFormat="yy" />
				</div>
				<div v-if="category?.code != 5" class="flex flex-col gap-2">
					<label>Quantidade</label>
					<InputNumber v-model="quantity" mode="decimal" showButtons :min="0" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Dimensões</label>
					<InputText v-model="dimensions" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Local de armazenamento</label>
					<InputText v-model="local" />
				</div>
				<div class="flex flex-col gap-2">
					<label>Nome do doador</label>
					<InputText v-model="donor" />
				</div>
				<div class="flex flex-col gap-2 col-span-3">
					<label>Descrição</label>
					<Textarea v-model="description" class="h-40" />
				</div>
				<div class="flex flex-col gap-2 col-span-3">
					<label>Links</label>
					<Textarea v-model="links" class="h-20" />
				</div>
			</div>
			<div class="flex justify-end gap-2">
				<Button type="button" label="Cancelar" severity="secondary" outlined @click="visibleModel = false"></Button>
				<Button type="button" label="Salvar" @click="submit"></Button>
			</div>
		</div>
	</Dialog>
</template>
