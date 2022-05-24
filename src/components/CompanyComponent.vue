<template>
  <v-card
  class="company"
  style="padding: 6px"
  elevation="5">
    <v-card-header>
       <v-avatar>
        <v-img
        :src="chooseIcon()">
        </v-img>
       </v-avatar>
      <v-card-title style="margin-left: 5px">
      <p style="color: gray;">{{ chooseName() }}</p> 
    </v-card-title>
    </v-card-header>

    <v-card-text>
      <h2 style="color: black; margin-top: 20px;">{{ chooseType() }}</h2>
      <br/>
   <div style="display: flex; justify-content: flex-start">
      <p class="job-type">Remoto</p><p class="job-type">Pessoa Jurídica</p></div>
      <br/>
      <div style="line-height: 1.5; overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 4; /* number of lines to show */
           line-clamp: 4; 
   -webkit-box-orient: vertical;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis eros eros, ut fermentum neque fringilla aliquet. Quisque velit felis, vehicula in tellus ut, lacinia tempor ex. Mauris consectetur ligula eu interdum luctus. Nam egestas tincidunt nunc, ac iaculis justo molestie nec. Nulla eu feugiat elit. Aliquam ac laoreet nisl. Proin sagittis pellentesque tellus, quis porta magna vestibulum eget. Sed ornare tristique eros ac cursus. Nunc at pellentesque dui. Etiam sed ligula vitae nunc volutpat volutpat ut a eros. Morbi vehicula congue nulla sit amet tempor. Quisque tincidunt ut tellus nec eleifend. Phasellus vel nisi sed magna blandit pretium. Curabitur vehicula justo dolor, a ullamcorper elit iaculis id. Donec maximus sapien velit. Donec sit amet sem a libero egestas mollis.
    </div>
    </v-card-text>
  
  <v-card-actions>
  <v-btn style="width: 298px; color: white; background-color: #3FACDA">
		Ver mais detalhes da vaga
	</v-btn>
  </v-card-actions>
  <v-card-actions><v-btn
  width="100%"
  flat
  style="color:#3FACDA; background-color: white;"
  >
  Ver vagas da empresa
  </v-btn></v-card-actions>
  
  </v-card>
</template>

<script>
export default {
  data: () => ({
    nome: ["Empresa1", "Empresa2", "Empresa3", "Empresa4", "Empresa5"],
    icon: ["https://www.clipartmax.com/png/small/134-1346973_classic-sonic-balancing-120px-classic-sonic-official-art.png", "https://www.designi.com.br/images/preview/10000484.jpg", "https://png.pngtree.com/element_pic/00/16/07/06577d261edb9ec.jpg", "https://png.pngtree.com/element_pic/00/16/07/115783931601b5c.jpg", "https://png.pngtree.com/element_pic/00/16/09/1557da901899b9d.jpg"],
    vaga: ["Tipo1", "Tipo2", "Tipo3", "Tipo4", "Tipo5"],
    salario: "R$5200",
  }),

  methods: {
    chooseName(){
      let num = Math.floor(Math.random() * this.nome.length); 
      return this.nome[num];
    },
    chooseIcon(){
      let num = Math.floor(Math.random() * this.icon.length);
      return this.icon[num];
    },
    chooseType(){
      let num = Math.floor(Math.random() * this.vaga.length);
      return this.vaga[num];
    },
    chooseSalary(){
      let num = Math.floor(Math.random() * 5000) + 5000;
      return "R$" + num;
    },
  },
};
</script>