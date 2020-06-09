<p align="center">
  <img width="252" height="311" src="./img-header.png">
</p>

# XMLBMFBOVESPA
Formula personalizada para Google Sheets usando Google Script para buscar valores das ações e fundos imobiliários

Vá na aba Ferramentas > Editor de Script

Após abrir:

Arquivo > Novo
e cole esse código a seguir:
```js
function XMLBMFBOVESPA(ticker, atribute) {
  var url = 'http://bvmf.bmfbovespa.com.br/cotacoes2000/FormConsultaCotacoes.asp?strListaCodigos=' + ticker;
  var xml = UrlFetchApp.fetch(url).getContentText();
  var document = XmlService.parse(xml);
  var root = document.getRootElement();
  
  var entries = new Array();
  entries = root.getChildren('Papel');
  var value =  entries[0].getAttribute(atribute).getValue();
  Utilities.sleep(1000);
  return parseFloat(value.replace(",", "."))
}
```

Agora é só usar na sua planilha, exemplo:

```
=XMLBMFBOVESPA(A12;"Ultimo"))
```
```
=XMLBMFBOVESPA("PETR4;"Ultimo"))
```
Você pode substituir o "Ultimo" por esses valores:
 
Abertura - Preço da abertura

Minimo - Mínimo valor  no dia

Maximo - Máximo valor  no dia

Medio	- Valor médio no dia

Oscilacao - Porcentagem de oscilação

Ultimo - Valor atual da ação ( Ultimo valor ) 
