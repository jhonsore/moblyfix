
# Tipos de usuários


Master
_

Usuário de controle do sistema


Admin
- 

- Acesso a todos os itens do menu, é o primeiro usuário a ser criado com o headquarter

Gerencia
-

- OS
- Clientes
- Peças/ Serviços/ Produtos
- Vendas
- Relatórios
- dashboard
- Lojas
- Usuários

Técnicos/ Atendentes
-

- OS
- Clientes
- Peças/Serviços/Produtos
- Vendas

* Os usuários do tipo financeiro podem ser divididos em dois níveis
O nível I é para funcionários que tenham acesso a todas as lojas. O nível II é para funcionários que tenham acesso apenas a sua loja de criação

Financeiro nível 1 
-
Possui acesso a todas as lojas
- OS
- Clientes
- Peças/ Serviços/ Produtos
- Vendas
- Relatórios
- dashboard
- Lojas
- Usuários


Financeiro nível 1
-
Possui acesso apenas a sua loja de criação
- OS
- Clientes
- Peças/ Serviços/ Produtos
- Vendas
- Relatórios
- dashboard
- Lojas
- Usuários



# Bibliotecas utilizadas

Heroicons names
https://unpkg.com/browse/@heroicons/react@2.1.1/24/outline/

https://heroicons.com/

Componentes do tailwind
https://tailwindui.com/components



============================

# Usuário

- Master
master@moblyfix.com.br
6gW|N?97;12#Qedf

- Admin
admin@moblyfix.com.br
123456Abc

- Gerente
gerente@moblyfix.com
123456Abc

- Técnico
tecnico@moblyfix.com
123456Abc

- Atendente
atendente@moblyfix.com
123456Abc

- Financeiro 1
financeiro1@moblyfix.com
123456Abc

- Financeiro 2
financeiro2@moblyfix.com
123456Abc

============================

# Coleções

Para a criação de novas coleções basta ir no arquivo src/types/Collections.ts e inserir na constante COLLECTIONS o nome da nova coleção

# Criando tipagem

- vai em src/types 
- cria um novo arquivo com o nome da tipagem, por ex.: Products
- seguir o padrão para os types criados

#  Adicionando coleções

- no arquivo src/types/Collections.ts
- na linha 4 na constante COLLECTIONS inserir o nome da nova coleção, por ex.: nomeDaColecao:'nomeDaColecao', em que a chave tem que ser o mesmo valor
- no type TypeCollections inserir a nova tipage criada, por ex.: | TypeProducts

# Criando funções

- na pasta src/functions criar a pasta com o nome da coleção, por ex.: users/
- copiar todos os arquivos de uma pasta qualquer para dentro da pasta users/
- mudar o nome da constante em index.ts para o nome da coleção, por ex.: Users
- dentro dos arquivos create, read, remove e update mudar o valor da constante COLLECTIONS para o da coleção criada. por ex.: COLLECTIONS.users
- na parte em que está: 
 
 data: PartialWithRequired<TypeTermsAndConditions, 'title' | 'text' | '_headquarterId' | '_storeId'

 Inserir os campos obrigatórios de acordo com cada coleção.




