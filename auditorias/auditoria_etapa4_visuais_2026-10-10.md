# ATAMF — Etapa 4: triagem de dependências visuais

Data: 2026-10-10

Método: busca textual em enunciados e explicações por figura, imagem, gráfico, tabela, quadro, diagrama, ilustração e fluxograma. Contagens incluem falsos positivos e não representam erros confirmados.

| Arquivo | Questões lidas | Ocorrências textuais |
|---|---:|---:|
| atamf_parte_08_corrigidas_parcial.json | 390 | 8 |
| questoes.json | 55 | 1 |
| questoes_administracao_publica.json | 232 | 4 |
| questoes_atualidades.json | 261 | 3 |
| questoes_gestao.json | 453 | 5 |
| questoes_informatica_parte10.json | 77 | 77 |
| questoes_informatica_parte9.json | 347 | 10 |
| questoes_matematica_parte6.json | 198 | 2 |
| questoes_matematica_parte7.json | 211 | 12 |
| questoes_parte12.json | 715 | 0 |
| questoes_regime.json | 247 | 4 |
| questoes_regime_crimes.json | 140 | 0 |

**Limitações:** o arquivo questoes_portugues.json excedeu a capacidade de leitura integral nesta execução e não foi auditado. A triagem considera somente texto de q/e ou enunciado/comentario. O arquivo de Informática parte 10 inclui muitas ocorrências incidentais em explicações sobre tabelas de gabarito; não são 77 imagens ausentes.

## Casos prioritários para confronto com os PDFs originais

- atamf-info8-prof-0236 e atamf-info8-prof-0288: figura precedente de página web da ANVISA.
- atamf-admpub-0081: Quadro 1 com arrecadação municipal.
- atamf-atualidades-0136: gráfico da participação do Brasil no valor adicionado industrial; há descrição textual.
- atamf-gestao-0231: tabela de ritos de cultura organizacional.
- atamf-info9-0069, atamf-info9-0093, atamf-info9-0104, atamf-info9-0141, atamf-info9-0257, atamf-info9-deep-0281: figuras ou capturas de tela referidas.

## Preservação

Nenhuma questão, duplicata, alternativa ou gabarito foi modificado. Não declarar a etapa concluída sem inspeção do restante de Português e confronto dos itens visuais com as fontes originais. Não remover itens automaticamente.
