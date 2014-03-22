if (Produtores.find().count() === 0) {
  Produtores.insert({
    name: 'Dona Albertina',
    mainPhotoUrl : 'http://3.bp.blogspot.com/_jie4i34OAmg/S9nRZEG7E_I/AAAAAAAAAJA/D3jIVPlkIxU/s1600/Escola+Benfica+2010-1.JPG',
    description: 'Vendo couves a muito bom preço!!'
  }); 
  Produtores.insert({
    name: 'Senhor Manuel',
    mainPhotoUrl: 'http://eventoclick.com/img/img_reportajes/2015_1313156948_prod%20bio.jpg',
    description: 'Sou especialista na produção de batata!'
  }); 
  Produtores.insert({
    name: 'Irmãos Fonseca',
    mainPhotoUrl: 'http://t3.gstatic.com/images?q=tbn:ANd9GcRFU7EzjpFqy1HQuzGvV_2FShn2kLB2ggToVV_hVmLr0jCnARQr',
    description: 'Produzimos fruta de toda a espécie!!'
  });
  Produtores.insert({
    name: 'Senhor Manuel 2',
    mainPhotoUrl: 'http://eventoclick.com/img/img_reportajes/2015_1313156948_prod%20bio.jpg',
    description: 'Sou especialista na produção de batata!'
  }); 
  Produtores.insert({
    name: 'Irmãos Fonseca 2',
    mainPhotoUrl: 'http://t3.gstatic.com/images?q=tbn:ANd9GcRFU7EzjpFqy1HQuzGvV_2FShn2kLB2ggToVV_hVmLr0jCnARQr',
    description: 'Produzimos fruta de toda a espécie!!'
  });
}