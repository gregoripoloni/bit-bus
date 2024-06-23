<script setup>
	import Button from 'primevue/button'
	import { onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import InputText from 'primevue/inputtext';
	import Textarea from 'primevue/textarea';
	import VisitsAPIClient from '@/API/VisitsAPIClient';
	import { useToast } from 'primevue/usetoast';
	import Toast from 'primevue/toast';
	import OpinionAPIClient from '@/API/OpinionAPIClient';

	const toast = useToast();

	const route = useRoute();
	const visitsApiClient = new VisitsAPIClient();
	const opinionApiClient = new OpinionAPIClient();

	const name = ref('');
	const email = ref('');
	const link = ref('');
	const id = ref(route.query.id);
	const comment = ref('');
	const visit = ref('');

	onMounted(async () => {
		 visit.value = await visitsApiClient.getById(id.value);
	});

	const submit = async () => {
		if (name.value == '') {
			toast.add({ severity: 'warn', summary: 'Não foi possível salvar sua presença', detail: 'Você precisa preencher o nome para salvar a presença como visitante', life: 5000 });
			return;
		}

		try {
			let error = await visitsApiClient.addVisitor(id.value, {
				name: name.value,
				email: email.value
			});

			if (error != '' && error.indexOf('{') == -1) {
				toast.add({ severity: 'error', summary: error, life: 5000 });
				return;
			}

			let visitor = JSON.parse(error);

			if (comment.value) {
				await opinionApiClient.addOpinion({
					visitId: id.value,
					visitorId: visitor.id,
					comment: comment.value,
					socialMedia: link.value
				});
			}

			toast.add({ severity: 'success', summary: 'Sua presença foi salva com sucesso', life: 5000 });

			name.value = '';
			email.value = '';
		} catch (e) {
			toast.add({ severity: 'error', summary: e, life: 5000 });
		}
	}
</script>

<template>
	<Toast/>
	<div class="flex flex-col gap-4 justify-center w-full align-center text-center">
		<h1 class="p-text-secondary">Visita em {{ visit.place }} - {{ visit.period }}</h1>
		<div class="w-full text-center">
			<h2 class="p-text-secondary">Registre sua Presença</h2>
		</div>
		<div class="flex justify-center">
			<div class="flex flex-col w gap-2 w-1/2 text-left">
				<label>Seu Nome</label>
				<InputText class="col-span-2" v-model="name" />
			</div>
		</div>
		<div class="flex justify-center">
			<div class="flex flex-col w gap-2 w-1/2 text-left">
				<label>Seu E-mail</label>
				<InputText type="email" class="col-span-2" v-model="email" />
			</div>
		</div>
		<div class="flex justify-center">
			<div class="flex flex-col w gap-2 w-1/2 text-left h-60">
				<label>Escreva um comentário sobre a sua visita</label>
				<Textarea type="text" class="col-span-2 h-60" v-model="comment" />
			</div>
		</div>
		<div class="flex justify-center">
			<div class="flex flex-col w gap-2 w-1/2 text-left h-60">
				<label>Link da sua rede social</label>
				<InputText type="text" class="col-span-2" v-model="link"/>
			</div>
		</div>
		<div class="flex justify-end w-full gap-2">
			<Button type="button" label="Marcar presença" @click="submit"></Button>
		</div>
	</div>
</template>
