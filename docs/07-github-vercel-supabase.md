# GitHub, Vercel e Supabase

- **GitHub:** hospeda repositório e histórico do código. Não publique variáveis secretas nem dados de pacientes.
- **Vercel:** executa/hospeda a aplicação. A associação do projeto e a configuração das variáveis de ambiente dependem das contas e da interface atuais.
- **Supabase:** fornece autenticação e banco PostgreSQL. A migração deve ser aplicada ao projeto correto e as políticas RLS revisadas.

A conexão entre serviços não foi efetuada automaticamente. Crie as contas/projetos, vincule o repositório, defina domínios e callbacks e aplique variáveis apenas nos ambientes necessários. Consulte a documentação oficial atual de cada provedor para passos de interface.

Antes de armazenar dados reais, confirme preço, limites, retenção, backups, recuperação e disponibilidade no plano contratado. Esta entrega não presume recursos de plano gratuito.
