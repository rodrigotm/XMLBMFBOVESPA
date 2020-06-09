<p align="center">
  <img width="252" height="311" src="./img-header.png">
</p>

# XMLBMFBOVESPA
Formula personalizada para Google Sheets usando Google App Script para buscar valores das ações e fundos imobiliários

Em sua planilha, clique na aba do menu superior **Ferramentas** e depois em  **Editor de Script**

Após abrir:

Crie um novo, em **Arquivo** > **Novo**
e cole esse código a seguir:
```js
function XMLBMFBOVESPA(ticker, atribute) {    
    var cache = CacheService.getPublicCache();
    var keyCache = "xmlbmfbovespa-" + ticker;
    
    var cached = cache.get(keyCache);
    if (cached != null) {
      var xml = cached;
    } else {
      var url = 'http://bvmf.bmfbovespa.com.br/cotacoes2000/FormConsultaCotacoes.asp?strListaCodigos=' + ticker;
      var xml = UrlFetchApp.fetch(url).getContentText();
      cache.put(keyCache, xml, 1200); // cache for 20 minutes
    }
    
    var document = XmlService.parse(xml);
    var root = document.getRootElement();
    
    var entries = new Array();
    entries = root.getChildren('Papel');
    var value =  entries[0].getAttribute(atribute).getValue();
    Utilities.sleep(1000);
    return parseFloat(value.replace(",", "."))
}
```
Obs: Na linha **_cache.put(keyCache, xml, 1200);_** está o número 1200 (segundos) define quanto tempo ficará o cache, recomendo deixar 1200 (20 minutos) para não sobrecarregarmos o servidor do site.

Agora é só usar na sua planilha, exemplo:

```
=XMLBMFBOVESPA(A12;"Ultimo")
```
```
=XMLBMFBOVESPA("PETR4";"Ultimo")
```
Você pode substituir o "Ultimo" por esses valores:
 
Abertura - Preço da abertura

Minimo - Mínimo valor  no dia

Maximo - Máximo valor  no dia

Medio	- Valor médio no dia

Oscilacao - Porcentagem de oscilação

Ultimo - Valor atual da ação ( Ultimo valor ) 
