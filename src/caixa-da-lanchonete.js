class CaixaDaLanchonete {
  cardapio = [  // Itens da Lanchonete
    { codigo: 'cafe', descricao: 'Café', valor: 3.00, requer: [] },
    { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50, requer: ['cafe'] },
    { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20, requer: [] },
    { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50, requer: [] },
    { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00, requer: ['sanduiche'] },
    { codigo: 'salgado', descricao: 'Salgado', valor: 7.25, requer: [] },
    { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50, requer: [] },
    { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50, requer: [] }
  ];

  formasDePagamento = ['dinheiro', 'debito', 'credito'];

  // Método para formatar valor total
  formatarValor(valor) {
    return valor.toFixed(2).replace('.', ',');
  }

  // Método principal
  calcularValorDaCompra(pagamento, itens) {

    // Verificar pagamento
    if (!this.formasDePagamento.includes(pagamento)) {
      return "Forma de pagamento inválida!";
    }

    // Verificar número de itens
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let total = 0; // Valor total
    const itensPresentes = new Set(); // Set de códigos

    // Analisar item por item
    for (const item of itens) {

      // Obtem item do cardapio
      const [codigo, quantidade] = item.split(',');
      const menuItem = this.cardapio.find(item => item.codigo === codigo);

      // Verificar código do item
      if (!menuItem) {
        return "Item inválido!";
      }

      // Verifica quantidade do item
      if (quantidade <= 0) { // Não foi solicitado, mas quantidade negativa também deve ser inválida
        return "Quantidade inválida!";
      }

      itensPresentes.add(codigo);  // Guarda o código
      total += menuItem.valor * quantidade; // Obtêm o valor
    }

    // Verifica se os itens requeridos estão presentes
    for (const item of itens) {
      const [codigo, _] = item.split(',');
      const menuItem = this.cardapio.find(item => item.codigo === codigo);

      for (const elem of menuItem.requer) {  // Se requer um ou mais de um produto
        if (!itensPresentes.has(elem)) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
    }

    // Aplica os descontos ou acréscimos
    if (pagamento === 'dinheiro') {
      total *= 0.95; // 5% de desconto
    } else if (pagamento === 'credito') {
      total *= 1.03; // 3% de acréscimo
    }

    return `R$ ${this.formatarValor(total)}`; // Retorna valor formatado
  }
}

// OBSERVAÇÕES: 
// Como os itens dos combos não são principais, eles não precisam de tratamento dos itens extras.
// Para os itens extras, utilizei uma lista para que qualquer atualização no futuro fique mais fácil.
// Preferi fazer tudo em um único arquivo, para simplificar.

export { CaixaDaLanchonete };
