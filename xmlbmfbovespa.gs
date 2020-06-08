function XMLBMFBOVESPA(ticker, atribute) {
  var url = 'http://bvmf.bmfbovespa.com.br/cotacoes2000/FormConsultaCotacoes.asp?strListaCodigos=' + ticker;
  var xml = UrlFetchApp.fetch(url).getContentText();
  var document = XmlService. parse(xml);
  var root = document.getRootElement();
  
  var entries = new Array();
  entries = root.getChildren('Papel');
  var value =  entries[0].getAttribute(atribute).getValue();
  Utilities.sleep(1000);
  return parseFloat(value.replace(",", "."))
}
