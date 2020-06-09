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
