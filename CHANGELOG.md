# Changelog

## 0.2.0 — 2026-10-26
- Adicionadas telas privadas para cadastrar, listar, editar, arquivar e restaurar pacientes.
- Incluída validação de sessão e entrada no servidor; a propriedade do cadastro vem do usuário autenticado.
- Preservada a exclusão definitiva fora da interface.
- Atualizados o painel, os estilos responsivos, o manual e as orientações de segurança.
- Adicionadas verificações estáticas para regras principais do módulo de pacientes.
- Não inclui medicamentos, estoque, compras, receitas, calendário, alertas externos ou PWA.

## 0.1.0 — 2026-10-26
- Criado esqueleto Next.js com TypeScript e interface responsiva mínima.
- Preparados login Supabase Auth e rota/página privada.
- Criada migração da tabela inicial de pacientes com RLS por proprietário.
- Adicionados exemplo de ambiente, orientações de segurança e documentação `docs/`.
