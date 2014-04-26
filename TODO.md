##Features
- Ter uma forma de produtures/etc submeterem os seus dados e nós aprovar-mos
- ter campos para onde e quando
	- link para o google maps, e label da morada e horário
- ter campos para contactos dos produtores? tel, email, facebook?
- ter uma cena de pesquisa?
- ter uma forma integrada de dar feedback

##Techical
- error handling
- usar uma session variable (ou new ReactiveProperty) na galeria para mostrar a imagem atual (e mudar)
- melhorar a galeria (e talvez publicá-la numa package?)

##Submit
- Ter um método para submeter produtores, etc sugeredios que põe o isAproved=false
- Nas listagens públicas não mostrar o não aproved e nas de admin mostrar todos (no admin os não aproved têm de estar diferentes, a vermelho ou assim)
- Não deixar que pessoas sem login vejam os não públicos
- Adicionar um campo de email ao form
- Mandar as pessoas para um página de "Ok submission done" quando submetem uma cena
- Ter uma forma de aprovar