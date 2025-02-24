from flask import jsonify
from models.pedido_model import db, Pedido

def criar_pedido(data):
    novo_pedido = Pedido(
        cliente=data['cliente'],
        valor=data['valor'],
        descricao=data['descricao']
    )
    db.session.add(novo_pedido)
    db.session.commit()
    return jsonify({'id': novo_pedido.id}), 201

def listar_pedidos():
    pedidos = Pedido.query.all()
    return jsonify([pedido.to_dict() for pedido in pedidos])

def obter_pedido(id):
    pedido = Pedido.query.get_or_404(id)
    return jsonify(pedido.to_dict())

def atualizar_pedido(id, data):
    pedido = Pedido.query.get_or_404(id)
    pedido.cliente = data['cliente']
    pedido.valor = data['valor']
    pedido.descricao = data['descricao']
    db.session.commit()
    return jsonify(pedido.to_dict())

def deletar_pedido(id):
    pedido = Pedido.query.get_or_404(id)
    db.session.delete(pedido)
    db.session.commit()
    return jsonify({'message': 'Pedido deletado com sucesso'})

def indicador():
    total_pedidos = Pedido.query.count()
    total_clientes = Pedido.query.with_entities(Pedido.cliente).distinct().count()
    media_pedidos = total_pedidos / total_clientes if total_clientes > 0 else 0
    return jsonify({'media_pedidos': media_pedidos})
