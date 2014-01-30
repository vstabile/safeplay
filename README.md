# SafePlay

O SafePlay é um aplicativo para [Firefox OS](http://www.mozilla.org/pt-BR/firefox/os/) que dá recomendações para a prática segura de esportes em dias quentes. Para isto, utiliza medições locais de temperatura e umidade obtidas pelo [kit IoT](http://iot.telefonicabeta.com/) e calcula o [índice de calor](http://pt.wikipedia.org/wiki/%C3%8Dndice_de_calor), que representa a intensidade de calor que as pessoas sentem e que afeta sua saúde e bem estar. As recomendações fornecidas ao usuário são baseadas nas diretrizes publicadas pela [American College of Sports Medicine (ACSM)](http://www.acsm.org/) para a participação em atividades esportivas em períodos de calor extremo.

## Motivação

O corpo humano normalmente se resfria pela transpiração, sendo o calor removido do corpo pela evaporação do suor. Porém a umidade relativa reduz a taxa de evaporação, devido à maior pressão de vapor no ar, não permitindo que a evaporação e consequente resfriamento do corpo sejam máximos, resultando em uma maior sensação de calor. O efeito é subjetivo, sendo sua classificação baseada em descrições subjetivas de quão quente pessoas se sentiam em determinadas condições de temperatura e umidade. Esta classificação resultou em o que se chama de [índice de calor](http://pt.wikipedia.org/wiki/%C3%8Dndice_de_calor), que indica a temperatura conforme percebida pela pessoa, dada a umidade e temperatura real do ambiente.

A exposição prolongada ao calor pode causar problemas de saúde como:
* exaustão pelo calor
* câimbras
* insolação
* brotoeja
* tontura e desamio
* piora em condições médicas pré-existentes

## Cálculo do Índice de calor

A fórmula abaixo permite calcular aproximadamente o [índice de calor](http://pt.wikipedia.org/wiki/%C3%8Dndice_de_calor) em graus Fahrenheit, com precisão de ±1.3 °F. Ela é uma aproximação polinomial do resultado de experimentos empíricos de como o corpo humano percebe a temperatura em diversas condições de umidade e reproduz a tabela publicada pela [NOAA National Weather Service](http://www.nws.noaa.gov/os/heat/index.shtml).

![equation](https://s3.amazonaws.com/victor-stabile/SafePlay/heat-index.png)

onde

![equation](https://s3.amazonaws.com/victor-stabile/SafePlay/heat-index-variables.png)

## Zonas de Calor

A [American College of Sports Medicine (ACSM)](http://www.acsm.org/) publicou diretrizes para a prática de atividades esportivas baseadas em 5 zonas de calor:

### Zona Branca

Índice de calor até 27° C. Nesta zona há pouco perigo devido ao calor, não é preciso tomar nenhuma precaução.

### Zona Amarela

Índice de calor entre 28 e 37° C. Nesta zona é recomendável se manter hidratado e não praticar atividades esportivas por longos períodos, substituindo jogadores com frequência quando possível.

### Zona Laranja

Índice de calor entre 38 e 41° C. Nesta zona é recomendável fornecer água gelada tanto para os jogadores quanto para a torcida e fazer pausas com frequência.

### Zona Vermelha

Índice de calor entre 42 e 46° C. Nesta zona deve-se seguir todas as recomendações anteriores e ainda considerar reduzir o tempo das partidas e treinos, podendo também cancelar a atividade.

### Zona Negra

Índice de calor acima de 46° C. Nesta zona é recomendável cancelar qualquer jogo ou treino até que o índice de calor retorne para menos de 46° C.